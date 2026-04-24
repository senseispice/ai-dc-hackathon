"""Standalone test harness for Engineer 2's agents.

Run individual agents against sample data without needing the full pipeline.
Usage:
    python test_agents_standalone.py gap        # test gap analyzer
    python test_agents_standalone.py intel       # test contractor intel
    python test_agents_standalone.py scorer      # test scorer
    python test_agents_standalone.py all         # test all three
"""

from __future__ import annotations

import asyncio
import sys
from pathlib import Path

from app.models.schemas import (
    ContractorCredibility,
    ContractorSOW,
    GapReport,
    PerformanceStandard,
    PWS,
    PWSTask,
    Severity,
    StaffMember,
    TaskPhase,
)

DATA_DIR = Path(__file__).parent / "data"


# -- Build sample inputs from the sample text files ---------------------

def load_sample_pws() -> PWS:
    """Construct a minimal PWS as if Phase 1 already ran."""
    return PWS(
        project_background=(
            "BLM Battle Mountain District seeks mine land reclamation on 200 acres "
            "of abandoned silver mining in the Toiyabe Range, Lander County, Nevada. "
            "Great Basin sagebrush-steppe ecosystem, 6200-6800 ft elevation."
        ),
        scope_of_work=(
            "Site assessment, hazard mitigation, AMD treatment, soil reconstruction, "
            "revegetation with native Great Basin species, erosion control, "
            "5-year monitoring, and adaptive management."
        ),
        tasks=[
            PWSTask(
                id="T-1", phase=TaskPhase.SITE_PREP,
                description="Comprehensive site assessment", duration="3 months",
            ),
            PWSTask(
                id="T-2", phase=TaskPhase.IMPLEMENTATION,
                description="Revegetation with locally-sourced native seed",
                duration="6 months",
            ),
            PWSTask(
                id="T-3", phase=TaskPhase.MONITORING,
                description="5-year monitoring program", duration="5 years",
            ),
        ],
        ecological_performance_standards=[
            PerformanceStandard(
                metric="native vegetative cover",
                target_value="70% absolute cover",
                measurement_method="line-point intercept transects",
                timeline="Year 5",
            ),
            PerformanceStandard(
                metric="soil pH",
                target_value="pH 6.0-7.5 in root zone",
                measurement_method="annual soil sampling",
                timeline="Year 3",
            ),
            PerformanceStandard(
                metric="invasive species cover",
                target_value="< 5% cover",
                measurement_method="belt transects",
                timeline="every monitoring event",
            ),
            PerformanceStandard(
                metric="sagebrush establishment",
                target_value=">= 1 plant per 100 sq ft",
                measurement_method="fixed-area plots",
                timeline="Year 5",
            ),
        ],
        monitoring_requirements=(
            "Annual vegetation transects (20 permanent plots), photo points (30 stations), "
            "soil sampling (10 plots), quarterly water quality, annual wildlife surveys. "
            "Minimum 5-year monitoring period."
        ),
        adaptive_management_plan=(
            "Triggers: <20% native cover at Year 1 -> reseed; "
            ">10% invasive cover -> herbicide within 30 days; "
            "AMD pH <5.0 -> modify limestone drain; "
            "<50% sagebrush survival at Year 2 -> replant with browse protection."
        ),
        contractor_qualifications=(
            "Restoration ecologist with 10+ years experience, "
            "hydrologist, CPESC-certified erosion control specialist, "
            "demonstrated success on 3+ mine reclamation projects in Great Basin."
        ),
    )


def load_sample_sow(name: str, filename: str) -> ContractorSOW:
    """Load a sample SOW — raw text only, the sow_parser would fill the rest."""
    raw = (DATA_DIR / filename).read_text()
    # For testing gap_analyzer and scorer, we pre-populate key fields
    if "sow_a" in filename:
        return ContractorSOW(
            contractor_name=name,
            raw_text=raw,
            proposed_methodology="Comprehensive phased approach: site assessment, "
            "hazard mitigation, AMD passive treatment, soil reconstruction, "
            "native revegetation with locally-sourced seed, 5-year monitoring.",
            species_list=[
                "bluebunch wheatgrass", "Indian ricegrass",
                "bottlebrush squirreltail", "basin wildrye",
                "Wyoming big sagebrush", "bitterbrush",
            ],
            seed_mix="8.0 PLS lbs/acre grasses + 2.0 PLS lbs/acre forbs, "
            "all sourced within 200 miles of project site",
            monitoring_protocol="Annual line-point intercept (20 plots), "
            "photo points (30 stations), soil sampling, quarterly water quality, "
            "wildlife surveys. 5-year duration.",
            adaptive_management_approach="Reseed if <20% cover at Year 1; "
            "herbicide if invasive >10%; modify AMD if pH <5.0; "
            "replant sagebrush if <50% survival at Year 2.",
            timeline="24 months implementation + 3 years monitoring",
            staffing_plan=[
                StaffMember(
                    name="Dr. Sarah Chen", role="Lead Restoration Ecologist",
                    certifications=["SER Certified"], years_experience=15,
                ),
                StaffMember(
                    name="Mike Reynolds", role="Project Manager",
                    certifications=["PMP"], years_experience=20,
                ),
                StaffMember(
                    name="Lisa Park", role="Senior Hydrologist",
                    certifications=["PE", "PH"], years_experience=12,
                ),
            ],
            past_performance_claims=[
                "BLM Nevada Silver Peak Mine (150 acres) — 85% native cover at Year 3",
                "BLM Idaho Boise Basin AML (300 acres) — 72% cover at Year 5",
            ],
        )
    elif "sow_b" in filename:
        return ContractorSOW(
            contractor_name=name,
            raw_text=raw,
            proposed_methodology="Site characterization, mine stabilization, "
            "soil amendments, revegetation with native seed, erosion BMPs.",
            species_list=["native grasses", "forbs", "sagebrush", "bitterbrush"],
            seed_mix="Native seed mix appropriate for Great Basin. "
            "Some seed may be sourced from regional suppliers in NV, UT, and OR.",
            monitoring_protocol="Annual visual assessment, photo documentation, "
            "general vegetation cover estimates, water quality sampling. 3-year duration.",
            adaptive_management_approach="Will adapt approach if monitoring "
            "indicates revegetation is not progressing as expected.",
            timeline="12 months implementation + 3 years monitoring (36 months total)",
            staffing_plan=[
                StaffMember(
                    name="David Kowalski", role="Project Manager",
                    certifications=[], years_experience=15,
                ),
                StaffMember(
                    name="Jennifer Walsh", role="Senior Environmental Scientist",
                    certifications=[], years_experience=10,
                ),
                StaffMember(
                    name="Brian Hendricks", role="Staff Ecologist",
                    certifications=[], years_experience=5,
                ),
            ],
            past_performance_claims=[
                "Utah DOGM Abandoned Mine Reclamation (100 acres)",
                "BLM Wyoming Rangeland Improvement (500 acres)",
            ],
        )
    else:
        return ContractorSOW(
            contractor_name=name,
            raw_text=raw,
            proposed_methodology="Proven remediation techniques, "
            "soil amendments, erosion control, seeding with grass and forb mix, "
            "nurse crops (annual ryegrass, cereal rye) for rapid cover.",
            species_list=["grass and forb mix", "annual ryegrass", "cereal rye"],
            seed_mix="Seed from established national suppliers. "
            "Annual ryegrass and cereal rye as nurse crops.",
            monitoring_protocol="Visual inspections, photo documentation, "
            "periodic vegetation assessments. 18-month duration.",
            adaptive_management_approach="",
            timeline="12 months implementation + 18 months monitoring",
            staffing_plan=[
                StaffMember(
                    name="John Martinez", role="Project Manager",
                    certifications=["PMP"], years_experience=18,
                ),
                StaffMember(
                    name="Karen O'Neill", role="Senior Restoration Specialist",
                    certifications=[], years_experience=12,
                ),
            ],
            past_performance_claims=[
                "Federal facility remediation, multiple DOD installations",
                "State highway revegetation program, 3 western states",
            ],
        )


# -- Test runners -------------------------------------------------------

async def test_gap_analyzer():
    from app.agents.gap_analyzer import analyze_gaps

    pws = load_sample_pws()
    sow_a = load_sample_sow("Great Basin Restoration LLC", "sample_sow_a.txt")
    sow_c = load_sample_sow("EcoRestore National Corp", "sample_sow_c.txt")

    print("=== Gap Analysis: Great Basin Restoration (strong bidder) ===")
    report_a = await analyze_gaps(pws, sow_a)
    _print_gap_report(report_a)

    print("\n=== Gap Analysis: EcoRestore National (weak bidder) ===")
    report_c = await analyze_gaps(pws, sow_c)
    _print_gap_report(report_c)

    # EcoRestore should have more/worse gaps
    critical_a = sum(1 for g in report_a.gaps if g.severity == Severity.HIGH)
    critical_c = sum(1 for g in report_c.gaps if g.severity == Severity.HIGH)
    print(f"\nHigh-severity gaps: A={critical_a}, C={critical_c}")
    c_worse = critical_c > critical_a
    print(f"Sanity check: C should have more critical gaps than A: {'PASS' if c_worse else 'CHECK'}")


async def test_contractor_intel():
    from app.agents.contractor_intel import verify_contractor

    sow_a = load_sample_sow("Great Basin Restoration LLC", "sample_sow_a.txt")
    sow_c = load_sample_sow("EcoRestore National Corp", "sample_sow_c.txt")

    print("=== CrustData Verification: Great Basin Restoration ===")
    cred_a = await verify_contractor(sow_a)
    _print_credibility(cred_a)

    print("\n=== CrustData Verification: EcoRestore National ===")
    cred_c = await verify_contractor(sow_c)
    _print_credibility(cred_c)

    print(f"\nScores: A={cred_a.credibility_score}, C={cred_c.credibility_score}")
    a_higher = cred_a.credibility_score > cred_c.credibility_score
    print(f"Sanity check: A should score higher than C: {'PASS' if a_higher else 'CHECK'}")

    has_martinez_flag = any("martinez" in f.lower() for f in cred_c.red_flags)
    has_headcount_flag = any(
        "headcount" in f.lower() or "employee" in f.lower()
        for f in cred_c.red_flags
    )
    print(f"Martinez red flag found: {'PASS' if has_martinez_flag else 'CHECK'}")
    print(f"Headcount red flag found: {'PASS' if has_headcount_flag else 'CHECK'}")


async def test_scorer():
    from app.agents.contractor_intel import verify_contractor
    from app.agents.gap_analyzer import analyze_gaps
    from app.agents.scorer import score_contractors

    pws = load_sample_pws()
    sows = [
        load_sample_sow("Great Basin Restoration LLC", "sample_sow_a.txt"),
        load_sample_sow("Western Environmental Services Inc.", "sample_sow_b.txt"),
        load_sample_sow("EcoRestore National Corp", "sample_sow_c.txt"),
    ]

    print("Running gap analysis for all 3 contractors...")
    gap_reports = [await analyze_gaps(pws, sow) for sow in sows]

    print("Running CrustData verification for all 3 contractors...")
    cred_reports = [await verify_contractor(sow) for sow in sows]

    print("Scoring all contractors...\n")
    ratings = await score_contractors(pws, sows, gap_reports, cred_reports)

    print("=== SUITABILITY RANKINGS ===")
    for r in sorted(ratings, key=lambda x: x.overall_score, reverse=True):
        print(f"  {r.contractor_name:<40} {r.overall_score:5.1f}  {r.overall_rating.value}")

    names_ranked = [
        r.contractor_name
        for r in sorted(ratings, key=lambda x: x.overall_score, reverse=True)
    ]
    print(f"\nRanking order: {names_ranked}")
    correct_order = (
        names_ranked[0] == "Great Basin Restoration LLC"
        and names_ranked[-1] == "EcoRestore National Corp"
    )
    print(f"Sanity check A > B > C: {'PASS' if correct_order else 'CHECK'}")


# -- Helpers ------------------------------------------------------------

def _print_gap_report(report: GapReport):
    print(f"  Contractor: {report.contractor_name}")
    print(f"  Total gaps: {len(report.gaps)}")
    for g in report.gaps:
        print(f"    [{g.severity.value:6}] [{g.status.value:20}] {g.requirement_description[:80]}")
    if report.summary:
        print(f"  Summary: {report.summary[:200]}")


def _print_credibility(cred: ContractorCredibility):
    print(f"  Contractor: {cred.contractor_name}")
    print(f"  Score: {cred.credibility_score}")
    print(f"  Headcount — claimed: {cred.claimed_headcount}, verified: {cred.verified_headcount}")
    for p in cred.personnel_verified:
        status = "VERIFIED" if p.verified else "NOT VERIFIED"
        print(f"    {p.name} ({p.claimed_role}): {status} — {p.notes}")
    if cred.red_flags:
        print(f"  Red flags: {cred.red_flags}")
    if cred.green_flags:
        print(f"  Green flags: {cred.green_flags}")


# -- Main --------------------------------------------------------------

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "all"

    if target == "gap":
        asyncio.run(test_gap_analyzer())
    elif target == "intel":
        asyncio.run(test_contractor_intel())
    elif target == "scorer":
        asyncio.run(test_scorer())
    elif target == "all":
        asyncio.run(test_gap_analyzer())
        print("\n" + "=" * 60 + "\n")
        asyncio.run(test_contractor_intel())
        print("\n" + "=" * 60 + "\n")
        asyncio.run(test_scorer())
    else:
        print(f"Unknown target: {target}")
        print("Usage: python test_agents_standalone.py [gap|intel|scorer|all]")
