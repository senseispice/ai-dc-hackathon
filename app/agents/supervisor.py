"""Supervisor / orchestrator agent — defines the LangGraph pipeline."""

from __future__ import annotations

import asyncio
import operator
from typing import Annotated, Optional, TypedDict

from app.models.schemas import (
    ContractorCredibility,
    ContractorSOW,
    EvaluationReport,
    GapReport,
    PipelineState,
    ProjectType,
    PWS,
    RFPDocument,
    SuitabilityRating,
)


class GraphState(TypedDict):
    """LangGraph-compatible state with reducer annotations for list fields.

    Mirrors PipelineState but uses Annotated[list, operator.add] so that
    parallel fan-out nodes can append results without overwriting each other.
    """

    rfp: Optional[RFPDocument]
    pws: Optional[PWS]
    sows: Annotated[list[ContractorSOW], operator.add]
    gap_reports: Annotated[list[GapReport], operator.add]
    credibility_reports: Annotated[list[ContractorCredibility], operator.add]
    suitability_ratings: Annotated[list[SuitabilityRating], operator.add]
    report: Optional[EvaluationReport]


def build_graph():
    """Construct and compile the LangGraph StateGraph.

    Flow:
        START -> pws_generator
              -> sow_parser (for each SOW, gathered in parallel)
              -> [gap_analyzer, contractor_intel] (Send API fan-out per contractor)
              -> scorer
              -> insight_generator
              -> END
    """
    # TODO: define StateGraph with nodes for each agent
    # TODO: fan-out gap_analyzer + contractor_intel per contractor via Send API
    # TODO: compile and return the graph
    raise NotImplementedError


async def run_pipeline(
    rfp_text: str,
    project_type: str,
    sow_texts: dict[str, str],
) -> PipelineState:
    """Execute the full evaluation pipeline.

    Args:
        rfp_text: Raw text of the RFP document.
        project_type: One of the ProjectType enum values.
        sow_texts: Mapping of contractor name -> raw SOW text.

    Returns:
        Completed PipelineState with all intermediate and final results.
    """
    from app.agents.gap_analyzer import analyze_gaps
    from app.agents.contractor_intel import verify_contractor
    from app.agents.insight_generator import generate_insights
    from app.agents.pws_generator import generate_pws
    from app.agents.scorer import score_contractors
    from app.agents.sow_parser import parse_sow

    # 1. Build RFPDocument from raw inputs
    rfp = RFPDocument(
        title="RFP",
        project_type=ProjectType(project_type),
        raw_text=rfp_text,
    )

    # 2. Generate PWS
    pws = await generate_pws(rfp)

    # 3. Parse all SOWs (parallel)
    sows: list[ContractorSOW] = list(
        await asyncio.gather(*[parse_sow(name, text) for name, text in sow_texts.items()])
    )

    # 4. Gap analysis + contractor intel per contractor (parallel fan-out)
    paired = await asyncio.gather(*[
        asyncio.gather(analyze_gaps(pws, sow), verify_contractor(sow))
        for sow in sows
    ])
    gap_reports: list[GapReport] = [pair[0] for pair in paired]
    credibility_reports: list[ContractorCredibility] = [pair[1] for pair in paired]

    # 5. Score all contractors
    ratings: list[SuitabilityRating] = await score_contractors(
        pws, sows, gap_reports, credibility_reports
    )

    # Attach credibility objects to ratings for downstream use
    cred_by_name = {c.contractor_name: c for c in credibility_reports}
    for rating in ratings:
        rating.credibility = cred_by_name.get(rating.contractor_name)

    # 6. Generate final insights report
    report = await generate_insights(pws, ratings, rfp_title=rfp.title)

    return PipelineState(
        rfp=rfp,
        pws=pws,
        sows=sows,
        gap_reports=gap_reports,
        credibility_reports=credibility_reports,
        suitability_ratings=ratings,
        report=report,
    )
