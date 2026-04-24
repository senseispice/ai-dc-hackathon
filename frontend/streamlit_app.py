"""Streamlit UI for the Land Restoration Acquisition Platform."""

from __future__ import annotations

import streamlit as st

st.set_page_config(
    page_title="Land Restoration Acquisition Platform",
    page_icon="🌿",
    layout="wide",
)

# ── Sidebar ──────────────────────────────────────────────────────────────────

st.sidebar.title("Configuration")
project_type = st.sidebar.selectbox(
    "Project Type",
    [
        "MINE_RECLAMATION",
        "WETLAND_RESTORATION",
        "WILDFIRE_REHAB",
        "SUPERFUND_REMEDIATION",
        "RIPARIAN_RESTORATION",
        "INVASIVE_SPECIES",
        "RANGELAND_RESTORATION",
        "REFORESTATION",
    ],
)

# ── Page 1: Upload & Configure ───────────────────────────────────────────────

st.title("Land Restoration Acquisition Platform")
st.caption("AI-Powered PWS Generation & SOW Evaluation")

rfp_file = st.file_uploader("Upload RFP Document", type=["pdf", "docx", "txt"])

st.subheader("Upload Contractor SOWs")
sow_files = st.file_uploader(
    "Upload one or more SOW documents",
    type=["pdf", "docx", "txt"],
    accept_multiple_files=True,
)

if st.button("Run Evaluation", type="primary"):
    if not rfp_file:
        st.error("Please upload an RFP document.")
    elif not sow_files:
        st.error("Please upload at least one contractor SOW.")
    else:
        # TODO: call backend /api/evaluate
        # TODO: show progress bar as agents complete
        # TODO: display generated PWS (Page 2)
        # TODO: display evaluation results (Page 3)
        st.info("Pipeline execution not yet implemented — wire up to /api/evaluate")

# ── Page 2: Generated PWS (placeholder) ─────────────────────────────────────

st.divider()
st.header("Generated PWS")
st.caption("Will appear here after Phase 1 completes")
# TODO: expandable sections for each PWS component
# TODO: performance standards table
# TODO: download button

# ── Page 3: Evaluation Results (placeholder) ─────────────────────────────────

st.divider()
st.header("Evaluation Results")

# TODO: suitability ranking table (color-coded)
# TODO: comparative matrix
# TODO: per-contractor expandable details (gaps, credibility, risks)
# TODO: key discriminators
# TODO: critical findings
# TODO: best-value analysis
# TODO: final recommendation with confidence
# TODO: download button for full report
st.caption("Will appear here after full pipeline completes")
st.caption("Powered by CrustData Intelligence")
