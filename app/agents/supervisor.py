"""Supervisor / orchestrator agent — defines the LangGraph pipeline."""

from __future__ import annotations

from app.models.schemas import PipelineState


def build_graph():
    """Construct and compile the LangGraph StateGraph.

    Flow:
        START -> pws_generator
              -> sow_parser (for each SOW)
              -> [gap_analyzer, contractor_intel] (parallel)
              -> scorer
              -> insight_generator
              -> END
    """
    # TODO: define StateGraph with nodes for each agent
    # TODO: add conditional edges for parallel gap + intel analysis
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
    # TODO: build graph, create initial state, invoke, return final state
    raise NotImplementedError
