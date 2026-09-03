// === HEALTHCARE CURRICULUM DATA ===
// This is the healthcare-systems curriculum: 12 weeks, grouped into 6 week groups
// of 2 weeks each (weeks 0-1, 2-3, 4-5, 6-7, 8-9, 10-11). Each week group has one
// 7-day template that repeats across both of its weeks — same pattern as the
// AI/PM curriculum in curriculum.ts, just applied to a different subject.
//
// The subject matter: US healthcare interoperability, quality measurement, and
// payment/regulatory concepts — written for a Product Manager who owns an EHR
// (Electronic Health Record) product and an Employer Portal, and needs to be
// fluent enough to make product calls in this space, not just recognize the
// acronyms. Each week group spells out its acronyms the first time they appear,
// so you can read groups out of order without hitting an undefined term.
//
// Resource links point at primary sources wherever one exists — the actual FHIR
// spec, the actual CMS program page — rather than secondary explainers, because
// in this domain the primary source is usually more stable and more precise than
// a blog post about it.

import type { WeekGroup } from "@/lib/types";

export const healthcareWeekGroups: WeekGroup[] = [
  // ============================================================
  // WEEKS 0–1: FHIR & Interoperability Foundations
  // ============================================================
  {
    id: "weeks-0-1",
    title: "FHIR & Interoperability Foundations",
    weekNumbers: [0, 1],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "Interoperability",
        timeEstimate: "1.5 hr",
        description:
          "Before FHIR (Fast Healthcare Interoperability Resources), most health data exchange ran on HL7 v2 messaging and CDA (Clinical Document Architecture) documents — formats built for point-to-point transactions between two systems, not for web-style app access. Read through why those older standards fell short and what FHIR changed by modeling healthcare data as small, discrete, linkable resources instead of monolithic documents. You should be able to explain to a colleague, in plain language, why 'we need FHIR' isn't just a buzzword.",
        resourceLinks: [
          {
            name: "HL7 FHIR — Specification Home",
            url: "https://www.hl7.org/fhir/",
            type: "docs",
          },
          {
            name: "HealthIT.gov — Interoperability Policy",
            url: "https://www.healthit.gov/topic/interoperability/policy",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Interoperability",
        timeEstimate: "1.5 hr",
        description:
          "Go straight to the source: read the actual FHIR spec pages for resources you'll see constantly in an EHR (Electronic Health Record) — Patient, Observation, and Condition. Notice how resources reference each other instead of nesting everything in one record: an Observation points back to a Patient via a 'subject' field, a Condition can point to the Encounter where it was diagnosed. By the end, you should be able to sketch, from memory, how a single office visit becomes a small graph of connected FHIR resources.",
        resourceLinks: [
          {
            name: "FHIR R4 — Patient Resource",
            url: "https://hl7.org/fhir/R4/patient.html",
            type: "docs",
          },
          {
            name: "FHIR R4 — Observation Resource",
            url: "https://hl7.org/fhir/R4/observation.html",
            type: "docs",
          },
          {
            name: "FHIR R4 — Condition Resource",
            url: "https://hl7.org/fhir/R4/condition.html",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "Interoperability",
        timeEstimate: "1.5 hr",
        description:
          "FHIR resources are exposed through a standard REST API. Read the RESTful API spec page to understand the two core interactions — 'read' (fetch one resource by its ID) and 'search' (query a resource type with parameters like patient or date) — then open the public HAPI FHIR test server and try both against real data: fetch a test Patient, then search Observations for that patient. Goal: be able to explain the difference between a read and a search interaction, and construct a simple FHIR search URL yourself.",
        resourceLinks: [
          {
            name: "FHIR R4 — RESTful API",
            url: "https://hl7.org/fhir/R4/http.html",
            type: "docs",
          },
          {
            name: "HAPI FHIR Test Server",
            url: "https://hapi.fhir.org/",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "Regulatory",
        timeEstimate: "1 hr",
        description:
          "USCDI (United States Core Data for Interoperability) is the federally defined set of data classes — things like problems, medications, and lab results — that certified health IT must be able to exchange. Read the official USCDI page, then skim the US Core FHIR Implementation Guide, which is how USCDI gets turned into concrete FHIR resource requirements that EHR (Electronic Health Record) vendors actually build to. You should be able to explain why 'which USCDI version are we on' is a real product requirement, not just a compliance checkbox.",
        resourceLinks: [
          {
            name: "HealthIT.gov — USCDI",
            url: "https://www.healthit.gov/test-method/united-states-core-data-for-interoperability-uscdi/",
            type: "docs",
          },
          {
            name: "HL7 — US Core Implementation Guide",
            url: "https://hl7.org/fhir/us/core/",
            type: "docs",
          },
          {
            name: "HealthIT.gov — ONC Health IT Certification Program",
            url: "https://www.healthit.gov/topic/certification-ehrs/about-onc-health-it-certification-program",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Interoperability",
        timeEstimate: "1.5 hr",
        description:
          "SMART on FHIR is the app-launch framework that lets a third-party app securely connect to a patient's record inside or alongside an EHR (Electronic Health Record), using OAuth to negotiate scoped access. Read the SMART App Launch guide at a conceptual level — you don't need to implement OAuth, just understand what a 'launch context' and a 'scope' are and why they matter for patient privacy. This is the standard that lets an app ecosystem exist around an EHR instead of every integration being a custom one-off build.",
        resourceLinks: [
          {
            name: "HL7 — SMART App Launch Implementation Guide",
            url: "https://hl7.org/fhir/smart-app-launch/",
            type: "docs",
          },
          {
            name: "SMART Health IT — SMART on FHIR API",
            url: "https://smarthealthit.org/smart-on-fhir-api/",
            type: "website",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Hands-on sandbox session: open the public HAPI FHIR test server (or the SMART App Launcher sandbox) and query for a test patient, then pull that patient's Observations. Write down, in your own words, the resource structure you see — what fields are present, how the Observation references the Patient, and what a coded field like a LOINC code is doing there. This is the day you stop reading about FHIR and actually touch it.",
        resourceLinks: [
          {
            name: "HAPI FHIR Test Server",
            url: "https://hapi.fhir.org/",
            type: "tool",
          },
          {
            name: "SMART App Launcher (sandbox)",
            url: "https://launch.smarthealthit.org",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reflection",
        timeEstimate: "45 min",
        description:
          "Write a short note — half a page is enough — on where FHIR already shows up, or should show up, in the EHR (Electronic Health Record) product you manage at work. Think about every place your product exchanges data with another system: referrals, labs, patient portals, payer integrations. This is the reflection that turns this week's reading into product judgment you can actually use in a roadmap conversation.",
        resourceLinks: [
          {
            name: "HealthIT.gov — Interoperability Policy",
            url: "https://www.healthit.gov/topic/interoperability/policy",
            type: "article",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 2–3: eCQMs & Quality Measurement
  // ============================================================
  {
    id: "weeks-2-3",
    title: "eCQMs & Quality Measurement",
    weekNumbers: [2, 3],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "Quality",
        timeEstimate: "1.5 hr",
        description:
          "eCQMs (electronic Clinical Quality Measures) are the standardized, computable measures EHRs (Electronic Health Records) use to report on quality — things like diabetes control or blood pressure management. Learn the anatomy every measure shares: the initial population (who could qualify), the denominator (who's actually eligible), the numerator (who met the quality target), and exclusions (who's carved out for valid clinical reasons). By the end you should be able to read any eCQM's population criteria and explain, in plain terms, what percentage it's actually calculating.",
        resourceLinks: [
          {
            name: "eCQI Resource Center — About eCQMs",
            url: "https://ecqi.healthit.gov/ecqms/about-ecqms",
            type: "docs",
          },
          {
            name: "eCQI Resource Center",
            url: "https://ecqi.healthit.gov/",
            type: "website",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Quality",
        timeEstimate: "1.5 hr",
        description:
          "Spend today touring the eCQI (electronic Clinical Quality Improvement) Resource Center, the federal hub for everything eCQM-related. Learn the difference between QDM (Quality Data Model), the older way of specifying measure logic, and newer FHIR-based measures, and get a first look at CQL (Clinical Quality Language) — the language used to express a measure's actual logic in a computable way. You should walk away able to explain why CMS is migrating measures from QDM toward CQL and FHIR.",
        resourceLinks: [
          {
            name: "eCQI Resource Center — QDM (Quality Data Model)",
            url: "https://ecqi.healthit.gov/tool/qdm",
            type: "docs",
          },
          {
            name: "CQL (Clinical Quality Language) Specification",
            url: "https://cql.hl7.org/",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "Quality",
        timeEstimate: "1 hr",
        description:
          "Every eCQM goes through an annual update cycle — value sets get revised, logic gets clarified, and a new measure version ships each year. Read how VSAC (the Value Set Authority Center), maintained by the National Library of Medicine, is the single source of truth for the code lists (ICD-10, SNOMED CT, LOINC, RxNorm) that measures reference. You should be able to explain why a measure 'breaking' after a value set update is a real operational risk for an EHR vendor, not a hypothetical one.",
        resourceLinks: [
          {
            name: "VSAC (Value Set Authority Center)",
            url: "https://vsac.nlm.nih.gov/",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "Quality",
        timeEstimate: "1.5 hr",
        description:
          "Once a measure is calculated, it has to be reported in a standard document format — QRDA (Quality Reporting Document Architecture). Learn the difference between QRDA Category I (one report per patient, used for hospital measures) and QRDA Category III (one aggregate report per clinician or group, used for most ambulatory reporting). Understand why an EHR has to be certified to actually generate these files, and why that certification is the gate that lets a practice report quality data to CMS at all.",
        resourceLinks: [
          {
            name: "eCQI Resource Center — QRDA",
            url: "https://ecqi.healthit.gov/qrda/about",
            type: "docs",
          },
          {
            name: "eCQI Resource Center — Eligible Clinician eCQMs",
            url: "https://ecqi.healthit.gov/ep-ec/ecqms",
            type: "website",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Interoperability",
        timeEstimate: "1.5 hr",
        description:
          "Bulk FHIR — sometimes called 'Flat FHIR' — is the extension to the FHIR (Fast Healthcare Interoperability Resources) standard that lets a system export data for an entire population of patients at once, instead of one patient at a time. Read the Bulk Data Access Implementation Guide to see how a client kicks off an export job and polls for a file of results. This is the mechanism underneath population-level quality reporting and payer analytics — understand why one-patient-at-a-time FHIR calls don't scale to a panel of 50,000 people.",
        resourceLinks: [
          {
            name: "HL7 — FHIR Bulk Data Access Implementation Guide",
            url: "https://hl7.org/fhir/uv/bulkdata/",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Pick one real eCQM — CMS122 (Diabetes: Hemoglobin A1c Poor Control) is a good, concrete choice — and trace its logic end to end: who's in the initial population, what narrows it to the denominator, what counts as a numerator hit, and what exclusions exist (patients in hospice, for example). Look up conceptually what value sets it would reference in VSAC, even without a login to pull the actual codes. Goal: be able to explain this single measure well enough to defend it in a room full of clinicians.",
        resourceLinks: [
          {
            name: "eCQI Resource Center — Eligible Clinician eCQMs",
            url: "https://ecqi.healthit.gov/ep-ec/ecqms",
            type: "website",
          },
          {
            name: "VSAC (Value Set Authority Center)",
            url: "https://vsac.nlm.nih.gov/",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reflection",
        timeEstimate: "45 min",
        description:
          "Reflect and write: how does quality measurement create real EHR product requirements? Think about every feature a practice needs just to close a quality gap — structured data capture at the point of care, decision-support reminders, dashboards showing a gap-in-care list. This is the bridge between 'quality measures are a CMS thing' and 'quality measures are half my product backlog.'",
        resourceLinks: [
          {
            name: "eCQI Resource Center — About eCQMs",
            url: "https://ecqi.healthit.gov/ecqms/about-ecqms",
            type: "docs",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 4–5: How Healthcare Gets Paid: Fee-for-Service to Value
  // ============================================================
  {
    id: "weeks-4-5",
    title: "How Healthcare Gets Paid: Fee-for-Service to Value",
    weekNumbers: [4, 5],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "Payment Models",
        timeEstimate: "1.5 hr",
        description:
          "Start with Medicare 101: Part A covers hospital and facility care, Part B covers outpatient and physician services, Part C (Medicare Advantage) is the private-plan alternative, and Part D covers prescription drugs. Then look at how traditional fee-for-service actually pays a physician: every billable service maps to RVUs (Relative Value Units) — work, practice-expense, and malpractice components — which get multiplied by a conversion factor on the Physician Fee Schedule to produce a dollar amount. You should be able to explain, in one sentence, why fee-for-service rewards volume of services rather than outcomes.",
        resourceLinks: [
          {
            name: "Medicare.gov — Parts of Medicare",
            url: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/parts-of-medicare",
            type: "article",
          },
          {
            name: "CMS — Physician Fee Schedule",
            url: "https://www.cms.gov/medicare/payment/fee-schedules/physician",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Payment Models",
        timeEstimate: "1.5 hr",
        description:
          "Capitation flips the fee-for-service model: instead of paying per service, a payer pays a fixed PMPM (per-member-per-month) rate for each patient, regardless of how much care they use. Learn the difference between full capitation (the provider bears all the risk for a defined set of services) and partial capitation (risk is shared or limited to certain categories of care), and think through who benefits when a capitated patient stays healthy versus who loses money when they don't. Goal: be able to explain why a PMPM rate has to be risk-adjusted to be fair — a concept you'll go deeper on later this week.",
        resourceLinks: [
          {
            name: "CMS Innovation Center",
            url: "https://www.cms.gov/priorities/innovation",
            type: "website",
          },
          {
            name: "KFF — Health Costs",
            url: "https://www.kff.org/health-costs/",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "Payment Models",
        timeEstimate: "1.5 hr",
        description:
          "Zoom out and map the full value-based care spectrum: pay-for-performance (fee-for-service plus a quality bonus or penalty layered on top), shared savings (the provider keeps a cut of costs saved against a benchmark, with little or no downside risk), bundled payments (one fixed price for an entire episode of care), and global capitation (full financial responsibility for a population). For each model, identify who's holding the risk and what happens financially if a patient gets sicker than expected. You should be able to place any payment model you encounter on this spectrum and say what incentive it creates.",
        resourceLinks: [
          {
            name: "CMS Innovation Center",
            url: "https://www.cms.gov/priorities/innovation",
            type: "website",
          },
          {
            name: "KFF — Health Costs",
            url: "https://www.kff.org/health-costs/",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "Risk & Coding",
        timeEstimate: "1.5 hr",
        description:
          "HCC (Hierarchical Condition Category) coding is how a patient's diagnoses get translated into a predicted cost of care. Learn the core mechanic: each qualifying ICD-10 diagnosis maps to an HCC, HCCs are organized into hierarchies (a more severe condition in the same family 'trumps' a milder one), and the resulting set of HCCs feeds directly into a risk score. Understand why thorough, specific documentation at the point of care — not just correct clinical care — directly drives how much a health plan gets paid to cover that patient.",
        resourceLinks: [
          {
            name: "AAPC — What Is Hierarchical Condition Category (HCC) Coding",
            url: "https://www.aapc.com/resources/what-is-hierarchical-condition-category",
            type: "article",
          },
          {
            name: "CMS — Risk Adjustment",
            url: "https://www.cms.gov/medicare/payment/medicare-advantage-rates-statistics/risk-adjustment",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Risk & Coding",
        timeEstimate: "1.5 hr",
        description:
          "A patient's RAF (Risk Adjustment Factor) score is built by summing demographic factors (age, sex, Medicaid and disability status) and the HCCs captured that year, then running the result through a CMS risk model. Learn why CMS is transitioning that model from V24 to V28 (fewer HCCs, different weights, meant to reduce upcoding), and get a conceptual handle on 'recapture' (re-documenting a chronic condition every year, since diagnoses don't automatically carry forward) and 'suspecting' (using data to flag likely-undocumented conditions for a clinician to confirm). You should be able to explain why a condition documented in December but not re-documented the following January effectively disappears from a patient's risk score.",
        resourceLinks: [
          {
            name: "CMS — Risk Adjustment",
            url: "https://www.cms.gov/medicare/payment/medicare-advantage-rates-statistics/risk-adjustment",
            type: "docs",
          },
          {
            name: "CMS — Medicare Risk Adjustment Data Validation Program",
            url: "https://www.cms.gov/data-research/monitoring-programs/medicare-risk-adjustment-data-validation-program",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Build a small spreadsheet model of a toy 100-patient panel. Assign each patient a rough RAF score based on made-up demographics and a couple of chronic conditions, average them into a panel RAF, and use that to compute a risk-adjusted PMPM budget. Then change a handful of patients' coding accuracy — add or remove a documented HCC — and watch how much the panel's revenue moves. This is the exercise that makes 'documentation drives revenue' click as a number, not just a phrase.",
        resourceLinks: [
          {
            name: "CMS — Risk Adjustment",
            url: "https://www.cms.gov/medicare/payment/medicare-advantage-rates-statistics/risk-adjustment",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reflection",
        timeEstimate: "45 min",
        description:
          "Reflect and write: what does fee-for-service reward, what does value-based care reward, and what does each do to product priorities for an EHR? Think about a feature like quick note templates versus risk-gap alerts — one optimizes for visit volume, the other for accurate, complete documentation. Which incentive is your own product currently built around, and does that match where your organization is trying to go?",
        resourceLinks: [
          {
            name: "CMS Innovation Center",
            url: "https://www.cms.gov/priorities/innovation",
            type: "website",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 6–7: MIPS, Promoting Interoperability & MVPs
  // ============================================================
  {
    id: "weeks-6-7",
    title: "MIPS, Promoting Interoperability & MVPs",
    weekNumbers: [6, 7],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "Regulatory",
        timeEstimate: "1.5 hr",
        description:
          "The QPP (Quality Payment Program) is how CMS ties Medicare Part B payment to performance for most clinicians. Learn the two tracks: MIPS (Merit-based Incentive Payment System), where a clinician's final score adjusts their payment up or down, and Advanced APMs (Alternative Payment Models), where taking on enough financial risk exempts a clinician from MIPS reporting and can earn a separate incentive instead. Understand who's actually eligible for MIPS — volume and revenue thresholds exclude many clinicians — and what a payment adjustment looks like in practice: a percentage applied two years after the performance year.",
        resourceLinks: [
          {
            name: "QPP — About the Quality Payment Program",
            url: "https://qpp.cms.gov/about/qpp-overview",
            type: "docs",
          },
          {
            name: "QPP — MIPS Overview",
            url: "https://qpp.cms.gov/mips/overview",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Regulatory",
        timeEstimate: "1.5 hr",
        description:
          "MIPS scores a clinician across four performance categories: Quality, Cost, Improvement Activities, and Promoting Interoperability. Learn each category's current weight, what it measures, and how the four category scores combine into one final score, which is then compared against a performance threshold to determine the payment adjustment. You should be able to explain why 'what's my MIPS score' is really four separate questions bundled into one number.",
        resourceLinks: [
          {
            name: "QPP — MIPS Reporting Options Overview",
            url: "https://qpp.cms.gov/mips/reporting-options-overview",
            type: "docs",
          },
          {
            name: "QPP — Improvement Activities Performance Category",
            url: "https://qpp.cms.gov/mips/improvement-activities",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "Regulatory",
        timeEstimate: "1.5 hr",
        description:
          "Go deep on the Promoting Interoperability category, the one most directly about EHR capability. Learn its core measures — e-prescribing, health information exchange between providers, and giving patients electronic access to their own records — and understand why a clinician can only earn credit here if they're using CEHRT (Certified Electronic Health Record Technology). This is the category where the EHR vendor, not just the clinician's own workflow, determines whether reporting is even possible.",
        resourceLinks: [
          {
            name: "QPP — Promoting Interoperability Performance Category",
            url: "https://qpp.cms.gov/mips/promoting-interoperability",
            type: "docs",
          },
          {
            name: "CMS — Certified EHR Technology",
            url: "https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs/certified-ehr-technology",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "Regulatory",
        timeEstimate: "1.5 hr",
        description:
          "MVPs (MIPS Value Pathways) are CMS's replacement for traditional MIPS reporting, bundling a smaller, specialty-relevant set of quality measures, improvement activities, and cost measures into one coherent package instead of clinicians picking freely from hundreds of options. Read why CMS believes this makes reporting more clinically meaningful, and look at the transition timeline — traditional MIPS and MVPs currently coexist, with CMS signaling a longer-term move toward MVPs becoming the default. You should be able to explain what problem MVPs are actually trying to solve.",
        resourceLinks: [
          {
            name: "QPP — MIPS Value Pathways (MVPs)",
            url: "https://qpp.cms.gov/mips/mips-value-pathways",
            type: "docs",
          },
          {
            name: "QPP — Explore MIPS Value Pathways",
            url: "https://qpp.cms.gov/reporting-requirements/measures-activities/explore-mvps",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Regulatory",
        timeEstimate: "1.5 hr",
        description:
          "Now look at MIPS from the EHR (Electronic Health Record) vendor's seat: what does the software actually have to capture, calculate, and submit for a client to succeed? Think through structured data capture for every Promoting Interoperability measure, a quality-measure calculation engine, a QRDA III file generator, and dashboards that show a practice where it stands mid-year. Goal: be able to list, concretely, the product capabilities a certified EHR needs just to make MIPS reporting possible for its clients.",
        resourceLinks: [
          {
            name: "QPP — MIPS Overview",
            url: "https://qpp.cms.gov/mips/overview",
            type: "docs",
          },
          {
            name: "CMS — Promoting Interoperability Programs",
            url: "https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Pick one MVP from the QPP explorer tool and map every measure and activity inside it to the specific EHR features and data capture points needed to support it — a quality measure needs structured diagnosis and lab data, an improvement activity might need a workflow attestation feature, and so on. This is the exercise that turns a regulatory reading list into an actual product requirements sketch.",
        resourceLinks: [
          {
            name: "QPP — Explore MIPS Value Pathways",
            url: "https://qpp.cms.gov/reporting-requirements/measures-activities/explore-mvps",
            type: "tool",
          },
        ],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reflection",
        timeEstimate: "45 min",
        description:
          "Reflect and write: which of the four MIPS categories is hardest for an EHR to support well, and why? Consider that Quality and Promoting Interoperability both depend heavily on structured data capture at the point of care, while Cost is calculated entirely from claims data the EHR never touches. Use this to sharpen your intuition for where an EHR product team's effort actually matters versus where it doesn't.",
        resourceLinks: [
          {
            name: "QPP — MIPS Overview",
            url: "https://qpp.cms.gov/mips/overview",
            type: "docs",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 8–9: ACOs, MSSP & Advanced Primary Care Management
  // ============================================================
  {
    id: "weeks-8-9",
    title: "ACOs, MSSP & Advanced Primary Care Management",
    weekNumbers: [8, 9],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "Payment Models",
        timeEstimate: "1.5 hr",
        description:
          "An ACO (Accountable Care Organization) is a group of providers who take joint responsibility for the cost and quality of care for an assigned population of Medicare patients. Learn how patient attribution works (patients are assigned based on where they get most of their primary care, not by enrolling), how CMS sets a financial benchmark for what that population's care 'should' cost, and how actual spending against that benchmark determines shared savings (the ACO keeps a cut of the money saved) or shared losses (the ACO owes money back). You should be able to explain attribution and benchmarking well enough to defend why an ACO's finances can swing on patients who don't even know they're 'in' it.",
        resourceLinks: [
          {
            name: "CMS — Shared Savings Program",
            url: "https://www.cms.gov/medicare/payment/fee-for-service-providers/shared-savings-program-ssp-acos",
            type: "docs",
          },
          {
            name: "CMS — About the Shared Savings Program",
            url: "https://www.cms.gov/medicare/payment/fee-for-service-providers/shared-savings-program-ssp-acos/about",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Payment Models",
        timeEstimate: "1.5 hr",
        description:
          "MSSP (the Medicare Shared Savings Program) is the largest ACO program, and it has two main tracks: BASIC, a 'glide path' that starts with little or no downside risk and ramps up over years, and ENHANCED, which carries higher risk but a bigger potential upside. Understand why an ACO's choice of track and risk level is a real strategic decision — more risk means more potential reward, but also real exposure to owing CMS money if costs run high. You should be able to explain why a newly formed, less experienced ACO would start on BASIC rather than jumping straight to ENHANCED.",
        resourceLinks: [
          {
            name: "CMS — Shared Savings Program",
            url: "https://www.cms.gov/medicare/payment/fee-for-service-providers/shared-savings-program-ssp-acos",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "Quality",
        timeEstimate: "1.5 hr",
        description:
          "ACOs report quality through the APP (the APM Performance Pathway — APM being short for Alternative Payment Model), which is where the eCQMs (electronic Clinical Quality Measures) you learned in weeks 2-3 reappear in a new context. Learn that Shared Savings Program ACOs are required to report through the APP using a defined set of quality measures across all their patients and all payers, not just Medicare. Connect the dots: the same measure anatomy and the same VSAC (Value Set Authority Center) value sets you studied earlier now directly determine how much of an ACO's shared savings it actually gets to keep.",
        resourceLinks: [
          {
            name: "QPP — APM Performance Pathway (APP)",
            url: "https://qpp.cms.gov/reporting-requirements/ways-to-report/app",
            type: "docs",
          },
          {
            name: "eCQI Resource Center — About eCQMs",
            url: "https://ecqi.healthit.gov/ecqms/about-ecqms",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "Payment Models",
        timeEstimate: "1.5 hr",
        description:
          "APCM (Advanced Primary Care Management) is a newer set of monthly billing codes — G0556, G0557, and G0558 — that pay a primary care practice a flat per-patient amount based on how many chronic conditions a patient has, rather than requiring the time-tracking that older care-management codes like CCM (Chronic Care Management) and PCM (Principal Care Management) demand. Learn the three payment tiers and what triggers each one, and understand why removing the time-tracking requirement changes what a practice needs to build to bill accurately and compliantly. You should be able to explain APCM's tiers to a billing team without notes.",
        resourceLinks: [
          {
            name: "CMS — Advanced Primary Care Management Services",
            url: "https://www.cms.gov/medicare/payment/fee-schedules/physician-fee-schedule/advanced-primary-care-management-services",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Payment Models",
        timeEstimate: "1.5 hr",
        description:
          "Zoom out to see APCM as one step in a longer CMS arc toward paying primary care differently: CPC+ (Comprehensive Primary Care Plus) and Primary Care First both experimented with per-patient payments layered on top of fee-for-service, and ACO REACH (Realizing Equity, Access, and Community Health) pushes further toward full population-based payment with an explicit equity focus. Read enough to place APCM, CPC+, Primary Care First, and ACO REACH on a single timeline. Goal: be able to explain the throughline — CMS is steadily replacing 'pay per visit' with 'pay per patient' in primary care.",
        resourceLinks: [
          {
            name: "CMS — ACO REACH Model",
            url: "https://www.cms.gov/priorities/innovation/innovation-models/aco-reach",
            type: "docs",
          },
          {
            name: "CMS Innovation Center",
            url: "https://www.cms.gov/priorities/innovation",
            type: "website",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Design exercise: sketch how an EHR would determine which patients are eligible for APCM each month — checking chronic condition counts, consent status, and which of the three billing tiers (G0556, G0557, G0558) a patient qualifies for — and then generate a compliant claim automatically. You don't need to build anything; a whiteboard-style sketch of the logic and data flow is the deliverable. This is the same kind of feature-design thinking a real EHR product team does before writing a PRD (Product Requirements Document).",
        resourceLinks: [
          {
            name: "CMS — Advanced Primary Care Management Services",
            url: "https://www.cms.gov/medicare/payment/fee-schedules/physician-fee-schedule/advanced-primary-care-management-services",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reflection",
        timeEstimate: "45 min",
        description:
          "Reflect and write: what does an ACO need from an EHR that a solo, fee-for-service practice doesn't? Think about population-level reporting, risk-gap visibility across an entire attributed panel, and care-coordination workflows that span multiple practices. This is the reflection that shows you how 'who's the customer' changes what 'good EHR product' even means.",
        resourceLinks: [
          {
            name: "CMS — Shared Savings Program",
            url: "https://www.cms.gov/medicare/payment/fee-for-service-providers/shared-savings-program-ssp-acos",
            type: "docs",
          },
        ],
      },
    ],
  },

  // ============================================================
  // WEEKS 10–11: Medicare Advantage, Stars & the Prior Auth Rule
  // ============================================================
  {
    id: "weeks-10-11",
    title: "Medicare Advantage, Stars & the Prior Auth Rule",
    weekNumbers: [10, 11],
    days: [
      {
        dayOfWeek: "Mon",
        focus: "Payment Models",
        timeEstimate: "1.5 hr",
        description:
          "MA (Medicare Advantage) plans get paid through a bidding system: CMS sets a benchmark for each county, plans submit a bid for what they'd charge to cover standard Medicare benefits, and the difference between the bid and the benchmark becomes a rebate the plan must spend on extra benefits for members. Learn how a plan's risk score — built from the HCCs (Hierarchical Condition Categories) you studied in weeks 4-5 — adjusts its payment up or down, so a plan covering a sicker population gets paid more per member. You should be able to explain why MA plans have a direct financial incentive to document risk accurately, and why regulators watch closely for overdocumentation.",
        resourceLinks: [
          {
            name: "CMS — Risk Adjustment",
            url: "https://www.cms.gov/medicare/payment/medicare-advantage-rates-statistics/risk-adjustment",
            type: "docs",
          },
          {
            name: "Medicare.gov — Parts of Medicare",
            url: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/parts-of-medicare",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Tue",
        focus: "Quality",
        timeEstimate: "1.5 hr",
        description:
          "Star Ratings are CMS's public 1-to-5 star quality scorecard for MA and Part D plans, built from dozens of measures across domains like clinical outcomes, member experience, and customer service. Learn how CMS sets 'cut points' — thresholds that determine whether a given measure result earns 1 star or 5 — and why Star Ratings aren't just a public-facing rating: they directly determine a plan's quality bonus payment and how large a rebate percentage it gets to spend on member benefits. You should be able to explain why a half-star drop across a large MA plan is a multi-million-dollar problem, not a marketing issue.",
        resourceLinks: [
          {
            name: "CMS — Part C and D Performance Data",
            url: "https://www.cms.gov/medicare/health-drug-plans/part-c-d-performance-data",
            type: "docs",
          },
          {
            name: "CMS — 2025 Medicare Advantage and Part D Star Ratings",
            url: "https://www.cms.gov/newsroom/fact-sheets/2025-medicare-advantage-part-d-star-ratings",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Wed",
        focus: "Risk & Coding",
        timeEstimate: "1.5 hr",
        description:
          "Providers and EHR (Electronic Health Record) vendors sit at the point of care where both Star Ratings measures and risk-score accuracy actually get captured — a missed screening or an undocumented chronic condition shows up downstream as a lower Star Rating or an inaccurate RAF (Risk Adjustment Factor) score. Get a high-level look at RADV (Risk Adjustment Data Validation) audits, where CMS pulls a sample of patient charts to confirm that documented diagnoses are actually supported by the medical record. You should be able to explain why 'the chart has to support the code' is the single sentence that summarizes RADV risk for a health plan.",
        resourceLinks: [
          {
            name: "CMS — Medicare Risk Adjustment Data Validation Program",
            url: "https://www.cms.gov/data-research/monitoring-programs/medicare-risk-adjustment-data-validation-program",
            type: "docs",
          },
          {
            name: "CMS — Risk Adjustment",
            url: "https://www.cms.gov/medicare/payment/medicare-advantage-rates-statistics/risk-adjustment",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Thu",
        focus: "Regulatory",
        timeEstimate: "1.5 hr",
        description:
          "The CMS-0057-F Prior Authorization Rule requires certain payers to build four FHIR (Fast Healthcare Interoperability Resources) APIs: Patient Access, Provider Access, Payer-to-Payer, and a new Prior Authorization API that lets providers submit and track prior auth requests electronically, with defined decision timeframes payers must meet. Read the CMS fact sheet and note the compliance dates — most operational requirements began in 2026, with the API build-out requirements landing in 2027. You should be able to explain how this rule turns 'we fax prior auth forms' into a genuine, regulator-mandated API integration project.",
        resourceLinks: [
          {
            name: "CMS — Interoperability and Prior Authorization Final Rule (CMS-0057-F) Fact Sheet",
            url: "https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-prior-authorization-final-rule-cms-0057-f",
            type: "article",
          },
          {
            name: "CMS — Interoperability FAQs",
            url: "https://www.cms.gov/priorities/burden-reduction/overview/interoperability/frequently-asked-questions/general",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Fri",
        focus: "Reading",
        timeEstimate: "1.5 hr",
        description:
          "Synthesis day: read back over your notes with one question in mind — how does FHIR act as the technical backbone underneath everything else you've studied this curriculum? The same resource model and API pattern shows up in Bulk FHIR for quality reporting, in USCDI (United States Core Data for Interoperability) and US Core for what data must be exchangeable, and now in the Patient, Provider, and Payer Access APIs for prior authorization. Write a few bullet points connecting these together before tomorrow's capstone.",
        resourceLinks: [
          {
            name: "HL7 FHIR — Specification Home",
            url: "https://www.hl7.org/fhir/",
            type: "docs",
          },
          {
            name: "CMS — Interoperability and Prior Authorization Final Rule (CMS-0057-F) Fact Sheet",
            url: "https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-prior-authorization-final-rule-cms-0057-f",
            type: "article",
          },
        ],
      },
      {
        dayOfWeek: "Sat",
        focus: "Project",
        timeEstimate: "2 hr",
        description:
          "Capstone: write a 1-2 page memo titled 'How FHIR, quality measurement, and value-based payment intersect in the product I manage.' Pull in concepts from all 12 weeks — FHIR and USCDI as the data layer, eCQMs and MIPS as the quality layer, and HCCs, RAF scores, and value-based contracts as the payment layer. Write it as if you were briefing a new hire on your team — clear enough that someone with no healthcare background could follow the throughline.",
        resourceLinks: [
          {
            name: "HL7 FHIR — Specification Home",
            url: "https://www.hl7.org/fhir/",
            type: "docs",
          },
        ],
      },
      {
        dayOfWeek: "Sun",
        focus: "Reflection",
        timeEstimate: "45 min",
        description:
          "Final reflection: grade your own fluency, topic by topic, across all 12 weeks — FHIR and interoperability, eCQMs and quality measurement, payment models, HCC coding and risk adjustment, and MIPS and the regulatory programs built on top of it. Pick the two areas you're weakest on and write down one concrete next step for each — a course, a spec you'll re-read, or a real work conversation you'll have. This is the note you'll come back to before you plan your next 12 weeks.",
        resourceLinks: [
          {
            name: "QPP — About the Quality Payment Program",
            url: "https://qpp.cms.gov/about/qpp-overview",
            type: "docs",
          },
        ],
      },
    ],
  },
];
