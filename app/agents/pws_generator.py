"""Phase 1 agent — generates a PWS from an RFP and restoration knowledge base."""

from __future__ import annotations

import logging

from app.models.prompts import PWS_GENERATOR_PROMPT
from app.models.schemas import (
    PWS,
    Deliverable,
    PerformanceStandard,
    PWSTask,
    RFPDocument,
    TaskPhase,
)
from app.tools.llm import call_llm, parse_llm_json

logger = logging.getLogger(__name__)


async def generate_pws(rfp: RFPDocument) -> PWS:
    """Generate a comprehensive Performance Work Statement."""
    # TODO: augment with ChromaDB knowledge base retrieval for rfp.project_type
    user_message = _build_context(rfp)
    raw = call_llm(PWS_GENERATOR_PROMPT, user_message, expect_json=True)
    data = parse_llm_json(raw)
    return _parse_response(data)


def _build_context(rfp: RFPDocument) -> str:
    sections = [
        "=== RFP DOCUMENT ===",
        f"Title: {rfp.title}",
        f"Agency: {rfp.agency}",
        f"Project Type: {rfp.project_type.value}",
    ]
    if rfp.raw_text:
        sections.append(f"Full Text:\n{rfp.raw_text}")
    if rfp.requirements:
        sections.append("Requirements:")
        for req in rfp.requirements:
            mandatory = "MANDATORY" if req.mandatory else "OPTIONAL"
            sections.append(
                f"  [{req.id}] [{req.category.value}] [{mandatory}] {req.description}"
            )
    if rfp.evaluation_criteria:
        sections.append("Evaluation Criteria:")
        for ec in rfp.evaluation_criteria:
            sections.append(f"  - {ec.factor} (weight: {ec.weight}): {ec.description}")
    return "\n\n".join(sections)


def _parse_response(data: dict) -> PWS:
    tasks = []
    for t in data.get("tasks", []):
        try:
            phase = TaskPhase(t.get("phase", "IMPLEMENTATION"))
        except ValueError:
            phase = TaskPhase.IMPLEMENTATION
        tasks.append(
            PWSTask(
                id=t.get("id", ""),
                phase=phase,
                description=t.get("description", ""),
                deliverables=t.get("deliverables", []),
                duration=t.get("duration", ""),
            )
        )

    standards = []
    for ps in data.get("ecological_performance_standards", []):
        standards.append(
            PerformanceStandard(
                metric=ps.get("metric", ""),
                target_value=ps.get("target_value", ""),
                measurement_method=ps.get("measurement_method", ""),
                timeline=ps.get("timeline", ""),
            )
        )

    deliverables = []
    for d in data.get("deliverables", []):
        deliverables.append(
            Deliverable(
                name=d.get("name", ""),
                description=d.get("description", ""),
                due=d.get("due", ""),
                format=d.get("format", ""),
            )
        )

    return PWS(
        project_background=data.get("project_background", ""),
        scope_of_work=data.get("scope_of_work", ""),
        tasks=tasks,
        ecological_performance_standards=standards,
        monitoring_requirements=data.get("monitoring_requirements", ""),
        adaptive_management_plan=data.get("adaptive_management_plan", ""),
        native_plant_specifications=data.get("native_plant_specifications", ""),
        deliverables=deliverables,
        contractor_qualifications=data.get("contractor_qualifications", ""),
        qasp=data.get("qasp", ""),
        full_document=data.get("full_document", ""),
    )
