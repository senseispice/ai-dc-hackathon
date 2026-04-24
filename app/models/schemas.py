"""Pydantic models for every data structure in the pipeline."""

from __future__ import annotations

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


# ── Enums ────────────────────────────────────────────────────────────────────

class ProjectType(str, Enum):
    WETLAND_RESTORATION = "WETLAND_RESTORATION"
    MINE_RECLAMATION = "MINE_RECLAMATION"
    WILDFIRE_REHAB = "WILDFIRE_REHAB"
    SUPERFUND_REMEDIATION = "SUPERFUND_REMEDIATION"
    RIPARIAN_RESTORATION = "RIPARIAN_RESTORATION"
    INVASIVE_SPECIES = "INVASIVE_SPECIES"
    RANGELAND_RESTORATION = "RANGELAND_RESTORATION"
    REFORESTATION = "REFORESTATION"


class RequirementCategory(str, Enum):
    SCOPE = "SCOPE"
    TECHNICAL = "TECHNICAL"
    STAFFING = "STAFFING"
    MONITORING = "MONITORING"
    ADAPTIVE_MANAGEMENT = "ADAPTIVE_MANAGEMENT"
    DELIVERABLES = "DELIVERABLES"
    TIMELINE = "TIMELINE"
    QUALIFICATIONS = "QUALIFICATIONS"


class TaskPhase(str, Enum):
    SITE_PREP = "SITE_PREP"
    IMPLEMENTATION = "IMPLEMENTATION"
    ESTABLISHMENT = "ESTABLISHMENT"
    MONITORING = "MONITORING"
    ADAPTIVE_MANAGEMENT = "ADAPTIVE_MANAGEMENT"


class AdjectivalRating(str, Enum):
    OUTSTANDING = "OUTSTANDING"
    GOOD = "GOOD"
    ACCEPTABLE = "ACCEPTABLE"
    MARGINAL = "MARGINAL"
    UNACCEPTABLE = "UNACCEPTABLE"


class Severity(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class GapStatus(str, Enum):
    ADDRESSED = "ADDRESSED"
    PARTIALLY_ADDRESSED = "PARTIALLY_ADDRESSED"
    NOT_ADDRESSED = "NOT_ADDRESSED"
    CONTRADICTS = "CONTRADICTS"


# ── RFP Models ───────────────────────────────────────────────────────────────

class Requirement(BaseModel):
    id: str = Field(..., description="e.g. REQ-001")
    category: RequirementCategory
    description: str
    mandatory: bool = True
    source_section: str = ""


class EvaluationCriterion(BaseModel):
    factor: str
    weight: float = Field(..., ge=0, le=1)
    description: str = ""


class RFPDocument(BaseModel):
    title: str
    agency: str = ""
    project_type: ProjectType
    raw_text: str = ""
    requirements: list[Requirement] = []
    evaluation_criteria: list[EvaluationCriterion] = []


# ── PWS Models ───────────────────────────────────────────────────────────────

class PerformanceStandard(BaseModel):
    metric: str = Field(..., description="e.g. 'native species cover'")
    target_value: str = Field(..., description="e.g. '70% absolute cover'")
    measurement_method: str = ""
    timeline: str = Field(..., description="e.g. 'Year 3'")


class PWSTask(BaseModel):
    id: str
    phase: TaskPhase
    description: str
    deliverables: list[str] = []
    duration: str = ""


class Deliverable(BaseModel):
    name: str
    description: str = ""
    due: str = ""
    format: str = ""


class PWS(BaseModel):
    project_background: str = ""
    scope_of_work: str = ""
    tasks: list[PWSTask] = []
    ecological_performance_standards: list[PerformanceStandard] = []
    monitoring_requirements: str = ""
    adaptive_management_plan: str = ""
    native_plant_specifications: str = ""
    deliverables: list[Deliverable] = []
    contractor_qualifications: str = ""
    qasp: str = ""
    full_document: str = ""


# ── Contractor SOW Models ────────────────────────────────────────────────────

class StaffMember(BaseModel):
    name: str
    role: str
    qualifications: str = ""
    certifications: list[str] = []
    years_experience: Optional[int] = None


class ContractorSOW(BaseModel):
    contractor_name: str
    raw_text: str = ""
    proposed_methodology: str = ""
    species_list: list[str] = []
    seed_mix: str = ""
    planting_densities: str = ""
    soil_amendment_plan: str = ""
    erosion_control_methods: str = ""
    monitoring_protocol: str = ""
    adaptive_management_approach: str = ""
    staffing_plan: list[StaffMember] = []
    timeline: str = ""
    subcontractors: list[str] = []
    past_performance_claims: list[str] = []


# ── CrustData / Credibility Models ──────────────────────────────────────────

class PersonVerification(BaseModel):
    name: str
    claimed_role: str
    verified: bool = False
    current_company: Optional[str] = None
    current_title: Optional[str] = None
    notes: str = ""


class ContractorCredibility(BaseModel):
    contractor_name: str
    verified_headcount: Optional[int] = None
    claimed_headcount: Optional[int] = None
    personnel_verified: list[PersonVerification] = []
    financial_signals: list[str] = []
    news_findings: list[str] = []
    credibility_score: float = Field(0, ge=0, le=100)
    red_flags: list[str] = []
    green_flags: list[str] = []


# ── Evaluation / Scoring Models ──────────────────────────────────────────────

class GapItem(BaseModel):
    requirement_id: str
    requirement_description: str
    status: GapStatus
    severity: Severity = Severity.MEDIUM
    details: str = ""


class GapReport(BaseModel):
    contractor_name: str
    gaps: list[GapItem] = []
    summary: str = ""


class FactorScore(BaseModel):
    factor: str
    score: float = Field(0, ge=0, le=100)
    rating: str = ""
    evidence: list[str] = []


class Risk(BaseModel):
    category: str
    description: str
    severity: Severity
    mitigation: Optional[str] = None


class SuitabilityRating(BaseModel):
    contractor_name: str
    overall_score: float = Field(0, ge=0, le=100)
    overall_rating: AdjectivalRating = AdjectivalRating.ACCEPTABLE
    factor_scores: list[FactorScore] = []
    credibility: Optional[ContractorCredibility] = None
    gaps: list[str] = []
    risks: list[Risk] = []
    strengths: list[str] = []
    weaknesses: list[str] = []
    recommendation_notes: str = ""


# ── Final Report ─────────────────────────────────────────────────────────────

class EvaluationReport(BaseModel):
    rfp_title: str = ""
    pws_summary: str = ""
    contractors: list[SuitabilityRating] = []
    comparative_matrix: dict = {}
    best_value_analysis: str = ""
    key_discriminators: list[str] = []
    critical_findings: list[str] = []
    recommendation: str = ""
    confidence_level: float = Field(0, ge=0, le=1)


# ── Pipeline State (used by LangGraph) ──────────────────────────────────────

class PipelineState(BaseModel):
    """Shared state threaded through the LangGraph pipeline."""

    rfp: Optional[RFPDocument] = None
    pws: Optional[PWS] = None
    sows: list[ContractorSOW] = []
    gap_reports: list[GapReport] = []
    credibility_reports: list[ContractorCredibility] = []
    suitability_ratings: list[SuitabilityRating] = []
    report: Optional[EvaluationReport] = None
