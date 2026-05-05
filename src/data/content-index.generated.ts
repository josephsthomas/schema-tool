// AUTO-GENERATED — do not edit by hand.
// Regenerate with: pnpm ingest
//
// Joined view of authored sidecars under src/data/content/. Each entry maps
// a term id (e.g. "schema:Drug") to its authored prose, reference example,
// and source citations.

import type { ContentEntry } from '@/types/content';

export const contentIndex: Record<string, ContentEntry> = {
  "schema:Drug": {
    "id": "schema:Drug",
    "whenToUse": "Use Drug for any branded or generic medication page — HCP-facing prescribing information, consumer brand sites, formulary entries, drug class hubs. It's the canonical type for marking up active ingredient, mechanism of action, dosing, indications, and legal status. If a page is *about* the drug as a product (not a condition it treats), Drug is the right primary type.",
    "whenNotToUse": "Don't use Drug for dietary supplements, vitamins, or nutraceuticals — use DietarySupplement. Don't use it for medical devices, implants, or DME — use MedicalDevice. Don't use it for unformulated active substances or compounds being researched — use Substance. And don't apply Drug to a disease-state or condition page that *mentions* a treatment; that page wants MedicalCondition as primary, with Drug appearing only as a referenced value on properties like possibleTreatment.",
    "whoItsFor": "Pharma marketing teams shipping branded product pages, formulary editors at health systems and payers, regulatory-affairs writers building HCP prescribing pages, and patient-education editors describing OTC and generic medications.",
    "seoNotes": "Drug pages benefit from explicit markup of activeIngredient, drugClass, mechanismOfAction, and code (RxNorm) — these surface the entity to LLM-based health assistants and improve grounding for queries like \"what is X used for\" and \"is X an NSAID.\" Google does not currently issue a dedicated rich result for Drug; the value is entity disambiguation and structured data presence in search ranking signals.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:DoseSchedule",
      "schema:MedicalContraindication",
      "schema:FAQPage",
      "schema:Organization",
      "schema:MedicalAudience"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682159.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Drug\",\n  \"name\": \"Ibuprofen\",\n  \"alternateName\": [\"Advil\", \"Motrin\", \"Midol\"],\n  \"nonProprietaryName\": \"ibuprofen\",\n  \"drugClass\": {\n    \"@type\": \"DrugClass\",\n    \"name\": \"Nonsteroidal anti-inflammatory drugs (NSAIDs)\"\n  },\n  \"mechanismOfAction\": \"Stops the body's production of a substance that causes pain, fever, and inflammation.\",\n  \"dosageForm\": \"Tablet, chewable tablet, capsule, gel capsule, suspension, drops\",\n  \"legalStatus\": {\n    \"@type\": \"DrugLegalStatus\",\n    \"name\": \"Available over-the-counter and by prescription depending on strength\"\n  },\n  \"recognizingAuthority\": {\n    \"@type\": \"Organization\",\n    \"name\": \"U.S. Food and Drug Administration\",\n    \"url\": \"https://www.fda.gov\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682159.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Ibuprofen is in a class of medications called NSAIDs."
        }
      ],
      "verification": "draft",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Ibuprofen",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.alternateName",
          "value": "Advil, Motrin, Midol",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.nonProprietaryName",
          "value": "ibuprofen",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.drugClass.name",
          "value": "Nonsteroidal anti-inflammatory drugs (NSAIDs)",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.mechanismOfAction",
          "value": "Stops the body's production of a substance that causes pain, fever, and inflammation.",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.dosageForm",
          "value": "Tablet, chewable tablet, capsule, gel capsule, suspension, drops",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.legalStatus.name",
          "value": "Available over-the-counter and by prescription depending on strength",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.recognizingAuthority.name",
          "value": "U.S. Food and Drug Administration",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalCondition": {
    "id": "schema:MedicalCondition",
    "whenToUse": "Use MedicalCondition for disease-state, symptom-cluster, or syndrome pages — the page that explains what a condition *is*, who it affects, and how it's identified or managed. Brand-agnostic patient-education content, condition hubs on health-system sites, and payer condition-of-the-month pages all warrant MedicalCondition as the primary type.",
    "whenNotToUse": "Don't use MedicalCondition for an isolated finding or examination result — use MedicalSign (objective, observed by a clinician) or MedicalSymptom (subjective, reported by the patient). Don't use it for a clinical-trial summary about a condition — use MedicalTrial as primary, with MedicalCondition as a referenced value. Don't use it for a procedure page — use MedicalProcedure or one of its subtypes.",
    "whoItsFor": "Health-system patient-education editors, payer wellness-content teams, pharma disease-awareness campaigns (where the page is condition-focused, not product-focused), and clinical content publishers indexing into PubMed-aligned vocabularies.",
    "seoNotes": "MedicalCondition pages with explicit ICD-10 and MeSH coding via the code property strengthen entity disambiguation in LLM grounding and Knowledge Graph construction. Google does not issue a dedicated rich result, but well-structured MedicalCondition markup with associatedAnatomy and possibleTreatment improves topical authority for condition-name queries.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalProcedure",
      "schema:MedicalSignOrSymptom",
      "schema:FAQPage",
      "schema:MedicalAudience",
      "schema:MedicalWebPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/diabetestype2.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalCondition\",\n  \"name\": \"Type 2 Diabetes\",\n  \"alternateName\": \"Adult-Onset Diabetes\",\n  \"description\": \"A disease in which blood glucose levels are too high because the body either doesn't make enough insulin or doesn't use insulin well.\",\n  \"code\": {\n    \"@type\": \"MedicalCode\",\n    \"codingSystem\": \"ICD-10-CM\",\n    \"codeValue\": \"E11\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/diabetestype2.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A disease in which blood glucose levels are too high."
        }
      ],
      "verification": "draft",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Type 2 Diabetes",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.alternateName",
          "value": "Adult-Onset Diabetes",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A disease in which blood glucose levels are too high because the body either doesn't make enough insulin or doesn't use insulin well.",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.code.codingSystem",
          "value": "ICD-10-CM",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.code.codeValue",
          "value": "E11",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        }
      ]
    }
  },
  "schema:SurgicalProcedure": {
    "id": "schema:SurgicalProcedure",
    "whenToUse": "Use SurgicalProcedure for any operative procedure performed by a surgeon — appendectomy, cholecystectomy, knee arthroplasty, cardiac bypass. Hospital service-line pages that describe what a surgical service does, surgeon-bio pages that list operations performed, and patient-education pages explaining a specific operation all warrant SurgicalProcedure as the primary type.",
    "whenNotToUse": "Don't use SurgicalProcedure for diagnostic procedures like biopsies or scopes performed for diagnosis only — use DiagnosticProcedure. Don't use it for non-operative therapeutic procedures (infusions, injections, physical therapy) — use TherapeuticProcedure. Don't use it for end-of-life comfort interventions — use PalliativeProcedure. If unsure, the parent type MedicalProcedure is acceptable but loses the specificity surgeons and crawlers benefit from.",
    "whoItsFor": "Hospital marketing teams building service-line pages (orthopedic surgery, general surgery, cardiothoracic), surgical group practices documenting their procedure menus, and patient-education sites explaining what a specific operation involves.",
    "seoNotes": "SurgicalProcedure markup with bodyLocation and a linked Hospital or Physician sharpens local-search relevance for service-line queries (\"appendectomy near me\"). LLMs use procedure-type specificity when grounding answers about who performs what — a SurgicalProcedure tag is a stronger signal than the generic MedicalProcedure parent.",
    "commonCombos": [
      "schema:Hospital",
      "schema:Physician",
      "schema:MedicalCondition",
      "schema:AnatomicalStructure",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/ency/article/002921.htm) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"SurgicalProcedure\",\n  \"name\": \"Appendectomy\",\n  \"alternateName\": [\"Appendix removal\", \"Surgery to remove the appendix\"],\n  \"description\": \"Surgical removal of the appendix, a finger-shaped organ branching from the colon, performed to treat inflammation or infection.\",\n  \"procedureType\": {\n    \"@type\": \"MedicalProcedureType\",\n    \"name\": \"Surgical\"\n  },\n  \"bodyLocation\": \"Vermiform appendix\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/002921.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Appendectomy is surgery to remove the appendix."
        }
      ],
      "verification": "draft",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Appendectomy",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/002921.htm"
          ]
        },
        {
          "jsonPath": "$.alternateName",
          "value": "Appendix removal, Surgery to remove the appendix",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/002921.htm"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Surgical removal of the appendix, a finger-shaped organ branching from the colon, performed to treat inflammation or infection.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/002921.htm"
          ]
        },
        {
          "jsonPath": "$.procedureType.name",
          "value": "Surgical",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/002921.htm"
          ]
        },
        {
          "jsonPath": "$.bodyLocation",
          "value": "Vermiform appendix",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/002921.htm"
          ]
        }
      ]
    }
  }
} as const;

export const contentStats = {
  "draft": [
    "schema:Drug",
    "schema:MedicalCondition",
    "schema:SurgicalProcedure"
  ],
  "verified": [],
  "flagged": []
};
