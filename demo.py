"""Live demo script — pretty-prints pipeline results for a hackathon presentation."""

from __future__ import annotations

import asyncio
from pathlib import Path

from app.agents.supervisor import run_pipeline
from app.tools.document_parser import parse_document

DATA_DIR = Path(__file__).parent / "data"

# ANSI colors for terminal output
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
BOLD = "\033[1m"
RESET = "\033[0m"
CYAN = "\033[96m"


def header(text: str):
    print(f"\n{BOLD}{CYAN}{'=' * 60}")
    print(f"  {text}")
    print(f"{'=' * 60}{RESET}\n")


def rating_color(rating: str) -> str:
    if rating in ("OUTSTANDING", "GOOD"):
        return GREEN
    if rating == "ACCEPTABLE":
        return YELLOW
    return RED


async def main():
    header("LAND RESTORATION ACQUISITION PLATFORM — DEMO")

    print(f"{BOLD}Loading sample documents...{RESET}")
    rfp_text = parse_document(str(DATA_DIR / "sample_rfp.txt"))
    sow_texts = {
        "Great Basin Restoration LLC": parse_document(str(DATA_DIR / "sample_sow_a.txt")),
        "Western Environmental Services Inc.": parse_document(str(DATA_DIR / "sample_sow_b.txt")),
        "EcoRestore National Corp": parse_document(str(DATA_DIR / "sample_sow_c.txt")),
    }
    print(f"  RFP: {len(rfp_text):,} chars")
    for name, text in sow_texts.items():
        print(f"  SOW ({name}): {len(text):,} chars")

    header("RUNNING EVALUATION PIPELINE")
    # TODO: add progress indicators as each agent completes
    state = await run_pipeline(
        rfp_text=rfp_text,
        project_type="MINE_RECLAMATION",
        sow_texts=sow_texts,
    )

    report = state.report

    header("SUITABILITY RANKINGS")
    for r in sorted(report.contractors, key=lambda x: x.overall_score, reverse=True):
        c = rating_color(r.overall_rating.value)
        cred = r.credibility.credibility_score if r.credibility else "N/A"
        print(
            f"  {c}{r.contractor_name:<40} Score: {r.overall_score:5.1f}"
            f"  Rating: {r.overall_rating.value:<14} Credibility: {cred}{RESET}"
        )

    header("KEY DISCRIMINATORS")
    for d in report.key_discriminators:
        print(f"  - {d}")

    header("CRITICAL FINDINGS")
    for f in report.critical_findings:
        print(f"  {RED}!{RESET} {f}")

    header("RECOMMENDATION")
    print(f"  {BOLD}{report.recommendation}{RESET}")
    print(f"  Confidence: {report.confidence_level:.0%}")

    header("DEMO COMPLETE")


if __name__ == "__main__":
    asyncio.run(main())
