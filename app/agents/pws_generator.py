"""Phase 1 agent — generates a PWS from an RFP and restoration knowledge base."""

from __future__ import annotations

from app.models.schemas import PWS, RFPDocument


async def generate_pws(rfp: RFPDocument) -> PWS:
    """Generate a comprehensive Performance Work Statement.

    1. Load restoration standards for the project type from knowledge base.
    2. Call LLM with PWS_GENERATOR_PROMPT + RFP text + standards.
    3. Parse response into PWS model.
    """
    # TODO: load knowledge base for rfp.project_type
    # TODO: call LLM with system prompt + context
    # TODO: parse JSON response into PWS
    raise NotImplementedError
