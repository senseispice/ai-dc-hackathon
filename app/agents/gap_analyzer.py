"""Phase 2 agent — compares a contractor SOW against the PWS requirements."""

from __future__ import annotations

import logging

from app.models.prompts import GAP_ANALYZER_PROMPT
from app.models.schemas import ContractorSOW, GapItem, GapReport, GapStatus, PWS, Severity
from app.tools.llm import call_llm, parse_llm_json

logger = logging.getLogger(__name__)


async def analyze_gaps(pws: PWS, sow: ContractorSOW) -> GapReport:
    """Produce a gap report for one contractor.

    Serializes the PWS performance standards / scope and the contractor's SOW
    into an LLM prompt, then parses the structured gap list.
    """
    user_message = _build_context(pws, sow)
    raw = call_llm(GAP_ANALYZER_PROMPT, user_message, expect_json=True)
    data = parse_llm_json(raw)
    return _parse_response(sow.contractor_name, data)


def _build_context(pws: PWS, sow: ContractorSOW) -> str:
    sections = []

    sections.append("=== PWS REQUIREMENTS ===")
    sections.append(f"Scope of Work:\n{pws.scope_of_work}")
    sections.append("Performance Standards:")
    for ps in pws.ecological_performance_standards:
        sections.append(
            f"  - {ps.metric}: {ps.target_value} by {ps.timeline} "
            f"(measured via {ps.measurement_method})"
        )
    sections.append(f"Monitoring Requirements:\n{pws.monitoring_requirements}")
    sections.append(f"Adaptive Management:\n{pws.adaptive_management_plan}")
    sections.append(f"Contractor Qualifications:\n{pws.contractor_qualifications}")

    sections.append("\n=== CONTRACTOR SOW ===")
    sections.append(f"Contractor: {sow.contractor_name}")
    sections.append(f"Methodology:\n{sow.proposed_methodology}")
    sections.append(f"Seed Mix: {sow.seed_mix}")
    sections.append(f"Species List: {', '.join(sow.species_list)}")
    sections.append(f"Monitoring Protocol:\n{sow.monitoring_protocol}")
    sections.append(f"Adaptive Management:\n{sow.adaptive_management_approach}")
    sections.append(f"Timeline: {sow.timeline}")
    sections.append(f"Erosion Control: {sow.erosion_control_methods}")
    sections.append(f"Soil Amendment Plan: {sow.soil_amendment_plan}")
    staffing = "\n".join(
        f"  - {s.name}, {s.role}, certs: {s.certifications}" for s in sow.staffing_plan
    )
    sections.append(f"Staffing:\n{staffing}")

    return "\n\n".join(sections)


def _parse_response(contractor_name: str, data: dict | list) -> GapReport:
    """Convert LLM JSON output into a GapReport."""
    if isinstance(data, dict):
        gaps_raw = data.get("gaps", [])
        summary = data.get("summary", "")
    else:
        gaps_raw = data
        summary = ""

    gap_items = []
    for g in gaps_raw:
        gap_items.append(
            GapItem(
                requirement_id=g.get("requirement_id", ""),
                requirement_description=g.get("requirement_description", ""),
                status=GapStatus(g.get("status", "NOT_ADDRESSED")),
                severity=Severity(g.get("severity", "MEDIUM")),
                details=g.get("details", ""),
            )
        )

    return GapReport(
        contractor_name=contractor_name,
        gaps=gap_items,
        summary=summary,
    )
