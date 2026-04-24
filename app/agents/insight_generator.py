"""Phase 3 agent — produces the final evaluation report and recommendation."""

from __future__ import annotations

from app.models.schemas import EvaluationReport, PWS, SuitabilityRating


async def generate_insights(
    pws: PWS,
    ratings: list[SuitabilityRating],
) -> EvaluationReport:
    """Generate the final EvaluationReport for the Source Selection Authority.

    Sections: Executive Summary, Rankings, Key Discriminators,
    Critical Findings, Best-Value Analysis, Risk Summary, Recommendation.

    1. Serialize PWS summary + all SuitabilityRatings into LLM context.
    2. Call LLM with INSIGHT_GENERATOR_PROMPT.
    3. Parse response into EvaluationReport.
    """
    # TODO: call LLM with system prompt + ratings data
    # TODO: parse JSON response into EvaluationReport
    raise NotImplementedError
