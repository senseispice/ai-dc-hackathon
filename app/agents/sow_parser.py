"""Phase 2 agent — parses a contractor's SOW into structured data."""

from __future__ import annotations

from app.models.schemas import ContractorSOW


async def parse_sow(contractor_name: str, sow_text: str) -> ContractorSOW:
    """Extract structured fields from a contractor's SOW document.

    1. Call LLM with SOW_PARSER_PROMPT + raw SOW text.
    2. Parse response into ContractorSOW model.
    3. Note any missing/vague sections as gaps.
    """
    # TODO: call LLM with system prompt + sow_text
    # TODO: parse JSON response into ContractorSOW
    raise NotImplementedError
