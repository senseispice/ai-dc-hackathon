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


def _find_gaps_list(data: dict | list) -> list[dict]:
    """Recursively find the list of gap items in the LLM response.

    Different LLMs return different shapes — Gemini likes nested keys like
    ``gap_report.requirements_analysis``, others use ``gaps``.
    """
    if isinstance(data, list):
        return data

    # Try common keys
    for key in (
        "gaps", "gap_analysis", "requirements_analysis",
        "gap_items", "findings",
    ):
        if key in data and isinstance(data[key], list):
            return data[key]

    # Recurse one level into nested dicts (e.g. {gap_report: {requirements_analysis: [...]}})
    for v in data.values():
        if isinstance(v, dict):
            found = _find_gaps_list(v)
            if found:
                return found
        if isinstance(v, list) and v and isinstance(v[0], dict):
            return v

    return []


def _extract_summary(data: dict | list) -> str:
    if isinstance(data, list):
        return ""
    for key in ("summary", "overall_assessment"):
        if key in data and isinstance(data[key], str):
            return data[key]
    for v in data.values():
        if isinstance(v, dict):
            s = _extract_summary(v)
            if s:
                return s
    return ""


def _parse_response(contractor_name: str, data: dict | list) -> GapReport:
    """Convert LLM JSON output into a GapReport."""
    gaps_raw = _find_gaps_list(data)
    summary = _extract_summary(data)

    gap_items = []
    for g in gaps_raw:
        # Normalize field names across LLM output variations
        req_desc = (
            g.get("requirement_description")
            or g.get("pws_requirement")
            or g.get("requirement")
            or ""
        )
        details = (
            g.get("details")
            or g.get("analysis")
            or g.get("sow_provision")
            or ""
        )
        status_raw = g.get("status", "NOT_ADDRESSED")
        severity_raw = g.get("severity", "MEDIUM")

        gap_items.append(
            GapItem(
                requirement_id=g.get("requirement_id", ""),
                requirement_description=req_desc,
                status=GapStatus(status_raw),
                severity=Severity(severity_raw),
                details=details,
            )
        )

    return GapReport(
        contractor_name=contractor_name,
        gaps=gap_items,
        summary=summary,
    )
