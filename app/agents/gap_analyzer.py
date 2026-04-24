"""Phase 2 agent — compares a contractor SOW against the PWS requirements."""

from __future__ import annotations

from app.models.schemas import ContractorSOW, GapReport, PWS


async def analyze_gaps(pws: PWS, sow: ContractorSOW) -> GapReport:
    """Produce a gap report for one contractor.

    1. Serialize PWS requirements and SOW into LLM context.
    2. Call LLM with GAP_ANALYZER_PROMPT.
    3. Parse response into GapReport with per-requirement status and severity.
    """
    # TODO: call LLM with system prompt + PWS + SOW
    # TODO: parse JSON response into GapReport
    raise NotImplementedError
