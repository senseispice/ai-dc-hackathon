"""Phase 3 agent — produces the final evaluation report and recommendation."""

from __future__ import annotations

import logging

from app.models.prompts import INSIGHT_GENERATOR_PROMPT
from app.models.schemas import EvaluationReport, PWS, SuitabilityRating
from app.tools.llm import call_llm, parse_llm_json

logger = logging.getLogger(__name__)


async def generate_insights(
    pws: PWS,
    ratings: list[SuitabilityRating],
    rfp_title: str,
) -> EvaluationReport:
    """Generate the final EvaluationReport for the Source Selection Authority."""
    user_message = _build_context(pws, ratings)
    raw = call_llm(INSIGHT_GENERATOR_PROMPT, user_message, expect_json=True)
    data = parse_llm_json(raw)
    return _parse_response(pws, ratings, rfp_title, data)


def _build_context(pws: PWS, ratings: list[SuitabilityRating]) -> str:
    sections = ["=== PWS SUMMARY ===", pws.scope_of_work]

    if pws.ecological_performance_standards:
        sections.append("Performance Standards:")
        for ps in pws.ecological_performance_standards:
            sections.append(f"  - {ps.metric}: {ps.target_value} by {ps.timeline}")

    sections.append("\n=== CONTRACTOR EVALUATIONS ===")
    for r in ratings:
        sections.append(f"\n--- {r.contractor_name} ---")
        sections.append(f"Overall Score: {r.overall_score} ({r.overall_rating.value})")
        if r.factor_scores:
            sections.append("Factor Scores:")
            for fs in r.factor_scores:
                ev_lines = "".join(f"\n      {e}" for e in fs.evidence)
                sections.append(f"  - {fs.factor}: {fs.score} ({fs.rating}){ev_lines}")
        if r.strengths:
            sections.append(f"Strengths: {'; '.join(r.strengths)}")
        if r.weaknesses:
            sections.append(f"Weaknesses: {'; '.join(r.weaknesses)}")
        if r.gaps:
            sections.append(f"Gaps: {'; '.join(r.gaps)}")
        if r.risks:
            sections.append("Risks:")
            for risk in r.risks:
                sections.append(
                    f"  - [{risk.severity.value}] {risk.category}: {risk.description}"
                )
        if r.credibility:
            sections.append(f"Credibility Score: {r.credibility.credibility_score}")
            if r.credibility.red_flags:
                sections.append(f"Red Flags: {'; '.join(r.credibility.red_flags)}")
            if r.credibility.green_flags:
                sections.append(f"Green Flags: {'; '.join(r.credibility.green_flags)}")

    return "\n".join(sections)


def _parse_response(
    pws: PWS,
    ratings: list[SuitabilityRating],
    rfp_title: str,
    data: dict,
) -> EvaluationReport:
    confidence_raw = data.get("confidence_level", 0)
    if isinstance(confidence_raw, str):
        confidence_map = {"HIGH": 0.9, "MEDIUM": 0.6, "LOW": 0.3}
        confidence = confidence_map.get(confidence_raw.upper(), 0.5)
    else:
        confidence = float(confidence_raw)
        if confidence > 1.0:
            confidence /= 100.0

    return EvaluationReport(
        rfp_title=rfp_title or data.get("rfp_title", ""),
        pws_summary=data.get("pws_summary", pws.scope_of_work[:500]),
        contractors=ratings,  # preserve the already-scored objects; LLM provides narrative only
        comparative_matrix=data.get("comparative_matrix", {}),
        best_value_analysis=data.get("best_value_analysis", ""),
        key_discriminators=data.get("key_discriminators", []),
        critical_findings=data.get("critical_findings", []),
        recommendation=data.get("recommendation", ""),
        confidence_level=confidence,
    )
