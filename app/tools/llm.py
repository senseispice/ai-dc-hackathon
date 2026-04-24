"""Shared LLM call utility — works with Anthropic or OpenAI based on config."""

from __future__ import annotations

import json
import logging

from app.config import settings

logger = logging.getLogger(__name__)


def _get_client():
    """Return the appropriate LLM client based on config."""
    if settings.llm_provider == "anthropic":
        from anthropic import Anthropic
        return Anthropic(api_key=settings.anthropic_api_key)
    elif settings.llm_provider == "gemini":
        from google import genai
        return genai.Client(api_key=settings.gemini_api_key)
    else:
        from openai import OpenAI
        return OpenAI(api_key=settings.openai_api_key)


def call_llm(system_prompt: str, user_message: str, expect_json: bool = True) -> str:
    """Call the configured LLM and return the response text.

    Args:
        system_prompt: The system/instruction prompt.
        user_message: The user-facing message with context.
        expect_json: If True and first attempt isn't valid JSON,
                     retries once with a nudge.

    Returns:
        Raw response text from the LLM.
    """
    client = _get_client()
    raw = _raw_call(client, system_prompt, user_message)

    if expect_json:
        try:
            json.loads(raw)
        except json.JSONDecodeError:
            logger.warning("LLM response was not valid JSON, retrying with nudge")
            raw = _raw_call(
                client,
                system_prompt,
                user_message + "\n\nIMPORTANT: Respond ONLY with valid JSON, no markdown fences.",
            )
    return raw


def parse_llm_json(raw: str) -> dict | list:
    """Extract JSON from an LLM response, stripping markdown fences if present."""
    text = raw.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1] if "\n" in text else text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
    return json.loads(text)


def _raw_call(client, system_prompt: str, user_message: str) -> str:
    if settings.llm_provider == "anthropic":
        resp = client.messages.create(
            model=settings.llm_model,
            max_tokens=4096,
            system=system_prompt,
            messages=[{"role": "user", "content": user_message}],
        )
        return resp.content[0].text
    elif settings.llm_provider == "gemini":
        combined = f"{system_prompt}\n\n{user_message}"
        resp = client.models.generate_content(
            model=settings.llm_model,
            contents=combined,
        )
        return resp.text
    else:
        resp = client.chat.completions.create(
            model=settings.llm_model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
        )
        return resp.choices[0].message.content
