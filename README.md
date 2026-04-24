# Land Restoration Agentic Acquisition Platform

AI-powered multi-agent system that helps federal land management agencies evaluate contractor proposals for ecological restoration projects.

## What It Does

1. **Ingests a government RFP** for a land restoration project
2. **Generates a refined PWS** (Performance Work Statement) with restoration-specific ecological standards
3. **Parses contractor SOWs** (Statements of Work) into structured data
4. **Evaluates and compares** each SOW against PWS requirements, flagging gaps
5. **Verifies contractor claims** via CrustData (headcount, key personnel, news, financials)
6. **Produces a Suitability Rating** per contractor with a defensible recommendation

## Tech Stack

| Layer | Tool |
|---|---|
| Backend | Python 3.11+, FastAPI |
| Agents | LangGraph |
| LLM | Claude Sonnet (Anthropic) or GPT-4o (OpenAI) |
| Vector DB | ChromaDB (local) |
| External API | CrustData (company search, people search, enrichment, web search) |
| Doc Parsing | PyPDF2, python-docx |
| Frontend | Streamlit |
| Storage | SQLite (local) |

## Quick Start

```bash
# 1. Clone and enter the repo
cd restoration-eval

# 2. Create virtualenv and install deps
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# 3. Copy env file and add your API keys
cp .env.example .env

# 4. Run the demo (uses sample data + CrustData mock mode)
make demo

# 5. Or start the Streamlit UI
make streamlit

# 6. Or start the FastAPI backend
make run
```

## Project Structure

```
├── app/
│   ├── main.py                  # FastAPI entry point
│   ├── config.py                # Env-based settings
│   ├── agents/
│   │   ├── supervisor.py        # LangGraph orchestrator
│   │   ├── pws_generator.py     # Phase 1: PWS creation
│   │   ├── sow_parser.py        # Phase 2: SOW ingestion
│   │   ├── gap_analyzer.py      # Phase 2: Gap analysis
│   │   ├── contractor_intel.py  # Phase 2/3: CrustData verification
│   │   ├── scorer.py            # Phase 3: Comparative scoring
│   │   └── insight_generator.py # Phase 3: Final recommendation
│   ├── tools/
│   │   ├── crustdata_client.py  # CrustData API wrapper (with mock mode)
│   │   ├── document_parser.py   # PDF/DOCX parsing
│   │   └── vector_store.py      # ChromaDB operations
│   ├── knowledge/
│   │   ├── restoration_standards.json  # Ecological benchmarks by project type
│   │   └── far_clauses.json            # FAR/DFARS references
│   └── models/
│       ├── schemas.py           # All Pydantic data models
│       └── prompts.py           # Agent system prompts
├── frontend/
│   └── streamlit_app.py         # Streamlit UI
├── data/                        # Sample RFP + 3 contractor SOWs
├── test_pipeline.py             # Smoke test
├── demo.py                      # Hackathon demo script
├── requirements.txt
└── .env.example
```

## Team Workstream Split

| Engineer | Focus | Key Files |
|---|---|---|
| **Engineer 1** | Agent pipeline + LangGraph wiring | `agents/supervisor.py`, `agents/pws_generator.py`, `agents/sow_parser.py` |
| **Engineer 2** | Evaluation + CrustData integration | `agents/gap_analyzer.py`, `agents/contractor_intel.py`, `agents/scorer.py`, `tools/crustdata_client.py` |
| **Engineer 3** | Frontend + API + insight generation | `frontend/streamlit_app.py`, `app/main.py`, `agents/insight_generator.py` |

## CrustData Mock Mode

Set `CRUSTDATA_MOCK=true` in `.env` to use pre-populated fake data for the 3 sample contractors. The mock data is designed so that:
- **Great Basin Restoration LLC** — checks out clean (staff verified, good news, accurate headcount)
- **Western Environmental Services Inc.** — neutral (most things check out, nothing remarkable)
- **EcoRestore National Corp** — red flags (PM John Martinez left the company, claimed 500 employees but CrustData shows 85, recent fine for incomplete remediation)
