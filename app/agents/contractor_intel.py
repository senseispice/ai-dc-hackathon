"""Phase 2/3 agent — verifies contractor claims via CrustData."""

from __future__ import annotations

from app.models.schemas import ContractorCredibility, ContractorSOW


async def verify_contractor(sow: ContractorSOW) -> ContractorCredibility:
    """Run CrustData verification and produce a credibility report.

    1. Call CrustDataClient.verify_contractor() with contractor name, staff, headcount.
    2. Feed raw CrustData results + SOW claims to LLM with CONTRACTOR_INTEL_PROMPT.
    3. Return ContractorCredibility with score, red/green flags.
    """
    # TODO: instantiate CrustDataClient
    # TODO: call verify_contractor()
    # TODO: optionally enhance with LLM analysis of raw results
    raise NotImplementedError
