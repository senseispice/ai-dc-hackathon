"""FastAPI application entry point."""

from __future__ import annotations

import tempfile
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.models.schemas import EvaluationReport, ProjectType, PWS, RFPDocument
from app.tools.document_parser import parse_document

app = FastAPI(
    title="Land Restoration Acquisition Platform",
    description="AI-powered PWS generation and SOW evaluation for land restoration contracts",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


async def _read_upload(file: UploadFile) -> str:
    """Save an UploadFile to a temp file and extract its text."""
    suffix = Path(file.filename).suffix if file.filename else ".txt"
    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name
    return parse_document(tmp_path)


@app.get("/api/health")
async def health():
    """Health check."""
    return {"status": "ok"}


@app.post("/api/generate-pws", response_model=PWS)
async def generate_pws_endpoint(
    rfp: UploadFile = File(...),
    project_type: str = Form(...),
):
    """Run Phase 1 only — generate a PWS from an uploaded RFP."""
    from app.agents.pws_generator import generate_pws

    try:
        rfp_text = await _read_upload(rfp)
        rfp_doc = RFPDocument(
            title=Path(rfp.filename).stem if rfp.filename else "RFP",
            project_type=ProjectType(project_type),
            raw_text=rfp_text,
        )
        return await generate_pws(rfp_doc)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))


@app.post("/api/evaluate", response_model=EvaluationReport)
async def evaluate(
    rfp: UploadFile = File(...),
    sows: list[UploadFile] = File(...),
    project_type: str = Form(...),
):
    """Run the full 3-phase pipeline and return an EvaluationReport."""
    from app.agents.supervisor import run_pipeline

    try:
        rfp_text = await _read_upload(rfp)
        sow_texts = {
            Path(sow.filename).stem if sow.filename else f"contractor_{i}": (
                await _read_upload(sow)
            )
            for i, sow in enumerate(sows)
        }
        state = await run_pipeline(rfp_text, project_type, sow_texts)
        return state.report
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
