"""FastAPI application entry point."""

from __future__ import annotations

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.models.schemas import EvaluationReport, PWS

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


@app.get("/api/health")
async def health():
    """Health check."""
    return {"status": "ok"}


@app.post("/api/generate-pws", response_model=PWS)
async def generate_pws(
    rfp: UploadFile = File(...),
    project_type: str = Form(...),
):
    """Run Phase 1 only — generate a PWS from an uploaded RFP."""
    # TODO: save uploaded file, parse, run pws_generator agent, return PWS
    raise NotImplementedError


@app.post("/api/evaluate", response_model=EvaluationReport)
async def evaluate(
    rfp: UploadFile = File(...),
    sows: list[UploadFile] = File(...),
    project_type: str = Form(...),
):
    """Run the full 3-phase pipeline and return an EvaluationReport."""
    # TODO: save files, parse, run supervisor pipeline, return report
    raise NotImplementedError


@app.get("/api/status/{job_id}")
async def job_status(job_id: str):
    """Check status of a long-running evaluation job."""
    # TODO: implement background job tracking
    raise NotImplementedError
