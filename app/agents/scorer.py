"""Phase 3 agent — comparative scoring of all contractors."""

from __future__ import annotations

from app.models.schemas import (
    ContractorCredibility,
    ContractorSOW,
    GapReport,
    PWS,
    SuitabilityRating,
)


async def score_contractors(
    pws: PWS,
    sows: list[ContractorSOW],
    gap_reports: list[GapReport],
    credibility_reports: list[ContractorCredibility],
) -> list[SuitabilityRating]:
    """Score every contractor across restoration-specific evaluation factors.

    Factors: Ecological Methodology, Species & Materials Plan,
    Monitoring & Adaptive Management, Staffing & Expertise,
    Past Performance, Timeline Realism, CrustData Credibility.

    1. Assemble all evidence per contractor.
    2. Call LLM with SCORER_PROMPT + assembled evidence.
    3. Parse into list[SuitabilityRating].
    """
    # TODO: build per-contractor evidence bundles
    # TODO: call LLM with system prompt + evidence
    # TODO: parse JSON response into list[SuitabilityRating]
    raise NotImplementedError
