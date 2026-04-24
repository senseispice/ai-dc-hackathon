"""CrustData API client with mock mode for hackathon demos."""

from __future__ import annotations

import asyncio
import logging
import httpx

from app.config import settings
from app.models.schemas import ContractorCredibility, PersonVerification

logger = logging.getLogger(__name__)

CRUSTDATA_BASE_URL = "https://api.crustdata.com"

# NAICS codes relevant to land restoration
RESTORATION_NAICS = ["562910", "541620", "115310", "541330", "561730"]


class CrustDataClient:
    """Async wrapper around CrustData REST API.

    When ``settings.crustdata_mock`` is True every method returns realistic
    fake data so the demo works without a live API key.
    """

    def __init__(self) -> None:
        self._api_key = settings.crustdata_api_key
        self._mock = settings.crustdata_mock

    # ── helpers ──────────────────────────────────────────────────────────

    def _headers(self) -> dict:
        return {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }

    async def _post(self, path: str, payload: dict) -> dict:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{CRUSTDATA_BASE_URL}{path}",
                json=payload,
                headers=self._headers(),
            )
            resp.raise_for_status()
            return resp.json()

    # ── public API methods ───────────────────────────────────────────────

    async def search_companies(
        self,
        query: str,
        naics_codes: list[str] | None = None,
        location: str | None = None,
        min_employees: int | None = None,
        max_employees: int | None = None,
    ) -> list[dict]:
        if self._mock:
            return self._mock_search_companies(query)

        payload: dict = {"query": query}
        if naics_codes:
            payload["naics_codes"] = naics_codes
        if location:
            payload["location"] = location
        if min_employees is not None:
            payload["min_employees"] = min_employees
        if max_employees is not None:
            payload["max_employees"] = max_employees
        return (await self._post("/screener/company/search", payload)).get("results", [])

    async def enrich_company(
        self,
        domain: str | None = None,
        company_name: str | None = None,
    ) -> dict:
        if self._mock:
            return self._mock_enrich_company(company_name or domain or "")

        payload: dict = {}
        if domain:
            payload["domain"] = domain
        if company_name:
            payload["company_name"] = company_name
        return await self._post("/screener/company/enrich", payload)

    async def search_people(
        self,
        company_name: str | None = None,
        title: str | None = None,
        name: str | None = None,
    ) -> list[dict]:
        if self._mock:
            return self._mock_search_people(name, company_name)

        payload: dict = {}
        if company_name:
            payload["company_name"] = company_name
        if title:
            payload["title"] = title
        if name:
            payload["name"] = name
        return (await self._post("/screener/people/search", payload)).get("results", [])

    async def web_search(self, query: str) -> list[dict]:
        if self._mock:
            return self._mock_web_search(query)

        payload = {"query": query}
        return (await self._post("/screener/web/search", payload)).get("results", [])

    # ── orchestration: verify a contractor end-to-end ────────────────────

    async def verify_contractor(
        self,
        contractor_name: str,
        claimed_staff: list[dict],
        claimed_headcount: int | None = None,
    ) -> ContractorCredibility:
        """Run all verification checks and return a ContractorCredibility."""

        # Run company enrichment + web search in parallel
        enrich_task = self.enrich_company(company_name=contractor_name)
        news_task = self.web_search(f"{contractor_name} environmental restoration")
        enrich_result, news_results = await asyncio.gather(
            enrich_task, news_task, return_exceptions=True
        )

        if isinstance(enrich_result, Exception):
            logger.warning("Company enrichment failed for %s: %s", contractor_name, enrich_result)
            enrich_result = {}
        if isinstance(news_results, Exception):
            logger.warning("Web search failed for %s: %s", contractor_name, news_results)
            news_results = []

        # Verify each staff member (sequential to respect rate limits)
        personnel: list[PersonVerification] = []
        for person in claimed_staff:
            name = person.get("name", "")
            role = person.get("role", "")
            try:
                await asyncio.sleep(0.25)  # rate-limit courtesy
                results = await self.search_people(name=name, company_name=contractor_name)
                found = any(
                    r.get("name", "").lower() == name.lower() for r in results
                )
                current_co = results[0].get("company", "") if results else None
                current_title = results[0].get("title", "") if results else None
                personnel.append(
                    PersonVerification(
                        name=name,
                        claimed_role=role,
                        verified=found,
                        current_company=current_co,
                        current_title=current_title,
                        notes="Found in CrustData" if found else "Not found at this company",
                    )
                )
            except Exception as exc:
                logger.warning("People search failed for %s: %s", name, exc)
                personnel.append(
                    PersonVerification(
                        name=name,
                        claimed_role=role,
                        verified=False,
                        notes=f"Verification failed: {exc}",
                    )
                )

        # Build credibility object
        verified_headcount = enrich_result.get("employee_count")
        financial_signals = []
        if enrich_result.get("funding_total"):
            financial_signals.append(f"Total funding: ${enrich_result['funding_total']}")
        if enrich_result.get("revenue_estimate"):
            financial_signals.append(f"Est. revenue: {enrich_result['revenue_estimate']}")

        news_findings = [
            f"{r.get('title', '')} — {r.get('snippet', '')}" for r in (news_results or [])[:5]
        ]

        red_flags: list[str] = []
        green_flags: list[str] = []

        # Headcount check
        if verified_headcount and claimed_headcount:
            ratio = verified_headcount / claimed_headcount
            if ratio < 0.5:
                red_flags.append(
                    f"Claimed {claimed_headcount} employees but CrustData shows {verified_headcount}"
                )
            elif ratio > 0.8:
                green_flags.append("Headcount claim consistent with CrustData data")

        # Personnel check
        verified_count = sum(1 for p in personnel if p.verified)
        if personnel:
            if verified_count / len(personnel) < 0.5:
                red_flags.append(
                    f"Only {verified_count}/{len(personnel)} proposed staff verified at company"
                )
            else:
                green_flags.append(
                    f"{verified_count}/{len(personnel)} proposed staff verified"
                )

        # Compute score (simple weighted average)
        staff_score = (verified_count / max(len(personnel), 1)) * 100
        financial_score = 70 if financial_signals else 40  # placeholder heuristic
        past_perf_score = 60  # default — improve with deeper analysis
        org_score = 70 if not any("layoff" in n.lower() for n in news_findings) else 35
        reputation_score = 50  # neutral default

        credibility_score = (
            staff_score * 0.30
            + financial_score * 0.20
            + past_perf_score * 0.25
            + org_score * 0.15
            + reputation_score * 0.10
        )

        return ContractorCredibility(
            contractor_name=contractor_name,
            verified_headcount=verified_headcount,
            claimed_headcount=claimed_headcount,
            personnel_verified=personnel,
            financial_signals=financial_signals,
            news_findings=news_findings,
            credibility_score=round(credibility_score, 1),
            red_flags=red_flags,
            green_flags=green_flags,
        )

    # ── mock helpers ─────────────────────────────────────────────────────

    def _mock_search_companies(self, query: str) -> list[dict]:
        return [
            {
                "company_name": "Great Basin Restoration LLC",
                "domain": "greatbasinrestoration.com",
                "employee_count": 52,
                "location": "Reno, NV",
                "description": "Ecological restoration and mine reclamation",
            },
            {
                "company_name": "Western Environmental Services Inc.",
                "domain": "westernenv.com",
                "employee_count": 185,
                "location": "Salt Lake City, UT",
                "description": "Environmental consulting and remediation",
            },
            {
                "company_name": "EcoRestore National Corp",
                "domain": "ecorestorenational.com",
                "employee_count": 85,
                "location": "Denver, CO",
                "description": "National environmental services",
            },
        ]

    def _mock_enrich_company(self, name: str) -> dict:
        mock_db = {
            "great basin restoration": {
                "employee_count": 52,
                "funding_total": 2_500_000,
                "revenue_estimate": "$8M-$12M",
                "founded_year": 2009,
                "growth_pct_yoy": 15,
            },
            "western environmental services": {
                "employee_count": 185,
                "funding_total": 10_000_000,
                "revenue_estimate": "$25M-$35M",
                "founded_year": 2001,
                "growth_pct_yoy": 5,
            },
            "ecorestore national": {
                "employee_count": 85,
                "funding_total": None,
                "revenue_estimate": "$15M-$20M",
                "founded_year": 2015,
                "growth_pct_yoy": -8,
            },
        }
        key = name.lower().split(" llc")[0].split(" inc")[0].split(" corp")[0].strip()
        for k, v in mock_db.items():
            if k in key or key in k:
                return v
        return {"employee_count": None}

    def _mock_search_people(
        self, name: str | None, company: str | None
    ) -> list[dict]:
        # Simulate: John Martinez LEFT EcoRestore
        if name and "martinez" in name.lower():
            return [
                {
                    "name": "John Martinez",
                    "title": "Senior Project Manager",
                    "company": "Apex Environmental Group",  # different company!
                    "location": "Phoenix, AZ",
                }
            ]
        if name and "chen" in name.lower():
            return [
                {
                    "name": "Dr. Sarah Chen",
                    "title": "Lead Restoration Ecologist",
                    "company": "Great Basin Restoration LLC",
                    "location": "Reno, NV",
                }
            ]
        # Generic match
        if name:
            return [
                {
                    "name": name,
                    "title": "Environmental Specialist",
                    "company": company or "Unknown",
                    "location": "Western US",
                }
            ]
        return []

    def _mock_web_search(self, query: str) -> list[dict]:
        if "ecorestore" in query.lower():
            return [
                {
                    "title": "EcoRestore National fined for incomplete remediation in Colorado",
                    "url": "https://example.com/news/ecorestore-fine",
                    "snippet": "State regulators issued a $150K fine after monitoring revealed "
                    "revegetation targets were not met on a 2022 mine reclamation project.",
                    "date": "2025-11-15",
                },
                {
                    "title": "EcoRestore National announces leadership restructuring",
                    "url": "https://example.com/news/ecorestore-restructure",
                    "snippet": "Several senior project managers departed amid internal reorganization.",
                    "date": "2026-01-20",
                },
            ]
        if "great basin" in query.lower():
            return [
                {
                    "title": "Great Basin Restoration wins BLM excellence award",
                    "url": "https://example.com/news/gbr-award",
                    "snippet": "BLM Nevada recognized the firm for outstanding mine reclamation "
                    "work at the Silver Peak site, achieving 85% native cover in Year 3.",
                    "date": "2025-09-10",
                },
            ]
        return []
