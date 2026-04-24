"""Phase 2/3 agent — verifies contractor claims via CrustData."""

from __future__ import annotations

import logging

from app.models.prompts import CONTRACTOR_INTEL_PROMPT
from app.models.schemas import ContractorCredibility, ContractorSOW
from app.tools.crustdata_client import CrustDataClient
from app.tools.llm import call_llm, parse_llm_json

logger = logging.getLogger(__name__)


async def verify_contractor(sow: ContractorSOW) -> ContractorCredibility:
    """Run CrustData verification and produce a credibility report.

    1. Extract claimed staff and headcount from the SOW.
    2. Call CrustDataClient.verify_contractor() for API-level checks.
    3. Pass raw results through the LLM for narrative analysis and scoring.
    """
    client = CrustDataClient()

    claimed_staff = [
        {"name": s.name, "role": s.role}
        for s in sow.staffing_plan
    ]

    # Guess headcount from SOW text (look for explicit number claims)
    claimed_headcount = _extract_headcount(sow.raw_text)

    credibility = await client.verify_contractor(
        contractor_name=sow.contractor_name,
        claimed_staff=claimed_staff,
        claimed_headcount=claimed_headcount,
    )

    # Optionally enhance with LLM narrative analysis
    credibility = _enhance_with_llm(credibility, sow)

    return credibility


def _extract_headcount(raw_text: str) -> int | None:
    """Try to pull a claimed employee count from SOW text."""
    import re

    patterns = [
        r"(?:employ|staff|team of|over)\w*\s+(?:approximately\s+|over\s+)?"
        r"(\d[\d,]*)\s+(?:professionals|employees|staff|people)",
        r"(\d[\d,]*)\s+employees",
    ]
    for pattern in patterns:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            return int(match.group(1).replace(",", ""))
    return None


def _enhance_with_llm(
    credibility: ContractorCredibility,
    sow: ContractorSOW,
) -> ContractorCredibility:
    """Run CrustData findings through the LLM for richer analysis."""
    context_parts = [
        f"Contractor: {credibility.contractor_name}",
        f"Claimed headcount: {credibility.claimed_headcount}",
        f"Verified headcount: {credibility.verified_headcount}",
        "Personnel verification:",
    ]
    for p in credibility.personnel_verified:
        status = "VERIFIED" if p.verified else "NOT VERIFIED"
        context_parts.append(
            f"  - {p.name} (claimed: {p.claimed_role}) — {status}"
            f" — currently at {p.current_company or 'unknown'}"
            f" as {p.current_title or 'unknown'}"
        )
    context_parts.append(f"Financial signals: {credibility.financial_signals}")
    context_parts.append(f"News findings: {credibility.news_findings}")
    context_parts.append(f"Red flags so far: {credibility.red_flags}")
    context_parts.append(f"Green flags so far: {credibility.green_flags}")
    context_parts.append(f"Preliminary credibility score: {credibility.credibility_score}")

    user_message = "\n".join(context_parts)

    try:
        raw = call_llm(CONTRACTOR_INTEL_PROMPT, user_message, expect_json=True)
        data = parse_llm_json(raw)

        # Merge LLM-generated flags and score with existing data
        if "red_flags" in data:
            credibility.red_flags = list(
                set(credibility.red_flags + data["red_flags"])
            )
        if "green_flags" in data:
            credibility.green_flags = list(
                set(credibility.green_flags + data["green_flags"])
            )
        if "credibility_score" in data:
            credibility.credibility_score = float(data["credibility_score"])

    except Exception:
        logger.warning(
            "LLM enhancement failed for %s, using raw CrustData results",
            credibility.contractor_name,
            exc_info=True,
        )

    return credibility
