"""Smoke test — runs the full evaluation pipeline against sample data."""

from __future__ import annotations

import asyncio
from pathlib import Path

from app.agents.supervisor import run_pipeline
from app.tools.document_parser import parse_document

DATA_DIR = Path(__file__).parent / "data"


async def main():
    rfp_text = parse_document(str(DATA_DIR / "sample_rfp.txt"))

    sow_texts = {
        "Great Basin Restoration LLC": parse_document(str(DATA_DIR / "sample_sow_a.txt")),
        "Western Environmental Services Inc.": parse_document(str(DATA_DIR / "sample_sow_b.txt")),
        "EcoRestore National Corp": parse_document(str(DATA_DIR / "sample_sow_c.txt")),
    }

    state = await run_pipeline(
        rfp_text=rfp_text,
        project_type="MINE_RECLAMATION",
        sow_texts=sow_texts,
    )

    report = state.report
    assert report is not None, "Pipeline should produce an EvaluationReport"

    # Contractor A should rank highest, C should rank lowest
    ranked = sorted(report.contractors, key=lambda r: r.overall_score, reverse=True)
    names_by_score = [r.contractor_name for r in ranked]
    assert "Great Basin Restoration LLC" == names_by_score[0], f"Expected A first, got {names_by_score}"
    assert "EcoRestore National Corp" == names_by_score[-1], f"Expected C last, got {names_by_score}"

    # Contractor C should have at least one red flag about personnel
    eco_c = next(r for r in report.contractors if r.contractor_name == "EcoRestore National Corp")
    assert eco_c.credibility is not None
    assert any("martinez" in f.lower() or "personnel" in f.lower() for f in eco_c.credibility.red_flags), \
        "Expected a red flag about John Martinez leaving EcoRestore"

    print("All assertions passed.")
    print(f"\nRecommendation: {report.recommendation}")


if __name__ == "__main__":
    asyncio.run(main())
