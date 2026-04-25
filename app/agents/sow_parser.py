"""Phase 2 agent — parses a contractor's SOW into structured data."""

from __future__ import annotations

import logging

from app.models.prompts import SOW_PARSER_PROMPT
from app.models.schemas import ContractorSOW, StaffMember
from app.tools.llm import call_llm, parse_llm_json

logger = logging.getLogger(__name__)


async def parse_sow(contractor_name: str, sow_text: str) -> ContractorSOW:
    """Extract structured fields from a contractor's SOW document."""
    user_message = f"=== CONTRACTOR: {contractor_name} ===\n\n{sow_text}"
    raw = call_llm(SOW_PARSER_PROMPT, user_message, expect_json=True)
    data = parse_llm_json(raw)
    return _parse_response(contractor_name, sow_text, data)


def _parse_response(contractor_name: str, raw_text: str, data: dict) -> ContractorSOW:
    staffing = []
    for s in data.get("staffing_plan", []):
        staffing.append(
            StaffMember(
                name=s.get("name", ""),
                role=s.get("role", ""),
                qualifications=s.get("qualifications", ""),
                certifications=s.get("certifications", []),
                years_experience=s.get("years_experience"),
            )
        )

    return ContractorSOW(
        contractor_name=contractor_name,
        raw_text=raw_text,
        proposed_methodology=data.get("proposed_methodology", ""),
        species_list=data.get("species_list", []),
        seed_mix=data.get("seed_mix", ""),
        planting_densities=data.get("planting_densities", ""),
        soil_amendment_plan=data.get("soil_amendment_plan", ""),
        erosion_control_methods=data.get("erosion_control_methods", ""),
        monitoring_protocol=data.get("monitoring_protocol", ""),
        adaptive_management_approach=data.get("adaptive_management_approach", ""),
        staffing_plan=staffing,
        timeline=data.get("timeline", ""),
        subcontractors=data.get("subcontractors", []),
        past_performance_claims=data.get("past_performance_claims", []),
    )
