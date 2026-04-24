"""Phase 3 agent — comparative scoring of all contractors."""

from __future__ import annotations

import logging

from app.models.prompts import SCORER_PROMPT
from app.models.schemas import (
    AdjectivalRating,
    ContractorCredibility,
    ContractorSOW,
    FactorScore,
    GapReport,
    PWS,
    Risk,
    Severity,
    SuitabilityRating,
)
from app.tools.llm import call_llm, parse_llm_json

logger = logging.getLogger(__name__)

EVAL_FACTORS = [
    "Ecological Methodology",
    "Species & Materials Plan",
    "Monitoring & Adaptive Management",
    "Staffing & Expertise",
    "Past Performance",
    "Timeline Realism",
    "CrustData Credibility",
]


async def score_contractors(
    pws: PWS,
    sows: list[ContractorSOW],
    gap_reports: list[GapReport],
    credibility_reports: list[ContractorCredibility],
) -> list[SuitabilityRating]:
    """Score every contractor and return sorted SuitabilityRatings."""
    user_message = _build_context(pws, sows, gap_reports, credibility_reports)
    raw = call_llm(SCORER_PROMPT, user_message, expect_json=True)
    data = parse_llm_json(raw)
    return _parse_response(data)


def _build_context(
    pws: PWS,
    sows: list[ContractorSOW],
    gap_reports: list[GapReport],
    credibility_reports: list[ContractorCredibility],
) -> str:
    sections = []

    # PWS summary
    sections.append("=== PWS SUMMARY ===")
    sections.append(pws.scope_of_work[:1500])
    sections.append("Performance Standards:")
    for ps in pws.ecological_performance_standards:
        sections.append(f"  - {ps.metric}: {ps.target_value} by {ps.timeline}")

    # Build lookup dicts by contractor name
    gaps_by_name = {g.contractor_name: g for g in gap_reports}
    cred_by_name = {c.contractor_name: c for c in credibility_reports}

    for sow in sows:
        name = sow.contractor_name
        sections.append(f"\n=== CONTRACTOR: {name} ===")

        sections.append("-- SOW Summary --")
        sections.append(f"Methodology: {sow.proposed_methodology[:500]}")
        sections.append(f"Seed Mix: {sow.seed_mix[:300]}")
        sections.append(f"Monitoring: {sow.monitoring_protocol[:300]}")
        sections.append(f"Adaptive Mgmt: {sow.adaptive_management_approach[:300]}")
        sections.append(f"Timeline: {sow.timeline}")
        staffing = ", ".join(f"{s.name} ({s.role})" for s in sow.staffing_plan)
        sections.append(f"Staff: {staffing}")
        sections.append(f"Past Performance: {sow.past_performance_claims}")

        gap = gaps_by_name.get(name)
        if gap:
            sections.append("-- Gap Analysis --")
            for g in gap.gaps:
                sections.append(f"  [{g.status.value}] [{g.severity.value}] {g.requirement_description}: {g.details}")

        cred = cred_by_name.get(name)
        if cred:
            sections.append("-- CrustData Credibility --")
            sections.append(f"  Score: {cred.credibility_score}")
            sections.append(f"  Verified headcount: {cred.verified_headcount} (claimed: {cred.claimed_headcount})")
            sections.append(f"  Red flags: {cred.red_flags}")
            sections.append(f"  Green flags: {cred.green_flags}")

    return "\n".join(sections)


def _score_to_rating(score: float) -> AdjectivalRating:
    if score >= 90:
        return AdjectivalRating.OUTSTANDING
    if score >= 75:
        return AdjectivalRating.GOOD
    if score >= 60:
        return AdjectivalRating.ACCEPTABLE
    if score >= 40:
        return AdjectivalRating.MARGINAL
    return AdjectivalRating.UNACCEPTABLE


def _parse_response(data: dict | list) -> list[SuitabilityRating]:
    """Convert LLM JSON into a list of SuitabilityRating objects."""
    items = data if isinstance(data, list) else data.get("contractors", data.get("ratings", []))

    ratings = []
    for entry in items:
        factor_scores = []
        for fs in entry.get("factor_scores", []):
            score = float(fs.get("score", 0))
            factor_scores.append(
                FactorScore(
                    factor=fs.get("factor", ""),
                    score=score,
                    rating=_score_to_rating(score).value,
                    evidence=fs.get("evidence", []),
                )
            )

        overall = float(entry.get("overall_score", 0))

        risks = []
        for r in entry.get("risks", []):
            risks.append(
                Risk(
                    category=r.get("category", ""),
                    description=r.get("description", ""),
                    severity=Severity(r.get("severity", "MEDIUM")),
                    mitigation=r.get("mitigation"),
                )
            )

        ratings.append(
            SuitabilityRating(
                contractor_name=entry.get("contractor_name", ""),
                overall_score=overall,
                overall_rating=_score_to_rating(overall),
                factor_scores=factor_scores,
                gaps=entry.get("gaps", []),
                risks=risks,
                strengths=entry.get("strengths", []),
                weaknesses=entry.get("weaknesses", []),
                recommendation_notes=entry.get("recommendation_notes", ""),
            )
        )

    return ratings
