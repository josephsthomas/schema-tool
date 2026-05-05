// AUTO-GENERATED — do not edit by hand.
// Regenerate with: pnpm ingest
//
// Joined view of authored sidecars under src/data/content/. Each entry maps
// a term id (e.g. "schema:Drug") to its authored prose, reference example,
// and source citations.

import type { ContentEntry } from '@/types/content';

export const contentIndex: Record<string, ContentEntry> = {
  "schema:Abdomen": {
    "id": "schema:Abdomen",
    "whenToUse": "Use Abdomen when marking up a focused or comprehensive abdominal exam — inspection, auscultation of bowel sounds, percussion, and palpation across the four quadrants. Pair with MedicalCondition entities for abdominal pain, hepatomegaly, or ascites workups."
  },
  "schema:ActiveNotRecruiting": {
    "id": "schema:ActiveNotRecruiting",
    "whenToUse": "Use ActiveNotRecruiting when a study is still active — participants are being followed and data is being collected — but enrollment of new participants has closed. Set this on MedicalStudy.status the same day the registry record flips off recruiting so trial-listing pages don't keep generating inbound enrollment inquiries."
  },
  "schema:AerobicActivity": {
    "id": "schema:AerobicActivity",
    "whenToUse": "Use AerobicActivity for sustained, rhythmic movement of large muscle groups that draws on oxygen-fueled metabolism — walking, jogging, cycling, swimming, dancing. Apply it to ExercisePlan or PhysicalActivity entries that target the cardiovascular and respiratory systems."
  },
  "schema:AnaerobicActivity": {
    "id": "schema:AnaerobicActivity",
    "whenToUse": "Use AnaerobicActivity for short, high-intensity efforts that exceed the body's oxygen-delivery capacity and rely on anaerobic metabolism — sprinting, heavy lifting, plyometric jumps. Apply it when the plan emphasizes power output, sprint intervals, or maximal-effort sets rather than steady-state endurance."
  },
  "schema:AnatomicalStructure": {
    "id": "schema:AnatomicalStructure",
    "whenToUse": "Use AnatomicalStructure for any individual anatomic part — an organ, bone, vessel, or tissue — that exists at a defined body location. It is the canonical parent type for organ pages, anatomy reference articles, and patient-education explainers that center on a single structure rather than a system.",
    "whenNotToUse": "Don't use AnatomicalStructure when the page is really about a system of cooperating structures (use AnatomicalSystem) or about a region of the body surface visible from outside (use SuperficialAnatomy). Don't use it for a disease that affects an organ — that's MedicalCondition with the organ referenced via associatedAnatomy.",
    "whoItsFor": "Health-system patient-education editors building organ explainer pages, medical-school content teams documenting gross anatomy, and clinical reference publishers who need a stable schema.org parent for organ-, bone-, and tissue-level entries.",
    "seoNotes": "AnatomicalStructure rarely earns a dedicated rich result, but it anchors the entity graph so MedicalCondition and MedicalProcedure pages can point back via associatedAnatomy. Keep partOfSystem populated — it lets LLM assistants traverse from a single organ up to its containing system.",
    "commonCombos": [
      "schema:AnatomicalSystem",
      "schema:MedicalCondition",
      "schema:MedicalProcedure"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/heartdiseases.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"AnatomicalStructure\",\n  \"name\": \"Heart\",\n  \"partOfSystem\": {\n    \"@type\": \"AnatomicalSystem\",\n    \"name\": \"Cardiovascular system\"\n  },\n  \"relatedCondition\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Heart failure\",\n      \"description\": \"When your heart can't pump enough blood to meet your body's needs.\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Arrhythmia\",\n      \"description\": \"A problem with the rate or rhythm of your heartbeat.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/heartdiseases.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Heart disease is a general term that includes many types of heart problems. It's a type of cardiovascular disease, which means heart and blood vessel disease."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Heart",
          "sourceUrls": [
            "https://medlineplus.gov/heartdiseases.html"
          ]
        },
        {
          "jsonPath": "$.partOfSystem.name",
          "value": "Cardiovascular system",
          "sourceUrls": [
            "https://medlineplus.gov/heartdiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[0].name",
          "value": "Heart failure",
          "sourceUrls": [
            "https://medlineplus.gov/heartdiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[0].description",
          "value": "When your heart can't pump enough blood to meet your body's needs.",
          "sourceUrls": [
            "https://medlineplus.gov/heartdiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[1].name",
          "value": "Arrhythmia",
          "sourceUrls": [
            "https://medlineplus.gov/heartdiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[1].description",
          "value": "A problem with the rate or rhythm of your heartbeat.",
          "sourceUrls": [
            "https://medlineplus.gov/heartdiseases.html"
          ]
        }
      ]
    }
  },
  "schema:AnatomicalSystem": {
    "id": "schema:AnatomicalSystem",
    "whenToUse": "Use AnatomicalSystem for any page describing a coordinated network of organs and tissues that share a function — cardiovascular, lymphatic, nervous, endocrine, etc. It is the right type for system-level overview pages and for the parent node that individual organ pages reference via partOfSystem.",
    "whenNotToUse": "Don't use AnatomicalSystem for an individual organ or vessel — that's AnatomicalStructure. Don't use it for a disease that affects a system; the disease is MedicalCondition with the system referenced as associatedAnatomy.",
    "whoItsFor": "Editorial teams building system-level hub pages on patient-education sites, medical-school curriculum authors, and clinical reference publishers who need a stable parent for the constituent organ entries.",
    "seoNotes": "AnatomicalSystem pages do not currently earn a dedicated Google rich result, but they are the connective tissue of a medical entity graph — every Drug, MedicalCondition, and MedicalProcedure that references the system gains disambiguation. Populate comprisedOf so crawlers can enumerate the constituent structures.",
    "commonCombos": [
      "schema:AnatomicalStructure",
      "schema:MedicalCondition",
      "schema:MedicalProcedure"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/vasculardiseases.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"AnatomicalSystem\",\n  \"name\": \"Vascular system\",\n  \"description\": \"Your body's network of blood vessels.\",\n  \"comprisedOf\": [\n    {\n      \"@type\": \"AnatomicalStructure\",\n      \"name\": \"Arteries\",\n      \"description\": \"Carry oxygen-rich blood from your heart to your tissues and organs.\"\n    },\n    {\n      \"@type\": \"AnatomicalStructure\",\n      \"name\": \"Veins\",\n      \"description\": \"Carry the blood and waste products back to your heart.\"\n    },\n    {\n      \"@type\": \"AnatomicalStructure\",\n      \"name\": \"Capillaries\",\n      \"description\": \"Tiny blood vessels that connect your small arteries to your small veins.\"\n    }\n  ],\n  \"relatedCondition\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Aneurysm\",\n    \"description\": \"A bulge or ballooning in the wall of an artery.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/vasculardiseases.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The vascular system is your body's network of blood vessels."
        },
        {
          "url": "https://medlineplus.gov/aorticaneurysm.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "An aneurysm is a bulge or 'ballooning' in the wall of an artery."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Vascular system",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Your body's network of blood vessels.",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.comprisedOf[0].name",
          "value": "Arteries",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.comprisedOf[0].description",
          "value": "Carry oxygen-rich blood from your heart to your tissues and organs.",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.comprisedOf[1].name",
          "value": "Veins",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.comprisedOf[1].description",
          "value": "Carry the blood and waste products back to your heart.",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.comprisedOf[2].name",
          "value": "Capillaries",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.comprisedOf[2].description",
          "value": "Tiny blood vessels that connect your small arteries to your small veins.",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition.name",
          "value": "Aneurysm",
          "sourceUrls": [
            "https://medlineplus.gov/aorticaneurysm.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition.description",
          "value": "A bulge or ballooning in the wall of an artery.",
          "sourceUrls": [
            "https://medlineplus.gov/aorticaneurysm.html"
          ]
        }
      ]
    }
  },
  "schema:Anesthesia": {
    "id": "schema:Anesthesia",
    "whenToUse": "Use Anesthesia when scoping a Physician, Hospital, or service line to anesthesiology — perioperative care, regional and general anesthesia, sedation, and acute pain management. Pair with surgical MedicalProcedure entities and OR-team Physician records when documenting peri-op service lines."
  },
  "schema:Appearance": {
    "id": "schema:Appearance",
    "whenToUse": "Use Appearance for the general-appearance portion of an exam — alertness, distress, hygiene, and overall well or ill appearance noted at the start of an encounter. Reserve more granular system exams for their specific PhysicalExam value."
  },
  "schema:ApprovedIndication": {
    "id": "schema:ApprovedIndication",
    "whenToUse": "Use ApprovedIndication for an FDA-cleared (or other regulator-approved) use of a medication or device — the labelled indication a manufacturer can promote. It's the right subtype when a Drug page documents the on-label use that appears in DailyMed or in approved patient information.",
    "whenNotToUse": "Don't use ApprovedIndication for off-label uses. Don't use it for primary prevention contexts — use PreventionIndication. Don't use it for the active treatment intent if you specifically need to mark it as treatment — use TreatmentIndication.",
    "whoItsFor": "Regulatory-affairs writers, medical-affairs editors at pharma manufacturers, and consumer health publishers translating approved labelling.",
    "seoNotes": "ApprovedIndication is consumed via Drug.indication. Google does not currently issue a dedicated rich result; the value is in clearly delineating regulator-approved use from off-label or investigational claims.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalCondition",
      "schema:DrugLegalStatus"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682159.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"ApprovedIndication\",\n  \"name\": \"Ibuprofen for fever\",\n  \"description\": \"Ibuprofen is used to reduce fever. It works by stopping the body's production of a substance that causes pain, fever, and inflammation.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682159.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Ibuprofen is used to reduce fever and to relieve mild pain. Ibuprofen works by stopping the body's production of a substance that causes pain, fever, and inflammation."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Ibuprofen for fever",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Ibuprofen is used to reduce fever. It works by stopping the body's production of a substance that causes pain, fever, and inflammation.",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        }
      ]
    }
  },
  "schema:Artery": {
    "id": "schema:Artery",
    "whenToUse": "Use Artery for any page that centers on a named arterial vessel — aorta, carotid, coronary, femoral, etc. It is the right type for vascular-anatomy reference entries and for the anatomical anchor on disease pages about arterial conditions.",
    "whenNotToUse": "Don't use Artery for veins (use Vein), lymphatic vessels (use LymphaticVessel), or generic blood-vessel content (use Vessel). Don't apply it to a procedure that operates on an artery — that's MedicalProcedure with the artery referenced via bodyLocation or associatedAnatomy.",
    "whoItsFor": "Cardiovascular service-line marketers, vascular-surgery practice editors, interventional-radiology content teams, and patient-education editors building explainer pages for arterial disease.",
    "seoNotes": "Artery pages benefit from explicit partOfSystem (cardiovascular) and supplyTo wiring so LLM-based health assistants can traverse from a vessel to the organs it perfuses. Google does not issue a dedicated rich result for Artery; the value is graph completeness.",
    "commonCombos": [
      "schema:AnatomicalSystem",
      "schema:MedicalCondition",
      "schema:Vessel"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/aorticaneurysm.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Artery\",\n  \"name\": \"Aorta\",\n  \"description\": \"The main artery that runs from the heart through the chest and abdomen.\",\n  \"partOfSystem\": {\n    \"@type\": \"AnatomicalSystem\",\n    \"name\": \"Vascular system\"\n  },\n  \"relatedCondition\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Thoracic aortic aneurysm\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Abdominal aortic aneurysm\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/aorticaneurysm.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The aorta is the main artery that runs from the heart through the chest and abdomen."
        },
        {
          "url": "https://medlineplus.gov/vasculardiseases.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The vascular system is your body's network of blood vessels."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Aorta",
          "sourceUrls": [
            "https://medlineplus.gov/aorticaneurysm.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "The main artery that runs from the heart through the chest and abdomen.",
          "sourceUrls": [
            "https://medlineplus.gov/aorticaneurysm.html"
          ]
        },
        {
          "jsonPath": "$.partOfSystem.name",
          "value": "Vascular system",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[0].name",
          "value": "Thoracic aortic aneurysm",
          "sourceUrls": [
            "https://medlineplus.gov/aorticaneurysm.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[1].name",
          "value": "Abdominal aortic aneurysm",
          "sourceUrls": [
            "https://medlineplus.gov/aorticaneurysm.html"
          ]
        }
      ]
    }
  },
  "schema:Ayurvedic": {
    "id": "schema:Ayurvedic",
    "whenToUse": "Use Ayurvedic for therapies and products grounded in the traditional medical system of the Indian subcontinent, including herbal preparations, dosha-based dietary guidance, panchakarma cleansing protocols, and yoga as therapy. Apply it when the practice traces its theoretical framework to Ayurveda rather than to Western clinical sciences."
  },
  "schema:Bacteria": {
    "id": "schema:Bacteria",
    "whenToUse": "Use Bacteria when the etiologic agent is a pathogenic bacterium — for example Streptococcus pneumoniae, Mycobacterium tuberculosis, or Escherichia coli. Apply it on InfectiousDisease entries describing bacterial pneumonia, urinary tract infection, tuberculosis, and similar conditions where antibacterial therapy is the relevant therapeutic class."
  },
  "schema:Balance": {
    "id": "schema:Balance",
    "whenToUse": "Use Balance for activities that train postural control and reduce fall risk — single-leg stance work, tai chi forms, heel-to-toe walking, perturbation drills. Apply it to plans built for older adults, vestibular rehab, or neurologic recovery where the explicit aim is steadiness rather than aerobic load or strength."
  },
  "schema:BloodTest": {
    "id": "schema:BloodTest",
    "whenToUse": "Use BloodTest as the primary type for any laboratory test performed on a blood specimen — CBC, metabolic panels (when modeled as one test rather than a panel of subtests), HbA1c, lipid measurements, hormone assays, infectious-disease serologies, and similar workups. It's the right subtype whenever the specimen is venous or capillary blood and the page is about that one test.",
    "whenNotToUse": "Don't use BloodTest for tissue or fluid specimens — biopsies, Pap smears, urinalysis, and CSF studies belong to PathologyTest or MedicalTest. Don't use it for bundled orders that ship as a single panel with named components — MedicalTestPanel is the parent and BloodTest can appear as a subTest. Don't use BloodTest on a condition page that lists labs; mark the test as a value, not the page type.",
    "whoItsFor": "Reference-lab and hospital editorial teams, at-home blood-test product marketers, and patient-education writers building result-explainer experiences for common blood work.",
    "seoNotes": "BloodTest extends MedicalTest with the same property set plus a strong expectation of normalRange where defensible. Health-assistant LLMs use signDetected and usedToDiagnose to ground answers like \"what does a CBC show\" and \"what's measured in a lipid panel.\" No dedicated Google rich result; the value is precise entity disambiguation across hundreds of similarly named assays.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalSign",
      "schema:MedicalTestPanel",
      "schema:ReferenceRange",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/lab-tests/complete-blood-count-cbc/) on 2026-05-05. Not for use in client deliverables. Generate your own markup using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"BloodTest\",\n  \"name\": \"Complete Blood Count (CBC)\",\n  \"description\": \"A complete blood count, or CBC, is a group of blood tests that measure the number and size of the different cells in your blood.\",\n  \"usedToDiagnose\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Anemia\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Blood cancers\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Immune system disorders\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Infections\"\n    }\n  ],\n  \"subTest\": [\n    { \"@type\": \"BloodTest\", \"name\": \"Red blood cell count\" },\n    { \"@type\": \"BloodTest\", \"name\": \"White blood cell count\" },\n    { \"@type\": \"BloodTest\", \"name\": \"Platelet count\" },\n    { \"@type\": \"BloodTest\", \"name\": \"Hemoglobin\" },\n    { \"@type\": \"BloodTest\", \"name\": \"Hematocrit\" },\n    { \"@type\": \"BloodTest\", \"name\": \"Mean corpuscular volume (MCV)\" }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A complete blood count, or CBC, is a group of blood tests that measure the number and size of the different cells in your blood. It is also used to monitor a condition or treatment that may affect your blood cell counts such as infections, anemia, immune system disorders, and blood cancers."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Complete Blood Count (CBC)",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A complete blood count, or CBC, is a group of blood tests that measure the number and size of the different cells in your blood.",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[0].name",
          "value": "Anemia",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[1].name",
          "value": "Blood cancers",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[2].name",
          "value": "Immune system disorders",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[3].name",
          "value": "Infections",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.subTest[0].name",
          "value": "Red blood cell count",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.subTest[1].name",
          "value": "White blood cell count",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.subTest[2].name",
          "value": "Platelet count",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.subTest[3].name",
          "value": "Hemoglobin",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.subTest[4].name",
          "value": "Hematocrit",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        },
        {
          "jsonPath": "$.subTest[5].name",
          "value": "Mean corpuscular volume (MCV)",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/complete-blood-count-cbc/"
          ]
        }
      ]
    }
  },
  "schema:Bone": {
    "id": "schema:Bone",
    "whenToUse": "Use Bone for any page about a named bone of the skeleton — femur, humerus, vertebra, mandible. It is the canonical type for skeletal-anatomy reference pages and for the bodyLocation anchor on orthopedic procedure and fracture content.",
    "whenNotToUse": "Don't use Bone for a joint where two bones meet (use Joint), for the connective tissue that binds bones (use Ligament), or for the skeletal system as a whole (use AnatomicalSystem). Don't apply it to a fracture or bone disease — that's MedicalCondition.",
    "whoItsFor": "Orthopedic-practice content teams, sports-medicine editors, radiology reference publishers, and patient-education editors describing fractures, replacements, and skeletal disorders.",
    "seoNotes": "Bone pages strengthen the entity graph for orthopedic procedures and fracture content via bodyLocation. Connect each bone to the broader Skeletal system via partOfSystem so an LLM can answer questions like which bones make up a joint.",
    "commonCombos": [
      "schema:Joint",
      "schema:Ligament",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH NLM MeSH\n// (https://meshb.nlm.nih.gov/record/ui?ui=D005269) and NIH MedlinePlus\n// (https://medlineplus.gov/hipinjuriesanddisorders.html,\n// https://medlineplus.gov/bonediseases.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Bone\",\n  \"name\": \"Femur\",\n  \"description\": \"The longest and largest bone of the skeleton.\",\n  \"bodyLocation\": \"Situated between the hip and the knee.\",\n  \"function\": \"Bones help you move, give you shape and support your body.\",\n  \"relatedCondition\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Hip dysplasia\",\n    \"description\": \"A condition where the ball at the end of the femur is loose in the hip socket.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://meshb.nlm.nih.gov/record/ui?ui=D005269",
          "publisher": "NIH NLM MeSH",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The longest and largest bone of the skeleton, it is situated between the hip and the knee."
        },
        {
          "url": "https://medlineplus.gov/hipinjuriesanddisorders.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Hip dysplasia — where the ball at the end of the femur is loose in the hip socket."
        },
        {
          "url": "https://medlineplus.gov/bonediseases.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Your bones help you move, give you shape and support your body."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Femur",
          "sourceUrls": [
            "https://meshb.nlm.nih.gov/record/ui?ui=D005269"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "The longest and largest bone of the skeleton.",
          "sourceUrls": [
            "https://meshb.nlm.nih.gov/record/ui?ui=D005269"
          ]
        },
        {
          "jsonPath": "$.bodyLocation",
          "value": "Situated between the hip and the knee.",
          "sourceUrls": [
            "https://meshb.nlm.nih.gov/record/ui?ui=D005269"
          ]
        },
        {
          "jsonPath": "$.function",
          "value": "Bones help you move, give you shape and support your body.",
          "sourceUrls": [
            "https://medlineplus.gov/bonediseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition.name",
          "value": "Hip dysplasia",
          "sourceUrls": [
            "https://medlineplus.gov/hipinjuriesanddisorders.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition.description",
          "value": "A condition where the ball at the end of the femur is loose in the hip socket.",
          "sourceUrls": [
            "https://medlineplus.gov/hipinjuriesanddisorders.html"
          ]
        }
      ]
    }
  },
  "schema:BrainStructure": {
    "id": "schema:BrainStructure",
    "whenToUse": "Use BrainStructure for any page about a named region of the brain — hippocampus, cerebellum, basal ganglia, amygdala. It is the right type for neuroanatomy reference articles and for the anatomical anchor on neurological-disease pages where a specific region is implicated.",
    "whenNotToUse": "Don't use BrainStructure for the central nervous system as a whole (use AnatomicalSystem), for cranial nerves (use Nerve), or for a brain tumor or stroke (those are MedicalCondition). Don't use it as the parent for a non-CNS structure that happens to sit in the head.",
    "whoItsFor": "Neurology and neurosurgery practice editors, academic medical-center patient-education teams, behavioral-health publishers, and reference editors building neuroanatomy hubs.",
    "seoNotes": "BrainStructure pages anchor the entity graph for cognitive, psychiatric, and neurological topics. Pair them with relatedCondition on the structure and with associatedAnatomy on the disease page so LLM assistants can navigate both directions.",
    "commonCombos": [
      "schema:AnatomicalSystem",
      "schema:MedicalCondition",
      "schema:Nerve"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH NLM MeSH\n// (https://meshb.nlm.nih.gov/record/ui?ui=D006624) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"BrainStructure\",\n  \"name\": \"Hippocampus\",\n  \"description\": \"A curved elevation of gray matter extending the entire length of the floor of the temporal horn of the lateral ventricle.\",\n  \"subStructure\": [\n    {\n      \"@type\": \"BrainStructure\",\n      \"name\": \"Hippocampus proper\"\n    },\n    {\n      \"@type\": \"BrainStructure\",\n      \"name\": \"Subiculum\"\n    },\n    {\n      \"@type\": \"BrainStructure\",\n      \"name\": \"Dentate gyrus\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://meshb.nlm.nih.gov/record/ui?ui=D006624",
          "publisher": "NIH NLM MeSH",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A curved elevation of gray matter extending the entire length of the floor of the temporal horn of the lateral ventricle. The hippocampus, subiculum, and dentate gyrus constitute the hippocampal formation."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Hippocampus",
          "sourceUrls": [
            "https://meshb.nlm.nih.gov/record/ui?ui=D006624"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A curved elevation of gray matter extending the entire length of the floor of the temporal horn of the lateral ventricle.",
          "sourceUrls": [
            "https://meshb.nlm.nih.gov/record/ui?ui=D006624"
          ]
        },
        {
          "jsonPath": "$.subStructure[0].name",
          "value": "Hippocampus proper",
          "sourceUrls": [
            "https://meshb.nlm.nih.gov/record/ui?ui=D006624"
          ]
        },
        {
          "jsonPath": "$.subStructure[1].name",
          "value": "Subiculum",
          "sourceUrls": [
            "https://meshb.nlm.nih.gov/record/ui?ui=D006624"
          ]
        },
        {
          "jsonPath": "$.subStructure[2].name",
          "value": "Dentate gyrus",
          "sourceUrls": [
            "https://meshb.nlm.nih.gov/record/ui?ui=D006624"
          ]
        }
      ]
    }
  },
  "schema:CT": {
    "id": "schema:CT",
    "whenToUse": "Use CT for X-ray computed tomography studies that reconstruct cross-sectional images from rotational X-ray projections — non-contrast head CT for stroke triage, CT pulmonary angiography, low-dose lung cancer screening, CT abdomen-pelvis for trauma. Apply it on imaging-test entries that need to be distinguished from plain radiography by the cross-sectional reconstruction."
  },
  "schema:Cardiovascular": {
    "id": "schema:Cardiovascular",
    "whenToUse": "Use Cardiovascular when scoping a Physician, Hospital, or service line to heart and vascular care — interventional cardiology, electrophysiology, vascular surgery, and heart-failure programs. Pair with cardiac MedicalCondition entities like Myocardial Infarction or Atrial Fibrillation, and with cardiac MedicalTest entities for echo, stress, and cath."
  },
  "schema:CardiovascularExam": {
    "id": "schema:CardiovascularExam",
    "whenToUse": "Use CardiovascularExam for the cardiac and vascular portion of a physical — heart sounds, murmurs, JVD, peripheral pulses, and edema check. Pair with MedicalCondition entities like Heart Failure or Aortic Stenosis when documenting an exam-driven encounter."
  },
  "schema:CaseSeries": {
    "id": "schema:CaseSeries",
    "whenToUse": "Use CaseSeries when the study tracks a defined group of patients with a known shared exposure or treatment, without a comparison arm. Mark this explicitly so readers don't conflate case-series description with controlled-trial evidence when judging strength of conclusions."
  },
  "schema:Chiropractic": {
    "id": "schema:Chiropractic",
    "whenToUse": "Use Chiropractic for care delivered by a doctor of chiropractic that centers on spinal and joint manipulation, mobilization, and adjacent manual therapies for musculoskeletal complaints. Apply it on procedure and therapy entries delivered under chiropractic licensure rather than under physical therapy or osteopathic medicine."
  },
  "schema:ClaimReview": {
    "id": "schema:ClaimReview",
    "whenToUse": "Use ClaimReview when the page is a fact-check article: a publisher evaluates a specific public claim, assigns a rating (true, false, mostly false, etc.), and shows the reasoning. The claim must be a discrete statement, not a topic or category.",
    "whenNotToUse": "Don't use ClaimReview for general explainer or myth-busting articles that don't review a specific claim, and don't apply it to your own marketing claims. Only the publisher of the fact check — not the publisher of the original claim — should be set as author.",
    "whoItsFor": "Health-misinformation desks at public-health agencies, fact-checking newsrooms covering medical claims, and health-system communications teams responding to viral health rumors with sourced corrections.",
    "seoNotes": "Per Google's fact-check structured data guidance, ClaimReview is the only fact-check rich result Google supports and requires claimReviewed (under 75 characters), reviewRating, and url. Tie itemReviewed to a CreativeWork or Claim and keep author as the fact-checking organization, not the claim's originator.",
    "commonCombos": [
      "schema:Claim",
      "schema:Rating",
      "schema:Organization"
    ],
    "example": {
      "jsonld": "// Reference example — fact-check structure follows Google's ClaimReview\n// guidance (https://developers.google.com/search/docs/appearance/structured-data/factcheck);\n// the underlying claim subject (flu vaccine causing the flu) is reviewed\n// against CDC's published guidance\n// (https://www.cdc.gov/flu/vaccines/keyfacts.html), retrieved on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"ClaimReview\",\n  \"url\": \"https://example.org/fact-check/flu-vaccine-causes-flu\",\n  \"claimReviewed\": \"The flu vaccine can give you the flu.\",\n  \"datePublished\": \"2026-05-05\",\n  \"author\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Example Health Fact-Check Desk\",\n    \"url\": \"https://example.org/\"\n  },\n  \"itemReviewed\": {\n    \"@type\": \"Claim\",\n    \"appearance\": \"https://example.org/social-post-archive/12345\",\n    \"datePublished\": \"2026-04-01\",\n    \"author\": {\n      \"@type\": \"Person\",\n      \"name\": \"Anonymous social media user\"\n    }\n  },\n  \"reviewRating\": {\n    \"@type\": \"Rating\",\n    \"ratingValue\": 1,\n    \"bestRating\": 5,\n    \"worstRating\": 1,\n    \"alternateName\": \"False\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://developers.google.com/search/docs/appearance/structured-data/factcheck",
          "publisher": "Google Search Central",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A short summary of the claim being evaluated. Try to keep this less than 75 characters to minimize wrapping when displayed on a mobile device."
        },
        {
          "url": "https://www.cdc.gov/flu/vaccines/keyfacts.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A flu vaccine cannot give you flu illness."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.claimReviewed",
          "value": "The flu vaccine can give you the flu.",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/keyfacts.html",
            "https://developers.google.com/search/docs/appearance/structured-data/factcheck"
          ]
        },
        {
          "jsonPath": "$.datePublished",
          "value": "2026-05-05",
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/factcheck"
          ]
        },
        {
          "jsonPath": "$.reviewRating.alternateName",
          "value": "False",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/keyfacts.html"
          ]
        },
        {
          "jsonPath": "$.reviewRating.ratingValue",
          "value": 1,
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/factcheck"
          ]
        },
        {
          "jsonPath": "$.reviewRating.bestRating",
          "value": 5,
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/factcheck"
          ]
        },
        {
          "jsonPath": "$.reviewRating.worstRating",
          "value": 1,
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/factcheck"
          ]
        },
        {
          "jsonPath": "$.author.name",
          "value": "Example Health Fact-Check Desk",
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/factcheck"
          ]
        },
        {
          "jsonPath": "$.itemReviewed.datePublished",
          "value": "2026-04-01",
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/factcheck"
          ]
        }
      ]
    }
  },
  "schema:Clinician": {
    "id": "schema:Clinician",
    "whenToUse": "Use Clinician when the content is written for practicing physicians, advanced-practice providers, pharmacists, or other professionals making point-of-care clinical decisions. Apply it to dosing references, diagnostic algorithms, and HCP-gated formulary content where the writing assumes clinical training."
  },
  "schema:CohortStudy": {
    "id": "schema:CohortStudy",
    "whenToUse": "Use CohortStudy for a longitudinal observational design that follows a defined group over time, often comparing participants exposed to a factor against those who are not. Combine with Longitudinal where the protocol specifies repeated follow-up of the same individuals."
  },
  "schema:CommunityHealth": {
    "id": "schema:CommunityHealth",
    "whenToUse": "Use CommunityHealth when scoping an organization or clinician to population-level health work tied to a specific geography — FQHCs, community-health centers, county outreach programs, and mobile clinics. Pair with MedicalOrganization or GovernmentOrganization rather than a single specialist Physician."
  },
  "schema:Completed": {
    "id": "schema:Completed",
    "whenToUse": "Use Completed when a study has finished per its protocol — participants are no longer being followed and data collection has ended. Pair with ResultsAvailable or ResultsNotAvailable so a downstream reader can tell whether the dataset has been published."
  },
  "schema:CrossSectional": {
    "id": "schema:CrossSectional",
    "whenToUse": "Use CrossSectional for a snapshot study that measures exposure and outcome in a population at a single point in time, drawing on survey or census data. State the survey instrument and reference period in description so the snapshot's vintage is visible."
  },
  "schema:DDxElement": {
    "id": "schema:DDxElement",
    "whenToUse": "Use DDxElement to mark up one entry inside a differential-diagnosis list — each candidate condition that explains a presenting symptom belongs in its own DDxElement, paired with the distinguishing factors that move it up or down the list.",
    "whenNotToUse": "Do not use DDxElement as a standalone disease entity — it is meaningful only inside a differential. Do not use it for confirmed diagnoses; once the workup is done, switch to MedicalCondition.",
    "whoItsFor": "Clinical-decision-support editors, point-of-care reference publishers, and medical-education content teams building chief-complaint pages.",
    "seoNotes": "Marking up the differential as DDxElement entries with explicit distinguishingFact values gives an LLM the structure to compare candidate diagnoses rather than treat them as a flat list.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalSignOrSymptom",
      "schema:MedicalTest"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/chestpain.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DDxElement\",\n  \"diagnosis\": [\n    { \"@type\": \"MedicalCondition\", \"name\": \"Heart attack\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Angina\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Costochondritis\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Pneumonia\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Pulmonary embolism\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Heartburn\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Panic attacks\" }\n  ],\n  \"distinguishingSign\": {\n    \"@type\": \"MedicalSymptom\",\n    \"name\": \"Chest pain\",\n    \"description\": \"Chest pain does not always mean that you are having a heart attack.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/chestpain.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Chest pain does not always mean that you are having a heart attack."
        },
        {
          "url": "https://medlineplus.gov/chestpain.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Digestive problems, such as heartburn or esophagus disorders. Sore muscles. Lung diseases, such as pneumonia, pleurisy, or pulmonary embolism. Costochondritis - an inflammation of joints in your chest. Panic attacks."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.diagnosis[0].name",
          "value": "Heart attack",
          "sourceUrls": [
            "https://medlineplus.gov/chestpain.html"
          ]
        },
        {
          "jsonPath": "$.diagnosis[1].name",
          "value": "Angina",
          "sourceUrls": [
            "https://medlineplus.gov/chestpain.html"
          ]
        },
        {
          "jsonPath": "$.diagnosis[2].name",
          "value": "Costochondritis",
          "sourceUrls": [
            "https://medlineplus.gov/chestpain.html"
          ]
        },
        {
          "jsonPath": "$.diagnosis[3].name",
          "value": "Pneumonia",
          "sourceUrls": [
            "https://medlineplus.gov/chestpain.html"
          ]
        },
        {
          "jsonPath": "$.diagnosis[4].name",
          "value": "Pulmonary embolism",
          "sourceUrls": [
            "https://medlineplus.gov/chestpain.html"
          ]
        },
        {
          "jsonPath": "$.diagnosis[5].name",
          "value": "Heartburn",
          "sourceUrls": [
            "https://medlineplus.gov/chestpain.html"
          ]
        },
        {
          "jsonPath": "$.diagnosis[6].name",
          "value": "Panic attacks",
          "sourceUrls": [
            "https://medlineplus.gov/chestpain.html"
          ]
        },
        {
          "jsonPath": "$.distinguishingSign.name",
          "value": "Chest pain",
          "sourceUrls": [
            "https://medlineplus.gov/chestpain.html"
          ]
        },
        {
          "jsonPath": "$.distinguishingSign.description",
          "value": "Chest pain does not always mean that you are having a heart attack.",
          "sourceUrls": [
            "https://medlineplus.gov/chestpain.html"
          ]
        }
      ]
    }
  },
  "schema:Dentist": {
    "id": "schema:Dentist",
    "whenToUse": "Use Dentist for a general dental practitioner offering routine examinations, dental imaging, preventive-care guidance, and referrals for conditions such as gum disease, tooth decay, and orthodontic needs. It fits both the professional and the small practice when the page is centered on the named clinician.",
    "whenNotToUse": "Don't use Dentist for the dental office building when the page is really about hours, address, and bookable visits (use MedicalBusiness with the Dentist as employee). Don't use it for an oral and maxillofacial surgeon when the page describes surgical specialty work — model that with a more specific specialty.",
    "whoItsFor": "Dental-practice owners and their site builders, plus oral-health publishers maintaining 'find a dentist' directories and patient-education explainers about routine dental visits.",
    "seoNotes": "Dentist markup pairs naturally with availableService entries for cleanings, exams, and imaging, plus medicalSpecialty for general dentistry. Linking the Dentist to their MedicalBusiness or affiliated Hospital strengthens local entity associations.",
    "commonCombos": [
      "schema:MedicalBusiness",
      "schema:MedicalProcedure",
      "schema:MedicalSpecialty"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/dentalhealth.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Dentist\",\n  \"name\": \"General Dentist\",\n  \"description\": \"A general dentistry practitioner who provides routine examinations and evaluations, diagnostic imaging, preventive care guidance, and specialist referrals for conditions like gum disease, tooth decay, and orthodontic needs.\",\n  \"availableService\": [\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Routine dental examination\",\n      \"description\": \"Routine examinations and evaluations.\"\n    },\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Dental diagnostic imaging\",\n      \"description\": \"Diagnostic imaging including dental x-rays and panoramic imaging.\"\n    },\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Preventive dental care guidance\",\n      \"description\": \"Brush teeth twice a day with a fluoride toothpaste and clean between teeth every day with floss or another type of between-the-teeth cleaner.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/dentalhealth.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Brush your teeth twice a day with a fluoride toothpaste. Clean between your teeth every day with floss or another type of between-the-teeth cleaner."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A general dentistry practitioner who provides routine examinations and evaluations, diagnostic imaging, preventive care guidance, and specialist referrals for conditions like gum disease, tooth decay, and orthodontic needs.",
          "sourceUrls": [
            "https://medlineplus.gov/dentalhealth.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].name",
          "value": "Routine dental examination",
          "sourceUrls": [
            "https://medlineplus.gov/dentalhealth.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].description",
          "value": "Routine examinations and evaluations.",
          "sourceUrls": [
            "https://medlineplus.gov/dentalhealth.html"
          ]
        },
        {
          "jsonPath": "$.availableService[1].name",
          "value": "Dental diagnostic imaging",
          "sourceUrls": [
            "https://medlineplus.gov/dentalhealth.html"
          ]
        },
        {
          "jsonPath": "$.availableService[1].description",
          "value": "Diagnostic imaging including dental x-rays and panoramic imaging.",
          "sourceUrls": [
            "https://medlineplus.gov/dentalhealth.html"
          ]
        },
        {
          "jsonPath": "$.availableService[2].name",
          "value": "Preventive dental care guidance",
          "sourceUrls": [
            "https://medlineplus.gov/dentalhealth.html"
          ]
        },
        {
          "jsonPath": "$.availableService[2].description",
          "value": "Brush teeth twice a day with a fluoride toothpaste and clean between teeth every day with floss or another type of between-the-teeth cleaner.",
          "sourceUrls": [
            "https://medlineplus.gov/dentalhealth.html"
          ]
        }
      ]
    }
  },
  "schema:Dentistry": {
    "id": "schema:Dentistry",
    "whenToUse": "Use Dentistry when scoping a Dentist, dental practice, or dental-school program to general dental care — restorative, preventive, and routine dental services. Pair with the Dentist type rather than Physician, and reserve oral-surgery and ortho subspecialties for their own service-line entities."
  },
  "schema:Dermatologic": {
    "id": "schema:Dermatologic",
    "whenToUse": "Use Dermatologic as the adjective-style scope value when an entity practices or relates to dermatology but you want the qualifier rather than the noun specialty. For most provider-directory and service-line markup, prefer Dermatology; use Dermatologic only when matching legacy data that carries the adjective form."
  },
  "schema:Dermatology": {
    "id": "schema:Dermatology",
    "whenToUse": "Use Dermatology when scoping a Physician, clinic, or service line to skin, hair, and nail disease — medical, surgical, and cosmetic dermatology. Pair with MedicalCondition entities like Psoriasis, Eczema, or Melanoma, and reserve Dermatologic for legacy adjective-form data."
  },
  "schema:Diagnostic": {
    "id": "schema:Diagnostic",
    "whenToUse": "Use Diagnostic when the device's intended purpose is to identify, characterize, or monitor a condition — imaging systems (MRI, CT, ultrasound), in-vitro lab analyzers, ECG machines, glucose meters, and continuous monitoring sensors. The device produces a measurement or image used to inform a clinical assessment rather than to deliver treatment."
  },
  "schema:DiagnosticLab": {
    "id": "schema:DiagnosticLab",
    "whenToUse": "Use DiagnosticLab for a clinical laboratory that analyzes samples of blood, urine, or body tissues to determine whether results fall within the normal range — supporting diagnosis, treatment planning, and monitoring of disease progression over time.",
    "whenNotToUse": "Don't use DiagnosticLab for the test itself (use MedicalTest or its subtypes such as BloodTest, Pathology Test, or ImagingTest) or for the broader hospital that contains the lab (use Hospital). Don't use it for an at-home self-test kit manufacturer.",
    "whoItsFor": "Reference labs and hospital-affiliated lab editors building location and capability pages, and patient-education publishers explaining what happens when a doctor 'sends a sample to the lab'.",
    "seoNotes": "DiagnosticLab benefits from a populated availableTest list — each MedicalTest entry helps search and assistant systems answer 'does this lab run X test'. Address and hours still matter because many labs accept walk-in specimen collection.",
    "commonCombos": [
      "schema:MedicalTest",
      "schema:BloodTest",
      "schema:Hospital"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/laboratorytests.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DiagnosticLab\",\n  \"name\": \"Community Clinical Laboratory\",\n  \"description\": \"A clinical laboratory that checks samples of blood, urine, or body tissues; a technician or doctor analyzes the test samples to see if results fall within the normal range.\",\n  \"availableTest\": [\n    {\n      \"@type\": \"MedicalTest\",\n      \"name\": \"Blood test\"\n    },\n    {\n      \"@type\": \"MedicalTest\",\n      \"name\": \"Urinalysis\"\n    },\n    {\n      \"@type\": \"MedicalTest\",\n      \"name\": \"Pathology sample analysis\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/laboratorytests.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Laboratory tests check a sample of your blood, urine, or body tissues. A technician or your doctor analyzes the test samples to see if your results fall within the normal range."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A clinical laboratory that checks samples of blood, urine, or body tissues; a technician or doctor analyzes the test samples to see if results fall within the normal range.",
          "sourceUrls": [
            "https://medlineplus.gov/laboratorytests.html"
          ]
        },
        {
          "jsonPath": "$.availableTest[0].name",
          "value": "Blood test",
          "sourceUrls": [
            "https://medlineplus.gov/laboratorytests.html"
          ]
        },
        {
          "jsonPath": "$.availableTest[1].name",
          "value": "Urinalysis",
          "sourceUrls": [
            "https://medlineplus.gov/laboratorytests.html"
          ]
        },
        {
          "jsonPath": "$.availableTest[2].name",
          "value": "Pathology sample analysis",
          "sourceUrls": [
            "https://medlineplus.gov/laboratorytests.html"
          ]
        }
      ]
    }
  },
  "schema:DiagnosticProcedure": {
    "id": "schema:DiagnosticProcedure",
    "whenToUse": "Use DiagnosticProcedure for any procedure performed to establish or rule out a diagnosis — colonoscopy, endoscopy, biopsy, imaging study, EKG, lab draw protocols. Pages that explain a test, list what it screens for, or document how a clinician confirms a condition all warrant DiagnosticProcedure.",
    "whenNotToUse": "Don't use DiagnosticProcedure when the same procedure is being performed for treatment rather than diagnosis — a polypectomy during colonoscopy is therapeutic. Don't use it for surgical operations (use SurgicalProcedure) or for therapy delivery (use TherapeuticProcedure). For routine vitals and assessments without a diagnostic question, MedicalProcedure is the cleaner parent.",
    "whoItsFor": "Hospital imaging centers, GI and cardiology service lines, screening programs, and patient-education pages explaining what a test entails and what it can detect.",
    "seoNotes": "DiagnosticProcedure markup with usesDevice and bodyLocation helps search engines connect a test to the conditions it screens for. LLMs use the explicit Diagnostic procedureType to differentiate screening colonoscopy from a therapeutic resection performed in the same anatomical region.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalDevice",
      "schema:Hospital",
      "schema:Physician",
      "schema:AnatomicalStructure"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/ency/article/003886.htm) on 2026-05-05. Not for use in client deliverables.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DiagnosticProcedure\",\n  \"name\": \"Colonoscopy\",\n  \"description\": \"A colonoscopy is an exam that views the inside of the colon (large intestine) and rectum.\",\n  \"procedureType\": {\n    \"@type\": \"MedicalProcedureType\",\n    \"name\": \"Diagnostic\"\n  },\n  \"bodyLocation\": \"Colon and rectum\",\n  \"usesDevice\": {\n    \"@type\": \"MedicalDevice\",\n    \"name\": \"Colonoscope\",\n    \"description\": \"The colonoscope has a small camera attached to a flexible tube that can reach the entire length of the colon.\"\n  },\n  \"preparation\": \"Your bowel needs to be completely empty and clean for the exam. You need to drink plenty of clear liquids for 1 to 3 days before the test.\",\n  \"howPerformed\": \"The scope is gently inserted through the anus. It is carefully moved into the lowest part of the large intestine.\",\n  \"followup\": \"You should be able to return to your regular activities the next day. Avoid driving, operating machinery, drinking alcohol, and making important decisions for at least 24 hours.\",\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"Abdominal pain, changes in bowel movements, or weight loss; blood in the stool, or black, tarry stools\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/003886.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A colonoscopy is an exam that views the inside of the colon (large intestine) and rectum."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Colonoscopy",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A colonoscopy is an exam that views the inside of the colon (large intestine) and rectum.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        },
        {
          "jsonPath": "$.procedureType.name",
          "value": "Diagnostic",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        },
        {
          "jsonPath": "$.bodyLocation",
          "value": "Colon and rectum",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        },
        {
          "jsonPath": "$.usesDevice.name",
          "value": "Colonoscope",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        },
        {
          "jsonPath": "$.usesDevice.description",
          "value": "The colonoscope has a small camera attached to a flexible tube that can reach the entire length of the colon.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        },
        {
          "jsonPath": "$.preparation",
          "value": "Bowel must be empty and clean; drink clear liquids 1 to 3 days before the test.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "The scope is gently inserted through the anus. It is carefully moved into the lowest part of the large intestine.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        },
        {
          "jsonPath": "$.followup",
          "value": "Return to regular activities next day; avoid driving, machinery, alcohol, important decisions for at least 24 hours.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "Abdominal pain, changes in bowel movements, weight loss, blood in stool",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003886.htm"
          ]
        }
      ]
    }
  },
  "schema:Diet": {
    "id": "schema:Diet",
    "whenToUse": "Use Diet for any structured eating pattern with a defined name, food-group emphasis, and editorial point of view — DASH, Mediterranean, low-FODMAP, ketogenic, plant-based protocols. It is the canonical type for marking up the dietFeatures, expert considerations, and the conditions a pattern is designed to address. Choose Diet when the page is about the eating plan itself rather than a single food, recipe, or restaurant menu.",
    "whenNotToUse": "Do not use Diet for an individual recipe page — use Recipe. Do not use it for a single ingredient, beverage, or packaged food item — use FoodOrDrink subtypes. Do not apply Diet to a clinical condition page that mentions an eating pattern as one possible intervention; that page wants MedicalCondition as primary, with Diet appearing as a referenced value on a treatment property.",
    "whoItsFor": "Health-system content teams publishing patient-education hubs, registered-dietitian content authors, cardiology and nephrology service-line editors describing therapeutic eating patterns, and consumer-health editors covering named diets with documented food-group rules.",
    "seoNotes": "Diet pages benefit from explicit dietFeatures arrays and named expertConsiderations because LLM-based assistants ground answers about food-group rules and sodium guidance on these structured fields. Google does not issue a dedicated rich result for Diet; the value is entity disambiguation against named eating patterns and stronger grounding for queries that combine a diet name with a condition.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Recipe",
      "schema:NutritionInformation",
      "schema:FAQPage",
      "schema:HealthTopicContent",
      "schema:MedicalAudience"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/dashdiet.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Diet\",\n  \"name\": \"DASH eating plan\",\n  \"alternateName\": \"Dietary Approaches to Stop Hypertension\",\n  \"description\": \"An eating plan based on research studies sponsored by the National Heart, Lung, and Blood Institute (NHLBI), designed to address high blood pressure and improve cholesterol levels.\",\n  \"dietFeatures\": [\n    \"Emphasizes vegetables, fruits, and whole grains\",\n    \"Includes fat-free or low-fat dairy products\",\n    \"Includes fish, poultry, beans, and nuts\",\n    \"Uses vegetable oils\",\n    \"Limits foods high in saturated fat such as fatty meats and full-fat dairy\",\n    \"Limits tropical oils including coconut, palm kernel, and palm\",\n    \"Limits sugar-sweetened beverages and sweets\"\n  ],\n  \"expertConsiderations\": \"The plan works best alongside maintaining a healthy weight, exercising, and avoiding smoking.\",\n  \"recognizingAuthority\": {\n    \"@type\": \"Organization\",\n    \"name\": \"National Heart, Lung, and Blood Institute\",\n    \"url\": \"https://www.nhlbi.nih.gov\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/dashdiet.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "DASH stands for Dietary Approaches to Stop Hypertension. It is an eating plan that is based on research studies sponsored by the National Heart, Lung, and Blood Institute (NHLBI)."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "DASH eating plan",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.alternateName",
          "value": "Dietary Approaches to Stop Hypertension",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "An eating plan based on research studies sponsored by the National Heart, Lung, and Blood Institute (NHLBI), designed to address high blood pressure and improve cholesterol levels.",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.dietFeatures[0]",
          "value": "Emphasizes vegetables, fruits, and whole grains",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.dietFeatures[1]",
          "value": "Includes fat-free or low-fat dairy products",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.dietFeatures[2]",
          "value": "Includes fish, poultry, beans, and nuts",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.dietFeatures[3]",
          "value": "Uses vegetable oils",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.dietFeatures[4]",
          "value": "Limits foods high in saturated fat such as fatty meats and full-fat dairy",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.dietFeatures[5]",
          "value": "Limits tropical oils including coconut, palm kernel, and palm",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.dietFeatures[6]",
          "value": "Limits sugar-sweetened beverages and sweets",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.expertConsiderations",
          "value": "The plan works best alongside maintaining a healthy weight, exercising, and avoiding smoking.",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        },
        {
          "jsonPath": "$.recognizingAuthority.name",
          "value": "National Heart, Lung, and Blood Institute",
          "sourceUrls": [
            "https://medlineplus.gov/dashdiet.html"
          ]
        }
      ]
    }
  },
  "schema:DietNutrition": {
    "id": "schema:DietNutrition",
    "whenToUse": "Use DietNutrition when scoping a clinician or service line to clinical nutrition and dietetics — registered dietitians, medical-nutrition-therapy programs, and bariatric or renal nutrition counseling. Pair with Diet entities and with MedicalCondition entities like Diabetes or Chronic Kidney Disease where nutrition is core to the care plan."
  },
  "schema:DietarySupplement": {
    "id": "schema:DietarySupplement",
    "whenToUse": "Use DietarySupplement for any vitamin, mineral, herbal, or amino-acid product sold as a supplement rather than a regulated drug — vitamin D3, omega-3, melatonin, probiotics. It's the right type when a page describes a non-prescription product whose claims fall under DSHEA labelling rather than FDA new-drug review.",
    "whenNotToUse": "Don't use DietarySupplement for prescription or OTC medications — use Drug. Don't use it for medical foods or infant formulas. Don't use it for fortified consumer foods like cereal that happen to contain added vitamins.",
    "whoItsFor": "Supplement-brand content teams, retailer catalog editors, and consumer-health publishers writing supplement explainer pages.",
    "seoNotes": "DietarySupplement supports activeIngredient, recommendedIntake, and safetyConsideration fields that align with FDA Supplement Facts panel structure. Google does not surface a dedicated rich result; the value is structured-data clarity for product knowledge graphs.",
    "commonCombos": [
      "schema:Product",
      "schema:Offer",
      "schema:NutritionInformation"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/vitamind.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DietarySupplement\",\n  \"name\": \"Vitamin D3\",\n  \"activeIngredient\": \"Vitamin D3\",\n  \"description\": \"Vitamin D supplement form. Vitamin D helps the body absorb calcium, one of the main building blocks of bone.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/vitamind.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The two forms of vitamin D in supplements are D2 and D3. It helps your body absorb calcium. Calcium is one of the main building blocks of bone."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Vitamin D3",
          "sourceUrls": [
            "https://medlineplus.gov/vitamind.html"
          ]
        },
        {
          "jsonPath": "$.activeIngredient",
          "value": "Vitamin D3",
          "sourceUrls": [
            "https://medlineplus.gov/vitamind.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Vitamin D supplement form. Vitamin D helps the body absorb calcium, one of the main building blocks of bone.",
          "sourceUrls": [
            "https://medlineplus.gov/vitamind.html"
          ]
        }
      ]
    }
  },
  "schema:DoseSchedule": {
    "id": "schema:DoseSchedule",
    "whenToUse": "Use DoseSchedule as the parent type when you need to describe how a drug, supplement, or therapy is dosed without committing to either a recommended, maximum, or reported subtype. It captures targetPopulation, doseUnit, doseValue, and frequency in a single structured block referenced from a Drug or MedicalTherapy.",
    "whenNotToUse": "Don't use DoseSchedule when you specifically mean an upper bound — use MaximumDoseSchedule. Don't use it for a label-derived starting dose — use RecommendedDoseSchedule. Don't use it for self-reported real-world dosing — use ReportedDoseSchedule.",
    "whoItsFor": "Drug-information editors, clinical decision-support content teams, and patient-education writers presenting dose data alongside indication and strength.",
    "seoNotes": "DoseSchedule is consumed via Drug.doseSchedule. Google does not currently issue a dedicated rich result; the structured value is in cleanly separating dose magnitude, unit, and frequency for downstream consumers.",
    "commonCombos": [
      "schema:Drug",
      "schema:DrugStrength",
      "schema:MedicalTherapy"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a696005.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DoseSchedule\",\n  \"name\": \"Metformin regular tablet schedule\",\n  \"frequency\": \"two or three times a day with meals\",\n  \"targetPopulation\": \"Adults with type 2 diabetes\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a696005.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The regular tablet is usually taken with meals two or three times a day. Metformin is used to treat type 2 diabetes."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Metformin regular tablet schedule",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.frequency",
          "value": "two or three times a day with meals",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.targetPopulation",
          "value": "Adults with type 2 diabetes",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        }
      ]
    }
  },
  "schema:DoubleBlindedTrial": {
    "id": "schema:DoubleBlindedTrial",
    "whenToUse": "Use DoubleBlindedTrial when neither the participant nor the investigator delivering or assessing the intervention knows the assignment. State this explicitly on trial-listing pages — readers and AI assistants weigh blinding when judging methodological strength."
  },
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
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
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
  "schema:DrugClass": {
    "id": "schema:DrugClass",
    "whenToUse": "Use DrugClass to mark up a pharmacologic class hub page — the canonical entity that groups individual drugs by mechanism of action or therapeutic category, such as NSAIDs, biguanides, or salicylates. It pairs naturally with Drug entries that reference it via drugClass, letting search engines disambiguate the class as a distinct concept from any single member drug.",
    "whenNotToUse": "Don't use DrugClass for an individual drug page — use Drug. Don't use it for a non-pharmacologic grouping like a brand family or a manufacturer formulary section. Don't use it for dietary supplement categories — use DietarySupplement on the member entries.",
    "whoItsFor": "Medical editors building drug-class landing pages for consumer health portals, formulary curators at health systems and payers, and pharmacology educators publishing reference content.",
    "seoNotes": "DrugClass is most valuable as the target of a Drug.drugClass property — the cross-link is what carries entity weight. Google does not currently issue a dedicated rich result for DrugClass; the value is structured-data clarity for medical knowledge graphs.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalCondition",
      "schema:WebPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682159.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DrugClass\",\n  \"name\": \"Nonsteroidal anti-inflammatory drugs (NSAIDs)\",\n  \"drug\": {\n    \"@type\": \"Drug\",\n    \"name\": \"Ibuprofen\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682159.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Ibuprofen is in a class of medications called NSAIDs (nonsteroidal anti-inflammatory drugs)."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Nonsteroidal anti-inflammatory drugs (NSAIDs)",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.drug.name",
          "value": "Ibuprofen",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        }
      ]
    }
  },
  "schema:DrugCost": {
    "id": "schema:DrugCost",
    "whenToUse": "Use DrugCost to mark up a discrete cost data point for a medication — wholesale acquisition cost, formulary tier price, retail dispensing cost, or patient out-of-pocket figure. It's the right type when a Drug page needs to expose a specific price tied to a strength, currency, and cost type.",
    "whenNotToUse": "Don't use DrugCost for an entire price list or formulary table without per-drug context — wrap each entry in its own DrugCost. Don't use it for a free-text price disclaimer; it expects structured fields like costPerUnit, costCurrency, and drugUnit.",
    "whoItsFor": "Pharmacy benefit editors publishing formulary tiers, transparent-pricing platforms, and consumer drug-price comparison sites.",
    "seoNotes": "DrugCost appears as a property of a parent Drug via cost. Google does not surface a dedicated rich result for DrugCost; its value is in machine-readable price disclosure and feeding downstream price-comparison tools.",
    "commonCombos": [
      "schema:Drug",
      "schema:DrugStrength",
      "schema:Offer"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a696005.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n//\n// Note: MedlinePlus describes metformin as a prescription medication for type 2\n// diabetes; it does not publish dispensing prices. The costPerUnit field below\n// is left as a placeholder for your own verified price input.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DrugCost\",\n  \"name\": \"Metformin tablet cost entry\",\n  \"applicableLocation\": \"US\",\n  \"costCategory\": \"Retail\",\n  \"drugUnit\": \"Tablet\",\n  \"costCurrency\": \"USD\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a696005.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Metformin comes as a liquid, a tablet, and an extended-release (long-acting) tablet to take by mouth."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Metformin tablet cost entry",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.applicableLocation",
          "value": "US",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.costCategory",
          "value": "Retail",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.drugUnit",
          "value": "Tablet",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.costCurrency",
          "value": "USD",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        }
      ]
    }
  },
  "schema:DrugCostCategory": {
    "id": "schema:DrugCostCategory",
    "whenToUse": "Use DrugCostCategory on a DrugCost record to declare which side of the supply chain a price refers to — Wholesale (acquisition cost paid by a pharmacy), Retail (cash price paid by a consumer), or ReimbursementCap (the maximum a payer will pay). Pair it with costPerUnit, costCurrency, and applicableLocation so the price has unambiguous meaning.",
    "whenNotToUse": "Don't use DrugCostCategory to express patient out-of-pocket cost or copay tier — those reflect plan design rather than category. Don't apply it to non-drug medical services; DrugCost is specific to medications dispensed as products.",
    "whoItsFor": "Pharmacy benefit managers, formulary publishers, payer-facing drug-pricing pages, and consumer transparency tools that surface multiple price points for the same NDC.",
    "seoNotes": "Disambiguating Wholesale vs. Retail vs. ReimbursementCap helps LLMs answer pricing questions without conflating the figures. Always pair the category with currency and locale so the value is self-describing in a knowledge-graph context.",
    "commonCombos": [
      "schema:DrugCost",
      "schema:Drug",
      "schema:AdministrativeArea",
      "schema:HealthInsurancePlan"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682159.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DrugCost\",\n  \"drugUnit\": \"Tablet (200 mg)\",\n  \"costPerUnit\": \"0.05\",\n  \"costCurrency\": \"USD\",\n  \"costCategory\": \"Retail\",\n  \"applicableLocation\": {\n    \"@type\": \"AdministrativeArea\",\n    \"name\": \"United States\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682159.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Ibuprofen comes as a tablet, chewable tablet, suspension (liquid), and drops (concentrated liquid) to take by mouth. It is also available as a nonprescription tablet for use in adults."
        },
        {
          "url": "https://medlineplus.gov/medicareprescriptiondrugcoverage.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Medicare prescription drug coverage helps pay for the drugs you need. Each plan can vary in cost and the specific drugs covered."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.drugUnit",
          "value": "Tablet (200 mg)",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.costPerUnit",
          "value": "0.05",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.costCurrency",
          "value": "USD",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.costCategory",
          "value": "Retail",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.applicableLocation.name",
          "value": "United States",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        }
      ]
    }
  },
  "schema:DrugLegalStatus": {
    "id": "schema:DrugLegalStatus",
    "whenToUse": "Use DrugLegalStatus to mark up the regulatory standing of a medication — prescription-only, over-the-counter, or controlled-substance schedule. Attach it to a Drug via legalStatus when the page needs to disclose how the product is dispensed under US or other national rules.",
    "whenNotToUse": "Don't use DrugLegalStatus for non-regulatory labels like FDA black-box warnings — those belong in drugWarning. Don't use it for clinical-trial investigational status; that is a study attribute, not a marketed-product attribute.",
    "whoItsFor": "Regulatory-affairs editors at pharma manufacturers, formulary content teams, and patient-education writers explaining why a product requires a prescription.",
    "seoNotes": "DrugLegalStatus is interpreted as a sub-property of Drug.legalStatus. Google does not currently issue a dedicated rich result, but the field aids medical knowledge-graph alignment with DailyMed labelling.",
    "commonCombos": [
      "schema:Drug",
      "schema:DrugPrescriptionStatus",
      "schema:MedicalEnumeration"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a696005.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DrugLegalStatus\",\n  \"name\": \"Prescription only\",\n  \"applicableLocation\": {\n    \"@type\": \"AdministrativeArea\",\n    \"name\": \"United States\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a696005.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Follow the directions on your prescription label carefully, and ask your doctor or pharmacist to explain any part you do not understand."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Prescription only",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.applicableLocation.name",
          "value": "United States",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        }
      ]
    }
  },
  "schema:DrugPregnancyCategory": {
    "id": "schema:DrugPregnancyCategory",
    "whenToUse": "Use DrugPregnancyCategory on a Drug to record a legacy FDA pregnancy letter category (A, B, C, D, X, or NotEvaluated) when a drug's labeling still carries that designation in legacy reference text. The enumeration mirrors the historical FDA letter system as captured in older labeling and patient education content.",
    "whenNotToUse": "Don't treat this as the current FDA standard. The FDA replaced letter categories with the Pregnancy and Lactation Labeling Rule (PLLR) narrative format in 2015, and post-2015 labeling carries narrative pregnancy, lactation, and reproductive-potential subsections instead. Don't apply DrugPregnancyCategory to drugs whose labeling has been converted to PLLR narrative format.",
    "whoItsFor": "Drug-information publishers and pharmacy reference editors maintaining legacy monograph content, plus product-information teams reconciling older monographs against current DailyMed labels.",
    "seoNotes": "AI answer engines still receive questions like \"is X a Category C drug?\"; carrying the legacy value where it appears in source labeling preserves answer fidelity, but pair it with a note linking to the current PLLR narrative on DailyMed so users land on the authoritative current label.",
    "commonCombos": [
      "schema:Drug",
      "schema:DrugPrescriptionStatus",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682878.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Drug\",\n  \"name\": \"Isotretinoin\",\n  \"nonProprietaryName\": \"isotretinoin\",\n  \"pregnancyCategory\": \"FDAcategoryX\",\n  \"pregnancyWarning\": \"Isotretinoin must not be used by patients who are pregnant or who may become pregnant during therapy. There is a high risk that isotretinoin will cause severe birth defects or death of the unborn baby.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682878.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Isotretinoin must not be taken by patients who are pregnant or who may become pregnant during the time of treatment. Isotretinoin causes severe birth defects in babies whose mothers took the medication during pregnancy."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Isotretinoin",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682878.html"
          ]
        },
        {
          "jsonPath": "$.nonProprietaryName",
          "value": "isotretinoin",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682878.html"
          ]
        },
        {
          "jsonPath": "$.pregnancyCategory",
          "value": "FDAcategoryX",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682878.html"
          ]
        },
        {
          "jsonPath": "$.pregnancyWarning",
          "value": "Isotretinoin must not be used by patients who are pregnant or who may become pregnant during therapy. There is a high risk that isotretinoin will cause severe birth defects or death of the unborn baby.",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682878.html"
          ]
        }
      ]
    }
  },
  "schema:DrugPrescriptionStatus": {
    "id": "schema:DrugPrescriptionStatus",
    "whenToUse": "Use DrugPrescriptionStatus on Drug.prescriptionStatus to declare whether a medication is prescription-only or available over the counter. It's the simplest two-state signal that helps a search engine or assistant tell a user whether they need a clinician visit before purchasing.",
    "whenNotToUse": "Don't use it to encode pharmacy stocking, controlled-substance schedule, or behind-the-counter status — those are separate concepts. A single product sold in both Rx and OTC strengths needs separate Drug entries, one per status.",
    "whoItsFor": "Retail pharmacy chains, drug-information publishers, and patient-education sites that need to disambiguate consumer access at the SKU or monograph level.",
    "seoNotes": "Status carries directly into AI answers about \"do I need a prescription for X?\" — keep it accurate against the current DailyMed label. If the same active ingredient sells in both forms, model them as distinct Drug nodes so the status field stays unambiguous.",
    "commonCombos": [
      "schema:Drug",
      "schema:DrugStrength",
      "schema:DrugClass"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682159.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Drug\",\n  \"name\": \"Ibuprofen\",\n  \"nonProprietaryName\": \"ibuprofen\",\n  \"prescriptionStatus\": \"OTC\",\n  \"description\": \"Nonprescription ibuprofen is used to reduce fever and to relieve mild pain from headaches, muscle aches, arthritis, menstrual periods, the common cold, toothaches, and backaches.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682159.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Nonprescription ibuprofen is used to reduce fever and to relieve mild pain from headaches, muscle aches, arthritis, menstrual periods, the common cold, toothaches, and backaches. Prescription ibuprofen is used to relieve pain, tenderness, swelling, and stiffness caused by osteoarthritis and rheumatoid arthritis."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Ibuprofen",
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
          "jsonPath": "$.prescriptionStatus",
          "value": "OTC",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Nonprescription ibuprofen is used to reduce fever and to relieve mild pain from headaches, muscle aches, arthritis, menstrual periods, the common cold, toothaches, and backaches.",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        }
      ]
    }
  },
  "schema:DrugStrength": {
    "id": "schema:DrugStrength",
    "whenToUse": "Use DrugStrength to mark up a single named strength of a medication — for example, metformin 500 mg tablet or amoxicillin 250 mg/5 mL suspension. It captures the active-ingredient amount and unit so the strength can be referenced from a Drug entity, a formulary listing, or a dose schedule.",
    "whenNotToUse": "Don't use DrugStrength for the dosing instruction itself — that's DoseSchedule. Don't use it for the dosage form alone (tablet vs. capsule); pair it with the parent Drug's dosageForm property instead.",
    "whoItsFor": "Pharma product editors, hospital formulary curators, and pharmacy data publishers normalizing strength variants for a single active ingredient.",
    "seoNotes": "DrugStrength is consumed as part of a Drug entity. Google does not currently issue a dedicated rich result, but explicit strength markup helps disambiguate same-name variants in medical knowledge graphs.",
    "commonCombos": [
      "schema:Drug",
      "schema:DoseSchedule",
      "schema:HealthInsurancePlan"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH DailyMed\n// (https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=metformin+500+mg)\n// on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"DrugStrength\",\n  \"name\": \"Metformin 500 mg tablet\",\n  \"activeIngredient\": \"Metformin\",\n  \"strengthValue\": 500,\n  \"strengthUnit\": \"mg\"\n}\n",
      "sources": [
        {
          "url": "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=metformin+500+mg&pagesize=20&page=1",
          "publisher": "NIH DailyMed",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "METFORMIN ER 500 MG tablet"
        },
        {
          "url": "https://medlineplus.gov/druginfo/meds/a696005.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Metformin comes as a liquid, a tablet, and an extended-release (long-acting) tablet to take by mouth."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Metformin 500 mg tablet",
          "sourceUrls": [
            "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=metformin+500+mg&pagesize=20&page=1",
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.activeIngredient",
          "value": "Metformin",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.strengthValue",
          "value": 500,
          "sourceUrls": [
            "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=metformin+500+mg&pagesize=20&page=1"
          ]
        },
        {
          "jsonPath": "$.strengthUnit",
          "value": "mg",
          "sourceUrls": [
            "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=metformin+500+mg&pagesize=20&page=1"
          ]
        }
      ]
    }
  },
  "schema:Ear": {
    "id": "schema:Ear",
    "whenToUse": "Use Ear for otologic exam — external ear inspection, otoscopy, tympanic-membrane assessment, and gross hearing screen. Pair with MedicalCondition entities like Otitis Media or Cerumen Impaction."
  },
  "schema:Emergency": {
    "id": "schema:Emergency",
    "whenToUse": "Use Emergency when scoping a Physician, emergency department, or urgent service line to acute-care evaluation of trauma and sudden illness. Pair with EmergencyService and Hospital entities for ED landing pages, and keep urgent-care (sub-acute walk-in) markup distinct from true emergency care."
  },
  "schema:Endocrine": {
    "id": "schema:Endocrine",
    "whenToUse": "Use Endocrine when scoping a Physician or clinic to endocrinology — diabetes, thyroid, adrenal, pituitary, and metabolic-bone disease. Pair with MedicalCondition entities like Type 2 Diabetes, Hashimoto Thyroiditis, or Cushing Syndrome on service-line and find-a-doctor pages."
  },
  "schema:EnrollingByInvitation": {
    "id": "schema:EnrollingByInvitation",
    "whenToUse": "Use EnrollingByInvitation when participants are being added only from a pre-identified pool — for example a registry, a clinic panel, or a referral list — rather than the open public. The trial-listing page should make this explicit so unsolicited self-referrals don't reach the coordinator inbox."
  },
  "schema:EvidenceLevelA": {
    "id": "schema:EvidenceLevelA",
    "whenToUse": "Use EvidenceLevelA when the recommendation is supported by multiple randomized clinical trials or meta-analyses pooling RCT data — the strongest tier in the schema.org three-step grading. Reserve it for guideline statements where the originating society has explicitly graded the evidence as A or has cited at least two independent RCTs."
  },
  "schema:EvidenceLevelB": {
    "id": "schema:EvidenceLevelB",
    "whenToUse": "Use EvidenceLevelB when the recommendation derives from a single randomized trial or from nonrandomized studies such as cohort or case-control work. This tier covers guideline points that have empirical support but lack the redundancy of multiple-RCT or meta-analytic confirmation."
  },
  "schema:EvidenceLevelC": {
    "id": "schema:EvidenceLevelC",
    "whenToUse": "Use EvidenceLevelC when the recommendation rests on consensus opinion of experts, case studies, or accepted standard-of-care without supporting trial data. Mark guideline statements at this level when the society explicitly notes the absence of trial evidence or labels the point as expert consensus."
  },
  "schema:ExercisePlan": {
    "id": "schema:ExercisePlan",
    "whenToUse": "Use ExercisePlan for a structured, named program that prescribes specific aerobic and muscle-strengthening activity over a defined cadence — CDC adult activity guidelines, cardiac-rehab phase plans, post-op rehab protocols, branded fitness programs with explicit workload. It is the canonical type for marking up activityDuration, activityFrequency, exerciseType, restPeriods, and workload. Choose ExercisePlan when the page describes the prescription itself, not a single workout session.",
    "whenNotToUse": "Do not use ExercisePlan for a single workout, class, or session — use Event or a custom activity entry. Do not use it for a single movement or activity primitive (walking, running, swimming) without a structured program — use PhysicalActivity. Do not apply it to a clinical condition page that mentions exercise as one possible intervention; that page wants MedicalCondition as primary, with ExercisePlan referenced as a treatment.",
    "whoItsFor": "Cardiac and pulmonary rehab program editors, sports-medicine and physical-therapy content teams, employer-wellness platform editors publishing structured activity prescriptions, and consumer-health editors translating federal physical activity guidelines into structured pages.",
    "seoNotes": "ExercisePlan pages benefit from explicit activityDuration and activityFrequency values because LLM-based assistants ground weekly-minute and session-count answers on these structured fields. Google does not issue a dedicated rich result for ExercisePlan; the value is entity disambiguation between named programs and stronger grounding for queries about minutes-per-week and sessions-per-week prescriptions.",
    "commonCombos": [
      "schema:PhysicalActivity",
      "schema:MedicalCondition",
      "schema:HowTo",
      "schema:FAQPage",
      "schema:MedicalAudience",
      "schema:Organization"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC Physical\n// Activity Basics (https://www.cdc.gov/physical-activity-basics/guidelines/adults.html)\n// on 2026-05-05. Not for use in client deliverables. Generate your own markup\n// using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"ExercisePlan\",\n  \"name\": \"CDC physical activity guidelines for adults\",\n  \"description\": \"Federal guideline-based weekly activity plan combining moderate-intensity aerobic activity with muscle-strengthening activity targeting all major muscle groups.\",\n  \"exerciseType\": \"Aerobic activity and muscle-strengthening activity\",\n  \"activityDuration\": \"150 minutes of moderate-intensity physical activity a week, or 75 minutes of vigorous-intensity activity, or an equivalent combination of both\",\n  \"activityFrequency\": \"Aerobic activity can be distributed as 30 minutes a day, 5 days a week; muscle-strengthening activity at least 2 days a week\",\n  \"additionalVariable\": \"Muscle-strengthening activity should target all major muscle groups: legs, hips, back, abdomen, chest, shoulders, and arms\",\n  \"workload\": \"Moderate-intensity examples include brisk walking; vigorous-intensity examples include jogging or running\",\n  \"restPeriods\": \"Aerobic minutes can be broken up into smaller chunks of time across the week\",\n  \"recognizingAuthority\": {\n    \"@type\": \"Organization\",\n    \"name\": \"U.S. Centers for Disease Control and Prevention\",\n    \"url\": \"https://www.cdc.gov\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "150 minutes of moderate-intensity physical activity a week ... or 75 minutes of vigorous-intensity ... and 2 days of muscle-strengthening activity each week."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "CDC physical activity guidelines for adults",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Federal guideline-based weekly activity plan combining moderate-intensity aerobic activity with muscle-strengthening activity targeting all major muscle groups.",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
          ]
        },
        {
          "jsonPath": "$.exerciseType",
          "value": "Aerobic activity and muscle-strengthening activity",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
          ]
        },
        {
          "jsonPath": "$.activityDuration",
          "value": "150 minutes of moderate-intensity physical activity a week, or 75 minutes of vigorous-intensity activity, or an equivalent combination of both",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
          ]
        },
        {
          "jsonPath": "$.activityFrequency",
          "value": "Aerobic activity can be distributed as 30 minutes a day, 5 days a week; muscle-strengthening activity at least 2 days a week",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
          ]
        },
        {
          "jsonPath": "$.additionalVariable",
          "value": "Muscle-strengthening activity should target all major muscle groups: legs, hips, back, abdomen, chest, shoulders, and arms",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
          ]
        },
        {
          "jsonPath": "$.workload",
          "value": "Moderate-intensity examples include brisk walking; vigorous-intensity examples include jogging or running",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
          ]
        },
        {
          "jsonPath": "$.restPeriods",
          "value": "Aerobic minutes can be broken up into smaller chunks of time across the week",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
          ]
        },
        {
          "jsonPath": "$.recognizingAuthority.name",
          "value": "U.S. Centers for Disease Control and Prevention",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
          ]
        }
      ]
    }
  },
  "schema:Eye": {
    "id": "schema:Eye",
    "whenToUse": "Use Eye for ophthalmologic exam — visual acuity, pupil response, extraocular movements, conjunctival inspection, and fundoscopy. Pair with MedicalCondition entities like Conjunctivitis, Glaucoma, or Diabetic Retinopathy."
  },
  "schema:FAQPage": {
    "id": "schema:FAQPage",
    "whenToUse": "Use FAQPage when the page is a list of questions and authoritative answers authored by the site itself — a vaccine FAQ, a procedure prep FAQ, a billing FAQ. Each question must have exactly one acceptedAnswer and the content must not be user-submitted.",
    "whenNotToUse": "Don't use FAQPage for forums or Q&A pages where multiple users can answer (use QAPage instead), and don't wrap a single question-and-answer block in FAQPage. Don't use it for marketing copy styled as questions when the answers don't actually answer the question.",
    "whoItsFor": "Public-health communicators publishing vaccine and disease FAQs, health-system editors maintaining patient-instruction Q&A, and SEO teams structuring high-intent question content for retrieval.",
    "seoNotes": "Per Google's structured data guidance, FAQPage requires mainEntity as an array of Question with acceptedAnswer; Google has restricted FAQ rich results to authoritative government and health sites, but the markup remains valuable for LLM retrieval and assistant surfaces. Keep questions verbatim to user phrasing.",
    "commonCombos": [
      "schema:Question",
      "schema:Answer",
      "schema:MedicalWebPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/flu/vaccines/keyfacts.html and\n// https://www.cdc.gov/flu/vaccines/index.html), with property semantics from\n// Google's FAQPage structured data guidance\n// (https://developers.google.com/search/docs/appearance/structured-data/faqpage),\n// retrieved on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"FAQPage\",\n  \"name\": \"Influenza Vaccine FAQ\",\n  \"mainEntity\": [\n    {\n      \"@type\": \"Question\",\n      \"name\": \"Who should get a flu vaccine?\",\n      \"acceptedAnswer\": {\n        \"@type\": \"Answer\",\n        \"text\": \"Everyone 6 months and older in the United States, with rare exception, should get a flu vaccine every season.\"\n      }\n    },\n    {\n      \"@type\": \"Question\",\n      \"name\": \"Can a flu vaccine give me the flu?\",\n      \"acceptedAnswer\": {\n        \"@type\": \"Answer\",\n        \"text\": \"A flu vaccine cannot give you flu illness.\"\n      }\n    },\n    {\n      \"@type\": \"Question\",\n      \"name\": \"How effective is the flu vaccine?\",\n      \"acceptedAnswer\": {\n        \"@type\": \"Answer\",\n        \"text\": \"During seasons when flu vaccine viruses are similar to circulating flu viruses, flu vaccine has been shown to reduce the risk of having to go to the doctor with flu by 40% to 60%.\"\n      }\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://developers.google.com/search/docs/appearance/structured-data/faqpage",
          "publisher": "Google Search Central",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "An array of Question elements which contain the list of answered questions that this FAQPage is about. You must specify at least one valid Question item."
        },
        {
          "url": "https://www.cdc.gov/flu/vaccines/keyfacts.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Everyone 6 months and older in the United States, with rare exception, should get a flu vaccine every season."
        },
        {
          "url": "https://www.cdc.gov/flu/vaccines/index.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "During seasons when flu vaccine viruses are similar to circulating flu viruses, flu vaccine has been shown to reduce the risk of having to go to the doctor with flu by 40% to 60%."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Influenza Vaccine FAQ",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/keyfacts.html"
          ]
        },
        {
          "jsonPath": "$.mainEntity[0].name",
          "value": "Who should get a flu vaccine?",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/keyfacts.html",
            "https://developers.google.com/search/docs/appearance/structured-data/faqpage"
          ]
        },
        {
          "jsonPath": "$.mainEntity[0].acceptedAnswer.text",
          "value": "Everyone 6 months and older in the United States, with rare exception, should get a flu vaccine every season.",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/keyfacts.html"
          ]
        },
        {
          "jsonPath": "$.mainEntity[1].name",
          "value": "Can a flu vaccine give me the flu?",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/keyfacts.html"
          ]
        },
        {
          "jsonPath": "$.mainEntity[1].acceptedAnswer.text",
          "value": "A flu vaccine cannot give you flu illness.",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/keyfacts.html"
          ]
        },
        {
          "jsonPath": "$.mainEntity[2].name",
          "value": "How effective is the flu vaccine?",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/index.html"
          ]
        },
        {
          "jsonPath": "$.mainEntity[2].acceptedAnswer.text",
          "value": "During seasons when flu vaccine viruses are similar to circulating flu viruses, flu vaccine has been shown to reduce the risk of having to go to the doctor with flu by 40% to 60%.",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/index.html"
          ]
        }
      ]
    }
  },
  "schema:FDAcategoryA": {
    "id": "schema:FDAcategoryA",
    "whenToUse": "Use FDAcategoryA on a Drug.pregnancyCategory only when the legacy FDA letter category was assigned and still appears in source labeling — adequate, well-controlled studies in pregnant patients did not show fetal risk in the first trimester. Acknowledge in adjacent copy that the FDA replaced letter categories with the PLLR narrative format in 2015."
  },
  "schema:FDAcategoryB": {
    "id": "schema:FDAcategoryB",
    "whenToUse": "Use FDAcategoryB only when the legacy FDA letter assignment was B and remains in source labeling — animal reproduction studies did not demonstrate fetal risk and adequate, well-controlled human studies are absent. Link readers to the current PLLR pregnancy section on DailyMed for the authoritative narrative."
  },
  "schema:FDAcategoryC": {
    "id": "schema:FDAcategoryC",
    "whenToUse": "Use FDAcategoryC only when the legacy FDA letter assignment was C and remains in source labeling — animal studies showed an adverse effect on the fetus and adequate, well-controlled human studies are absent, but potential benefit may justify use. Pair with a link to the current PLLR pregnancy narrative."
  },
  "schema:FDAcategoryD": {
    "id": "schema:FDAcategoryD",
    "whenToUse": "Use FDAcategoryD only when the legacy FDA letter assignment was D and remains in source labeling — there is positive evidence of human fetal risk based on adverse-reaction reports, though potential benefit may still justify use in serious settings. Always pair with a link to the current PLLR narrative for the live label."
  },
  "schema:FDAcategoryX": {
    "id": "schema:FDAcategoryX",
    "whenToUse": "Use FDAcategoryX only when the legacy FDA letter assignment was X and remains in source labeling — fetal abnormalities have been demonstrated and risk in pregnancy clearly outweighs any benefit. The contraindication should be stated in plain language in adjacent description text rather than relying on the letter alone."
  },
  "schema:FDAnotEvaluated": {
    "id": "schema:FDAnotEvaluated",
    "whenToUse": "Use FDAnotEvaluated when the drug carried no FDA pregnancy letter category — for example because it predates the system or was approved after the 2015 PLLR transition. Carry the value openly rather than leaving the field blank so readers don't infer a category that was never assigned."
  },
  "schema:Flexibility": {
    "id": "schema:Flexibility",
    "whenToUse": "Use Flexibility for activities that lengthen muscle and increase joint range of motion — static and dynamic stretching, yoga asana, mobility flows, PNF stretching. Apply it to warm-up, cool-down, or recovery blocks where the prescription targets tissue extensibility rather than cardiovascular or strength adaptations."
  },
  "schema:Fungus": {
    "id": "schema:Fungus",
    "whenToUse": "Use Fungus when the etiologic agent is a pathogenic fungal organism — yeasts such as Candida, dimorphic fungi such as Histoplasma, or molds such as Aspergillus. Apply it on entries covering candidiasis, dermatophytosis, cryptococcal meningitis, or invasive mycoses where antifungal therapy is the relevant therapeutic class."
  },
  "schema:Gastroenterologic": {
    "id": "schema:Gastroenterologic",
    "whenToUse": "Use Gastroenterologic when scoping a Physician or service line to GI and hepatology — endoscopy, IBD care, hepatology, and motility. Pair with MedicalCondition entities like Crohn Disease, Ulcerative Colitis, or Cirrhosis, and with MedicalProcedure entities for colonoscopy and EGD."
  },
  "schema:Genetic": {
    "id": "schema:Genetic",
    "whenToUse": "Use Genetic when scoping a Physician, counselor, or program to medical genetics and genomics — hereditary cancer panels, prenatal counseling, and inborn errors of metabolism. Pair with MedicalCondition entities tied to inherited disease and with MedicalTest entities for genetic panels."
  },
  "schema:Genitourinary": {
    "id": "schema:Genitourinary",
    "whenToUse": "Use Genitourinary for GU exam — external genital inspection, pelvic or prostate exam, and CVA-tenderness assessment. Pair with MedicalCondition entities like UTI, BPH, or Pelvic Inflammatory Disease and follow chaperone and consent workflows in the encounter markup."
  },
  "schema:Geriatric": {
    "id": "schema:Geriatric",
    "whenToUse": "Use Geriatric when scoping a Physician or service line to care of older adults — geriatric assessment, dementia care, polypharmacy review, and frailty programs. Pair with MedicalCondition entities like Alzheimer Disease and with care-coordination workflows oriented to older patients."
  },
  "schema:Gynecologic": {
    "id": "schema:Gynecologic",
    "whenToUse": "Use Gynecologic when scoping a Physician or service line to gynecology — well-woman care, menstrual disorders, contraception, pelvic-floor disease, and gynecologic surgery. Pair with Obstetric for clinicians who deliver babies; use Gynecologic alone for pure-gyn practices."
  },
  "schema:Head": {
    "id": "schema:Head",
    "whenToUse": "Use Head for the cranial portion of HEENT — scalp, skull, and facial inspection and palpation. Pair with Neck, Ear, Eye, Nose, and Throat values to document a full HEENT exam in a structured encounter."
  },
  "schema:HealthInsurancePlan": {
    "id": "schema:HealthInsurancePlan",
    "whenToUse": "Use HealthInsurancePlan to mark up a specific health insurance product — a Medicare plan, a marketplace plan, or an employer-sponsored offering — when a page describes the plan's identity, scope, formulary, and provider network. It's the right anchor for plan-comparison pages and member-facing benefit summaries.",
    "whenNotToUse": "Don't use HealthInsurancePlan for a single benefit element like a copay or a covered drug — those belong on HealthPlanCostSharingSpecification or HealthPlanFormulary. Don't use it as a generic Offer for non-health insurance products; it expects health-specific properties such as healthPlanId and includesHealthPlanFormulary.",
    "whoItsFor": "Payer marketing teams, broker comparison tools, Medicare plan finders, and employer benefits portals publishing structured plan descriptions.",
    "seoNotes": "HealthInsurancePlan does not have a dedicated Google rich result, but it gives crawlers a clean handle on plan identity and is the parent that ties HealthPlanFormulary and HealthPlanNetwork together for downstream tooling.",
    "commonCombos": [
      "schema:HealthPlanFormulary",
      "schema:HealthPlanNetwork",
      "schema:HealthPlanCostSharingSpecification"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/medicare.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n//\n// Note: This example describes Medicare itself as a federal health insurance\n// program. healthPlanId is left as a placeholder because MedlinePlus does not\n// assign machine-readable plan identifiers to the program overview.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"HealthInsurancePlan\",\n  \"name\": \"Medicare\",\n  \"description\": \"Medicare is the U.S. government's health insurance program for people age 65 or older. Some people under age 65 can qualify for Medicare, too. They include those with disabilities, permanent kidney failure, or amyotrophic lateral sclerosis. Medicare helps with the cost of health care. It does not cover all medical expenses or the cost of most long-term care.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/medicare.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Medicare is the U.S. government's health insurance program for people age 65 or older. Some people under age 65 can qualify for Medicare, too. They include those with disabilities, permanent kidney failure, or amyotrophic lateral sclerosis. Medicare helps with the cost of health care. It does not cover all medical expenses or the cost of most long-term care."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Medicare",
          "sourceUrls": [
            "https://medlineplus.gov/medicare.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Medicare is the U.S. government's health insurance program for people age 65 or older. Some people under age 65 can qualify for Medicare, too. They include those with disabilities, permanent kidney failure, or amyotrophic lateral sclerosis. Medicare helps with the cost of health care. It does not cover all medical expenses or the cost of most long-term care.",
          "sourceUrls": [
            "https://medlineplus.gov/medicare.html"
          ]
        }
      ]
    }
  },
  "schema:HealthPlanCostSharingSpecification": {
    "id": "schema:HealthPlanCostSharingSpecification",
    "whenToUse": "Use HealthPlanCostSharingSpecification to describe a single cost-sharing rule attached to a benefit — the deductible, copay, or coinsurance a member pays for a defined service or drug tier. It's the right type for plan benefit pages where each cost-sharing element needs its own structured node.",
    "whenNotToUse": "Don't use HealthPlanCostSharingSpecification to describe an entire plan; that's HealthInsurancePlan. Don't use it for a list price or wholesale drug cost; that's DrugCost.",
    "whoItsFor": "Payer benefit publishers, plan-comparison tools, Medicare and marketplace plan finders, and broker portals that surface deductibles and copays at the benefit level.",
    "seoNotes": "HealthPlanCostSharingSpecification is referenced from a parent HealthPlanFormulary or HealthPlanNetwork via healthPlanCostSharing. There is no dedicated Google rich result; the value is in machine-readable cost disclosure for plan-comparison tooling.",
    "commonCombos": [
      "schema:HealthInsurancePlan",
      "schema:HealthPlanFormulary",
      "schema:HealthPlanNetwork"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/ency/patientinstructions/000879.htm) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n//\n// Note: MedlinePlus defines a deductible as a set amount of money a member must\n// pay before insurance starts paying. Specific dollar amounts, coinsurance\n// rates, copay options, and pharmacy categories are plan-specific and should\n// be filled in from your own verified plan documents.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"HealthPlanCostSharingSpecification\",\n  \"name\": \"Plan deductible\",\n  \"description\": \"A set amount of money you have to pay before your insurance starts to pay.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/patientinstructions/000879.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A set amount of money you have to pay before your insurance starts to pay."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Plan deductible",
          "sourceUrls": [
            "https://medlineplus.gov/ency/patientinstructions/000879.htm"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A set amount of money you have to pay before your insurance starts to pay.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/patientinstructions/000879.htm"
          ]
        }
      ]
    }
  },
  "schema:HealthPlanFormulary": {
    "id": "schema:HealthPlanFormulary",
    "whenToUse": "Use HealthPlanFormulary to describe the prescription drug coverage attached to a HealthInsurancePlan — the list of covered medicines, their tier placement, and any mail-order option. It's the right type for a plan's drug-list page or formulary lookup landing page.",
    "whenNotToUse": "Don't use HealthPlanFormulary to describe a single drug — that's a Drug or DrugClass. Don't use it for the cost math of any one benefit; pair it with HealthPlanCostSharingSpecification when you need copay or coinsurance details per tier.",
    "whoItsFor": "Pharmacy benefit managers, payer formulary publishers, Medicare Part D plan pages, and broker tools that surface drug coverage to members.",
    "seoNotes": "HealthPlanFormulary is referenced from a parent HealthInsurancePlan via includesHealthPlanFormulary. There is no dedicated Google rich result; the value is in giving crawlers a structured handle on the drug list so it can flow into plan-comparison tooling.",
    "commonCombos": [
      "schema:HealthInsurancePlan",
      "schema:HealthPlanCostSharingSpecification",
      "schema:Drug"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/medicare.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n//\n// Note: MedlinePlus describes Medicare Part D as prescription drug coverage\n// that helps pay for some medicines. Drug-tier values, mail-order availability,\n// and per-tier cost sharing are plan-specific and should be filled in from your\n// own verified plan documents.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"HealthPlanFormulary\",\n  \"name\": \"Medicare Part D drug coverage\",\n  \"description\": \"Part D is prescription drug coverage. It helps pay for some medicines.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/medicare.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Part D is prescription drug coverage. It helps pay for some medicines."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Medicare Part D drug coverage",
          "sourceUrls": [
            "https://medlineplus.gov/medicare.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Part D is prescription drug coverage. It helps pay for some medicines.",
          "sourceUrls": [
            "https://medlineplus.gov/medicare.html"
          ]
        }
      ]
    }
  },
  "schema:HealthPlanNetwork": {
    "id": "schema:HealthPlanNetwork",
    "whenToUse": "Use HealthPlanNetwork to describe the contracted provider network attached to a HealthInsurancePlan — the set of clinicians and facilities a member can see at the plan's negotiated rates. It's the right type for a plan's network landing page or a tier-specific provider directory.",
    "whenNotToUse": "Don't use HealthPlanNetwork for a single physician or hospital — those are Physician or Hospital. Don't use it to express a benefit's copay or coinsurance; couple it with HealthPlanCostSharingSpecification when you need to express in-network versus out-of-network member liability.",
    "whoItsFor": "Payer network operations, broker comparison tools, provider-directory publishers, and member portals that surface network tier and identifier metadata.",
    "seoNotes": "HealthPlanNetwork is referenced from a parent HealthInsurancePlan via includesHealthPlanNetwork. There is no dedicated Google rich result; the value is giving crawlers and downstream tools a structured handle on which network governs a plan's care.",
    "commonCombos": [
      "schema:HealthInsurancePlan",
      "schema:HealthPlanCostSharingSpecification",
      "schema:MedicalOrganization"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/managedcare.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n//\n// Note: MedlinePlus describes managed care plans as having contracts with\n// providers and facilities; the providers under contract make up the plan's\n// network. healthPlanNetworkId and tier values are plan-specific and should be\n// filled in from your own verified plan documents.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"HealthPlanNetwork\",\n  \"name\": \"Managed care provider network\",\n  \"description\": \"Managed care plans are a type of health insurance. They have contracts with health care providers and medical facilities to provide care for members at reduced costs. These providers make up the plan's network.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/managedcare.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Managed care plans are a type of health insurance. They have contracts with health care providers and medical facilities to provide care for members at reduced costs. These providers make up the plan's network."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Managed care provider network",
          "sourceUrls": [
            "https://medlineplus.gov/managedcare.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Managed care plans are a type of health insurance. They have contracts with health care providers and medical facilities to provide care for members at reduced costs. These providers make up the plan's network.",
          "sourceUrls": [
            "https://medlineplus.gov/managedcare.html"
          ]
        }
      ]
    }
  },
  "schema:Hematologic": {
    "id": "schema:Hematologic",
    "whenToUse": "Use Hematologic when scoping a Physician or service line to hematology — anemias, bleeding and clotting disorders, and benign or malignant blood disease. Pair with Oncologic for hematologic-oncology practices, and pair with MedicalCondition entities like Sickle Cell Disease or Hemophilia."
  },
  "schema:Homeopathic": {
    "id": "schema:Homeopathic",
    "whenToUse": "Use Homeopathic for products and therapies prepared under homeopathic principles of like-cures-like and serial dilution, including HPUS-listed homeopathic drug products. Apply it to draw a clear editorial and regulatory line between homeopathic remedies and conventional pharmaceuticals on retailer or formulary pages that carry both."
  },
  "schema:Hospital": {
    "id": "schema:Hospital",
    "whenToUse": "Use Hospital for a facility that operates as a health facility providing care, including inpatient services, specialized care centers such as birthing or psychiatric care, and acute treatment such as respiratory support, infection-fighting medication, and management of liquids and nutrients during a stay.",
    "whenNotToUse": "Don't use Hospital for an outpatient-only practice that does not admit patients overnight (use MedicalClinic or MedicalBusiness) or for a freestanding clinical laboratory (use DiagnosticLab). Don't use it for the sponsoring legal entity of multiple sites — that's MedicalOrganization.",
    "whoItsFor": "Health-system marketing teams building location pages for hospital campuses, hospital association editors maintaining accredited-facility directories, and reference publishers who need a stable schema.org parent for inpatient-care entries.",
    "seoNotes": "Hospital pages are eligible for local-pack and knowledge-panel surfacing when address, telephone, and medicalSpecialty are populated. Keep availableService aligned to the actual care model so an LLM assistant can answer 'does this hospital handle X' from the markup rather than scraping body copy.",
    "commonCombos": [
      "schema:MedicalOrganization",
      "schema:MedicalSpecialty",
      "schema:MedicalProcedure"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/healthfacilities.html and\n// https://medlineplus.gov/ency/patientinstructions/000017.htm) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Hospital\",\n  \"name\": \"Community Hospital\",\n  \"description\": \"A health facility that provides health care, including inpatient and specialized care.\",\n  \"availableService\": [\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Respiratory support\",\n      \"description\": \"In the hospital, providers help patients breathe better.\"\n    },\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Anti-infective medication administration\",\n      \"description\": \"Medicine to help the body get rid of the germs that cause pneumonia.\"\n    },\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Fluid and nutrition management\",\n      \"description\": \"Making sure patients get enough liquids and nutrients.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/healthfacilities.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Health facilities are places that provide health care. They include hospitals, clinics, outpatient care centers, and specialized care centers, such as birthing centers and psychiatric care centers."
        },
        {
          "url": "https://medlineplus.gov/ency/patientinstructions/000017.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "In the hospital, your providers helped you breathe better. They also gave you medicine to help your body get rid of the germs that cause pneumonia. They also made sure you got enough liquids and nutrients."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A health facility that provides health care, including inpatient and specialized care.",
          "sourceUrls": [
            "https://medlineplus.gov/healthfacilities.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].name",
          "value": "Respiratory support",
          "sourceUrls": [
            "https://medlineplus.gov/ency/patientinstructions/000017.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[0].description",
          "value": "In the hospital, providers help patients breathe better.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/patientinstructions/000017.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[1].name",
          "value": "Anti-infective medication administration",
          "sourceUrls": [
            "https://medlineplus.gov/ency/patientinstructions/000017.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[1].description",
          "value": "Medicine to help the body get rid of the germs that cause pneumonia.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/patientinstructions/000017.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[2].name",
          "value": "Fluid and nutrition management",
          "sourceUrls": [
            "https://medlineplus.gov/ency/patientinstructions/000017.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[2].description",
          "value": "Making sure patients get enough liquids and nutrients.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/patientinstructions/000017.htm"
          ]
        }
      ]
    }
  },
  "schema:HowTo": {
    "id": "schema:HowTo",
    "whenToUse": "Use HowTo when the page guides a reader through an ordered set of steps to complete a single task — handwashing, an at-home injection, a wound-care change, a device cleaning routine. Each HowToStep should be a discrete action, ideally with its own anchor on the page.",
    "whenNotToUse": "Don't use HowTo for clinical procedures performed by a clinician on a patient (use MedicalProcedure) or for recipes (use Recipe). Don't use it for narrative explainers that don't have ordered steps, and don't fabricate a step list to fit the schema.",
    "whoItsFor": "Public-health and patient-instruction editors building self-care guides, infection-prevention teams documenting hygiene protocols, and health-literacy programs translating clinical instructions into plain-language steps.",
    "seoNotes": "Google retired the HowTo rich result for general search in 2023, but the markup is still consumed by assistants and LLM retrieval pipelines and is recognized by schema.org. Keep step text short, action-led, and free of marketing copy; declare totalTime in ISO 8601 duration format.",
    "commonCombos": [
      "schema:HowToStep",
      "schema:HowToSupply",
      "schema:HowToTool"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/clean-hands/about/index.html) on 2026-05-05.\n// Property semantics follow schema.org/HowTo; Google retired its HowTo\n// rich-result documentation in 2023, so this example is for assistant and\n// LLM-retrieval surfaces rather than a Google rich result.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"HowTo\",\n  \"name\": \"How to wash your hands\",\n  \"description\": \"Five-step handwashing procedure from the U.S. Centers for Disease Control and Prevention.\",\n  \"totalTime\": \"PT40S\",\n  \"supply\": [\n    { \"@type\": \"HowToSupply\", \"name\": \"Clean, running water (warm or cold)\" },\n    { \"@type\": \"HowToSupply\", \"name\": \"Soap\" },\n    { \"@type\": \"HowToSupply\", \"name\": \"Clean towel or air dryer\" }\n  ],\n  \"step\": [\n    {\n      \"@type\": \"HowToStep\",\n      \"position\": 1,\n      \"name\": \"Wet\",\n      \"text\": \"Wet your hands with clean, running water (warm or cold), turn off the tap, and apply soap.\"\n    },\n    {\n      \"@type\": \"HowToStep\",\n      \"position\": 2,\n      \"name\": \"Lather\",\n      \"text\": \"Lather your hands by rubbing them together with the soap. Lather the backs of your hands, between your fingers, and under your nails.\"\n    },\n    {\n      \"@type\": \"HowToStep\",\n      \"position\": 3,\n      \"name\": \"Scrub\",\n      \"text\": \"Scrub your hands for at least 20 seconds.\"\n    },\n    {\n      \"@type\": \"HowToStep\",\n      \"position\": 4,\n      \"name\": \"Rinse\",\n      \"text\": \"Rinse your hands well under clean, running water.\"\n    },\n    {\n      \"@type\": \"HowToStep\",\n      \"position\": 5,\n      \"name\": \"Dry\",\n      \"text\": \"Dry your hands using a clean towel or an air dryer.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/clean-hands/about/index.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Wet your hands with clean, running water (warm or cold), turn off the tap, and apply soap. Lather your hands by rubbing them together with the soap. Lather the backs of your hands, between your fingers, and under your nails. Scrub your hands for at least 20 seconds. Rinse your hands well under clean, running water. Dry your hands using a clean towel or an air dryer."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "How to wash your hands",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.totalTime",
          "value": "PT40S",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.supply[0].name",
          "value": "Clean, running water (warm or cold)",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.supply[1].name",
          "value": "Soap",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.supply[2].name",
          "value": "Clean towel or air dryer",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[0].name",
          "value": "Wet",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[0].text",
          "value": "Wet your hands with clean, running water (warm or cold), turn off the tap, and apply soap.",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[1].name",
          "value": "Lather",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[1].text",
          "value": "Lather your hands by rubbing them together with the soap. Lather the backs of your hands, between your fingers, and under your nails.",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[2].name",
          "value": "Scrub",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[2].text",
          "value": "Scrub your hands for at least 20 seconds.",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[3].name",
          "value": "Rinse",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[3].text",
          "value": "Rinse your hands well under clean, running water.",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[4].name",
          "value": "Dry",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        },
        {
          "jsonPath": "$.step[4].text",
          "value": "Dry your hands using a clean towel or an air dryer.",
          "sourceUrls": [
            "https://www.cdc.gov/clean-hands/about/index.html"
          ]
        }
      ]
    }
  },
  "schema:ImagingTest": {
    "id": "schema:ImagingTest",
    "whenToUse": "Use ImagingTest for any radiologic or imaging study — plain-film X-ray, CT, MRI, ultrasound, mammography, PET, fluoroscopy, and nuclear medicine scans. The defining property is usesDevice: imaging studies are inseparable from the modality. Reach for ImagingTest on radiology department service pages, imaging-center procedure pages, and patient-prep instructions for a specific scan.",
    "whenNotToUse": "Don't use ImagingTest for image-guided interventions where the primary action is therapeutic — those are SurgicalProcedure or MedicalProcedure even when imaging is integral. Don't use it for in-vitro diagnostic specimen tests; BloodTest, PathologyTest, and MedicalTest cover those. Don't use ImagingTest on a condition page that mentions imaging; mark the study as a value, not the page type.",
    "whoItsFor": "Hospital and imaging-center marketing teams publishing per-modality service pages, radiology-group editors, and patient-education writers explaining what to expect during a scan.",
    "seoNotes": "Always set usesDevice with the specific modality (X-ray machine, MRI scanner, CT scanner, ultrasound machine) — this is the property health-assistant LLMs use to disambiguate \"chest X-ray\" from \"chest CT\" and to ground anatomic-region answers. Pair with usedToDiagnose for the specific findings the study is ordered for. No dedicated Google rich result; the value is precise grounding for AI-driven health search.",
    "commonCombos": [
      "schema:MedicalDevice",
      "schema:MedicalCondition",
      "schema:Hospital",
      "schema:MedicalAudience",
      "schema:HowTo",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/ency/article/003804.htm) on 2026-05-05. Not for use in client deliverables. Generate your own markup using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"ImagingTest\",\n  \"name\": \"Chest X-Ray\",\n  \"description\": \"A chest x-ray is an x-ray of the chest, lungs, heart, large arteries, ribs, and diaphragm.\",\n  \"usesDevice\": {\n    \"@type\": \"MedicalDevice\",\n    \"name\": \"X-ray machine\"\n  },\n  \"usedToDiagnose\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Pneumonia\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Tuberculosis\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Collapsed lung\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Lung cancer\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Heart failure\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Rib fractures\"\n    }\n  ],\n  \"signDetected\": [\n    { \"@type\": \"MedicalSign\", \"name\": \"Persistent cough\" },\n    { \"@type\": \"MedicalSign\", \"name\": \"Coughing up blood\" },\n    { \"@type\": \"MedicalSign\", \"name\": \"Difficulty breathing\" },\n    { \"@type\": \"MedicalSign\", \"name\": \"Chest pain\" }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/003804.htm",
          "publisher": "NIH MedlinePlus Medical Encyclopedia",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A chest x-ray is an x-ray of the chest, lungs, heart, large arteries, ribs, and diaphragm. You stand in front of the x-ray machine."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Chest X-Ray",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A chest x-ray is an x-ray of the chest, lungs, heart, large arteries, ribs, and diaphragm.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.usesDevice.name",
          "value": "X-ray machine",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[0].name",
          "value": "Pneumonia",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[1].name",
          "value": "Tuberculosis",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[2].name",
          "value": "Collapsed lung",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[3].name",
          "value": "Lung cancer",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[4].name",
          "value": "Heart failure",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[5].name",
          "value": "Rib fractures",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.signDetected[0].name",
          "value": "Persistent cough",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.signDetected[1].name",
          "value": "Coughing up blood",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.signDetected[2].name",
          "value": "Difficulty breathing",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        },
        {
          "jsonPath": "$.signDetected[3].name",
          "value": "Chest pain",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/003804.htm"
          ]
        }
      ]
    }
  },
  "schema:Infectious": {
    "id": "schema:Infectious",
    "whenToUse": "Use Infectious when scoping a Physician or service line to infectious disease — HIV, hepatitis, tuberculosis, antimicrobial stewardship, and travel medicine. Pair with InfectiousDisease MedicalCondition entities and with InfectiousAgentClass values when describing pathogen scope."
  },
  "schema:InfectiousAgentClass": {
    "id": "schema:InfectiousAgentClass",
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC About Influenza\n// (https://www.cdc.gov/flu/about/index.html) on 2026-05-05. Not for use in\n// client deliverables. Generate your own markup using your content in the\n// Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"InfectiousDisease\",\n  \"name\": \"Seasonal influenza\",\n  \"infectiousAgent\": \"Influenza virus\",\n  \"infectiousAgentClass\": \"Virus\",\n  \"transmissionMethod\": \"Spread mainly by droplets made when people with flu cough, sneeze, or talk.\"\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/flu/about/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Influenza (flu) is a contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs."
        },
        {
          "url": "https://www.cdc.gov/flu/about/how-flu-spreads.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Flu viruses spread mainly by droplets made when people with flu cough, sneeze, or talk."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Seasonal influenza",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.infectiousAgent",
          "value": "Influenza virus",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.infectiousAgentClass",
          "value": "Virus",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.transmissionMethod",
          "value": "Spread mainly by droplets made when people with flu cough, sneeze, or talk.",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/how-flu-spreads.html"
          ]
        }
      ]
    }
  },
  "schema:InfectiousDisease": {
    "id": "schema:InfectiousDisease",
    "whenToUse": "Use InfectiousDisease for any condition caused by a transmissible pathogen — viral, bacterial, fungal, or parasitic. It is the right type for influenza, COVID-19, tuberculosis, malaria, and HIV pages where transmission route and infectious agent are the editorial spine.",
    "whenNotToUse": "Do not use InfectiousDisease for non-communicable conditions even when inflammation is involved (autoimmune disease, rheumatoid arthritis). Do not use it for syndromes whose infectious etiology is contested or unconfirmed — fall back to MedicalCondition.",
    "whoItsFor": "Public-health communicators, hospital infection-prevention editors, and travel-medicine teams writing pathogen-specific patient pages.",
    "seoNotes": "Populating infectiousAgent and transmissionMethod on InfectiousDisease lets retrieval systems answer paired questions ('what causes flu' and 'how does it spread') from one entity. Pair with FAQPage for season-specific guidance.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalCondition",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/flu/about/index.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"InfectiousDisease\",\n  \"name\": \"Influenza\",\n  \"alternateName\": \"Flu\",\n  \"description\": \"Flu is a contagious respiratory illness caused by influenza viruses that infect tissues in the nose, throat, and sometimes the lungs.\",\n  \"infectiousAgent\": \"Influenza A and B viruses\",\n  \"infectiousAgentClass\": \"Virus\",\n  \"transmissionMethod\": \"Flu viruses spread mainly by droplets made when people with flu cough, sneeze, or talk.\"\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/flu/about/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Flu is a contagious respiratory illness caused by influenza viruses that infect tissues in the nose, throat, and sometimes the lungs."
        },
        {
          "url": "https://www.cdc.gov/flu/about/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Influenza A and B viruses are responsible for seasonal flu epidemics."
        },
        {
          "url": "https://www.cdc.gov/flu/about/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Flu viruses spread mainly by droplets made when people with flu cough, sneeze, or talk."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Influenza",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.alternateName",
          "value": "Flu",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Flu is a contagious respiratory illness caused by influenza viruses that infect tissues in the nose, throat, and sometimes the lungs.",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.infectiousAgent",
          "value": "Influenza A and B viruses",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.infectiousAgentClass",
          "value": "Virus",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.transmissionMethod",
          "value": "Flu viruses spread mainly by droplets made when people with flu cough, sneeze, or talk.",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        }
      ]
    }
  },
  "schema:InternationalTrial": {
    "id": "schema:InternationalTrial",
    "whenToUse": "Use InternationalTrial when a study enrolls participants in more than one country. Combine with MultiCenterTrial when sites span multiple institutions, and list the participating-country list in description so geographic eligibility is unambiguous."
  },
  "schema:Joint": {
    "id": "schema:Joint",
    "whenToUse": "Use Joint for any page that centers on a named articulation between bones — knee, hip, shoulder, elbow, TMJ. It is the right type for joint-anatomy reference articles and the anatomical anchor on orthopedic, sports-medicine, and rheumatology content.",
    "whenNotToUse": "Don't use Joint for the bones themselves (use Bone), the connective tissue that binds them (use Ligament), or the muscles that move them (use Muscle). Don't apply it to arthritis or injury — those are MedicalCondition with the joint referenced as associatedAnatomy.",
    "whoItsFor": "Orthopedic and sports-medicine practice editors, joint-replacement service-line marketers, rheumatology content teams, and rehab clinics publishing post-op and recovery content.",
    "seoNotes": "Joint pages should connect to their constituent bones and ligaments via subStructure so LLM-based assistants can answer compositional questions. The schema does not currently issue a dedicated rich result for Joint; populate relatedCondition to support disease-side traversal.",
    "commonCombos": [
      "schema:Bone",
      "schema:Ligament",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/kneeinjuriesanddisorders.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Joint\",\n  \"name\": \"Knee joint\",\n  \"description\": \"Made up of bone, cartilage, ligaments and fluid.\",\n  \"functionalClass\": \"Muscles and tendons help the knee joint move.\",\n  \"relatedCondition\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Osteoarthritis of the knee\",\n      \"description\": \"The cartilage in the knee gradually wears away, causing pain and swelling.\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"ACL injury\",\n      \"description\": \"You usually injure your ACL by a sudden twisting motion.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/kneeinjuriesanddisorders.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Your knee joint is made up of bone, cartilage, ligaments and fluid. Muscles and tendons help the knee joint move."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Knee joint",
          "sourceUrls": [
            "https://medlineplus.gov/kneeinjuriesanddisorders.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Made up of bone, cartilage, ligaments and fluid.",
          "sourceUrls": [
            "https://medlineplus.gov/kneeinjuriesanddisorders.html"
          ]
        },
        {
          "jsonPath": "$.functionalClass",
          "value": "Muscles and tendons help the knee joint move.",
          "sourceUrls": [
            "https://medlineplus.gov/kneeinjuriesanddisorders.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[0].name",
          "value": "Osteoarthritis of the knee",
          "sourceUrls": [
            "https://medlineplus.gov/kneeinjuriesanddisorders.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[0].description",
          "value": "The cartilage in the knee gradually wears away, causing pain and swelling.",
          "sourceUrls": [
            "https://medlineplus.gov/kneeinjuriesanddisorders.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[1].name",
          "value": "ACL injury",
          "sourceUrls": [
            "https://medlineplus.gov/kneeinjuriesanddisorders.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[1].description",
          "value": "You usually injure your ACL by a sudden twisting motion.",
          "sourceUrls": [
            "https://medlineplus.gov/kneeinjuriesanddisorders.html"
          ]
        }
      ]
    }
  },
  "schema:LaboratoryScience": {
    "id": "schema:LaboratoryScience",
    "whenToUse": "Use LaboratoryScience when scoping a clinician or facility to clinical-laboratory work — chemistry, hematology, microbiology, immunology, and molecular diagnostics. Pair with DiagnosticLab and MedicalTest entities; use Pathology for the physician-led discipline that interprets tissue and cellular material."
  },
  "schema:LeisureTimeActivity": {
    "id": "schema:LeisureTimeActivity",
    "whenToUse": "Use LeisureTimeActivity for movement performed in discretionary time for recreation or enjoyment — recreational cycling, ballroom dancing, gardening, hiking, pickup basketball. Apply it when the wellness or population-health page distinguishes voluntary recreational movement from work-related or transport-related activity."
  },
  "schema:LifestyleModification": {
    "id": "schema:LifestyleModification",
    "whenToUse": "Use LifestyleModification for a named non-pharmacologic behavior change recommended for a clinical or preventive indication — smoking cessation, weight loss, sodium reduction, sleep-hygiene programs. It is the canonical type for marking up the change's name, description, and the indication it addresses. Choose LifestyleModification when the page is about the behavior change as an intervention with a defined target population.",
    "whenNotToUse": "Do not use LifestyleModification for a structured weekly activity prescription — use ExercisePlan. Do not use it for a named eating pattern with food-group rules — use Diet. Do not use it for a medication-based therapy — use Drug or TherapeuticProcedure. Do not apply it to a clinical condition page that mentions a behavior change as one option; that page wants MedicalCondition as primary, with LifestyleModification referenced as a treatment.",
    "whoItsFor": "Public-health and preventive-medicine editors publishing cessation and behavior-change hubs, primary-care content teams documenting non-pharmacologic interventions, employer-wellness program editors, and patient-education editors describing behavior-change programs alongside clinical pathways.",
    "seoNotes": "LifestyleModification pages benefit from explicit indication values and a clear description of the behavior change because LLM-based assistants ground answers about which condition a behavior addresses on these structured fields. Google does not issue a dedicated rich result for LifestyleModification; the value is entity disambiguation between behavior-change interventions and stronger grounding for queries that pair a behavior change with a condition.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Drug",
      "schema:MedicalTherapy",
      "schema:FAQPage",
      "schema:HealthTopicContent",
      "schema:MedicalAudience"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC Tips From\n// Former Smokers / Quit Smoking\n// (https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html) and\n// NIH MedlinePlus Quitting Smoking (https://medlineplus.gov/quittingsmoking.html)\n// on 2026-05-05. Not for use in client deliverables. Generate your own markup\n// using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"LifestyleModification\",\n  \"name\": \"Smoking cessation\",\n  \"description\": \"Quitting smoking addresses nicotine addiction and its health consequences. Recommended approaches include counseling, FDA-approved nicotine replacement products (patch, lozenge, gum, nasal spray, oral inhaler), prescription medications (varenicline and bupropion SR), and behavioral support such as creating a quit plan and using quitlines.\",\n  \"indication\": [\n    {\n      \"@type\": \"MedicalIndication\",\n      \"name\": \"Reducing risk for heart disease, cancer, lung disease, COPD, diabetes, stroke, and pregnancy complications, as documented in CDC condition-specific resources\"\n    },\n    {\n      \"@type\": \"MedicalIndication\",\n      \"name\": \"Tobacco use, identified by MedlinePlus as the most common preventable cause of death\"\n    }\n  ],\n  \"recognizingAuthority\": {\n    \"@type\": \"Organization\",\n    \"name\": \"U.S. Centers for Disease Control and Prevention\",\n    \"url\": \"https://www.cdc.gov\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Quitlines provide free coaching over the phone to help you quit smoking ... FDA-approved medications include nicotine replacement products (patch, lozenge, gum, nasal spray, oral inhaler), varenicline and bupropion SR ... Preparation is key to quitting successfully, and making a quit plan is the first step."
        },
        {
          "url": "https://medlineplus.gov/quittingsmoking.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Tobacco use is the most common preventable cause of death ... a mixture of counseling and quit-smoking medicine has been shown to be the best method."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Smoking cessation",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html",
            "https://medlineplus.gov/quittingsmoking.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Quitting smoking addresses nicotine addiction and its health consequences. Recommended approaches include counseling, FDA-approved nicotine replacement products (patch, lozenge, gum, nasal spray, oral inhaler), prescription medications (varenicline and bupropion SR), and behavioral support such as creating a quit plan and using quitlines.",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html",
            "https://medlineplus.gov/quittingsmoking.html"
          ]
        },
        {
          "jsonPath": "$.indication[0].name",
          "value": "Reducing risk for heart disease, cancer, lung disease, COPD, diabetes, stroke, and pregnancy complications, as documented in CDC condition-specific resources",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html"
          ]
        },
        {
          "jsonPath": "$.indication[1].name",
          "value": "Tobacco use, identified by MedlinePlus as the most common preventable cause of death",
          "sourceUrls": [
            "https://medlineplus.gov/quittingsmoking.html"
          ]
        },
        {
          "jsonPath": "$.recognizingAuthority.name",
          "value": "U.S. Centers for Disease Control and Prevention",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html"
          ]
        }
      ]
    }
  },
  "schema:Ligament": {
    "id": "schema:Ligament",
    "whenToUse": "Use Ligament for any page about a named band of fibrous connective tissue that joins bone to bone — ACL, PCL, MCL, deltoid ligament. It is the right type for orthopedic and sports-medicine content where the ligament itself is the subject.",
    "whenNotToUse": "Don't use Ligament for tendons (which connect muscle to bone) or for the joint as a whole (use Joint). Don't use it for a sprain, tear, or rupture — that's MedicalCondition with the ligament referenced as associatedAnatomy.",
    "whoItsFor": "Sports-medicine and orthopedic-surgery practice editors, athletic-training and rehab content teams, and patient-education editors describing ligament injury, reconstruction, and recovery.",
    "seoNotes": "Ligament pages benefit from bodyLocation pinning (which joint, between which bones) so LLM assistants can resolve mentions like ACL into a specific anatomic entity. Pair with the relevant Joint via partOfSystem-equivalent navigation.",
    "commonCombos": [
      "schema:Joint",
      "schema:Bone",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/ency/article/001074.htm) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Ligament\",\n  \"name\": \"Anterior cruciate ligament (ACL)\",\n  \"bodyLocation\": \"In the middle of the knee.\",\n  \"function\": \"Prevent the shin bone from sliding out in front of the thigh bone.\",\n  \"relatedCondition\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"ACL injury\",\n    \"description\": \"Over-stretching or tearing of the anterior cruciate ligament (ACL) in the knee.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/001074.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "An ACL injury is the over-stretching or tearing of the anterior cruciate ligament (ACL) in the knee. The ACL is in the middle of the knee. It prevents the shin bone from sliding out in front of the thigh bone."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Anterior cruciate ligament (ACL)",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001074.htm"
          ]
        },
        {
          "jsonPath": "$.bodyLocation",
          "value": "In the middle of the knee.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001074.htm"
          ]
        },
        {
          "jsonPath": "$.function",
          "value": "Prevent the shin bone from sliding out in front of the thigh bone.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001074.htm"
          ]
        },
        {
          "jsonPath": "$.relatedCondition.name",
          "value": "ACL injury",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001074.htm"
          ]
        },
        {
          "jsonPath": "$.relatedCondition.description",
          "value": "Over-stretching or tearing of the anterior cruciate ligament (ACL) in the knee.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001074.htm"
          ]
        }
      ]
    }
  },
  "schema:Longitudinal": {
    "id": "schema:Longitudinal",
    "whenToUse": "Use Longitudinal when the study follows the same individuals across repeated measurement waves over an extended period. Pair with CohortStudy or Registry when both apply — the values describe complementary aspects of the same design."
  },
  "schema:Lung": {
    "id": "schema:Lung",
    "whenToUse": "Use Lung for respiratory exam — inspection of work of breathing, percussion, and auscultation for breath sounds, wheezes, crackles, and rhonchi. Pair with MedicalCondition entities like Asthma, Pneumonia, or COPD."
  },
  "schema:LymphaticVessel": {
    "id": "schema:LymphaticVessel",
    "whenToUse": "Use LymphaticVessel for any page that centers on a named lymphatic conduit — thoracic duct, right lymphatic duct, afferent and efferent lymphatic vessels. It is the right type for lymphatic-anatomy reference content and the anatomical anchor on oncology and lymphedema pages.",
    "whenNotToUse": "Don't use LymphaticVessel for lymph nodes (those are AnatomicalStructure) or for the lymphatic system as a whole (use AnatomicalSystem). Don't apply it to lymphedema or lymphoma — those are MedicalCondition.",
    "whoItsFor": "Oncology service-line editors, vascular- and lymphatic-surgery teams, lymphedema-clinic content owners, and patient-education editors covering lymphatic disorders.",
    "seoNotes": "LymphaticVessel pages are sparse on the open web — well-marked entries become disproportionately useful disambiguators for LLM-based health assistants. Connect to the lymphatic AnatomicalSystem via partOfSystem and to drained regions via runsTo or relevant bodyLocation prose.",
    "commonCombos": [
      "schema:AnatomicalSystem",
      "schema:Vessel",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/lymphaticdiseases.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"LymphaticVessel\",\n  \"name\": \"Lymph vessel\",\n  \"description\": \"Vessels that carry lymph throughout your body.\",\n  \"partOfSystem\": {\n    \"@type\": \"AnatomicalSystem\",\n    \"name\": \"Lymphatic system\"\n  },\n  \"relatedCondition\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Lymphedema\",\n    \"description\": \"Fluid builds in your tissues and causes swelling, called lymphedema.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/lymphaticdiseases.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Lymph vessels - vessels that carry lymph throughout your body. The lymphatic system clears away infection and keeps your body fluids in balance. Sometimes the lymphatic system doesn't work right. Fluid builds in your tissues and causes swelling, called lymphedema."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Lymph vessel",
          "sourceUrls": [
            "https://medlineplus.gov/lymphaticdiseases.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Vessels that carry lymph throughout your body.",
          "sourceUrls": [
            "https://medlineplus.gov/lymphaticdiseases.html"
          ]
        },
        {
          "jsonPath": "$.partOfSystem.name",
          "value": "Lymphatic system",
          "sourceUrls": [
            "https://medlineplus.gov/lymphaticdiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition.name",
          "value": "Lymphedema",
          "sourceUrls": [
            "https://medlineplus.gov/lymphaticdiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition.description",
          "value": "Fluid builds in your tissues and causes swelling, called lymphedema.",
          "sourceUrls": [
            "https://medlineplus.gov/lymphaticdiseases.html"
          ]
        }
      ]
    }
  },
  "schema:MRI": {
    "id": "schema:MRI",
    "whenToUse": "Use MRI for magnetic resonance imaging studies that use a strong magnetic field and radiofrequency pulses to image soft tissue — brain MRI for tumor or demyelination workup, cardiac MRI, MR cholangiopancreatography, musculoskeletal MRI for ligament injury. Apply it on imaging-test entries where the patient page must surface MRI-specific safety screening for implants and devices."
  },
  "schema:MaximumDoseSchedule": {
    "id": "schema:MaximumDoseSchedule",
    "whenToUse": "Use MaximumDoseSchedule to mark an upper bound on dosing — the not-to-exceed quantity per day, per single dose, or per duration. It's the right type for label warnings, OTC packaging directions, and clinical safety boundaries.",
    "whenNotToUse": "Don't use MaximumDoseSchedule for a typical or starting dose — use RecommendedDoseSchedule. Don't use it for what patients actually take in the real world — use ReportedDoseSchedule. Don't use it as a generic dosing wrapper if the page doesn't articulate a ceiling.",
    "whoItsFor": "Patient-safety editors, OTC-label authors, and clinical-content teams responsible for surfacing toxicity ceilings.",
    "seoNotes": "MaximumDoseSchedule is consumed via Drug.maximumIntake. Google does not currently issue a dedicated rich result; the structured value is in surfacing safety ceilings to medical knowledge-graph consumers.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalContraindication",
      "schema:DrugStrength"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682159.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MaximumDoseSchedule\",\n  \"name\": \"Ibuprofen OTC adult maximum daily frequency\",\n  \"frequency\": \"Not more than 6 doses in 24 hours\",\n  \"targetPopulation\": \"Adults and children older than 12 years of age\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682159.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Adults and children older than 12 years of age may usually take nonprescription ibuprofen every 4 to 6 hours as needed for pain or fever, but should not take more than 6 doses in 24 hours."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Ibuprofen OTC adult maximum daily frequency",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.frequency",
          "value": "Not more than 6 doses in 24 hours",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.targetPopulation",
          "value": "Adults and children older than 12 years of age",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalAudience": {
    "id": "schema:MedicalAudience",
    "whenToUse": "Use MedicalAudience to scope a MedicalWebPage, Drug, or other medical entity to a specific reader cohort — patients, caregivers, clinicians, or medical researchers. The audienceType should be a MedicalAudienceType enumeration value (Patient, Clinician, MedicalResearcher); audience-specific audiences such as pregnant women or pediatric patients can be expressed via name and healthCondition.",
    "whenNotToUse": "Don't use MedicalAudience for trial-eligibility cohorts — use a PeopleAudience with healthCondition for trial-recruitment pages. Don't use it as a substitute for a primary entity type; MedicalAudience scopes pages, it doesn't replace the page or product they describe.",
    "whoItsFor": "Health-system content teams maintaining patient-facing vs HCP-facing variants of the same condition page, pharma medical-affairs teams scoping prescribing pages to clinicians, and patient-education editors building age-, sex-, or condition-specific landing pages.",
    "seoNotes": "MedicalAudience markup signals to LLMs and search crawlers which reader the page is written for, sharpening relevance for queries like \"diabetes information for pregnant women\" or \"prescribing info for clinicians\". Pair with audienceType so machine readers can disambiguate Patient vs Clinician variants of the same content.",
    "commonCombos": [
      "schema:MedicalWebPage",
      "schema:Drug",
      "schema:MedicalCondition",
      "schema:HealthInsurancePlan"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/pregnancy.html and\n// https://medlineplus.gov/prenatalcare.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalAudience\",\n  \"name\": \"Pregnant women\",\n  \"audienceType\": \"Patient\",\n  \"description\": \"Prenatal care is the health care you get while you are pregnant.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/prenatalcare.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Prenatal care is the health care you get while you are pregnant."
        },
        {
          "url": "https://medlineplus.gov/pregnancy.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "During prenatal care visits your provider checks your health and carefully monitors your pregnancy until you deliver a healthy baby."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Pregnant women",
          "sourceUrls": [
            "https://medlineplus.gov/prenatalcare.html",
            "https://medlineplus.gov/pregnancy.html"
          ]
        },
        {
          "jsonPath": "$.audienceType",
          "value": "Patient",
          "sourceUrls": [
            "https://medlineplus.gov/prenatalcare.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Prenatal care is the health care you get while you are pregnant.",
          "sourceUrls": [
            "https://medlineplus.gov/prenatalcare.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalAudienceType": {
    "id": "schema:MedicalAudienceType",
    "whenToUse": "Use MedicalAudienceType on a MedicalAudience to declare whether the page targets practicing clinicians or medical researchers — the two role-based categories schema.org defines. Attach the parent MedicalAudience via the audience property on MedicalWebPage or any MedicalEntity to give crawlers and AI assistants a clean reading-level and regulatory-context signal.",
    "whenNotToUse": "Don't use MedicalAudienceType for patient or caregiver content; the schema enum only enumerates Clinician and MedicalResearcher. For patient-facing material, use a MedicalAudience with audienceType set to a free-text patient role or pair with PeopleAudience. Don't conflate audience role with reading level — those are independent attributes.",
    "whoItsFor": "Health-system editorial teams running parallel HCP and consumer sites, pharma medical-affairs publishers separating prescriber-facing from researcher-facing content, and CROs publishing protocol summaries for investigators.",
    "seoNotes": "Marking HCP-only pages with Clinician helps Google distinguish gated professional content from consumer pages on the same condition, which reduces ad-policy friction and improves answer-engine grounding. Pair with noindex or login-gating where regulations require it.",
    "commonCombos": [
      "schema:MedicalAudience",
      "schema:MedicalWebPage",
      "schema:MedicalScholarlyArticle",
      "schema:MedicalGuideline"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/healthtopics.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalWebPage\",\n  \"name\": \"Heart Failure: Updated Management Recommendations\",\n  \"audience\": {\n    \"@type\": \"MedicalAudience\",\n    \"audienceType\": \"Clinician\",\n    \"name\": \"Practicing cardiologists and primary-care physicians\"\n  },\n  \"about\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Heart failure\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/healthtopics.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "MedlinePlus brings together authoritative information from NLM, the National Institutes of Health (NIH), and other government and professional organizations. Health topics include consumer-oriented summaries and links to clinician resources."
        },
        {
          "url": "https://www.nlm.nih.gov/medlineplus/about.html",
          "publisher": "NIH National Library of Medicine",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "MedlinePlus is the National Library of Medicine's web site for patients, families, and friends. The site separates consumer-facing content from professional-oriented resources such as PubMed and clinical practice guidelines aimed at health care providers."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Heart Failure: Updated Management Recommendations",
          "sourceUrls": [
            "https://medlineplus.gov/healthtopics.html"
          ]
        },
        {
          "jsonPath": "$.audience.audienceType",
          "value": "Clinician",
          "sourceUrls": [
            "https://www.nlm.nih.gov/medlineplus/about.html"
          ]
        },
        {
          "jsonPath": "$.audience.name",
          "value": "Practicing cardiologists and primary-care physicians",
          "sourceUrls": [
            "https://www.nlm.nih.gov/medlineplus/about.html"
          ]
        },
        {
          "jsonPath": "$.about.name",
          "value": "Heart failure",
          "sourceUrls": [
            "https://medlineplus.gov/healthtopics.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalBusiness": {
    "id": "schema:MedicalBusiness",
    "whenToUse": "Use MedicalBusiness for a private medical practice operating as a business entity — a family medicine office, a dental practice, an optician shop, or a veterinary clinic — where the entity is both a place that provides health care and a commercial business with hours, address, and bookable services.",
    "whenNotToUse": "Don't use MedicalBusiness for a hospital or community clinic operated by a health system (use Hospital, MedicalClinic, or MedicalOrganization). Don't use it for the licensed individual practitioner — use Physician, Dentist, Optician, or the appropriate Person subtype.",
    "whoItsFor": "Independent medical practice owners and the agencies that build their websites, plus directory publishers that list family doctors, dentists, opticians, and similar small-practice businesses.",
    "seoNotes": "MedicalBusiness inherits LocalBusiness so address, telephone, openingHours, and acceptedPaymentMethod all carry weight in local results. Pair the business with its primary practitioner via employee or staff so an LLM can answer 'who works there'.",
    "commonCombos": [
      "schema:Physician",
      "schema:Dentist",
      "schema:LocalBusiness"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/choosingadoctororhealthcareservice.html and\n// https://medlineplus.gov/healthoccupations.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalBusiness\",\n  \"name\": \"Family Medicine Practice\",\n  \"description\": \"A family doctor practice — one of the health care providers patients select when choosing a doctor or health care service — operating in a doctor's office among the settings where health professionals work.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/choosingadoctororhealthcareservice.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Family doctors - Primary care physicians for general family health needs"
        },
        {
          "url": "https://medlineplus.gov/healthoccupations.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "hospitals...nursing homes, doctors' offices, dentists' offices, outpatient clinics and laboratories."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A family doctor practice — one of the health care providers patients select when choosing a doctor or health care service — operating in a doctor's office among the settings where health professionals work.",
          "sourceUrls": [
            "https://medlineplus.gov/choosingadoctororhealthcareservice.html",
            "https://medlineplus.gov/healthoccupations.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalCause": {
    "id": "schema:MedicalCause",
    "whenToUse": "Use MedicalCause to mark up an established causal agent for a disease — the entity that produces the condition, not merely an entity that raises probability. Tobacco smoke as a cause of lung cancer fits, as do specific pathogens for infectious diseases.",
    "whenNotToUse": "Do not use MedicalCause for factors that only elevate risk — those belong in MedicalRiskFactor. Do not use it for triggers of acute episodes within an existing chronic disease (asthma triggers); those are usually documented as risk or aggravating factors.",
    "whoItsFor": "Public-health writers, oncology editors, and tobacco-cessation campaign teams whose pages explain how a specific exposure produces a specific disease.",
    "seoNotes": "Pair MedicalCause with the diseased causedBy property on MedicalCondition. The bidirectional link is what lets a retrieval system answer both 'what causes lung cancer' and 'what does smoking cause' from the same data.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalRiskFactor",
      "schema:MedicalGuideline"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/tobacco/about/cigarettes-and-cancer.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalCause\",\n  \"name\": \"Cigarette smoking\",\n  \"causeOf\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Lung cancer\",\n    \"description\": \"Cigarette smoking or secondhand smoke exposure cause nearly 9 out of 10 lung cancer deaths. People who smoke increase their risk of developing lung cancer by about 25 times that of people who don't smoke.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/tobacco/about/cigarettes-and-cancer.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Cigarette smoking or secondhand smoke exposure cause nearly 9 out of 10 lung cancer deaths."
        },
        {
          "url": "https://www.cdc.gov/tobacco/about/cigarettes-and-cancer.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "People who smoke increase their risk of developing lung cancer by about 25 times that of people who don't smoke."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Cigarette smoking",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/about/cigarettes-and-cancer.html"
          ]
        },
        {
          "jsonPath": "$.causeOf.name",
          "value": "Lung cancer",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/about/cigarettes-and-cancer.html"
          ]
        },
        {
          "jsonPath": "$.causeOf.description",
          "value": "Cigarette smoking or secondhand smoke exposure cause nearly 9 out of 10 lung cancer deaths. People who smoke increase their risk of developing lung cancer by about 25 times that of people who don't smoke.",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/about/cigarettes-and-cancer.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalClinic": {
    "id": "schema:MedicalClinic",
    "whenToUse": "Use MedicalClinic for a community-based outpatient setting where patients are treated without an overnight stay. It fits free and charitable clinics, school-based health centers, and outpatient care centers that sit alongside hospitals in the broader health-facility map.",
    "whenNotToUse": "Don't use MedicalClinic for a facility that admits patients for inpatient care (use Hospital) or for a single-practitioner private practice operating as a business entity (use MedicalBusiness). Don't use it for a clinical laboratory that only runs tests on samples (use DiagnosticLab).",
    "whoItsFor": "Community health center editors maintaining clinic directories, public health communicators publishing free-clinic finders, and health-system content teams describing outpatient sites distinct from their inpatient hospitals.",
    "seoNotes": "Clinic pages benefit from clear medicalSpecialty and availableService entries so search and assistant surfaces can match user queries like 'free clinic near me' or 'walk-in clinic for X'. Pair with the parent MedicalOrganization when the clinic belongs to a larger system.",
    "commonCombos": [
      "schema:MedicalOrganization",
      "schema:Hospital",
      "schema:MedicalSpecialty"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/healthfacilities.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalClinic\",\n  \"name\": \"Community Health Clinic\",\n  \"description\": \"A clinic is a community-based outpatient setting for patient treatment, included among the health facilities that provide health care.\",\n  \"availableService\": [\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Outpatient care\",\n      \"description\": \"Services offering care without overnight hospital stays.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/healthfacilities.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Health facilities are places that provide health care. They include hospitals, clinics, outpatient care centers, and specialized care centers, such as birthing centers and psychiatric care centers."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A clinic is a community-based outpatient setting for patient treatment, included among the health facilities that provide health care.",
          "sourceUrls": [
            "https://medlineplus.gov/healthfacilities.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].name",
          "value": "Outpatient care",
          "sourceUrls": [
            "https://medlineplus.gov/healthfacilities.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].description",
          "value": "Services offering care without overnight hospital stays.",
          "sourceUrls": [
            "https://medlineplus.gov/healthfacilities.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalCode": {
    "id": "schema:MedicalCode",
    "whenToUse": "Use MedicalCode to attach a controlled-vocabulary identifier — ICD-10-CM, SNOMED CT, MeSH, RxNorm, LOINC — to a clinical concept on a page. The pattern is most valuable as the value of a parent entity's `code` property (a MedicalCondition's ICD-10-CM, a Drug's RxCUI, a MedicalTest's LOINC), where it removes ambiguity for LLM grounding and Knowledge Graph alignment.",
    "whenNotToUse": "Don't use MedicalCode as the primary @type of a stand-alone page — a code without a clinical concept attached has no editorial purpose. Don't use it for proprietary internal product SKUs, EHR order-set IDs, or marketing taxonomy values; those aren't recognized clinical coding systems. Don't omit `codingSystem` — a `codeValue` without its system is not interpretable.",
    "whoItsFor": "Health-system editorial teams syndicating condition and medication content to portals, payer content engineers aligning member-education pages to claims taxonomies, and pharma medical-affairs publishers who need their disease-state pages to disambiguate cleanly into NCHS, NLM, and WHO vocabularies.",
    "seoNotes": "MedicalCode improves entity disambiguation — the same condition name resolves to a single concept when the ICD-10-CM or SNOMED code is present. Google does not surface a dedicated rich result for MedicalCode, but its presence under a parent MedicalCondition or Drug strengthens topical authority and helps LLMs ground retrieval against authoritative coding systems.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Drug",
      "schema:MedicalProcedure",
      "schema:MedicalTest",
      "schema:MedicalIntangible"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/diabetestype2.html), CDC NCHS\n// (https://www.cdc.gov/nchs/icd/icd-10-cm/index.html), and NLM MeSH\n// (https://meshb.nlm.nih.gov/record/ui?ui=D003924) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalCode\",\n  \"name\": \"Type 2 Diabetes Mellitus without complications\",\n  \"codingSystem\": \"ICD-10-CM\",\n  \"codeValue\": \"E11.9\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/diabetestype2.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Type 2 diabetes is a disease in which your blood glucose, or blood sugar, levels are too high."
        },
        {
          "url": "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html",
          "publisher": "CDC National Center for Health Statistics",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "ICD-10-CM (the International Classification of Diseases, Tenth Revision, Clinical Modification) is a standardized system used to code diseases and medical conditions (morbidity) data."
        },
        {
          "url": "https://meshb.nlm.nih.gov/record/ui?ui=D003924",
          "publisher": "NLM MeSH",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Diabetes Mellitus, Type 2 — A subclass of DIABETES MELLITUS that is not INSULIN-responsive or dependent (NIDDM)."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Type 2 Diabetes Mellitus without complications",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html",
            "https://meshb.nlm.nih.gov/record/ui?ui=D003924"
          ]
        },
        {
          "jsonPath": "$.codingSystem",
          "value": "ICD-10-CM",
          "sourceUrls": [
            "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html"
          ]
        },
        {
          "jsonPath": "$.codeValue",
          "value": "E11.9",
          "sourceUrls": [
            "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html"
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
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
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
  "schema:MedicalConditionStage": {
    "id": "schema:MedicalConditionStage",
    "whenToUse": "Use MedicalConditionStage when a page describes one specific stage of a staged disease — most often cancer staging pages built around AJCC or NCI taxonomies. It pairs with a parent MedicalCondition entity and lets you mark up the stage number, sub-stage, and the criteria that define it.",
    "whenNotToUse": "Do not use MedicalConditionStage for the disease overview itself — that is MedicalCondition. Do not use it for severity scales that are not formal stages (Glasgow Coma, NIH Stroke Scale) and do not use it for risk stratification scores like CHA2DS2-VASc.",
    "whoItsFor": "Oncology service-line marketers, NCI-funded cancer center editors, and medical-affairs teams writing patient-education pages keyed to a specific stage of disease.",
    "seoNotes": "Stage-specific pages are how patients search after a biopsy result. Marking the page with MedicalConditionStage and stageAsNumber, plus a back-reference to the parent MedicalCondition, gives LLM-based health assistants a clean entity to cite when a user asks about one stage in isolation.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalTest",
      "schema:MedicalProcedure"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NCI\n// (https://www.cancer.gov/types/breast/stages) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalConditionStage\",\n  \"name\": \"Stage III Breast Cancer\",\n  \"stageAsNumber\": 3,\n  \"subStageSuffix\": \"A, B, C\",\n  \"description\": \"In stage III breast cancer, the cancer is found in the lymph nodes close to the breast, the skin of the breast, or the chest wall.\",\n  \"subjectOf\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Breast Cancer\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cancer.gov/types/breast/stages",
          "publisher": "National Cancer Institute",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "In stage III breast cancer, the cancer is found in the lymph nodes close to the breast, the skin of the breast, or the chest wall."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Stage III Breast Cancer",
          "sourceUrls": [
            "https://www.cancer.gov/types/breast/stages"
          ]
        },
        {
          "jsonPath": "$.stageAsNumber",
          "value": 3,
          "sourceUrls": [
            "https://www.cancer.gov/types/breast/stages"
          ]
        },
        {
          "jsonPath": "$.subStageSuffix",
          "value": "A, B, C",
          "sourceUrls": [
            "https://www.cancer.gov/types/breast/stages"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "In stage III breast cancer, the cancer is found in the lymph nodes close to the breast, the skin of the breast, or the chest wall.",
          "sourceUrls": [
            "https://www.cancer.gov/types/breast/stages"
          ]
        },
        {
          "jsonPath": "$.subjectOf.name",
          "value": "Breast Cancer",
          "sourceUrls": [
            "https://www.cancer.gov/types/breast/stages"
          ]
        }
      ]
    }
  },
  "schema:MedicalContraindication": {
    "id": "schema:MedicalContraindication",
    "whenToUse": "Use MedicalContraindication to mark a clinical situation in which a drug or therapy should not be used — aspirin in children with a viral illness due to Reye's syndrome risk, NSAIDs in late pregnancy, metformin in significant renal impairment. It's the right type for boxed warnings, contraindication labelling, and patient-safety call-outs.",
    "whenNotToUse": "Don't use MedicalContraindication for general adverse effects without a population-specific prohibition — those are warnings, not contraindications. Don't use it for relative cautions where the drug may still be used with monitoring; reserve it for situations the label flags as do-not-use.",
    "whoItsFor": "Patient-safety editors, regulatory and pharmacovigilance writers, and clinical-content teams building decision-support layers.",
    "seoNotes": "MedicalContraindication is consumed via Drug.contraindication or MedicalTherapy.contraindication. Google does not currently issue a dedicated rich result; the value is in surfacing safety boundaries to medical knowledge graphs.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalCondition",
      "schema:Patient"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682878.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalContraindication\",\n  \"name\": \"Aspirin in children and teenagers with a viral illness\",\n  \"description\": \"Aspirin may cause Reye's syndrome (a serious condition in which fat builds up on the brain, liver, and other body organs) in children and teenagers, especially if they have a virus such as chicken pox or the flu.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682878.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Aspirin may cause Reye's syndrome (a serious condition in which fat builds up on the brain, liver, and other body organs) in children and teenagers, especially if they have a virus such as chicken pox or the flu."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Aspirin in children and teenagers with a viral illness",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682878.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Aspirin may cause Reye's syndrome (a serious condition in which fat builds up on the brain, liver, and other body organs) in children and teenagers, especially if they have a virus such as chicken pox or the flu.",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682878.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalDevice": {
    "id": "schema:MedicalDevice",
    "whenToUse": "Use MedicalDevice for any therapeutic, diagnostic, monitoring, or assistive device — implants (pacemakers, stents, joint replacements), durable medical equipment (CPAP, infusion pumps, glucose meters), home monitors (blood pressure, pulse oximeter), and surgical instruments. Apply it on product pages, manufacturer catalog entries, and patient-education pages explaining a device.",
    "whenNotToUse": "Don't use MedicalDevice for medications or biologics — those are Drug or DietarySupplement. Don't use it for the procedure that implants or uses the device; that's SurgicalProcedure or MedicalProcedure with the device referenced as a value. Don't use it for a clinic, lab, or hospital — those are MedicalBusiness subtypes.",
    "whoItsFor": "Device manufacturer marketing teams shipping product detail pages, hospital and DME-supplier service pages, and patient-education editors explaining how to use a home device.",
    "seoNotes": "Set indication and purpose explicitly — these are the properties health-assistant LLMs use to ground \"what does a pacemaker do\" and \"who needs a CPAP.\" Add manufacturer (with Organization) and contraindication where defensible. Google does not currently issue a dedicated rich result for MedicalDevice; the value is entity grounding for AI search and clean disambiguation between device classes (manual vs. digital, wrist vs. arm).",
    "commonCombos": [
      "schema:Organization",
      "schema:MedicalCondition",
      "schema:MedicalProcedure",
      "schema:MedicalContraindication",
      "schema:MedicalAudience",
      "schema:HowTo"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus Medical Encyclopedia (https://medlineplus.gov/ency/article/007482.htm) on 2026-05-05. Not for use in client deliverables. Generate your own markup using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalDevice\",\n  \"name\": \"Home Blood Pressure Monitor\",\n  \"description\": \"A home blood pressure monitor is a device used to keep track of your blood pressure at home. Digital monitors feature a cuff that wraps around your arm with either manual or automatic inflation, and a screen that shows a digital readout of your systolic and diastolic blood pressure.\",\n  \"purpose\": {\n    \"@type\": \"MedicalEntity\",\n    \"name\": \"Tracking blood pressure at home\"\n  },\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"Patients whose health care provider has asked them to keep track of their blood pressure at home\"\n  },\n  \"contraindication\": {\n    \"@type\": \"MedicalContraindication\",\n    \"name\": \"A digital blood pressure monitor will not be as accurate if your body is moving when you are using it. An irregular heart rate will make the reading less accurate.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/007482.htm",
          "publisher": "NIH MedlinePlus Medical Encyclopedia",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Your health care provider may ask you to keep track of your blood pressure at home. To do this, you will need to get a home blood pressure monitor. Digital monitors have a cuff that wraps around your arm. The screen will show a digital readout of your systolic and diastolic blood pressure. A digital blood pressure monitor will not be as accurate if your body is moving when you are using it. Also, an irregular heart rate will make the reading less accurate."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Home Blood Pressure Monitor",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007482.htm"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A home blood pressure monitor is a device used to keep track of your blood pressure at home. Digital monitors feature a cuff that wraps around your arm with either manual or automatic inflation, and a screen that shows a digital readout of your systolic and diastolic blood pressure.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007482.htm"
          ]
        },
        {
          "jsonPath": "$.purpose.name",
          "value": "Tracking blood pressure at home",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007482.htm"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "Patients whose health care provider has asked them to keep track of their blood pressure at home",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007482.htm"
          ]
        },
        {
          "jsonPath": "$.contraindication.name",
          "value": "A digital blood pressure monitor will not be as accurate if your body is moving when you are using it. An irregular heart rate will make the reading less accurate.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007482.htm"
          ]
        }
      ]
    }
  },
  "schema:MedicalDevicePurpose": {
    "id": "schema:MedicalDevicePurpose",
    "whenToUse": "Use MedicalDevicePurpose on a MedicalDevice to declare whether the device is intended to diagnose a condition or to treat one. Attach via the purpose property so a reader (or a knowledge graph) can separate imaging hardware, lab analyzers, and monitoring sensors from infusion pumps, implants, and surgical instruments.",
    "whenNotToUse": "Don't use MedicalDevicePurpose for software-as-a-medical-device classification (Class I/II/III) — that maps to a regulatory classification, not the schema enum. Don't use it on consumer wellness products that lack an FDA medical-device clearance; non-medical devices belong on Product, not MedicalDevice.",
    "whoItsFor": "Medical-device manufacturers publishing product detail pages, hospital procurement catalogs, and clinical-engineering inventories that need a coarse machine-readable purpose alongside the device's regulatory classification.",
    "seoNotes": "Diagnostic vs. Therapeutic is the most useful first-pass filter for AI assistants answering device questions. Pair the purpose with a precise device name and FDA 510(k) or PMA reference where available so the markup grounds against a regulated record.",
    "commonCombos": [
      "schema:MedicalDevice",
      "schema:MedicalContraindication",
      "schema:MedicalProcedure",
      "schema:Drug"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/pacemakersandimplantabledefibrillators.html) on\n// 2026-05-05. Not for use in client deliverables. Generate your own markup\n// using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalDevice\",\n  \"name\": \"Implantable cardioverter defibrillator (ICD)\",\n  \"purpose\": \"Therapeutic\",\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"Prevention of sudden cardiac death in patients with life-threatening arrhythmias\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/pacemakersandimplantabledefibrillators.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "An implantable cardioverter defibrillator (ICD) is a small electronic device installed in the chest to prevent sudden death from cardiac arrest due to life-threatening abnormally fast heart rhythms (arrhythmias)."
        },
        {
          "url": "https://medlineplus.gov/medicaldevicesafety.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Medical devices range from simple tongue depressors and bedpans to complex programmable pacemakers and laser surgical devices. They include diagnostic devices such as MRI machines and therapeutic devices such as infusion pumps."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Implantable cardioverter defibrillator (ICD)",
          "sourceUrls": [
            "https://medlineplus.gov/pacemakersandimplantabledefibrillators.html"
          ]
        },
        {
          "jsonPath": "$.purpose",
          "value": "Therapeutic",
          "sourceUrls": [
            "https://medlineplus.gov/pacemakersandimplantabledefibrillators.html"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "Prevention of sudden cardiac death in patients with life-threatening arrhythmias",
          "sourceUrls": [
            "https://medlineplus.gov/pacemakersandimplantabledefibrillators.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalEntity": {
    "id": "schema:MedicalEntity",
    "whenToUse": "MedicalEntity is the abstract root of schema.org's medical hierarchy. In production markup, prefer a concrete subtype (MedicalCondition, Drug, MedicalProcedure, MedicalTest, AnatomicalStructure). Use `@type: \"MedicalEntity\"` only as a placeholder when content is genuinely cross-cutting and doesn't yet resolve to a single subtype — for example, a condition hub that also contains drug and procedure facets in one URL.",
    "whenNotToUse": "Don't ship MedicalEntity as the @type when a more specific subtype fits — search engines and LLMs reward specificity. Don't use it to evade classification work; if you can't decide between MedicalCondition and MedicalProcedure, the content probably needs to be split into two pages. Don't use it for non-clinical health-and-wellness content where HealthTopicContent or Article is the cleaner fit.",
    "whoItsFor": "Schema architects auditing medical-content libraries, enterprise CMS engineers building generic clinical-content components that route to subtype-specific renderers at publish time, and integration teams mapping internal taxonomies to schema.org before assigning concrete subtypes.",
    "seoNotes": "Bare MedicalEntity markup is parseable but weak — Google and LLM indexers gain little entity signal beyond `name` and `code`. Treat MedicalEntity as scaffolding and replace with a concrete subtype before publication wherever possible; the structural pattern shown here exists to demonstrate the parent contract, not to be shipped verbatim.",
    "commonCombos": [
      "schema:MedicalCode",
      "schema:MedicalSpecialty",
      "schema:MedicalGuideline",
      "schema:MedicalStudy",
      "schema:Organization"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/flu/about/index.html) and NIH MedlinePlus\n// (https://medlineplus.gov/influenza.html) on 2026-05-05.\n// MedicalEntity is the abstract parent type; in production prefer a concrete\n// subtype such as InfectiousDisease or MedicalCondition. This example shows\n// the cross-cutting pattern only.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalEntity\",\n  \"name\": \"Influenza\",\n  \"alternateName\": \"Flu\",\n  \"description\": \"Flu is a contagious respiratory illness caused by influenza viruses that infect tissues in the nose, throat, and sometimes the lungs.\",\n  \"code\": {\n    \"@type\": \"MedicalCode\",\n    \"codingSystem\": \"ICD-10-CM\",\n    \"codeValue\": \"J11.1\"\n  },\n  \"recognizingAuthority\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Centers for Disease Control and Prevention\",\n    \"url\": \"https://www.cdc.gov/flu/about/index.html\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/flu/about/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Flu is a contagious respiratory illness caused by influenza viruses that infect tissues in the nose, throat, and sometimes the lungs."
        },
        {
          "url": "https://medlineplus.gov/influenza.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The flu, also called influenza, is a respiratory infection caused by viruses."
        },
        {
          "url": "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html",
          "publisher": "CDC National Center for Health Statistics",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "ICD-10-CM (the International Classification of Diseases, Tenth Revision, Clinical Modification) is a standardized system used to code diseases and medical conditions (morbidity) data."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Influenza",
          "sourceUrls": [
            "https://medlineplus.gov/influenza.html",
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.alternateName",
          "value": "Flu",
          "sourceUrls": [
            "https://medlineplus.gov/influenza.html",
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Flu is a contagious respiratory illness caused by influenza viruses that infect tissues in the nose, throat, and sometimes the lungs.",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.code.codingSystem",
          "value": "ICD-10-CM",
          "sourceUrls": [
            "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html"
          ]
        },
        {
          "jsonPath": "$.code.codeValue",
          "value": "J11.1",
          "sourceUrls": [
            "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html"
          ]
        },
        {
          "jsonPath": "$.recognizingAuthority.name",
          "value": "Centers for Disease Control and Prevention",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        },
        {
          "jsonPath": "$.recognizingAuthority.url",
          "value": "https://www.cdc.gov/flu/about/index.html",
          "sourceUrls": [
            "https://www.cdc.gov/flu/about/index.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalEnumeration": {
    "id": "schema:MedicalEnumeration",
    "whenToUse": "MedicalEnumeration is the abstract parent for every health-vertical enumeration in schema.org — MedicalSpecialty, MedicalAudienceType, MedicalEvidenceLevel, DrugCostCategory, MedicalProcedureType, MedicalStudyStatus, and the rest. Use it as a conceptual umbrella when you are documenting the family of medical-vocabulary enums or when a property accepts any medical enum value; instantiate one of the concrete subtypes in actual page markup.",
    "whenNotToUse": "Don't emit MedicalEnumeration directly in JSON-LD output — schema.org expects a concrete subtype value. Don't use it as a substitute for an unknown medical enum; choose the subtype that matches the property's expected range.",
    "whoItsFor": "Schema-tooling authors, knowledge-graph integrators, and editorial-system architects who need a single conceptual handle for the medical enum family when designing CMS dropdowns or validation logic.",
    "seoNotes": "MedicalEnumeration itself does not surface in rich results. The value of the abstraction is internal — it lets a CMS or content tool present a unified picker over all medical enums while emitting the concrete subtype required by Google and AI assistants.",
    "commonCombos": [
      "schema:MedicalSpecialty",
      "schema:MedicalAudienceType",
      "schema:MedicalEvidenceLevel",
      "schema:MedicalProcedureType",
      "schema:MedicalStudyStatus"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/cardiacrehabilitation.html) on 2026-05-05.\n// MedicalEnumeration is abstract; this example shows a concrete medical enum\n// subtype (MedicalSpecialty) carrying the value, with the abstract parent\n// referenced in additionalType for documentation.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalWebPage\",\n  \"name\": \"Cardiac Rehabilitation Program Overview\",\n  \"specialty\": {\n    \"@type\": \"MedicalSpecialty\",\n    \"additionalType\": \"https://schema.org/MedicalEnumeration\",\n    \"name\": \"Cardiovascular\"\n  },\n  \"about\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Coronary artery disease\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/cardiacrehabilitation.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Cardiac rehabilitation (rehab) is a medically supervised program to help people who have had a heart attack, heart failure, heart valve surgery, coronary artery bypass grafting, or percutaneous coronary intervention. The program includes exercise training, education on heart-healthy living, and counseling to reduce stress."
        },
        {
          "url": "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
          "publisher": "Google Search Central",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Structured data is a standardized format for providing information about a page and classifying the page content. Schema.org provides a shared vocabulary, and Google uses concrete subtypes — not abstract parent classes — when interpreting markup."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Cardiac Rehabilitation Program Overview",
          "sourceUrls": [
            "https://medlineplus.gov/cardiacrehabilitation.html"
          ]
        },
        {
          "jsonPath": "$.specialty.name",
          "value": "Cardiovascular",
          "sourceUrls": [
            "https://medlineplus.gov/cardiacrehabilitation.html"
          ]
        },
        {
          "jsonPath": "$.specialty.additionalType",
          "value": "https://schema.org/MedicalEnumeration",
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
          ]
        },
        {
          "jsonPath": "$.about.name",
          "value": "Coronary artery disease",
          "sourceUrls": [
            "https://medlineplus.gov/cardiacrehabilitation.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalEvidenceLevel": {
    "id": "schema:MedicalEvidenceLevel",
    "whenToUse": "Use MedicalEvidenceLevel on a MedicalGuideline (or its recommendation) to declare the strength of evidence behind a clinical recommendation — A for multiple RCTs or meta-analyses, B for a single RCT or nonrandomized study, C for expert consensus or standard-of-care. Pair it with evidenceOrigin so a reader can trace the rating back to the originating society's grading system (ACC/AHA, USPSTF, GRADE, etc.).",
    "whenNotToUse": "Don't use MedicalEvidenceLevel to rate the quality of a single study — that belongs on the study record itself via study design enumerations. Don't substitute a society-specific grade (e.g., USPSTF Grade B) for a schema.org level without mapping; the schema enum has only three values and will lose nuance if shoehorned.",
    "whoItsFor": "Specialty-society publishing teams, clinical-decision-support vendors, and health-system editors who maintain guideline summaries and need a schema-level evidence flag that LLMs and search engines can reason over.",
    "seoNotes": "Evidence levels signal authority — Google's medical-content quality systems and AI assistants treat A-rated recommendations as more citable. Display the schema value alongside the human-readable society grade so readers see both.",
    "commonCombos": [
      "schema:MedicalGuideline",
      "schema:MedicalGuidelineRecommendation",
      "schema:MedicalCondition",
      "schema:MedicalEnumeration"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalGuidelineRecommendation\",\n  \"name\": \"Use nonpharmacologic and nonopioid pharmacologic therapies as first-line treatment for subacute and chronic pain\",\n  \"guidelineSubject\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Chronic pain\"\n  },\n  \"evidenceLevel\": \"EvidenceLevelA\",\n  \"evidenceOrigin\": \"CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022\",\n  \"recommendationStrength\": \"Recommendation Category A\"\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm",
          "publisher": "U.S. Centers for Disease Control and Prevention (MMWR)",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022. Recommendations are categorized as Category A (applies to all persons in a specified group) or Category B (individual decision making). Evidence type is rated 1 (randomized clinical trials or overwhelming evidence from observational studies) through 4 (clinical experience and observations)."
        },
        {
          "url": "https://www.cdc.gov/acip/index.html",
          "publisher": "U.S. Centers for Disease Control and Prevention (ACIP)",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "ACIP uses the Grading of Recommendations, Assessment, Development, and Evaluation (GRADE) approach to rate the certainty of evidence and the strength of recommendations."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Use nonpharmacologic and nonopioid pharmacologic therapies as first-line treatment for subacute and chronic pain",
          "sourceUrls": [
            "https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm"
          ]
        },
        {
          "jsonPath": "$.guidelineSubject.name",
          "value": "Chronic pain",
          "sourceUrls": [
            "https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm"
          ]
        },
        {
          "jsonPath": "$.evidenceLevel",
          "value": "EvidenceLevelA",
          "sourceUrls": [
            "https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm"
          ]
        },
        {
          "jsonPath": "$.evidenceOrigin",
          "value": "CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022",
          "sourceUrls": [
            "https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm"
          ]
        },
        {
          "jsonPath": "$.recommendationStrength",
          "value": "Recommendation Category A",
          "sourceUrls": [
            "https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm"
          ]
        }
      ]
    }
  },
  "schema:MedicalGuideline": {
    "id": "schema:MedicalGuideline",
    "whenToUse": "Use MedicalGuideline as the parent type for any clinical practice guidance document — recommendations, contraindications, and condition-specific clinical pathways. It's the right type for guideline summary pages on payer, society, and CDC sites, and as the base when you don't yet know whether the page is a recommendation or a contraindication. Pair it with evidenceLevel, evidenceOrigin, guidelineDate, and guidelineSubject.",
    "whenNotToUse": "Don't use MedicalGuideline for marketing claims or product-promotional pages dressed up as clinical guidance. Don't use it for an individual study or manuscript — that's MedicalScholarlyArticle. And don't use the parent type when the page clearly is a recommendation (use MedicalGuidelineRecommendation) or a contraindication (use MedicalGuidelineContraindication).",
    "whoItsFor": "Specialty societies and federal agencies publishing clinical guidelines, payer medical-policy teams converting guideline content for the public web, and clinical-decision-support vendors who need machine-readable guideline anchors.",
    "seoNotes": "Anchor with guidelineDate (so consumers can detect staleness), evidenceLevel (an EvidenceLevel enum value such as EvidenceLevelA), evidenceOrigin (the issuing body or source dataset), and guidelineSubject. These signals matter to AI-assisted search because guideline currency and source authority materially change the answer. No dedicated Google rich result.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Organization",
      "schema:MedicalGuidelineRecommendation",
      "schema:MedicalGuidelineContraindication",
      "schema:MedicalScholarlyArticle"
    ],
    "example": {
      "jsonld": "// Reference example — built from CDC's public Adult Immunization Schedule\n// (https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html) accessed 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalGuideline\",\n  \"name\": \"Adult Immunization Schedule by Age\",\n  \"url\": \"https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html\",\n  \"guidelineDate\": \"2025-07-02\",\n  \"evidenceOrigin\": \"Advisory Committee on Immunization Practices (ACIP), Centers for Disease Control and Prevention\",\n  \"guidelineSubject\": {\n    \"@type\": \"MedicalEntity\",\n    \"name\": \"Routine vaccination of adults aged 19 years and older in the United States\"\n  },\n  \"publisher\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Centers for Disease Control and Prevention\",\n    \"url\": \"https://www.cdc.gov\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Adult Immunization Schedule by Age (Addendum updated July 2, 2025)"
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Adult Immunization Schedule by Age",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html"
          ]
        },
        {
          "jsonPath": "$.url",
          "value": "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html"
          ]
        },
        {
          "jsonPath": "$.guidelineDate",
          "value": "2025-07-02",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html"
          ]
        },
        {
          "jsonPath": "$.evidenceOrigin",
          "value": "Advisory Committee on Immunization Practices (ACIP), Centers for Disease Control and Prevention",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html"
          ]
        },
        {
          "jsonPath": "$.guidelineSubject.name",
          "value": "Routine vaccination of adults aged 19 years and older in the United States",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html"
          ]
        },
        {
          "jsonPath": "$.publisher.name",
          "value": "Centers for Disease Control and Prevention",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalGuidelineContraindication": {
    "id": "schema:MedicalGuidelineContraindication",
    "whenToUse": "Use MedicalGuidelineContraindication when the page or content fragment is a clinical statement that a treatment, drug, or procedure should be avoided in a defined patient population. It's the right type for vaccine and drug contraindication tables, society-issued do-not-do lists, and the contraindication callouts on CDC, NCI, and DailyMed pages.",
    "whenNotToUse": "Don't use it for soft cautions or precautions that don't rise to a contraindication — those are better described as MedicalGuidelineRecommendation with appropriate language, or as a generic MedicalContraindication on a Drug or MedicalProcedure record. Don't use it for product-label warnings on a Drug page when the label text is the right primary surface.",
    "whoItsFor": "Specialty societies and federal agencies publishing safety-critical guidance, payer and pharmacy-benefit teams encoding do-not-use rules, and clinical-decision-support vendors building alerting on top of guideline data.",
    "seoNotes": "Set evidenceLevel and evidenceOrigin so downstream consumers can weigh authority. The type itself signals to AI-assisted search that the content is a hard restriction, not a preference — important when summarizing safety information. No dedicated Google rich result; the markup pays off in entity disambiguation and grounding.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalProcedure",
      "schema:MedicalCondition",
      "schema:Organization"
    ],
    "example": {
      "jsonld": "// Reference example — built from CDC's public General Best Practice Guidelines for Immunization\n// (https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html) accessed 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalGuidelineContraindication\",\n  \"name\": \"Live vaccines contraindicated in severely immunocompromised persons\",\n  \"url\": \"https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html\",\n  \"guidelineDate\": \"2024-07-25\",\n  \"evidenceOrigin\": \"CDC General Best Practice Guidelines for Immunization (ACIP)\",\n  \"guidelineSubject\": {\n    \"@type\": \"MedicalEntity\",\n    \"name\": \"Severely immunocompromised persons should not receive live vaccines\"\n  },\n  \"publisher\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Centers for Disease Control and Prevention\",\n    \"url\": \"https://www.cdc.gov\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Severely immunocompromised persons should not receive live vaccines"
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Live vaccines contraindicated in severely immunocompromised persons",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html"
          ]
        },
        {
          "jsonPath": "$.url",
          "value": "https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html"
          ]
        },
        {
          "jsonPath": "$.guidelineDate",
          "value": "2024-07-25",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html"
          ]
        },
        {
          "jsonPath": "$.evidenceOrigin",
          "value": "CDC General Best Practice Guidelines for Immunization (ACIP)",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html"
          ]
        },
        {
          "jsonPath": "$.guidelineSubject.name",
          "value": "Severely immunocompromised persons should not receive live vaccines",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html"
          ]
        },
        {
          "jsonPath": "$.publisher.name",
          "value": "Centers for Disease Control and Prevention",
          "sourceUrls": [
            "https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalGuidelineRecommendation": {
    "id": "schema:MedicalGuidelineRecommendation",
    "whenToUse": "Use MedicalGuidelineRecommendation when the page or fragment recommends an action — screen, vaccinate, prescribe, refer — for a defined population. It's the canonical type for USPSTF, ACIP, and specialty-society recommendation pages and for the recommendation callouts inside larger guideline documents. Always include recommendationStrength so consumers can grade the recommendation.",
    "whenNotToUse": "Don't use it when the statement is a hard prohibition — that's MedicalGuidelineContraindication. Don't use it for narrative review content that describes options without endorsing one. And don't use it for product-marketing pages that imply but don't formally issue a clinical recommendation.",
    "whoItsFor": "Federal agencies and specialty societies publishing recommendation statements, payer medical-policy editors translating recommendations onto member-facing pages, and clinical-decision-support vendors needing structured recommendation anchors with strength grading.",
    "seoNotes": "Mark up recommendationStrength (often a string like \"Strong\", \"Routine\", or a USPSTF letter grade), evidenceLevel, evidenceOrigin, and guidelineDate. Strength and currency are the two signals AI-assisted search uses to weigh competing recommendations, so always populate both. No dedicated Google rich result.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Drug",
      "schema:MedicalProcedure",
      "schema:Organization",
      "schema:MedicalAudience"
    ],
    "example": {
      "jsonld": "// Reference example — built from CDC's public seasonal influenza vaccination guidance\n// (https://www.cdc.gov/flu/vaccines/index.html) accessed 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalGuidelineRecommendation\",\n  \"name\": \"Routine seasonal influenza vaccination for everyone 6 months and older\",\n  \"url\": \"https://www.cdc.gov/flu/vaccines/index.html\",\n  \"guidelineDate\": \"2024-09-17\",\n  \"recommendationStrength\": \"Routine\",\n  \"evidenceOrigin\": \"Advisory Committee on Immunization Practices (ACIP), Centers for Disease Control and Prevention\",\n  \"guidelineSubject\": {\n    \"@type\": \"MedicalEntity\",\n    \"name\": \"Everyone 6 months and older should get a flu vaccine every season with rare exceptions\"\n  },\n  \"publisher\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Centers for Disease Control and Prevention\",\n    \"url\": \"https://www.cdc.gov\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/flu/vaccines/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Everyone 6 months and older should get a flu vaccine every season with rare exceptions."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Routine seasonal influenza vaccination for everyone 6 months and older",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/index.html"
          ]
        },
        {
          "jsonPath": "$.url",
          "value": "https://www.cdc.gov/flu/vaccines/index.html",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/index.html"
          ]
        },
        {
          "jsonPath": "$.guidelineDate",
          "value": "2024-09-17",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/index.html"
          ]
        },
        {
          "jsonPath": "$.recommendationStrength",
          "value": "Routine",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/index.html"
          ]
        },
        {
          "jsonPath": "$.evidenceOrigin",
          "value": "Advisory Committee on Immunization Practices (ACIP), Centers for Disease Control and Prevention",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/index.html"
          ]
        },
        {
          "jsonPath": "$.guidelineSubject.name",
          "value": "Everyone 6 months and older should get a flu vaccine every season with rare exceptions",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/index.html"
          ]
        },
        {
          "jsonPath": "$.publisher.name",
          "value": "Centers for Disease Control and Prevention",
          "sourceUrls": [
            "https://www.cdc.gov/flu/vaccines/index.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalImagingTechnique": {
    "id": "schema:MedicalImagingTechnique",
    "whenToUse": "Use MedicalImagingTechnique on an ImagingTest or DiagnosticProcedure to declare the imaging modality — CT, MRI, PET, ultrasound, or X-ray. Attach it via the `imagingTechnique` property so the test page exposes the modality alongside the body site and the indication.",
    "whenNotToUse": "Don't use MedicalImagingTechnique for laboratory tests, endoscopic visualization, or pathology slide imaging; this enumeration is restricted to the cross-sectional and projection imaging modalities listed. Don't use it to express scanner vendor, field strength, or contrast agent — those go on free-text properties or a sub-modality field.",
    "whoItsFor": "Radiology departments, imaging-center marketing teams, multispecialty groups publishing pre-procedure patient instructions, and consumer health publishers who maintain modality-specific explainers.",
    "seoNotes": "Modality is a primary filter axis on imaging-services pages; values map cleanly to user queries like \"open MRI near me\" or \"low-dose CT\". Pair with the imaged body site (`bodyLocation`) and the clinical indication so the modality, region, and reason are all machine-readable.",
    "commonCombos": [
      "schema:ImagingTest",
      "schema:DiagnosticProcedure",
      "schema:MedicalCondition",
      "schema:Hospital"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus MRI\n// (https://medlineplus.gov/mriscans.html) on 2026-05-05. Not for use in\n// client deliverables. Generate your own markup using your content in the\n// Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"ImagingTest\",\n  \"name\": \"Brain MRI\",\n  \"imagingTechnique\": \"MRI\",\n  \"bodyLocation\": \"Brain\",\n  \"description\": \"Magnetic resonance imaging (MRI) is a medical imaging procedure that uses a large magnet, radio waves, and a computer to make detailed pictures of the inside of your body.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/mriscans.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Magnetic resonance imaging (MRI) is a medical imaging procedure that uses a large magnet, radio waves, and a computer to make detailed pictures of the inside of your body."
        },
        {
          "url": "https://medlineplus.gov/diagnosticimaging.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Diagnostic imaging lets doctors look inside your body for clues about a medical condition."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Brain MRI",
          "sourceUrls": [
            "https://medlineplus.gov/mriscans.html"
          ]
        },
        {
          "jsonPath": "$.imagingTechnique",
          "value": "MRI",
          "sourceUrls": [
            "https://medlineplus.gov/mriscans.html"
          ]
        },
        {
          "jsonPath": "$.bodyLocation",
          "value": "Brain",
          "sourceUrls": [
            "https://medlineplus.gov/mriscans.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Magnetic resonance imaging (MRI) is a medical imaging procedure that uses a large magnet, radio waves, and a computer to make detailed pictures of the inside of your body.",
          "sourceUrls": [
            "https://medlineplus.gov/mriscans.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalIndication": {
    "id": "schema:MedicalIndication",
    "whenToUse": "Use MedicalIndication as the parent type when you can't commit to ApprovedIndication, TreatmentIndication, or PreventionIndication — for example a general clinical-context note that pairs a drug with a condition without making a regulatory or treatment-versus-prevention claim. It's also useful as the abstract anchor when subclasses are not yet decided.",
    "whenNotToUse": "Don't use MedicalIndication when a more specific subtype fits — prefer TreatmentIndication, PreventionIndication, or ApprovedIndication for clarity. Don't use it for contraindications — use MedicalContraindication.",
    "whoItsFor": "Medical-content editors authoring drug-condition cross-references and knowledge-graph curators stitching together provisional indication relationships.",
    "seoNotes": "MedicalIndication is consumed via Drug.indication. Subclassing into ApprovedIndication, TreatmentIndication, or PreventionIndication carries more semantic value when the relationship is well-defined.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalCondition",
      "schema:MedicalTherapy"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682159.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalIndication\",\n  \"name\": \"Ibuprofen for osteoarthritis\",\n  \"description\": \"Ibuprofen is used to relieve pain, tenderness, swelling, and stiffness caused by osteoarthritis (arthritis caused by a breakdown of the lining of the joints).\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682159.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Prescription ibuprofen is used to relieve pain, tenderness, swelling, and stiffness caused by osteoarthritis (arthritis caused by a breakdown of the lining of the joints)."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Ibuprofen for osteoarthritis",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Ibuprofen is used to relieve pain, tenderness, swelling, and stiffness caused by osteoarthritis (arthritis caused by a breakdown of the lining of the joints).",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalIntangible": {
    "id": "schema:MedicalIntangible",
    "whenToUse": "MedicalIntangible is the abstract parent for non-physical clinical concepts — codes, dose schedules, drug strengths, drug legal statuses. In practice you almost always ship a concrete subtype: MedicalCode, DoseSchedule, DrugStrength, DrugLegalStatus, DrugCost. Use the multi-typed pattern shown below — `@type: [\"MedicalIntangible\", \"MedicalCode\"]` — only when you need to make the abstract relationship visible to a downstream consumer.",
    "whenNotToUse": "Don't use MedicalIntangible alone as the @type — it carries no own properties beyond the MedicalEntity inheritance and produces weak entity signals. Don't use it for physical artifacts (a pill, a device, an anatomical structure) — those have their own concrete types. Don't use it as a junk drawer for clinical metadata that doesn't fit; if it doesn't map to a concrete subtype, the model probably needs custom extension.",
    "whoItsFor": "Schema architects documenting the parent-child relationships of medical schema for engineering and editorial onboarding, integration teams converting EHR or claims metadata into schema.org, and pharma medical-affairs teams who need their dose, strength, and legal-status payloads to round-trip cleanly through the abstract parent.",
    "seoNotes": "MedicalIntangible has no rich-result treatment; its value is structural. The concrete subtypes (MedicalCode, DrugStrength, DoseSchedule) carry the indexable signal. Multi-typing as `[\"MedicalIntangible\", \"MedicalCode\"]` is valid JSON-LD and preserves the abstract relationship for consumers that walk the type hierarchy.",
    "commonCombos": [
      "schema:MedicalCode",
      "schema:DoseSchedule",
      "schema:DrugStrength",
      "schema:DrugLegalStatus",
      "schema:DrugCost"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/diabetestype2.html) and NLM MeSH\n// (https://meshb.nlm.nih.gov/record/ui?name=International+Classification+of+Diseases)\n// on 2026-05-05.\n// MedicalIntangible is the abstract parent for non-physical clinical concepts.\n// This example multi-types as both MedicalIntangible and MedicalCode so the\n// abstract relationship is visible to downstream consumers.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": [\"MedicalIntangible\", \"MedicalCode\"],\n  \"name\": \"Type 2 Diabetes Mellitus without complications\",\n  \"codingSystem\": \"ICD-10-CM\",\n  \"codeValue\": \"E11.9\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/diabetestype2.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Type 2 diabetes is a disease in which your blood glucose, or blood sugar, levels are too high."
        },
        {
          "url": "https://meshb.nlm.nih.gov/record/ui?name=International+Classification+of+Diseases",
          "publisher": "NLM MeSH",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "International Classification of Diseases — A system of categories to which morbid entries are assigned according to established criteria."
        },
        {
          "url": "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html",
          "publisher": "CDC National Center for Health Statistics",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "ICD-10-CM (the International Classification of Diseases, Tenth Revision, Clinical Modification) is a standardized system used to code diseases and medical conditions (morbidity) data."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Type 2 Diabetes Mellitus without complications",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html",
            "https://meshb.nlm.nih.gov/record/ui?name=International+Classification+of+Diseases"
          ]
        },
        {
          "jsonPath": "$.codingSystem",
          "value": "ICD-10-CM",
          "sourceUrls": [
            "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html",
            "https://meshb.nlm.nih.gov/record/ui?name=International+Classification+of+Diseases"
          ]
        },
        {
          "jsonPath": "$.codeValue",
          "value": "E11.9",
          "sourceUrls": [
            "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalObservationalStudy": {
    "id": "schema:MedicalObservationalStudy",
    "whenToUse": "Use MedicalObservationalStudy for non-interventional human-subjects research — cohort studies, case-control studies, cross-sectional surveys, and longitudinal registries where investigators observe rather than assign treatment. It's the right type for population-health registry pages, epidemiology cohort landing pages, and academic medical center pages describing observational protocols.",
    "whenNotToUse": "Don't use it when investigators assign an intervention — that's MedicalTrial. Don't use it for systematic reviews or meta-analyses — those are MedicalScholarlyArticle subtypes. Skip it for non-human research and for purely administrative claims-database analyses unless the page describes a formal observational protocol with a registered design.",
    "whoItsFor": "Public-health agencies and academic epidemiology programs publishing cohort-study pages, registry operators describing long-running surveillance studies, and AMC research offices listing observational protocols.",
    "seoNotes": "Set studyDesign on the record to disambiguate from interventional research, and mark up sponsor, healthCondition, and studyLocation. The schema.org type itself signals to LLMs and search systems that the page is non-interventional, which improves grounding for queries about cohort, registry, and surveillance studies. No dedicated Google rich result currently.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Organization",
      "schema:Place",
      "schema:MedicalScholarlyArticle",
      "schema:Dataset"
    ],
    "example": {
      "jsonld": "// Reference example — built from public registration metadata at ClinicalTrials.gov\n// (https://clinicaltrials.gov/study/NCT00005121) accessed 2026-05-05.\n// Registration metadata only — no results or efficacy claims.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalObservationalStudy\",\n  \"name\": \"Framingham Heart Study\",\n  \"identifier\": \"NCT00005121\",\n  \"status\": \"Completed\",\n  \"studyDesign\": \"Observational\",\n  \"healthCondition\": [\n    { \"@type\": \"MedicalCondition\", \"name\": \"Cardiovascular Diseases\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Heart Disease\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Coronary Disease\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Stroke\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Hypertension\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Atherosclerosis\" }\n  ],\n  \"sponsor\": {\n    \"@type\": \"Organization\",\n    \"name\": \"National Heart, Lung, and Blood Institute (NHLBI)\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://clinicaltrials.gov/study/NCT00005121",
          "publisher": "ClinicalTrials.gov (U.S. National Library of Medicine)",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Framingham Heart Study; Study Type: Observational; Lead Sponsor: National Heart, Lung, and Blood Institute (NHLBI)"
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Framingham Heart Study",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.identifier",
          "value": "NCT00005121",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.status",
          "value": "Completed",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.studyDesign",
          "value": "Observational",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.healthCondition[0].name",
          "value": "Cardiovascular Diseases",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.healthCondition[1].name",
          "value": "Heart Disease",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.healthCondition[2].name",
          "value": "Coronary Disease",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.healthCondition[3].name",
          "value": "Stroke",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.healthCondition[4].name",
          "value": "Hypertension",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.healthCondition[5].name",
          "value": "Atherosclerosis",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        },
        {
          "jsonPath": "$.sponsor.name",
          "value": "National Heart, Lung, and Blood Institute (NHLBI)",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005121"
          ]
        }
      ]
    }
  },
  "schema:MedicalObservationalStudyDesign": {
    "id": "schema:MedicalObservationalStudyDesign",
    "whenToUse": "Use MedicalObservationalStudyDesign as the value of MedicalObservationalStudy.studyDesign to disclose the observational structure — cohort, case series, cross-sectional, longitudinal, or registry-based. Use it for any non-interventional research where investigators observe rather than assign treatment.",
    "whenNotToUse": "Don't use MedicalObservationalStudyDesign for interventional trials — those need MedicalTrialDesign on MedicalTrial. Don't use it for systematic reviews or meta-analyses, which are not primary observational studies.",
    "whoItsFor": "Epidemiology and public-health research groups, registry operators, and academic medical centers that publish public-facing summaries of long-running observational research.",
    "seoNotes": "Spelling out the observational design helps AI answer engines distinguish a cohort study from a randomized trial when summarizing evidence — material when a reader is judging strength of evidence. Pair with healthCondition so the entity graph links study to condition studied.",
    "commonCombos": [
      "schema:MedicalObservationalStudy",
      "schema:MedicalCondition",
      "schema:MedicalStudyStatus"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from ClinicalTrials.gov\n// (https://clinicaltrials.gov/study/NCT00005133) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalObservationalStudy\",\n  \"name\": \"Framingham Heart Study\",\n  \"identifier\": \"NCT00005133\",\n  \"studyDesign\": [\n    \"CohortStudy\",\n    \"Longitudinal\"\n  ],\n  \"healthCondition\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Cardiovascular Diseases\"\n  },\n  \"status\": \"Recruiting\"\n}\n",
      "sources": [
        {
          "url": "https://clinicaltrials.gov/study/NCT00005133",
          "publisher": "ClinicalTrials.gov (U.S. National Library of Medicine)",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Framingham Heart Study (FHS). Study Type: Observational. Observational Study Model: Cohort. Time Perspective: Prospective. NCT Number: NCT00005133. Conditions: Cardiovascular Diseases."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Framingham Heart Study",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005133"
          ]
        },
        {
          "jsonPath": "$.identifier",
          "value": "NCT00005133",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005133"
          ]
        },
        {
          "jsonPath": "$.studyDesign[0]",
          "value": "CohortStudy",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005133"
          ]
        },
        {
          "jsonPath": "$.studyDesign[1]",
          "value": "Longitudinal",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005133"
          ]
        },
        {
          "jsonPath": "$.healthCondition.name",
          "value": "Cardiovascular Diseases",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005133"
          ]
        },
        {
          "jsonPath": "$.status",
          "value": "Recruiting",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT00005133"
          ]
        }
      ]
    }
  },
  "schema:MedicalOrganization": {
    "id": "schema:MedicalOrganization",
    "whenToUse": "Use MedicalOrganization as the canonical parent for any entity that delivers or coordinates health care — hospitals, clinics, outpatient centers, specialized care centers, and the systems that operate them. It is the right type for the legal organization layer above an individual building or location.",
    "whenNotToUse": "Don't use MedicalOrganization for a single inpatient facility (use Hospital), an outpatient site (use MedicalClinic), a retail pharmacy (use Pharmacy), or a clinical lab (use DiagnosticLab). Don't use it for a private medical practice operating as a small business — that's MedicalBusiness.",
    "whoItsFor": "Health-system marketing leads who need a parent entity that ties together hospitals, clinics, and specialty centers, and reference publishers documenting accreditation bodies, comparison tools, and provider directories.",
    "seoNotes": "MedicalOrganization is the entity that knowledge graphs prefer to anchor a brand to. Populate name, sameAs, and medicalSpecialty consistently across all child Hospital and MedicalClinic locations so search systems recognize them as one organization with many sites.",
    "commonCombos": [
      "schema:Hospital",
      "schema:MedicalClinic",
      "schema:Physician"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/healthfacilities.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalOrganization\",\n  \"name\": \"Community Health System\",\n  \"description\": \"A medical organization operates places that provide health care, which include hospitals, clinics, outpatient care centers, and specialized care centers.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/healthfacilities.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Health facilities are places that provide health care. They include hospitals, clinics, outpatient care centers, and specialized care centers, such as birthing centers and psychiatric care centers."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A medical organization operates places that provide health care, which include hospitals, clinics, outpatient care centers, and specialized care centers.",
          "sourceUrls": [
            "https://medlineplus.gov/healthfacilities.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalProcedure": {
    "id": "schema:MedicalProcedure",
    "whenToUse": "Use MedicalProcedure as the parent type for any clinical procedure that doesn't fit a more specific subtype, or when a single page describes a procedure category that spans surgical, diagnostic, and therapeutic uses. Vital-sign measurements, screening exams, and routine clinical assessments all fit here when the more specific subtypes overshoot.",
    "whenNotToUse": "Don't use MedicalProcedure when a subtype is clearly correct: SurgicalProcedure for operations, DiagnosticProcedure for tests that establish a diagnosis, TherapeuticProcedure for treatments, RadiationTherapy for radiation, PhysicalTherapy or OccupationalTherapy for rehab. The subtypes carry stronger crawler signals — reach for the parent only when the subject genuinely sits above any one bucket.",
    "whoItsFor": "Primary care practices documenting in-clinic procedures, patient-education sites explaining routine assessments, and health-system pages that list services across multiple departments without committing to a single specialty.",
    "seoNotes": "MedicalProcedure entries with bodyLocation, preparation, and howPerformed can power FAQ-style answers for common patient questions. LLMs use the procedureType property to disambiguate when a procedure name is ambiguous across categories — populate it whenever the subtype isn't already encoded in @type.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Physician",
      "schema:Hospital",
      "schema:AnatomicalStructure",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/ency/article/007490.htm) on 2026-05-05. Not for use in client deliverables.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalProcedure\",\n  \"name\": \"Blood pressure measurement\",\n  \"description\": \"Blood pressure is a measurement of the force on the walls of your arteries as your heart pumps blood through your body.\",\n  \"bodyLocation\": \"Upper arm\",\n  \"preparation\": \"Empty your bladder beforehand. Rest for at least 5 minutes, 10 minutes is better, before blood pressure is taken.\",\n  \"howPerformed\": \"You or your provider will wrap the blood pressure cuff snugly around your upper arm. The cuff will be inflated quickly. The reading when the sound of blood pulsing is first heard is recorded as the systolic pressure; the point at which the sound stops is recorded as the diastolic pressure.\",\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"Detection of high blood pressure\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/007490.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Blood pressure is a measurement of the force on the walls of your arteries as your heart pumps blood through your body."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Blood pressure measurement",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007490.htm"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Blood pressure is a measurement of the force on the walls of your arteries as your heart pumps blood through your body.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007490.htm"
          ]
        },
        {
          "jsonPath": "$.bodyLocation",
          "value": "Upper arm",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007490.htm"
          ]
        },
        {
          "jsonPath": "$.preparation",
          "value": "Empty your bladder beforehand. Rest for at least 5 minutes, 10 minutes is better, before blood pressure is taken.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007490.htm"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "Cuff inflated on upper arm; systolic recorded when pulsing sound first heard, diastolic when sound stops.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007490.htm"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "Detection of high blood pressure",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007490.htm"
          ]
        }
      ]
    }
  },
  "schema:MedicalProcedureType": {
    "id": "schema:MedicalProcedureType",
    "whenToUse": "Use MedicalProcedureType on a MedicalProcedure (or its subtypes) to declare the access route — Noninvasive when the procedure does not breach the skin or a body cavity, Percutaneous when access is achieved by needle-puncture of the skin (catheterization, biopsy, stent delivery). Attach via the procedureType property so the markup distinguishes a coronary angiogram from open bypass surgery.",
    "whenNotToUse": "Don't use MedicalProcedureType to encode the clinical intent of the procedure (diagnostic vs. therapeutic) — that is a separate axis. Don't try to fit open surgical procedures into this enum; schema.org's two values do not cover open surgery, so leave procedureType absent and rely on the SurgicalProcedure subtype instead.",
    "whoItsFor": "Hospital service-line editors publishing procedure pages, interventional cardiology and radiology departments differentiating their catheter-based offerings from open-surgical alternatives, and patient-education writers comparing procedure options.",
    "seoNotes": "AI assistants answering 'is this surgery?' questions rely on procedureType plus the parent type. Marking a stent placement as PercutaneousProcedure on a MedicalProcedure record helps assistants explain that it is not open surgery without parsing prose.",
    "commonCombos": [
      "schema:MedicalProcedure",
      "schema:DiagnosticProcedure",
      "schema:TherapeuticProcedure",
      "schema:MedicalDevice"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/ency/article/007473.htm) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalProcedure\",\n  \"name\": \"Coronary angioplasty with stent placement\",\n  \"alternateName\": [\"Percutaneous coronary intervention\", \"PCI\"],\n  \"procedureType\": \"PercutaneousProcedure\",\n  \"bodyLocation\": \"Coronary arteries\",\n  \"howPerformed\": \"A thin catheter is threaded through a small puncture in the radial or femoral artery to the blocked coronary segment, where a balloon is inflated and a stent deployed.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/007473.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Angioplasty is a procedure to open narrowed or blocked blood vessels that supply blood to the heart. A flexible tube called a catheter is placed into a blood vessel in the upper thigh (groin) or arm. A stent is a small, metal mesh tube that opens up inside the coronary artery."
        },
        {
          "url": "https://medlineplus.gov/ency/article/003931.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Noninvasive procedures do not involve tools that break the skin or physically enter the body. Examples include x-rays, ultrasound, and electrocardiogram (ECG)."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Coronary angioplasty with stent placement",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007473.htm"
          ]
        },
        {
          "jsonPath": "$.alternateName[0]",
          "value": "Percutaneous coronary intervention",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007473.htm"
          ]
        },
        {
          "jsonPath": "$.alternateName[1]",
          "value": "PCI",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007473.htm"
          ]
        },
        {
          "jsonPath": "$.procedureType",
          "value": "PercutaneousProcedure",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007473.htm"
          ]
        },
        {
          "jsonPath": "$.bodyLocation",
          "value": "Coronary arteries",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007473.htm"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "A thin catheter is threaded through a small puncture in the radial or femoral artery to the blocked coronary segment, where a balloon is inflated and a stent deployed.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007473.htm"
          ]
        }
      ]
    }
  },
  "schema:MedicalResearcher": {
    "id": "schema:MedicalResearcher",
    "whenToUse": "Use MedicalResearcher when the content targets investigators, biostatisticians, or translational scientists — protocol summaries, methods papers, registry technical documentation, and trial-design references. Reserve it for material where the reader is presumed to be evaluating evidence, not delivering bedside care."
  },
  "schema:MedicalRiskCalculator": {
    "id": "schema:MedicalRiskCalculator",
    "whenToUse": "Use MedicalRiskCalculator to mark up an interactive tool that combines clinical inputs to produce a numeric risk estimate — for example, a cardiovascular ASCVD calculator that takes age, blood pressure, cholesterol values, smoking status, and diabetes status. It is the right type when the page hosts the calculator itself, not just an article that mentions one.",
    "whenNotToUse": "Do not use MedicalRiskCalculator for static educational pages that describe a risk score without computing it — use MedicalRiskScore instead. Do not use it for general symptom checkers or triage chatbots that do not produce a quantitative risk estimate of a defined condition.",
    "whoItsFor": "Cardiology service-line marketers, population-health teams, and digital product owners building patient-facing or clinician-facing risk tools that need to be discoverable as calculators rather than as articles.",
    "seoNotes": "Risk calculators are high-intent destinations that draw both patients and clinicians from search. Marking the page as MedicalRiskCalculator with an explicit estimatesRiskOf reference to the target MedicalCondition gives LLM-driven assistants a clean way to surface the tool when a user asks how to estimate their risk of a specific disease.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalRiskScore",
      "schema:MedicalRiskFactor"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/heart-disease/risk-factors/index.html and\n//  https://www.cdc.gov/cholesterol/about/index.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalRiskCalculator\",\n  \"name\": \"Cardiovascular Disease Risk Calculator\",\n  \"description\": \"Interactive calculator that combines key risk factors for heart disease — including high blood pressure, high cholesterol, and smoking — to produce an estimate of cardiovascular risk.\",\n  \"estimatesRiskOf\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Heart Disease\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/heart-disease/risk-factors/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Key risk factors for heart disease include: High blood pressure, High cholesterol, Smoking"
        },
        {
          "url": "https://www.cdc.gov/cholesterol/about/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "High cholesterol also increases your risk for heart disease and stroke, two leading causes of death in the United States."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Cardiovascular Disease Risk Calculator",
          "sourceUrls": [
            "https://www.cdc.gov/heart-disease/risk-factors/index.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Interactive calculator that combines key risk factors for heart disease — including high blood pressure, high cholesterol, and smoking — to produce an estimate of cardiovascular risk.",
          "sourceUrls": [
            "https://www.cdc.gov/heart-disease/risk-factors/index.html",
            "https://www.cdc.gov/cholesterol/about/index.html"
          ]
        },
        {
          "jsonPath": "$.estimatesRiskOf.name",
          "value": "Heart Disease",
          "sourceUrls": [
            "https://www.cdc.gov/heart-disease/risk-factors/index.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalRiskEstimator": {
    "id": "schema:MedicalRiskEstimator",
    "whenToUse": "Use MedicalRiskEstimator for a tool that screens people for risk of a condition using a small number of self-reported inputs — a prediabetes risk test that asks about age, weight, family history, and gestational-diabetes history is a clean fit. The type lets you list each input with includedRiskFactor.",
    "whenNotToUse": "Do not use MedicalRiskEstimator for full clinical calculators that depend on lab values or clinician-entered measurements — that is closer to MedicalRiskCalculator. Do not use it for symptom-only triage tools that do not estimate the probability of a specific condition.",
    "whoItsFor": "Diabetes-prevention program operators, primary-care service-line marketers, and public-health editors publishing self-screening tools as part of awareness or outreach campaigns.",
    "seoNotes": "Self-screening tests are highly searched and pull traffic from broad informational queries into a single conversion-ready destination. MedicalRiskEstimator with includedRiskFactor entries gives LLM-based assistants a structured way to recognize the tool as a prediabetes screener rather than a generic article on diabetes.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalRiskFactor",
      "schema:MedicalRiskScore"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/diabetes/prevention-type-2/index.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalRiskEstimator\",\n  \"name\": \"Prediabetes Risk Test\",\n  \"description\": \"A 1-minute prediabetes risk test that uses self-reported risk factors to flag people who should ask their doctor for a blood test to confirm prediabetes.\",\n  \"estimatesRiskOf\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Prediabetes\"\n  },\n  \"includedRiskFactor\": [\n    {\n      \"@type\": \"MedicalRiskFactor\",\n      \"name\": \"Family history of type 2 diabetes\"\n    },\n    {\n      \"@type\": \"MedicalRiskFactor\",\n      \"name\": \"Age over 45\"\n    },\n    {\n      \"@type\": \"MedicalRiskFactor\",\n      \"name\": \"Overweight or obesity\"\n    },\n    {\n      \"@type\": \"MedicalRiskFactor\",\n      \"name\": \"History of gestational diabetes\"\n    },\n    {\n      \"@type\": \"MedicalRiskFactor\",\n      \"name\": \"High blood pressure\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/diabetes/prevention-type-2/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Take the 1-minute prediabetes risk test. If your score shows you have a high risk of prediabetes, visit your doctor for a simple blood test to confirm your result."
        },
        {
          "url": "https://www.cdc.gov/diabetes/prevention-type-2/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Anyone can develop prediabetes at any age, but you may have a higher risk if you: Have a family history of type 2 diabetes. Are over age 45. Have overweight or obesity. Had gestational diabetes (diabetes when pregnant). Have high blood pressure."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Prediabetes Risk Test",
          "sourceUrls": [
            "https://www.cdc.gov/diabetes/prevention-type-2/index.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A 1-minute prediabetes risk test that uses self-reported risk factors to flag people who should ask their doctor for a blood test to confirm prediabetes.",
          "sourceUrls": [
            "https://www.cdc.gov/diabetes/prevention-type-2/index.html"
          ]
        },
        {
          "jsonPath": "$.estimatesRiskOf.name",
          "value": "Prediabetes",
          "sourceUrls": [
            "https://www.cdc.gov/diabetes/prevention-type-2/index.html"
          ]
        },
        {
          "jsonPath": "$.includedRiskFactor[0].name",
          "value": "Family history of type 2 diabetes",
          "sourceUrls": [
            "https://www.cdc.gov/diabetes/prevention-type-2/index.html"
          ]
        },
        {
          "jsonPath": "$.includedRiskFactor[1].name",
          "value": "Age over 45",
          "sourceUrls": [
            "https://www.cdc.gov/diabetes/prevention-type-2/index.html"
          ]
        },
        {
          "jsonPath": "$.includedRiskFactor[2].name",
          "value": "Overweight or obesity",
          "sourceUrls": [
            "https://www.cdc.gov/diabetes/prevention-type-2/index.html"
          ]
        },
        {
          "jsonPath": "$.includedRiskFactor[3].name",
          "value": "History of gestational diabetes",
          "sourceUrls": [
            "https://www.cdc.gov/diabetes/prevention-type-2/index.html"
          ]
        },
        {
          "jsonPath": "$.includedRiskFactor[4].name",
          "value": "High blood pressure",
          "sourceUrls": [
            "https://www.cdc.gov/diabetes/prevention-type-2/index.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalRiskFactor": {
    "id": "schema:MedicalRiskFactor",
    "whenToUse": "Use MedicalRiskFactor for an exposure or trait that raises the probability of a disease without being the proximate cause — smoking and cardiovascular disease, sedentary lifestyle and type 2 diabetes, family history and breast cancer. Pair every risk factor with the condition whose risk it modifies.",
    "whenNotToUse": "Do not use MedicalRiskFactor when the exposure is the established cause — use MedicalCause. Do not use it for protective factors or interventions that lower risk; those fit better as Drug, MedicalProcedure, or MedicalTherapy entries.",
    "whoItsFor": "Preventive-medicine editors, payer wellness-program writers, and primary-care patient-education teams.",
    "seoNotes": "Connecting MedicalRiskFactor to the increasesRiskOf condition gives an assistant a clean answer to 'what raises my risk of heart disease.' Without that link the page becomes a generic lifestyle article.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalCause",
      "schema:PreventionIndication"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/tobacco/about/cigarettes-and-cardiovascular-disease.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalRiskFactor\",\n  \"name\": \"Cigarette smoking\",\n  \"increasesRiskOf\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Cardiovascular disease\",\n    \"description\": \"Smoking is a major cause of CVD, causing one in every four deaths from CVD. Smoking increases the risk for coronary heart disease by 2 to 4 times. Even people who smoke fewer than five cigarettes a day can have early signs of cardiovascular disease.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/tobacco/about/cigarettes-and-cardiovascular-disease.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Smoking is a major cause of CVD, causing one in every four deaths from CVD."
        },
        {
          "url": "https://www.cdc.gov/tobacco/about/cigarettes-and-cardiovascular-disease.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Smoking increases the risk for coronary heart disease by 2 to 4 times."
        },
        {
          "url": "https://www.cdc.gov/tobacco/about/cigarettes-and-cardiovascular-disease.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Even people who smoke fewer than five cigarettes a day can have early signs of cardiovascular disease."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Cigarette smoking",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/about/cigarettes-and-cardiovascular-disease.html"
          ]
        },
        {
          "jsonPath": "$.increasesRiskOf.name",
          "value": "Cardiovascular disease",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/about/cigarettes-and-cardiovascular-disease.html"
          ]
        },
        {
          "jsonPath": "$.increasesRiskOf.description",
          "value": "Smoking is a major cause of CVD, causing one in every four deaths from CVD. Smoking increases the risk for coronary heart disease by 2 to 4 times. Even people who smoke fewer than five cigarettes a day can have early signs of cardiovascular disease.",
          "sourceUrls": [
            "https://www.cdc.gov/tobacco/about/cigarettes-and-cardiovascular-disease.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalRiskScore": {
    "id": "schema:MedicalRiskScore",
    "whenToUse": "Use MedicalRiskScore for the named, citeable score itself — for example a page that defines the ASCVD 10-year cardiovascular risk score, the inputs that feed it, and the population it is intended for. The type lets you carry the numeric value, its valueReference scale, and the suggestedAge range for whom the score is designed.",
    "whenNotToUse": "Do not use MedicalRiskScore for the calculator interface that produces the score — that is MedicalRiskCalculator. Do not use it for general lab results or vital sign readings that are not framed as a defined, named risk score.",
    "whoItsFor": "Cardiology editors, evidence-based medicine reference sites, and CME teams maintaining authoritative pages that define risk scores cited in clinical guidance.",
    "seoNotes": "Named risk scores are anchor entities in clinical content — they are searched by name and cited across guidelines. Marking the page as MedicalRiskScore with explicit valueReference and estimatesRiskOf gives LLM-driven assistants a single canonical entity to attribute when summarizing what a score is and which condition it estimates.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalRiskCalculator",
      "schema:MedicalRiskFactor"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/heart-disease/risk-factors/index.html and\n//  https://www.cdc.gov/cholesterol/about/index.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalRiskScore\",\n  \"name\": \"ASCVD 10-Year Risk Score\",\n  \"description\": \"A named cardiovascular risk score that combines key risk factors for heart disease — high blood pressure, high cholesterol, and smoking — to express a person's 10-year risk of heart disease and stroke.\",\n  \"estimatesRiskOf\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Atherosclerotic Cardiovascular Disease\"\n  },\n  \"includedRiskFactor\": [\n    {\n      \"@type\": \"MedicalRiskFactor\",\n      \"name\": \"High blood pressure\"\n    },\n    {\n      \"@type\": \"MedicalRiskFactor\",\n      \"name\": \"High cholesterol\"\n    },\n    {\n      \"@type\": \"MedicalRiskFactor\",\n      \"name\": \"Smoking\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/heart-disease/risk-factors/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Key risk factors for heart disease include: High blood pressure, High cholesterol, Smoking"
        },
        {
          "url": "https://www.cdc.gov/cholesterol/about/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "High cholesterol also increases your risk for heart disease and stroke, two leading causes of death in the United States."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "ASCVD 10-Year Risk Score",
          "sourceUrls": [
            "https://www.cdc.gov/heart-disease/risk-factors/index.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A named cardiovascular risk score that combines key risk factors for heart disease — high blood pressure, high cholesterol, and smoking — to express a person's 10-year risk of heart disease and stroke.",
          "sourceUrls": [
            "https://www.cdc.gov/heart-disease/risk-factors/index.html",
            "https://www.cdc.gov/cholesterol/about/index.html"
          ]
        },
        {
          "jsonPath": "$.estimatesRiskOf.name",
          "value": "Atherosclerotic Cardiovascular Disease",
          "sourceUrls": [
            "https://www.cdc.gov/heart-disease/risk-factors/index.html"
          ]
        },
        {
          "jsonPath": "$.includedRiskFactor[0].name",
          "value": "High blood pressure",
          "sourceUrls": [
            "https://www.cdc.gov/heart-disease/risk-factors/index.html"
          ]
        },
        {
          "jsonPath": "$.includedRiskFactor[1].name",
          "value": "High cholesterol",
          "sourceUrls": [
            "https://www.cdc.gov/heart-disease/risk-factors/index.html"
          ]
        },
        {
          "jsonPath": "$.includedRiskFactor[2].name",
          "value": "Smoking",
          "sourceUrls": [
            "https://www.cdc.gov/heart-disease/risk-factors/index.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalScholarlyArticle": {
    "id": "schema:MedicalScholarlyArticle",
    "whenToUse": "Use MedicalScholarlyArticle for peer-reviewed and scholarly health-sciences articles — journal manuscripts, NLM Bookshelf chapters, society-published clinical reviews, and structured monographs. It's the right type for any page where the *page itself* is the article. Pair it with author, datePublished, publisher, and about (the medical entity the article is about).",
    "whenNotToUse": "Don't use it for blog posts, magazine-style health journalism, or marketing white papers — those are Article or BlogPosting. Don't use it for the registry record of a study (that's MedicalStudy or MedicalTrial). And don't use it for an institutional landing page that merely links to articles; the article type belongs on the article surface itself.",
    "whoItsFor": "Society and university press web teams, NLM Bookshelf and PubMed Central editors, and AMC research-communication groups publishing open-access scholarly content on the public web.",
    "seoNotes": "MedicalScholarlyArticle inherits ScholarlyArticle, so Google's article rich-result signals (headline, datePublished, author, publisher) still apply. The medical-specific value is the about property — link it to a MedicalEntity (condition, drug, procedure) so AI-assisted search can ground citations cleanly. Always include datePublished; recency is a major weighting signal for medical content.",
    "commonCombos": [
      "schema:MedicalEntity",
      "schema:Person",
      "schema:Organization",
      "schema:MedicalCondition",
      "schema:Drug"
    ],
    "example": {
      "jsonld": "// Reference example — built from the NLM-hosted Visible Human Project page\n// (https://www.nlm.nih.gov/research/visible/visible_human.html) accessed 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalScholarlyArticle\",\n  \"name\": \"The Visible Human Project\",\n  \"headline\": \"The Visible Human Project\",\n  \"url\": \"https://www.nlm.nih.gov/research/visible/visible_human.html\",\n  \"datePublished\": \"2023-12-26\",\n  \"author\": {\n    \"@type\": \"Person\",\n    \"name\": \"Michael J. Ackerman\"\n  },\n  \"publisher\": {\n    \"@type\": \"Organization\",\n    \"name\": \"National Library of Medicine\",\n    \"url\": \"https://www.nlm.nih.gov\"\n  },\n  \"about\": {\n    \"@type\": \"MedicalEntity\",\n    \"name\": \"Three-dimensional anatomical representations of male and female human bodies created through cross-sectional imaging\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.nlm.nih.gov/research/visible/visible_human.html",
          "publisher": "National Library of Medicine",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The Visible Human Project — complete, anatomically detailed, three-dimensional representations of male and female human bodies (NLM, last reviewed December 26, 2023)."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "The Visible Human Project",
          "sourceUrls": [
            "https://www.nlm.nih.gov/research/visible/visible_human.html"
          ]
        },
        {
          "jsonPath": "$.headline",
          "value": "The Visible Human Project",
          "sourceUrls": [
            "https://www.nlm.nih.gov/research/visible/visible_human.html"
          ]
        },
        {
          "jsonPath": "$.url",
          "value": "https://www.nlm.nih.gov/research/visible/visible_human.html",
          "sourceUrls": [
            "https://www.nlm.nih.gov/research/visible/visible_human.html"
          ]
        },
        {
          "jsonPath": "$.datePublished",
          "value": "2023-12-26",
          "sourceUrls": [
            "https://www.nlm.nih.gov/research/visible/visible_human.html"
          ]
        },
        {
          "jsonPath": "$.author.name",
          "value": "Michael J. Ackerman",
          "sourceUrls": [
            "https://www.nlm.nih.gov/research/visible/visible_human.html"
          ]
        },
        {
          "jsonPath": "$.publisher.name",
          "value": "National Library of Medicine",
          "sourceUrls": [
            "https://www.nlm.nih.gov/research/visible/visible_human.html"
          ]
        },
        {
          "jsonPath": "$.about.name",
          "value": "Three-dimensional anatomical representations of male and female human bodies created through cross-sectional imaging",
          "sourceUrls": [
            "https://www.nlm.nih.gov/research/visible/visible_human.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalSign": {
    "id": "schema:MedicalSign",
    "whenToUse": "Use MedicalSign for an objective finding a clinician can observe or measure — jaundice, clubbing, Murphy's sign, a heart murmur. Signs are what the examiner sees; symptoms are what the patient reports.",
    "whenNotToUse": "Do not use MedicalSign for patient-reported experiences like pain or nausea — those are MedicalSymptom. Do not use it for measured vitals such as blood pressure or pulse — those are VitalSign, a more specific subtype.",
    "whoItsFor": "Clinical-reference editors, medical-school content teams, and patient-education writers explaining what a clinician will look for during an exam.",
    "seoNotes": "Linking MedicalSign to its possibleCondition gives retrieval systems a clean answer to 'what disease causes yellow skin and eyes.' Without that link, the sign floats free of the conditions that produce it.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalTest",
      "schema:Physician"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/jaundice.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalSign\",\n  \"name\": \"Jaundice\",\n  \"description\": \"Jaundice causes your skin and the whites of your eyes to turn yellow. Too much bilirubin causes jaundice.\",\n  \"possibleCondition\": [\n    { \"@type\": \"MedicalCondition\", \"name\": \"Hepatitis\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Cirrhosis\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Bile duct blockage\" }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/jaundice.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Jaundice causes your skin and the whites of your eyes to turn yellow."
        },
        {
          "url": "https://medlineplus.gov/jaundice.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Too much bilirubin causes jaundice."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Jaundice",
          "sourceUrls": [
            "https://medlineplus.gov/jaundice.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Jaundice causes your skin and the whites of your eyes to turn yellow. Too much bilirubin causes jaundice.",
          "sourceUrls": [
            "https://medlineplus.gov/jaundice.html"
          ]
        },
        {
          "jsonPath": "$.possibleCondition[0].name",
          "value": "Hepatitis",
          "sourceUrls": [
            "https://medlineplus.gov/jaundice.html"
          ]
        },
        {
          "jsonPath": "$.possibleCondition[1].name",
          "value": "Cirrhosis",
          "sourceUrls": [
            "https://medlineplus.gov/jaundice.html"
          ]
        },
        {
          "jsonPath": "$.possibleCondition[2].name",
          "value": "Bile duct blockage",
          "sourceUrls": [
            "https://medlineplus.gov/jaundice.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalSignOrSymptom": {
    "id": "schema:MedicalSignOrSymptom",
    "whenToUse": "Use MedicalSignOrSymptom when the finding straddles both categories — fever is the canonical case, since the patient feels feverish and the clinician measures the temperature. Pick this parent type only when neither MedicalSign nor MedicalSymptom is a clean fit.",
    "whenNotToUse": "Do not default to MedicalSignOrSymptom out of indecision. If the patient is the source of the report, use MedicalSymptom; if the clinician is the source, use MedicalSign or VitalSign.",
    "whoItsFor": "Editorial leads who maintain the symptom taxonomy on a health portal and need a parent bucket for findings that legitimately cross the sign/symptom line.",
    "seoNotes": "Use MedicalSignOrSymptom sparingly. Search retrieval prefers the more specific subtype when it applies, so reserve this parent for genuinely ambiguous findings.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalTest",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/fever.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalSignOrSymptom\",\n  \"name\": \"Fever\",\n  \"description\": \"A fever is a body temperature that is higher than normal. A normal temperature can vary from person to person. A fever is not a disease. It is a sign that your body is trying to fight an illness or infection.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/fever.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A fever is a body temperature that is higher than normal. A normal temperature can vary from person to person, but it is usually around 98.6 °F (37 °C)."
        },
        {
          "url": "https://medlineplus.gov/fever.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A fever is not a disease. It is usually a sign that your body is trying to fight an illness or infection."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Fever",
          "sourceUrls": [
            "https://medlineplus.gov/fever.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A fever is a body temperature that is higher than normal. A normal temperature can vary from person to person, but it is usually around 98.6 °F (37 °C). A fever is not a disease. It is usually a sign that your body is trying to fight an illness or infection.",
          "sourceUrls": [
            "https://medlineplus.gov/fever.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalSpecialty": {
    "id": "schema:MedicalSpecialty",
    "whenToUse": "Use MedicalSpecialty values to scope a Physician, Hospital, MedicalClinic, or MedicalOrganization to a clinical area — Cardiovascular, Oncologic, Pediatric, Surgical, and so on. The enumeration's 42 members cover the major medical specialties; pick the most specific value that matches your provider's actual scope of practice.",
    "whenNotToUse": "Don't use MedicalSpecialty for sub-specialties below the enumeration's granularity (e.g., \"interventional cardiology\" or \"pediatric cardiology\") — use a free-text description for that level of detail. Don't apply MedicalSpecialty to a procedure or condition entity directly; it scopes the practitioner or organization, not the clinical content.",
    "whoItsFor": "Health-system marketers building service-line landing pages, provider-directory editors at payer sites, and physician-bio writers at hospital systems and group practices. Pharma medical-affairs teams use MedicalSpecialty to target HCP-facing content to specific specialist audiences.",
    "seoNotes": "MedicalSpecialty enums sharpen entity disambiguation for LLM-based health assistants and surface providers in specialty-specific directory queries. They are a stronger signal for \"cardiologist near me\" or \"pediatric oncologist accepting new patients\" than free-text department labels alone.",
    "commonCombos": [
      "schema:Physician",
      "schema:Hospital",
      "schema:MedicalClinic",
      "schema:MedicalOrganization",
      "schema:MedicalProcedure"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/heartdiseases.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Physician\",\n  \"name\": \"Example Cardiology Practice\",\n  \"medicalSpecialty\": {\n    \"@type\": \"Cardiovascular\",\n    \"name\": \"Cardiovascular medicine\"\n  },\n  \"availableService\": {\n    \"@type\": \"MedicalProcedure\",\n    \"name\": \"Cardiology consultation\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/heartdiseases.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "cardiologist (a doctor who specializes in heart diseases)"
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Example Cardiology Practice",
          "sourceUrls": [
            "https://medlineplus.gov/heartdiseases.html"
          ]
        },
        {
          "jsonPath": "$.medicalSpecialty.name",
          "value": "Cardiovascular medicine",
          "sourceUrls": [
            "https://medlineplus.gov/heartdiseases.html"
          ]
        },
        {
          "jsonPath": "$.availableService.name",
          "value": "Cardiology consultation",
          "sourceUrls": [
            "https://medlineplus.gov/heartdiseases.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalStudy": {
    "id": "schema:MedicalStudy",
    "whenToUse": "Use MedicalStudy as the parent type for any human-subjects research record on your site — registry pages, study landing pages on academic medical center sites, or sponsor-facing research portfolio pages. It carries the core registration metadata (status, sponsor, subject, location, condition) that downstream subtypes like MedicalTrial and MedicalObservationalStudy refine. Default to a more specific subtype when you know the design.",
    "whenNotToUse": "Don't use MedicalStudy on a results-only page (a published manuscript belongs on MedicalScholarlyArticle). Don't use it on a condition or treatment overview that merely references trials — those want MedicalCondition or Drug as primary, with MedicalStudy linked via referenced properties. Skip it for non-human research and for survey/market-research projects that are not formal medical investigations.",
    "whoItsFor": "Academic medical center web teams publishing study directories, sponsor and CRO marketing teams maintaining trial portfolios, and registry editors mapping ClinicalTrials.gov entries onto the public web.",
    "seoNotes": "MedicalStudy markup grounds the entity for AI-assisted search and helps disambiguation when the same protocol exists across registries. Anchor the record with status (an enumerated MedicalStudyStatus), studySubject, sponsor, and healthCondition. Google does not currently render a dedicated rich result for MedicalStudy; the value is in entity resolution and clean knowledge-graph linking.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Organization",
      "schema:Person",
      "schema:MedicalScholarlyArticle",
      "schema:Place"
    ],
    "example": {
      "jsonld": "// Reference example — built from public registration metadata at ClinicalTrials.gov\n// (https://clinicaltrials.gov/study/NCT03021993) accessed 2026-05-05.\n// Registration metadata only — no results or efficacy claims.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalStudy\",\n  \"name\": \"Phase II Trial of Nivolumab, an Anti-PD-1 Monoclonal Antibody, as a Novel Neoadjuvant Pre-Surgical Therapy for Locally Advanced Oral Cavity Cancer\",\n  \"identifier\": \"NCT03021993\",\n  \"status\": \"Completed\",\n  \"studySubject\": {\n    \"@type\": \"Drug\",\n    \"name\": \"Nivolumab\"\n  },\n  \"healthCondition\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Oral Cavity Squamous Cell Carcinoma\"\n  },\n  \"sponsor\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Medical University of South Carolina\"\n  },\n  \"studyLocation\": {\n    \"@type\": \"Place\",\n    \"name\": \"Medical University of South Carolina\",\n    \"address\": {\n      \"@type\": \"PostalAddress\",\n      \"addressLocality\": \"Charleston\",\n      \"addressRegion\": \"South Carolina\",\n      \"addressCountry\": \"US\"\n    }\n  }\n}\n",
      "sources": [
        {
          "url": "https://clinicaltrials.gov/study/NCT03021993",
          "publisher": "ClinicalTrials.gov (U.S. National Library of Medicine)",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Phase II Trial of Nivolumab, an Anti-PD-1 Monoclonal Antibody, as a Novel Neoadjuvant Pre-Surgical Therapy for Locally Advanced Oral Cavity Cancer"
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Phase II Trial of Nivolumab, an Anti-PD-1 Monoclonal Antibody, as a Novel Neoadjuvant Pre-Surgical Therapy for Locally Advanced Oral Cavity Cancer",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT03021993"
          ]
        },
        {
          "jsonPath": "$.identifier",
          "value": "NCT03021993",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT03021993"
          ]
        },
        {
          "jsonPath": "$.status",
          "value": "Completed",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT03021993"
          ]
        },
        {
          "jsonPath": "$.studySubject.name",
          "value": "Nivolumab",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT03021993"
          ]
        },
        {
          "jsonPath": "$.healthCondition.name",
          "value": "Oral Cavity Squamous Cell Carcinoma",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT03021993"
          ]
        },
        {
          "jsonPath": "$.sponsor.name",
          "value": "Medical University of South Carolina",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT03021993"
          ]
        },
        {
          "jsonPath": "$.studyLocation.name",
          "value": "Medical University of South Carolina",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT03021993"
          ]
        },
        {
          "jsonPath": "$.studyLocation.address.addressLocality",
          "value": "Charleston",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT03021993"
          ]
        },
        {
          "jsonPath": "$.studyLocation.address.addressRegion",
          "value": "South Carolina",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT03021993"
          ]
        }
      ]
    }
  },
  "schema:MedicalStudyStatus": {
    "id": "schema:MedicalStudyStatus",
    "whenToUse": "Use MedicalStudyStatus on a MedicalStudy or MedicalTrial to express where a study sits in its lifecycle — recruiting, active, completed, suspended, or withdrawn. Pair it with a clinicaltrials.gov NCT identifier so the lifecycle value can be reconciled against the registry of record.",
    "whenNotToUse": "Don't use MedicalStudyStatus to describe drug approval status, publication status of a paper, or the editorial status of a guideline. For an individual participant's enrollment, use a different property — this enumeration describes the study, not a person.",
    "whoItsFor": "Academic medical centers, contract research organizations, and pharma communications teams who maintain trial-listing pages and need a machine-readable lifecycle signal that aligns with what clinicaltrials.gov publishes.",
    "seoNotes": "Search engines and AI assistants surface trial pages partly on freshness — keeping status accurate (Recruiting vs. Completed) reduces the chance a closed study is offered to a user looking to enroll. Update the value in the same release that updates the registry record.",
    "commonCombos": [
      "schema:MedicalTrial",
      "schema:MedicalStudy",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from ClinicalTrials.gov\n// (https://clinicaltrials.gov/study/NCT04368728) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalTrial\",\n  \"name\": \"Study to Describe the Safety, Tolerability, Immunogenicity, and Efficacy of RNA Vaccine Candidates Against COVID-19 in Healthy Individuals\",\n  \"identifier\": \"NCT04368728\",\n  \"studySubject\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"COVID-19\"\n  },\n  \"status\": \"Completed\",\n  \"trialDesign\": \"RandomizedTrial\"\n}\n",
      "sources": [
        {
          "url": "https://clinicaltrials.gov/study/NCT04368728",
          "publisher": "ClinicalTrials.gov (U.S. National Library of Medicine)",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Study to Describe the Safety, Tolerability, Immunogenicity, and Efficacy of RNA Vaccine Candidates Against COVID-19 in Healthy Individuals. Status: Completed. NCT Number: NCT04368728."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Study to Describe the Safety, Tolerability, Immunogenicity, and Efficacy of RNA Vaccine Candidates Against COVID-19 in Healthy Individuals",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.identifier",
          "value": "NCT04368728",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.studySubject.name",
          "value": "COVID-19",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.status",
          "value": "Completed",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.trialDesign",
          "value": "RandomizedTrial",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        }
      ]
    }
  },
  "schema:MedicalSymptom": {
    "id": "schema:MedicalSymptom",
    "whenToUse": "Use MedicalSymptom for a subjective experience the patient reports — pain, nausea, dizziness, fatigue, headache. The defining test is whether the finding requires the patient to describe it rather than the clinician to observe it.",
    "whenNotToUse": "Do not use MedicalSymptom for objective findings on examination such as rash distribution or jaundice — those are MedicalSign. Do not use it for the underlying disease itself; a headache page describes the symptom, a migraine page describes the MedicalCondition.",
    "whoItsFor": "Symptom-checker editorial teams, urgent-care marketers, and patient-education writers building 'is this serious' pages.",
    "seoNotes": "Symptom pages are top-of-funnel for health search. Linking MedicalSymptom to possibleCondition gives an LLM a structured triage path from the user's words to candidate diagnoses.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Drug",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/headache.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalSymptom\",\n  \"name\": \"Headache\",\n  \"description\": \"Headache is the most common form of pain.\",\n  \"possibleCondition\": [\n    { \"@type\": \"MedicalCondition\", \"name\": \"Tension headache\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Migraine\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Cluster headache\" },\n    { \"@type\": \"MedicalCondition\", \"name\": \"Sinus headache\" }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/headache.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Headache is the most common form of pain."
        },
        {
          "url": "https://medlineplus.gov/headache.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Tension headaches, migraines, cluster headaches, and sinus headaches."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Headache",
          "sourceUrls": [
            "https://medlineplus.gov/headache.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Headache is the most common form of pain.",
          "sourceUrls": [
            "https://medlineplus.gov/headache.html"
          ]
        },
        {
          "jsonPath": "$.possibleCondition[0].name",
          "value": "Tension headache",
          "sourceUrls": [
            "https://medlineplus.gov/headache.html"
          ]
        },
        {
          "jsonPath": "$.possibleCondition[1].name",
          "value": "Migraine",
          "sourceUrls": [
            "https://medlineplus.gov/headache.html"
          ]
        },
        {
          "jsonPath": "$.possibleCondition[2].name",
          "value": "Cluster headache",
          "sourceUrls": [
            "https://medlineplus.gov/headache.html"
          ]
        },
        {
          "jsonPath": "$.possibleCondition[3].name",
          "value": "Sinus headache",
          "sourceUrls": [
            "https://medlineplus.gov/headache.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalTest": {
    "id": "schema:MedicalTest",
    "whenToUse": "Use MedicalTest as the canonical type for any diagnostic or screening test page — labs, imaging, point-of-care assays, and screening protocols. It's the right base type when the page describes the test itself: what it measures, what conditions it identifies, and what device or specimen is involved. Reach for MedicalTest when a more specific subtype (BloodTest, ImagingTest, PathologyTest) does not apply.",
    "whenNotToUse": "Don't use MedicalTest for blood-specimen tests when BloodTest fits — that subtype carries normalRange semantics expected by health LLMs. Don't use it for radiologic studies; ImagingTest is the correct subtype with usesDevice expectations. Don't use MedicalTest on a condition or symptom page that merely lists tests — those should mark the test as a value of a property like typicalTest, with the page itself remaining MedicalCondition.",
    "whoItsFor": "Lab marketing and reference-lab editors publishing test catalog pages, hospital-system patient-education teams describing screenings and prep instructions, and digital-health product teams marking up at-home test kits and result-explainer content.",
    "seoNotes": "MedicalTest pages are most useful when usedToDiagnose, signDetected, and (where applicable) normalRange are explicit — these are the properties health-assistant LLMs use to ground answers to \"what does test X check for\" and \"what does an abnormal result mean.\" Google does not surface a dedicated rich result for MedicalTest; the gain is entity grounding in AI Overviews and improved disambiguation across test variants.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalSign",
      "schema:MedicalDevice",
      "schema:FAQPage",
      "schema:MedicalAudience",
      "schema:HowTo"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/lab-tests/blood-glucose-test/) on 2026-05-05. Not for use in client deliverables. Generate your own markup using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalTest\",\n  \"name\": \"Blood Glucose Test\",\n  \"description\": \"A blood glucose test measures the glucose levels in your blood. Glucose is a type of sugar. It is your body's main source of energy.\",\n  \"usedToDiagnose\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Prediabetes\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Diabetes\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Hypoglycemia\"\n    }\n  ],\n  \"signDetected\": {\n    \"@type\": \"MedicalSign\",\n    \"name\": \"Hyperglycemia\"\n  },\n  \"usesDevice\": [\n    {\n      \"@type\": \"MedicalDevice\",\n      \"name\": \"Blood glucose meter\"\n    },\n    {\n      \"@type\": \"MedicalDevice\",\n      \"name\": \"Continuous glucose monitor (CGM)\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/lab-tests/blood-glucose-test/",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A blood glucose test measures the glucose levels in your blood. Glucose is a type of sugar. It is your body's main source of energy. High blood glucose levels (hyperglycemia) may be a sign of prediabetes or diabetes."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Blood Glucose Test",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/blood-glucose-test/"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A blood glucose test measures the glucose levels in your blood. Glucose is a type of sugar. It is your body's main source of energy.",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/blood-glucose-test/"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[0].name",
          "value": "Prediabetes",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/blood-glucose-test/"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[1].name",
          "value": "Diabetes",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/blood-glucose-test/"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[2].name",
          "value": "Hypoglycemia",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/blood-glucose-test/"
          ]
        },
        {
          "jsonPath": "$.signDetected.name",
          "value": "Hyperglycemia",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/blood-glucose-test/"
          ]
        },
        {
          "jsonPath": "$.usesDevice[0].name",
          "value": "Blood glucose meter",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/blood-glucose-test/"
          ]
        },
        {
          "jsonPath": "$.usesDevice[1].name",
          "value": "Continuous glucose monitor (CGM)",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/blood-glucose-test/"
          ]
        }
      ]
    }
  },
  "schema:MedicalTestPanel": {
    "id": "schema:MedicalTestPanel",
    "whenToUse": "Use MedicalTestPanel for any test that bundles multiple distinct measurements ordered together as one specimen — comprehensive and basic metabolic panels, lipid panels, hepatic function panels, thyroid panels, and similar groupings. The defining property is subTest: the panel is the parent and each component test is a child.",
    "whenNotToUse": "Don't use MedicalTestPanel for a single-analyte test even if it has multiple result fields; that's a MedicalTest or BloodTest. Don't use it for a clinical workup composed of separately ordered tests across modalities — model those as related items rather than a panel. And don't use it on the result-explainer page for one component (e.g., \"what is high BUN\") — that page is about the component, not the panel.",
    "whoItsFor": "Reference-lab and hospital-system editors publishing test catalog pages, payer and benefits writers describing covered screenings, and digital-health teams building panel-result explainer experiences.",
    "seoNotes": "List every component analyte under subTest with its own MedicalTest entry — this is the structure health-assistant LLMs parse when answering \"what's included in a CMP\" and \"what does the lipid panel measure.\" Pair the panel with usedToDiagnose values for kidney, liver, and metabolic conditions to anchor the entity. No dedicated Google rich result; the value is grounding for AI search and disambiguation between similar panels (BMP vs. CMP).",
    "commonCombos": [
      "schema:MedicalTest",
      "schema:BloodTest",
      "schema:MedicalCondition",
      "schema:MedicalAudience",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/) on 2026-05-05. Not for use in client deliverables. Generate your own markup using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalTestPanel\",\n  \"name\": \"Comprehensive Metabolic Panel (CMP)\",\n  \"description\": \"A comprehensive metabolic panel (CMP) is a routine blood test that measures 14 different substances in a sample of your blood.\",\n  \"subTest\": [\n    { \"@type\": \"MedicalTest\", \"name\": \"Glucose\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Calcium\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Sodium\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Potassium\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Bicarbonate\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Chloride\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Albumin\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Total protein\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Alkaline phosphatase (ALP)\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Alanine aminotransferase (ALT)\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Aspartate aminotransferase (AST)\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Bilirubin\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Blood urea nitrogen (BUN)\" },\n    { \"@type\": \"MedicalTest\", \"name\": \"Creatinine\" }\n  ],\n  \"usedToDiagnose\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Diabetes\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A comprehensive metabolic panel (CMP) is a routine blood test that measures 14 different substances in a sample of your blood. High blood glucose may be a sign of diabetes."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Comprehensive Metabolic Panel (CMP)",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A comprehensive metabolic panel (CMP) is a routine blood test that measures 14 different substances in a sample of your blood.",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[0].name",
          "value": "Glucose",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[1].name",
          "value": "Calcium",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[2].name",
          "value": "Sodium",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[3].name",
          "value": "Potassium",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[4].name",
          "value": "Bicarbonate",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[5].name",
          "value": "Chloride",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[6].name",
          "value": "Albumin",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[7].name",
          "value": "Total protein",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[8].name",
          "value": "Alkaline phosphatase (ALP)",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[9].name",
          "value": "Alanine aminotransferase (ALT)",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[10].name",
          "value": "Aspartate aminotransferase (AST)",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[11].name",
          "value": "Bilirubin",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[12].name",
          "value": "Blood urea nitrogen (BUN)",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.subTest[13].name",
          "value": "Creatinine",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[0].name",
          "value": "Diabetes",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/comprehensive-metabolic-panel-cmp/"
          ]
        }
      ]
    }
  },
  "schema:MedicalTherapy": {
    "id": "schema:MedicalTherapy",
    "whenToUse": "Use MedicalTherapy as the parent type for therapeutic interventions that don't fit a more specific subtype — talk therapy, behavioral therapy, lifestyle-based interventions. It's the right anchor when a service line spans several therapy modalities and you don't want to fragment them across siblings.",
    "whenNotToUse": "Don't use MedicalTherapy when a subtype is clearly correct: PsychologicalTreatment for mental-health interventions, PhysicalTherapy for movement rehab, OccupationalTherapy for ADL retraining, RadiationTherapy for radiation. Don't use it for procedures performed in a single clinical encounter — those are TherapeuticProcedure.",
    "whoItsFor": "Behavioral health practices, mental-health programs, integrative-medicine clinics, and any service-line page describing a therapy approach that spans modalities.",
    "seoNotes": "MedicalTherapy works well for evergreen explainer pages on a therapy framework like CBT. Pair with relatedMedicalCondition or indication so search engines can connect the therapy to the problems it addresses.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Physician",
      "schema:MedicalGuideline",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/anxiety.html) on 2026-05-05. Not for use in client deliverables.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalTherapy\",\n  \"name\": \"Cognitive behavioral therapy\",\n  \"alternateName\": \"CBT\",\n  \"description\": \"Cognitive behavioral therapy (CBT), which teaches you different ways of thinking and behaving.\",\n  \"howPerformed\": \"It can help you change how you react to the things that cause you to feel fear and anxiety. It may include exposure therapy. This therapy focuses on having you confront your fears so that you will be able to do the things that you had been avoiding.\",\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"Anxiety disorders\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/anxiety.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Cognitive behavioral therapy (CBT), which teaches you different ways of thinking and behaving."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Cognitive behavioral therapy",
          "sourceUrls": [
            "https://medlineplus.gov/anxiety.html"
          ]
        },
        {
          "jsonPath": "$.alternateName",
          "value": "CBT",
          "sourceUrls": [
            "https://medlineplus.gov/anxiety.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Cognitive behavioral therapy (CBT), which teaches you different ways of thinking and behaving.",
          "sourceUrls": [
            "https://medlineplus.gov/anxiety.html"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "Helps change reactions to fear and anxiety triggers; may include exposure therapy where the patient confronts feared situations.",
          "sourceUrls": [
            "https://medlineplus.gov/anxiety.html"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "Anxiety disorders",
          "sourceUrls": [
            "https://medlineplus.gov/anxiety.html"
          ]
        }
      ]
    }
  },
  "schema:MedicalTrial": {
    "id": "schema:MedicalTrial",
    "whenToUse": "Use MedicalTrial when the study is interventional — participants are assigned to a treatment, device, or behavioral intervention. It's the right type for RCT registry pages, sponsor product-pipeline trial entries, and academic medical center pages that describe an active or completed interventional protocol. Pair it with trialDesign values (RandomizedTrial, DoubleBlindedTrial, PlaceboControlledTrial) to capture rigor.",
    "whenNotToUse": "Don't use MedicalTrial for observational research where investigators do not assign an intervention — use MedicalObservationalStudy. Don't use it for retrospective chart reviews, registries that only collect data, or non-human studies. And don't apply MedicalTrial to a results manuscript page; that page is a MedicalScholarlyArticle that may *reference* the trial.",
    "whoItsFor": "Sponsor and CRO web teams publishing trial portfolios, AMC research-office editors maintaining trial directories, and patient-recruitment site builders who need an enrollment-status-aware record.",
    "seoNotes": "Mark up status, sponsor, healthCondition, studySubject, and trialDesign. trialDesign accepts MedicalTrialDesign enum values that signal study rigor to consuming systems. Google does not currently render a rich result for MedicalTrial; the markup's value is entity disambiguation across NCT, EudraCT, and WHO ICTRP identifiers and clean grounding for AI-assisted search.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Drug",
      "schema:Organization",
      "schema:Place",
      "schema:MedicalScholarlyArticle"
    ],
    "example": {
      "jsonld": "// Reference example — built from public registration metadata at ClinicalTrials.gov\n// (https://clinicaltrials.gov/study/NCT04368728) accessed 2026-05-05.\n// Registration metadata only — no results or efficacy claims.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalTrial\",\n  \"name\": \"A Phase 1/2/3, Placebo-Controlled, Randomized, Observer-Blind, Dose-Finding Study to Evaluate the Safety, Tolerability, Immunogenicity, and Efficacy of SARS-CoV-2 RNA Vaccine Candidates Against COVID-19 in Healthy Individuals\",\n  \"identifier\": \"NCT04368728\",\n  \"status\": \"Completed\",\n  \"trialDesign\": [\"RandomizedTrial\", \"PlaceboControlledTrial\", \"DoubleBlindedTrial\"],\n  \"healthCondition\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"SARS-CoV-2 Infection\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"COVID-19\"\n    }\n  ],\n  \"sponsor\": {\n    \"@type\": \"Organization\",\n    \"name\": \"BioNTech SE\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://clinicaltrials.gov/study/NCT04368728",
          "publisher": "ClinicalTrials.gov (U.S. National Library of Medicine)",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A PHASE 1/2/3, PLACEBO-CONTROLLED, RANDOMIZED, OBSERVER-BLIND, DOSE-FINDING STUDY TO EVALUATE THE SAFETY, TOLERABILITY, IMMUNOGENICITY, AND EFFICACY OF SARS-COV-2 RNA VACCINE CANDIDATES AGAINST COVID-19 IN HEALTHY INDIVIDUALS"
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "A Phase 1/2/3, Placebo-Controlled, Randomized, Observer-Blind, Dose-Finding Study to Evaluate the Safety, Tolerability, Immunogenicity, and Efficacy of SARS-CoV-2 RNA Vaccine Candidates Against COVID-19 in Healthy Individuals",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.identifier",
          "value": "NCT04368728",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.status",
          "value": "Completed",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.trialDesign",
          "value": "RandomizedTrial, PlaceboControlledTrial, DoubleBlindedTrial",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.healthCondition[0].name",
          "value": "SARS-CoV-2 Infection",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.healthCondition[1].name",
          "value": "COVID-19",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.sponsor.name",
          "value": "BioNTech SE",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        }
      ]
    }
  },
  "schema:MedicalTrialDesign": {
    "id": "schema:MedicalTrialDesign",
    "whenToUse": "Use MedicalTrialDesign as the value of MedicalTrial.trialDesign to disclose how a study was structured — randomization, blinding, control, single- or multi-center, and geographic reach. Multiple values can be combined on one trial (a study can be RandomizedTrial, DoubleBlindedTrial, and PlaceboControlledTrial at once).",
    "whenNotToUse": "Don't use MedicalTrialDesign for observational research — that's MedicalObservationalStudyDesign on MedicalObservationalStudy. Don't use it to describe study phase, recruitment status, or the intervention itself.",
    "whoItsFor": "Sponsor and CRO communications teams publishing public-facing trial pages, academic medical centers maintaining IRB-approved trial summaries, and patient-recruitment platforms that surface study characteristics in search.",
    "seoNotes": "Listing the design values explicitly helps AI assistants answer methodology questions (\"is this trial blinded?\") without re-reading the protocol PDF. Mirror what's on the clinicaltrials.gov registration to keep the page reconcilable with the registry of record.",
    "commonCombos": [
      "schema:MedicalTrial",
      "schema:MedicalStudyStatus",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from ClinicalTrials.gov\n// (https://clinicaltrials.gov/study/NCT04368728) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalTrial\",\n  \"name\": \"Study to Describe the Safety, Tolerability, Immunogenicity, and Efficacy of RNA Vaccine Candidates Against COVID-19 in Healthy Individuals\",\n  \"identifier\": \"NCT04368728\",\n  \"trialDesign\": [\n    \"RandomizedTrial\",\n    \"PlaceboControlledTrial\",\n    \"DoubleBlindedTrial\",\n    \"MultiCenterTrial\"\n  ],\n  \"status\": \"Completed\"\n}\n",
      "sources": [
        {
          "url": "https://clinicaltrials.gov/study/NCT04368728",
          "publisher": "ClinicalTrials.gov (U.S. National Library of Medicine)",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Allocation: Randomized. Intervention Model: Parallel Assignment. Masking: Quadruple (Participant, Care Provider, Investigator, Outcomes Assessor). Primary Purpose: Prevention. Number of locations: 152."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Study to Describe the Safety, Tolerability, Immunogenicity, and Efficacy of RNA Vaccine Candidates Against COVID-19 in Healthy Individuals",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.identifier",
          "value": "NCT04368728",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.trialDesign[0]",
          "value": "RandomizedTrial",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.trialDesign[1]",
          "value": "PlaceboControlledTrial",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.trialDesign[2]",
          "value": "DoubleBlindedTrial",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.trialDesign[3]",
          "value": "MultiCenterTrial",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        },
        {
          "jsonPath": "$.status",
          "value": "Completed",
          "sourceUrls": [
            "https://clinicaltrials.gov/study/NCT04368728"
          ]
        }
      ]
    }
  },
  "schema:MedicalWebPage": {
    "id": "schema:MedicalWebPage",
    "whenToUse": "Use MedicalWebPage when the page is itself a medical reference page — a patient-education explainer, condition overview, or clinical topic page — and you want to declare its medical aspect (symptoms, treatment, prevention) and intended audience (patient or clinician). It is the right parent type for branded health-system landing pages on a single condition.",
    "whenNotToUse": "Don't use MedicalWebPage for a generic marketing page that mentions a condition in passing, for a single FAQ block (use FAQPage), or for a step-by-step procedure (use HowTo). Don't use it as a substitute for the underlying clinical entity — model the disease with MedicalCondition and reference it via about.",
    "whoItsFor": "Health-system content teams publishing condition libraries, patient-education editors at academic medical centers, and clinical publishers who need to declare the audience and aspect of a reference page.",
    "seoNotes": "MedicalWebPage signals to search and LLM assistants that the page is medically scoped, with a defined audience and aspect — combine medicalAudience=Patient with aspect values like 'Symptoms' or 'Treatment' so retrieval surfaces the right slice. Pair lastReviewed and reviewedBy to demonstrate clinical oversight.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Physician",
      "schema:MedicalAudience"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/diabetestype2.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalWebPage\",\n  \"name\": \"Type 2 Diabetes\",\n  \"url\": \"https://medlineplus.gov/diabetestype2.html\",\n  \"lastReviewed\": \"2026-05-05\",\n  \"medicalAudience\": {\n    \"@type\": \"MedicalAudience\",\n    \"audienceType\": \"Patient\"\n  },\n  \"aspect\": \"Symptoms, Diagnosis, Treatment\",\n  \"about\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Type 2 Diabetes\",\n    \"description\": \"Type 2 diabetes is a disease in which your blood glucose, or blood sugar, levels are too high.\",\n    \"signOrSymptom\": [\n      { \"@type\": \"MedicalSymptom\", \"name\": \"Increased thirst and urination\" },\n      { \"@type\": \"MedicalSymptom\", \"name\": \"Blurred vision\" },\n      { \"@type\": \"MedicalSymptom\", \"name\": \"Slow-healing sores\" }\n    ]\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/diabetestype2.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Type 2 diabetes is a disease in which your blood glucose, or blood sugar, levels are too high."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Type 2 Diabetes",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.url",
          "value": "https://medlineplus.gov/diabetestype2.html",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.about.name",
          "value": "Type 2 Diabetes",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.about.description",
          "value": "Type 2 diabetes is a disease in which your blood glucose, or blood sugar, levels are too high.",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.about.signOrSymptom[0].name",
          "value": "Increased thirst and urination",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.about.signOrSymptom[1].name",
          "value": "Blurred vision",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        },
        {
          "jsonPath": "$.about.signOrSymptom[2].name",
          "value": "Slow-healing sores",
          "sourceUrls": [
            "https://medlineplus.gov/diabetestype2.html"
          ]
        }
      ]
    }
  },
  "schema:MedicineSystem": {
    "id": "schema:MedicineSystem",
    "whenToUse": "Use MedicineSystem on a MedicalTherapy, MedicalProcedure, or DietarySupplement to declare the system of medical practice the intervention belongs to — Western conventional, Ayurvedic, Traditional Chinese, homeopathic, chiropractic, or osteopathic. Attach it via the `medicineSystem` property whenever a page mixes conventional and complementary content and the system of origin should be machine-readable.",
    "whenNotToUse": "Don't use MedicineSystem to express a clinician's licensure or specialty — that belongs on MedicalSpecialty or the practitioner profile. Don't use it as a quality or safety signal; the value names the tradition, not whether the intervention is regulated or evidence-based.",
    "whoItsFor": "Integrative-medicine programs, naturopathic and chiropractic clinics, NIH-aligned consumer health publishers, and pharmacy or supplement retailers separating conventional and complementary content for editorial and regulatory clarity.",
    "seoNotes": "MedicineSystem is a strong disambiguator for AI assistants reasoning about therapy provenance — homeopathic and conventional remedies for the same symptom should be distinguishable in markup. Pair with `MedicalCondition` and an explicit `audience` so the system label is read alongside the indication and reader.",
    "commonCombos": [
      "schema:MedicalTherapy",
      "schema:MedicalProcedure",
      "schema:DietarySupplement",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// Complementary and Integrative Medicine\n// (https://medlineplus.gov/complementaryandintegrativemedicine.html) and\n// MedlinePlus Acupuncture (https://medlineplus.gov/druginfo/natural/patient-acupuncture.html)\n// on 2026-05-05. Not for use in client deliverables. Generate your own markup\n// using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalTherapy\",\n  \"name\": \"Acupuncture\",\n  \"medicineSystem\": \"TraditionalChinese\",\n  \"description\": \"Acupuncture is a technique in which practitioners insert fine needles into the skin to treat health problems.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/natural/patient-acupuncture.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Acupuncture is a technique in which practitioners insert fine needles into the skin to treat health problems."
        },
        {
          "url": "https://medlineplus.gov/complementaryandintegrativemedicine.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Complementary and integrative medicine includes a wide range of practices and treatments that are not part of standard medical care."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Acupuncture",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/natural/patient-acupuncture.html"
          ]
        },
        {
          "jsonPath": "$.medicineSystem",
          "value": "TraditionalChinese",
          "sourceUrls": [
            "https://medlineplus.gov/complementaryandintegrativemedicine.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Acupuncture is a technique in which practitioners insert fine needles into the skin to treat health problems.",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/natural/patient-acupuncture.html"
          ]
        }
      ]
    }
  },
  "schema:Midwifery": {
    "id": "schema:Midwifery",
    "whenToUse": "Use Midwifery when scoping a clinician or service line to nurse-midwife or certified-midwife care — prenatal, labor and delivery, postpartum, and routine well-woman services. Pair with Obstetric for OB physician partners and with MedicalOrganization entities for birth centers and midwifery practices."
  },
  "schema:MultiCenterTrial": {
    "id": "schema:MultiCenterTrial",
    "whenToUse": "Use MultiCenterTrial when the study runs at more than one investigative site under a shared protocol. This is one of the more useful design signals for recruitment pages because users searching for a site near them want to know the trial isn't single-institution."
  },
  "schema:MulticellularParasite": {
    "id": "schema:MulticellularParasite",
    "whenToUse": "Use MulticellularParasite when the etiologic agent is a helminth or arthropod — roundworms, tapeworms, flukes, lice, or scabies mites. Apply it on entries covering soil-transmitted helminth infections, schistosomiasis, scabies, and pediculosis, where antiparasitic or antiectoparasite therapy is the relevant therapeutic class."
  },
  "schema:Muscle": {
    "id": "schema:Muscle",
    "whenToUse": "Use Muscle for any page about a named skeletal muscle or muscle group — biceps brachii, quadriceps, rotator cuff. It is the right type for musculoskeletal-anatomy reference articles and the anatomical anchor on sports-medicine, rehab, and surgical content.",
    "whenNotToUse": "Don't use Muscle for tendons that attach the muscle to bone, for the joint the muscle moves (use Joint), or for cardiac and smooth muscle of organs (those are tissue properties of the organ, not standalone Muscle entries here). Don't apply it to a strain or tear — that's MedicalCondition.",
    "whoItsFor": "Sports-medicine practice editors, physical-therapy and athletic-training content teams, orthopedic-surgery service-lines, and patient-education editors covering muscle injury and recovery.",
    "seoNotes": "Muscle pages support exercise, injury, and rehab queries when wired to the bones they originate and insert on and the joint they actuate. Google does not currently issue a dedicated rich result for Muscle; populate function and relatedCondition for graph value.",
    "commonCombos": [
      "schema:Bone",
      "schema:Joint",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/muscledisorders.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Muscle\",\n  \"name\": \"Skeletal muscle\",\n  \"function\": \"Your muscles help you move and help your body work.\",\n  \"relatedCondition\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Muscular dystrophy\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Myositis\",\n      \"description\": \"Inflammation of the muscles.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/muscledisorders.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Your muscles help you move and help your body work. Muscle disorders can cause weakness, pain or even paralysis. Causes of muscle disorders include... Genetic disorders, such as muscular dystrophy... Inflammation, such as myositis."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Skeletal muscle",
          "sourceUrls": [
            "https://medlineplus.gov/muscledisorders.html"
          ]
        },
        {
          "jsonPath": "$.function",
          "value": "Your muscles help you move and help your body work.",
          "sourceUrls": [
            "https://medlineplus.gov/muscledisorders.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[0].name",
          "value": "Muscular dystrophy",
          "sourceUrls": [
            "https://medlineplus.gov/muscledisorders.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[1].name",
          "value": "Myositis",
          "sourceUrls": [
            "https://medlineplus.gov/muscledisorders.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[1].description",
          "value": "Inflammation of the muscles.",
          "sourceUrls": [
            "https://medlineplus.gov/muscledisorders.html"
          ]
        }
      ]
    }
  },
  "schema:Musculoskeletal": {
    "id": "schema:Musculoskeletal",
    "whenToUse": "Use Musculoskeletal when scoping a Physician or service line to bones, joints, ligaments, and muscle disorders — orthopedics, sports medicine, and physiatry. Pair with Bone, Joint, or Muscle anatomical entities, and with MedicalCondition entities like Osteoarthritis or Rotator Cuff Tear."
  },
  "schema:MusculoskeletalExam": {
    "id": "schema:MusculoskeletalExam",
    "whenToUse": "Use MusculoskeletalExam for the MSK portion of a physical — joint inspection, range of motion, strength testing, and provocative maneuvers. Pair with MedicalCondition entities like Osteoarthritis or Rotator Cuff Tear and with Joint or Bone anatomical entities."
  },
  "schema:Neck": {
    "id": "schema:Neck",
    "whenToUse": "Use Neck for cervical exam — lymph-node palpation, thyroid assessment, carotid auscultation, and range of motion. Pair with Head and Throat to complete the upper-airway and HEENT documentation."
  },
  "schema:Nerve": {
    "id": "schema:Nerve",
    "whenToUse": "Use Nerve for any page about a named peripheral or cranial nerve — median, ulnar, sciatic, vagus, optic. It is the right type for neuroanatomy reference content and the anatomical anchor on neurology, neurosurgery, and pain-management pages.",
    "whenNotToUse": "Don't use Nerve for the central nervous system as a whole (use AnatomicalSystem), for brain regions (use BrainStructure), or for neuropathy and neuralgia (those are MedicalCondition with the nerve referenced as associatedAnatomy).",
    "whoItsFor": "Neurology and pain-management practice editors, hand-surgery and orthopedic teams, electrodiagnostic labs, and patient-education editors covering compression syndromes and nerve injury.",
    "seoNotes": "Nerve pages should specify which muscles the nerve innervates and which skin regions it provides sensation to — that wiring is what lets LLM assistants answer compression-syndrome and dermatome questions accurately. Connect to the broader nervous AnatomicalSystem.",
    "commonCombos": [
      "schema:AnatomicalSystem",
      "schema:Muscle",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/carpaltunnelsyndrome.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Nerve\",\n  \"name\": \"Median nerve\",\n  \"bodyLocation\": \"Runs from your lower arm through the carpal tunnel and into your hand.\",\n  \"function\": \"Provides feeling to your thumb and first three fingers. It also helps you move your thumb.\",\n  \"relatedCondition\": {\n    \"@type\": \"MedicalCondition\",\n    \"name\": \"Carpal tunnel syndrome\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/carpaltunnelsyndrome.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The median nerve runs from your lower arm through the carpal tunnel and into your hand. It provides feeling to your thumb and first three fingers. It also helps you move your thumb."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Median nerve",
          "sourceUrls": [
            "https://medlineplus.gov/carpaltunnelsyndrome.html"
          ]
        },
        {
          "jsonPath": "$.bodyLocation",
          "value": "Runs from your lower arm through the carpal tunnel and into your hand.",
          "sourceUrls": [
            "https://medlineplus.gov/carpaltunnelsyndrome.html"
          ]
        },
        {
          "jsonPath": "$.function",
          "value": "Provides feeling to your thumb and first three fingers. It also helps you move your thumb.",
          "sourceUrls": [
            "https://medlineplus.gov/carpaltunnelsyndrome.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition.name",
          "value": "Carpal tunnel syndrome",
          "sourceUrls": [
            "https://medlineplus.gov/carpaltunnelsyndrome.html"
          ]
        }
      ]
    }
  },
  "schema:Neuro": {
    "id": "schema:Neuro",
    "whenToUse": "Use Neuro for the neurologic exam — mental status, cranial nerves, motor and sensory testing, reflexes, coordination, and gait. Pair with MedicalCondition entities like Stroke, Multiple Sclerosis, or Peripheral Neuropathy."
  },
  "schema:Neurologic": {
    "id": "schema:Neurologic",
    "whenToUse": "Use Neurologic when scoping a Physician or service line to neurology — stroke, epilepsy, headache, movement disorders, multiple sclerosis, and neuromuscular disease. Pair with BrainStructure and Nerve anatomical entities and with MedicalCondition entities like Parkinson Disease or Migraine."
  },
  "schema:NoninvasiveProcedure": {
    "id": "schema:NoninvasiveProcedure",
    "whenToUse": "Use NoninvasiveProcedure when the procedure does not break the skin or enter a body cavity — external imaging (X-ray, ultrasound, MRI), surface ECG, transcutaneous monitoring, and external physical therapy techniques. Mark patient-education and service-line pages where the absence of incision or puncture is a key reader concern."
  },
  "schema:Nose": {
    "id": "schema:Nose",
    "whenToUse": "Use Nose for nasal exam — external inspection, anterior rhinoscopy, septum and turbinate assessment, and patency check. Pair with MedicalCondition entities like Allergic Rhinitis, Sinusitis, or Epistaxis."
  },
  "schema:NotYetRecruiting": {
    "id": "schema:NotYetRecruiting",
    "whenToUse": "Use NotYetRecruiting when a study is registered and approved but has not opened enrollment. This is the state to publish during pre-launch communications, paired with the registered start date so search results don't promise immediate participation."
  },
  "schema:Nursing": {
    "id": "schema:Nursing",
    "whenToUse": "Use Nursing when scoping a clinician, school, or unit to professional nursing practice — RN, NP, and CNS roles, plus nursing education and inpatient nursing services. Pair with Nurse Physician-equivalent records and with MedicalOrganization entities for nursing schools or nurse-led clinics."
  },
  "schema:OTC": {
    "id": "schema:OTC",
    "whenToUse": "Use OTC when the drug is sold over the counter and a consumer can purchase it without a prescription. If the same active ingredient is also sold in a prescription strength or formulation, model that as a separate Drug entry with its own prescriptionStatus."
  },
  "schema:Observational": {
    "id": "schema:Observational",
    "whenToUse": "Use Observational as the umbrella value when the study is non-interventional but doesn't fit a more specific design like CohortStudy or CrossSectional. Prefer the more specific child value when one applies — Observational is a fallback, not a default."
  },
  "schema:Obstetric": {
    "id": "schema:Obstetric",
    "whenToUse": "Use Obstetric when scoping a Physician or service line to pregnancy care and delivery — prenatal care, labor and delivery, maternal-fetal medicine, and postpartum follow-up. Pair with Gynecologic for OB-GYN combined practices and with Midwifery for collaborative birth-center programs."
  },
  "schema:OccupationalActivity": {
    "id": "schema:OccupationalActivity",
    "whenToUse": "Use OccupationalActivity for movement performed as part of paid or unpaid work — construction labor, warehouse picking, nursing rounds, agricultural harvesting, cleaning. Apply it on occupational-health, return-to-work, and ergonomics content where the activity load comes from the job itself rather than a recreational program."
  },
  "schema:OccupationalTherapy": {
    "id": "schema:OccupationalTherapy",
    "whenToUse": "Use OccupationalTherapy for interventions that help patients regain or develop the ability to perform daily living activities — post-stroke ADL training, hand therapy after injury, sensory integration for pediatric patients, fine-motor and cognitive retraining. OT clinic pages, rehab service lines, and discharge-planning resources all warrant this type.",
    "whenNotToUse": "Don't use OccupationalTherapy for movement, strength, or gait rehab focused on impairments rather than functional tasks — that's PhysicalTherapy. Don't use it for cognitive or mental-health treatment delivered by a psychologist — that's PsychologicalTreatment. The two rehab types frequently coexist on a single rehab program page; mark each discretely.",
    "whoItsFor": "Inpatient and outpatient rehab services, stroke recovery programs, hand-therapy clinics, pediatric developmental services, and home-health agencies describing OT visits.",
    "seoNotes": "OccupationalTherapy is often searched alongside specific conditions (post-stroke OT, pediatric OT). Populating indication and bodyLocation along with relatedMedicalCondition gives both crawlers and LLMs a clean way to surface OT for the right patient cohort.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Hospital",
      "schema:Physician",
      "schema:AnatomicalStructure",
      "schema:PhysicalTherapy"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/strokerehabilitation.html) on 2026-05-05. Not for use in client deliverables.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"OccupationalTherapy\",\n  \"name\": \"Post-stroke occupational therapy\",\n  \"description\": \"Stroke rehabilitation is a program for people who have had a stroke. Occupational therapy helps improve your ability to perform daily living skills such as eating, drinking, bathing, and dressing.\",\n  \"howPerformed\": \"Therapists work with patients on daily living skills including eating, drinking, bathing, and dressing.\",\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"Stroke rehabilitation can help you relearn skills you lost because of the damage.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/strokerehabilitation.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Occupational therapy. To help improve your ability to perform daily living skills such as eating, drinking, bathing, and dressing."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Post-stroke occupational therapy",
          "sourceUrls": [
            "https://medlineplus.gov/strokerehabilitation.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Stroke rehabilitation is a program for people who have had a stroke; occupational therapy helps improve daily living skills such as eating, drinking, bathing, and dressing.",
          "sourceUrls": [
            "https://medlineplus.gov/strokerehabilitation.html"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "Therapists work with patients on daily living skills including eating, drinking, bathing, and dressing.",
          "sourceUrls": [
            "https://medlineplus.gov/strokerehabilitation.html"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "Stroke rehabilitation can help you relearn skills you lost because of the damage.",
          "sourceUrls": [
            "https://medlineplus.gov/strokerehabilitation.html"
          ]
        }
      ]
    }
  },
  "schema:Oncologic": {
    "id": "schema:Oncologic",
    "whenToUse": "Use Oncologic when scoping a Physician or service line to cancer care — medical, surgical, and radiation oncology, plus hematologic malignancy. Pair with MedicalCondition entities for specific cancers and with MedicalProcedure entities for chemotherapy, immunotherapy, and radiation."
  },
  "schema:OpenTrial": {
    "id": "schema:OpenTrial",
    "whenToUse": "Use OpenTrial when both the investigator and the participant know which intervention has been assigned — neither party is blinded. Be explicit in the page copy: open-label is a deliberate design choice, not a methodological weakness, and readers should not infer one from the other."
  },
  "schema:Optician": {
    "id": "schema:Optician",
    "whenToUse": "Use Optician for a vision-care professional or shop that fits or adjusts glasses or contact lenses based on a prescription written by an eye care specialist. It is the right type when the page describes dispensing eyewear rather than diagnosing vision problems.",
    "whenNotToUse": "Don't use Optician for an optometrist, who performs eye exams and prescribes corrective lenses (use Physician with the appropriate medicalSpecialty), or for an ophthalmologist, who treats eye diseases and performs surgery. Don't use it for the lens manufacturer.",
    "whoItsFor": "Optical-shop owners and the agencies building their websites, plus patient-education publishers explaining the difference between opticians, optometrists, and ophthalmologists.",
    "seoNotes": "Optician pages compete in local search for queries like 'eyeglasses near me'. Pair address and openingHours with availableService entries describing fitting and adjustment so assistants can route prescription-fulfillment intent correctly.",
    "commonCombos": [
      "schema:MedicalBusiness",
      "schema:Physician",
      "schema:MedicalProcedure"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/refractiveerrors.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Optician\",\n  \"name\": \"Community Optician\",\n  \"description\": \"A vision-care provider who fits or adjusts glasses or contact lenses based on a prescription from an eye care specialist.\",\n  \"availableService\": [\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Eyewear fitting and adjustment\",\n      \"description\": \"Fit or adjust glasses or contact lenses based on a prescription from your eye care specialist.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/refractiveerrors.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Opticians fit or adjust glasses or contact lenses based on a prescription from your eye care specialist."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A vision-care provider who fits or adjusts glasses or contact lenses based on a prescription from an eye care specialist.",
          "sourceUrls": [
            "https://medlineplus.gov/refractiveerrors.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].name",
          "value": "Eyewear fitting and adjustment",
          "sourceUrls": [
            "https://medlineplus.gov/refractiveerrors.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].description",
          "value": "Fit or adjust glasses or contact lenses based on a prescription from your eye care specialist.",
          "sourceUrls": [
            "https://medlineplus.gov/refractiveerrors.html"
          ]
        }
      ]
    }
  },
  "schema:Optometric": {
    "id": "schema:Optometric",
    "whenToUse": "Use Optometric when scoping an optometrist, vision-care practice, or refraction-based service to eye exams and corrective lenses. Pair with MedicalBusiness rather than Physician for OD-led practices, and reserve ophthalmologic medical and surgical eye care for an Ophthalmology service line."
  },
  "schema:Osteopathic": {
    "id": "schema:Osteopathic",
    "whenToUse": "Use Osteopathic for care delivered by a doctor of osteopathic medicine that incorporates osteopathic manipulative treatment alongside conventional medical practice. Apply it when an entry needs to flag the osteopathic framework — for OMT procedures or DO-led services — rather than the broader allopathic or chiropractic systems."
  },
  "schema:Otolaryngologic": {
    "id": "schema:Otolaryngologic",
    "whenToUse": "Use Otolaryngologic when scoping a Physician or service line to ENT — ear, nose, throat, head and neck, and sleep-surgery care. Pair with Ear, Nose, and Throat PhysicalExam entities and with MedicalCondition entities like Chronic Sinusitis or Otitis Media."
  },
  "schema:PET": {
    "id": "schema:PET",
    "whenToUse": "Use PET for positron emission tomography studies that map the distribution of a radioactive tracer to visualize metabolic activity — FDG-PET for oncology staging and restaging, amyloid and tau PET for dementia workup, cardiac PET perfusion. Apply it on imaging-test entries, including hybrid PET-CT and PET-MRI services where the functional component is the defining feature."
  },
  "schema:PalliativeProcedure": {
    "id": "schema:PalliativeProcedure",
    "whenToUse": "Use PalliativeProcedure for interventions whose primary purpose is symptom relief and comfort during serious illness — pain management protocols, dyspnea relief, comfort care order sets. Hospice service pages, palliative-care consult services, and symptom-management pathways all warrant this type.",
    "whenNotToUse": "Don't use PalliativeProcedure for curative interventions even when they incidentally relieve symptoms — chemotherapy given to shrink a tumor is TherapeuticProcedure, not palliative. Don't use it for general supportive care that isn't a defined procedure. If the page describes the palliative-care service as a whole rather than a specific procedure, MedicalBusiness or Service may be a better fit.",
    "whoItsFor": "Palliative care services, hospice programs, oncology supportive-care teams, and hospital pages explaining how the palliative consult service interacts with primary teams.",
    "seoNotes": "PalliativeProcedure is a relatively rare schema.org type, so well-formed markup gets disproportionate attention from crawlers building rare-disease and end-of-life knowledge graphs. Pair with MedicalCondition entries for the conditions whose symptoms are being addressed.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Drug",
      "schema:Hospital",
      "schema:Physician",
      "schema:MedicalGuideline"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/palliativecare.html) on 2026-05-05. Not for use in client deliverables.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"PalliativeProcedure\",\n  \"name\": \"Palliative pain management\",\n  \"description\": \"Palliative care is treatment of the discomfort, symptoms, and stress of serious illness. It provides relief from distressing symptoms including pain.\",\n  \"procedureType\": {\n    \"@type\": \"MedicalProcedureType\",\n    \"name\": \"Palliative\"\n  },\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"You may receive palliative care at any stage of an illness. The goal is to make you comfortable and improve your quality of life.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/palliativecare.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Palliative care is treatment of the discomfort, symptoms, and stress of serious illness."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Palliative pain management",
          "sourceUrls": [
            "https://medlineplus.gov/palliativecare.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Palliative care is treatment of the discomfort, symptoms, and stress of serious illness. It provides relief from distressing symptoms including pain.",
          "sourceUrls": [
            "https://medlineplus.gov/palliativecare.html"
          ]
        },
        {
          "jsonPath": "$.procedureType.name",
          "value": "Palliative",
          "sourceUrls": [
            "https://medlineplus.gov/palliativecare.html"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "You may receive palliative care at any stage of an illness. The goal is to make you comfortable and improve your quality of life.",
          "sourceUrls": [
            "https://medlineplus.gov/palliativecare.html"
          ]
        }
      ]
    }
  },
  "schema:Pathology": {
    "id": "schema:Pathology",
    "whenToUse": "Use Pathology when scoping a Physician or department to anatomic and clinical pathology — surgical pathology, cytopathology, hematopathology, and lab-medicine direction. Pair with DiagnosticLab and with MedicalCondition entities where pathology drives diagnosis; use LaboratoryScience for the broader lab-tech and clinical-lab discipline."
  },
  "schema:PathologyTest": {
    "id": "schema:PathologyTest",
    "whenToUse": "Use PathologyTest for any tissue, cell, or non-blood specimen test interpreted by a pathologist — surgical biopsies, needle biopsies, Pap smears, frozen sections, cytology, fine-needle aspirations, and immunohistochemistry. The defining frame is that a clinician collects a specimen and a pathology lab analyzes it microscopically or molecularly.",
    "whenNotToUse": "Don't use PathologyTest for blood-specimen labs — even if the lab uses microscopy, BloodTest is the correct subtype. Don't use it for imaging studies; ImagingTest is the right choice for radiology. Don't use PathologyTest on the cancer or organ-disease page that *mentions* a biopsy — that page remains MedicalCondition with the biopsy referenced as a value.",
    "whoItsFor": "Pathology-lab and reference-lab editors, oncology service lines describing biopsy workflows, and women's-health and primary-care content teams covering screening tests like Pap smears.",
    "seoNotes": "Pair PathologyTest with usedToDiagnose values for the specific cancers or conditions the test screens for, and surface the collection device under usesDevice (speculum, biopsy needle, brush). This is the property structure health-assistant LLMs use to ground \"what does a Pap smear test for\" and \"what is a biopsy.\" No dedicated Google rich result; the value is precise entity grounding.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalDevice",
      "schema:MedicalProcedure",
      "schema:MedicalAudience",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/lab-tests/pap-smear/) on 2026-05-05. Not for use in client deliverables. Generate your own markup using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"PathologyTest\",\n  \"name\": \"Pap Smear\",\n  \"description\": \"A Pap smear is a test to screen for cervical cancer. A provider collects cells from your cervix and sends them to a lab where the cells are checked under a microscope for cancer or signs that they are abnormal.\",\n  \"usedToDiagnose\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Cervical cancer\"\n    }\n  ],\n  \"signDetected\": {\n    \"@type\": \"MedicalSign\",\n    \"name\": \"Abnormal cervical cells\"\n  },\n  \"usesDevice\": [\n    {\n      \"@type\": \"MedicalDevice\",\n      \"name\": \"Speculum\"\n    },\n    {\n      \"@type\": \"MedicalDevice\",\n      \"name\": \"Soft brush or swab\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/lab-tests/pap-smear/",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A Pap smear is a test to screen for cervical cancer. A provider collects cells from your cervix and sends them to a lab. The cells are checked under a microscope for cancer or signs that they are abnormal. A speculum widens the vagina, and a small, soft brush or swab collects cervical cells."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Pap Smear",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/pap-smear/"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A Pap smear is a test to screen for cervical cancer. A provider collects cells from your cervix and sends them to a lab where the cells are checked under a microscope for cancer or signs that they are abnormal.",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/pap-smear/"
          ]
        },
        {
          "jsonPath": "$.usedToDiagnose[0].name",
          "value": "Cervical cancer",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/pap-smear/"
          ]
        },
        {
          "jsonPath": "$.signDetected.name",
          "value": "Abnormal cervical cells",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/pap-smear/"
          ]
        },
        {
          "jsonPath": "$.usesDevice[0].name",
          "value": "Speculum",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/pap-smear/"
          ]
        },
        {
          "jsonPath": "$.usesDevice[1].name",
          "value": "Soft brush or swab",
          "sourceUrls": [
            "https://medlineplus.gov/lab-tests/pap-smear/"
          ]
        }
      ]
    }
  },
  "schema:Patient": {
    "id": "schema:Patient",
    "whenToUse": "Use Patient for the person receiving care in a clinical scenario — including their right to a copy of their medical records, the right to keep them private and secure, the right to be treated with respect, the right to decline treatment, and the right to give and withdraw informed consent.",
    "whenNotToUse": "Don't use Patient for a generic Person who is not in a clinical role, for the practitioner caring for the patient (use Physician, Dentist, etc.), or for the disease itself (use MedicalCondition). Don't use it as the holder of a Drug or treatment — link via MedicalCondition.drug or relevant property.",
    "whoItsFor": "Clinical-content teams writing case scenarios and care-pathway examples, plus health-literacy publishers explaining patient rights, informed consent, and how to advocate inside the health system.",
    "seoNotes": "Patient instances usually appear inside structured clinical scenarios rather than standalone pages, so name should be anonymized (e.g., 'Adult Patient') and the value comes from linking healthCondition, diagnosis, and drug. That graph is what an assistant traverses to summarize a case.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Drug",
      "schema:Physician"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/patientrights.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Patient\",\n  \"name\": \"Adult Patient\",\n  \"description\": \"A person receiving care who has certain rights, some guaranteed by federal law, such as the right to get a copy of their medical records and the right to keep them private and secure, alongside protections including being treated with respect, protection from discrimination, the authority to decline treatment, and the right to informed consent.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/patientrights.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "As a patient, you have certain rights. Some are guaranteed by federal law, such as the right to get a copy of your medical records and the right to keep them private and secure. There are also state laws that protect patients. Many hospitals have patient advocates who can help you if you have problems. Examples of important patient rights include: Being treated with respect; Protection from discrimination in medical care; Authority to decline treatment; Right to informed consent."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A person receiving care who has certain rights, some guaranteed by federal law, such as the right to get a copy of their medical records and the right to keep them private and secure, alongside protections including being treated with respect, protection from discrimination, the authority to decline treatment, and the right to informed consent.",
          "sourceUrls": [
            "https://medlineplus.gov/patientrights.html"
          ]
        }
      ]
    }
  },
  "schema:Pediatric": {
    "id": "schema:Pediatric",
    "whenToUse": "Use Pediatric when scoping a Physician, clinic, or hospital to infant, child, and adolescent care — primary-care peds, pediatric subspecialties, and adolescent medicine. Pair with MedicalCondition entities specific to childhood and with MedicalOrganization entities for children's hospitals and pediatric clinics."
  },
  "schema:PercutaneousProcedure": {
    "id": "schema:PercutaneousProcedure",
    "whenToUse": "Use PercutaneousProcedure when access to organs or tissue is achieved through needle-puncture of the skin — catheter-based interventions like coronary angioplasty and stent delivery, image-guided biopsies, central-line placement, and percutaneous ablations. Apply it on interventional cardiology, radiology, and oncology pages to distinguish catheter-based work from open surgery."
  },
  "schema:Pharmacy": {
    "id": "schema:Pharmacy",
    "whenToUse": "Use Pharmacy for a community retail pharmacy that dispenses prescription and over-the-counter medicines and where pharmacists are available to clarify medication label instructions and usage guidance for patients.",
    "whenNotToUse": "Don't use Pharmacy for the manufacturer of a drug (model the medicine as Drug with a separate Organization manufacturer), for a hospital department that internally compounds medicines (model that as a Hospital subentity), or for the FDA approval listing itself.",
    "whoItsFor": "Retail pharmacy chains and independent pharmacies building location pages, and patient-education publishers describing where to fill prescriptions and how to ask a pharmacist about medications.",
    "seoNotes": "Pharmacy pages live on the LocalBusiness side of the graph, so address, openingHours, and telephone carry the most local-search weight. Add availableService entries for vaccinations, prescription fills, and consultations so assistants can answer 'does this pharmacy do X'.",
    "commonCombos": [
      "schema:Drug",
      "schema:LocalBusiness",
      "schema:MedicalOrganization"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/overthecountermedicines.html and\n// https://medlineplus.gov/medicines.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Pharmacy\",\n  \"name\": \"Community Retail Pharmacy\",\n  \"description\": \"A pharmacy where pharmacists are available to clarify medication label instructions and usage guidance, and where prescription and over-the-counter medicines regulated by the Food and Drug Administration are obtained.\",\n  \"availableService\": [\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Pharmacist consultation on medication instructions\",\n      \"description\": \"If you don't understand the instructions, ask your pharmacist or health care provider.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/overthecountermedicines.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "If you don't understand the instructions, ask your pharmacist or health care provider."
        },
        {
          "url": "https://medlineplus.gov/medicines.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "the Food and Drug Administration is in charge of ensuring that your prescription and over-the-counter medicines are safe and effective."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A pharmacy where pharmacists are available to clarify medication label instructions and usage guidance, and where prescription and over-the-counter medicines regulated by the Food and Drug Administration are obtained.",
          "sourceUrls": [
            "https://medlineplus.gov/overthecountermedicines.html",
            "https://medlineplus.gov/medicines.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].name",
          "value": "Pharmacist consultation on medication instructions",
          "sourceUrls": [
            "https://medlineplus.gov/overthecountermedicines.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].description",
          "value": "If you don't understand the instructions, ask your pharmacist or health care provider.",
          "sourceUrls": [
            "https://medlineplus.gov/overthecountermedicines.html"
          ]
        }
      ]
    }
  },
  "schema:PharmacySpecialty": {
    "id": "schema:PharmacySpecialty",
    "whenToUse": "Use PharmacySpecialty when scoping a pharmacy, pharmacist, or pharmacy-residency program to pharmacy practice — retail, specialty, infusion, and ambulatory-care pharmacy. Pair with Pharmacy and Drug entities; use MedicalOrganization for the pharmacy as a place and PharmacySpecialty as the discipline."
  },
  "schema:PhysicalActivity": {
    "id": "schema:PhysicalActivity",
    "whenToUse": "Use PhysicalActivity for a single named movement or activity primitive — walking, running, swimming, cycling, dancing — described independent of a structured program. It is the canonical type for marking up the activity's category (aerobic, anaerobic, balance, flexibility), description, and pathophysiology fields that explain what the body does during the activity. Choose PhysicalActivity when the page is about the activity itself, not a prescribed weekly plan.",
    "whenNotToUse": "Do not use PhysicalActivity for a structured weekly program with prescribed minutes and frequency — use ExercisePlan. Do not use it for a single scheduled session, class, or event — use Event. Do not apply it to a sports-team or league page — use SportsActivityLocation or Organization. Do not use it for a recipe-style how-to with steps — use HowTo.",
    "whoItsFor": "Consumer-health editors publishing activity hubs (walking, swimming, yoga), employer-wellness platform editors building movement libraries, physical-therapy content teams describing individual movements, and public-health editors translating federal activity categories into structured pages.",
    "seoNotes": "PhysicalActivity pages benefit from explicit category and pathophysiology fields because LLM-based assistants ground answers about aerobic-versus-anaerobic classification and what the activity does to the body on these structured fields. Google does not issue a dedicated rich result for PhysicalActivity; the value is entity disambiguation between activity primitives and stronger grounding for queries that pair an activity with an intensity or body system.",
    "commonCombos": [
      "schema:ExercisePlan",
      "schema:MedicalCondition",
      "schema:HowTo",
      "schema:FAQPage",
      "schema:HealthTopicContent",
      "schema:MedicalAudience"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// Exercise and Physical Fitness (https://medlineplus.gov/exerciseandphysicalfitness.html)\n// and Exercise for Older Adults (https://medlineplus.gov/exerciseforseniors.html)\n// on 2026-05-05. Not for use in client deliverables. Generate your own markup\n// using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"PhysicalActivity\",\n  \"name\": \"Walking\",\n  \"description\": \"Walking is an aerobic activity. Brisk walking is identified as an example of endurance, or aerobic, activity.\",\n  \"category\": \"Aerobic exercise (also referred to as cardio)\",\n  \"pathophysiology\": \"Aerobic exercises such as walking increase breathing and heart rate and keep the heart, lungs, and circulatory system healthy.\",\n  \"recognizingAuthority\": {\n    \"@type\": \"Organization\",\n    \"name\": \"U.S. National Library of Medicine\",\n    \"url\": \"https://www.nlm.nih.gov\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/exerciseandphysicalfitness.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Aerobic exercises such as walking, running, or swimming are sometimes referred to as cardio. These exercises increase your breathing and heart rate. They keep your heart, lungs, and circulatory system healthy and improve your overall fitness."
        },
        {
          "url": "https://medlineplus.gov/exerciseforseniors.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Brisk walking or jogging, dancing, swimming, and biking are examples of endurance, or aerobic, activities."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Walking",
          "sourceUrls": [
            "https://medlineplus.gov/exerciseandphysicalfitness.html",
            "https://medlineplus.gov/exerciseforseniors.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Walking is an aerobic activity. Brisk walking is identified as an example of endurance, or aerobic, activity.",
          "sourceUrls": [
            "https://medlineplus.gov/exerciseandphysicalfitness.html",
            "https://medlineplus.gov/exerciseforseniors.html"
          ]
        },
        {
          "jsonPath": "$.category",
          "value": "Aerobic exercise (also referred to as cardio)",
          "sourceUrls": [
            "https://medlineplus.gov/exerciseandphysicalfitness.html"
          ]
        },
        {
          "jsonPath": "$.pathophysiology",
          "value": "Aerobic exercises such as walking increase breathing and heart rate and keep the heart, lungs, and circulatory system healthy.",
          "sourceUrls": [
            "https://medlineplus.gov/exerciseandphysicalfitness.html"
          ]
        },
        {
          "jsonPath": "$.recognizingAuthority.name",
          "value": "U.S. National Library of Medicine",
          "sourceUrls": [
            "https://medlineplus.gov/exerciseandphysicalfitness.html"
          ]
        }
      ]
    }
  },
  "schema:PhysicalActivityCategory": {
    "id": "schema:PhysicalActivityCategory",
    "whenToUse": "Use PhysicalActivityCategory on an ExercisePlan or PhysicalActivity to classify the physiologic mode of movement — aerobic, anaerobic, balance, flexibility, strength training, leisure-time, or occupational. Attach it as the `activityType` value when an exercise prescription or wellness program needs a machine-readable mode signal aligned to the CDC physical activity framework.",
    "whenNotToUse": "Don't use PhysicalActivityCategory to express dose (frequency, intensity, time) — those belong on properties like `repetitions`, `intensity`, and `exerciseCourse`. Don't use it for sport names or branded class formats; those are free-text values on `name` or `additionalType`.",
    "whoItsFor": "Wellness publishers, employer health platforms, cardiac and pulmonary rehab programs, and physical-therapy practices that publish structured exercise plans and want category facets that align with public-health guidance.",
    "seoNotes": "Category values give search and assistant systems a clean axis for filtering exercise content by physiologic intent. Pair with `MedicalCondition` indications and `MedicalContraindication` so the activity's category can be matched to the user's clinical context.",
    "commonCombos": [
      "schema:ExercisePlan",
      "schema:PhysicalActivity",
      "schema:MedicalCondition",
      "schema:HowTo"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC Physical Activity\n// Basics (https://www.cdc.gov/physical-activity-basics/about/index.html) on\n// 2026-05-05. Not for use in client deliverables. Generate your own markup\n// using your content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"ExercisePlan\",\n  \"name\": \"Adult aerobic activity plan\",\n  \"activityType\": \"AerobicActivity\",\n  \"description\": \"Adults need at least 150 minutes a week of moderate-intensity aerobic physical activity.\",\n  \"exerciseType\": \"Aerobic\",\n  \"intensity\": \"Moderate\",\n  \"audience\": {\n    \"@type\": \"PeopleAudience\",\n    \"suggestedMinAge\": 18\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/physical-activity-basics/about/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Adults need at least 150 minutes a week of moderate-intensity aerobic physical activity."
        },
        {
          "url": "https://www.cdc.gov/physical-activity-basics/adults/index.html",
          "publisher": "Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Do muscle-strengthening activities on 2 or more days a week that work all major muscle groups."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Adult aerobic activity plan",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/about/index.html"
          ]
        },
        {
          "jsonPath": "$.activityType",
          "value": "AerobicActivity",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/about/index.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Adults need at least 150 minutes a week of moderate-intensity aerobic physical activity.",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/about/index.html"
          ]
        },
        {
          "jsonPath": "$.exerciseType",
          "value": "Aerobic",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/about/index.html"
          ]
        },
        {
          "jsonPath": "$.intensity",
          "value": "Moderate",
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/about/index.html"
          ]
        },
        {
          "jsonPath": "$.audience.suggestedMinAge",
          "value": 18,
          "sourceUrls": [
            "https://www.cdc.gov/physical-activity-basics/adults/index.html"
          ]
        }
      ]
    }
  },
  "schema:PhysicalExam": {
    "id": "schema:PhysicalExam",
    "whenToUse": "Use PhysicalExam values to identify which body region or system a clinical examination assesses — abdomen, lungs, neuro, skin, etc. It's the right enum for marking up an exam encounter, an exam template, or a MedicalProcedure node that documents a head-to-toe or focused physical assessment.",
    "whenNotToUse": "Don't use PhysicalExam for diagnostic imaging (use ImagingTest or MedicalImagingTechnique) or for laboratory studies (use BloodTest or MedicalTest). Don't use it for the patient's reported symptoms — those belong on MedicalSignOrSymptom. And don't use it as a Physician's specialty; PhysicalExam describes the exam itself, not the practitioner who performs it.",
    "whoItsFor": "Clinical-content editors, EHR template authors, medical-education writers, and SEO teams building patient-education pages on what to expect during a physical exam — head, neck, chest, abdomen, and so on.",
    "seoNotes": "PhysicalExam enums tie a clinical encounter or patient-education page to a specific body region, which improves topical clarity for queries like 'what does an abdominal exam check' or 'what is a neuro exam.' Combine with MedicalProcedure or MedicalCondition to give LLM assistants a clean encounter-to-exam-region edge.",
    "commonCombos": [
      "schema:MedicalProcedure",
      "schema:Patient",
      "schema:Physician",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/ency/article/002274.htm) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalProcedure\",\n  \"name\": \"Abdominal physical examination\",\n  \"procedureType\": {\n    \"@type\": \"PhysicalExam\",\n    \"name\": \"Abdomen\"\n  },\n  \"howPerformed\": \"Inspection, palpation, auscultation, and percussion of the abdomen by a health care provider.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/002274.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "During a physical examination, a health care provider checks your body to determine if you do or do not have a physical problem."
        },
        {
          "url": "https://medlineplus.gov/ency/article/002274.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Inspection (looking at the body), Palpation (feeling the body with fingers or hands), Auscultation (listening to sounds, usually with a stethoscope), Percussion (producing sounds, usually by tapping on specific areas of the body)"
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Abdominal physical examination",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/002274.htm"
          ]
        },
        {
          "jsonPath": "$.procedureType.name",
          "value": "Abdomen",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/002274.htm"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "Inspection, palpation, auscultation, and percussion of the abdomen by a health care provider.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/002274.htm"
          ]
        }
      ]
    }
  },
  "schema:PhysicalTherapy": {
    "id": "schema:PhysicalTherapy",
    "whenToUse": "Use PhysicalTherapy for movement, strength, gait, balance, and pain-related rehab — post-surgical knee rehab, sports-injury recovery, neurological gait retraining, vestibular therapy. PT clinic pages, sports-medicine service lines, and post-op discharge education all anchor here.",
    "whenNotToUse": "Don't use PhysicalTherapy for ADL retraining or fine-motor function — that's OccupationalTherapy. Don't use it for general fitness coaching that isn't clinician-directed therapy. For pain-management interventions delivered as injections or medications, use TherapeuticProcedure.",
    "whoItsFor": "Outpatient PT clinics, sports-medicine groups, orthopedic surgical practices documenting post-op rehab pathways, and home-health agencies describing PT visits.",
    "seoNotes": "PhysicalTherapy markup with bodyLocation and indication helps connect the therapy to the surgery or injury it follows. LLMs increasingly use rehab-pathway markup when answering questions about recovery timelines — populate followup and contraindication where the source supports it.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:SurgicalProcedure",
      "schema:AnatomicalStructure",
      "schema:Hospital",
      "schema:Physician"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/ency/article/007208.htm) on 2026-05-05. Not for use in client deliverables.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"PhysicalTherapy\",\n  \"name\": \"ACL reconstruction rehabilitation\",\n  \"description\": \"Physical therapy program following ACL reconstruction surgery. The anterior cruciate ligament (ACL) connects your shin bone (tibia) to your thigh bone (femur).\",\n  \"bodyLocation\": \"Knee\",\n  \"howPerformed\": \"You will need to follow a rehabilitation program for 4 to 6 months.\",\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"Knee that gives way or feels unstable during daily activities; inability to return to sports or other activities.\"\n  },\n  \"followup\": \"A full return to activities and sports will often take 4 to 6 months. Sports that involve quick changes in direction, such as soccer, basketball, and football, may require up to 9 to 12 months of rehabilitation.\",\n  \"contraindication\": {\n    \"@type\": \"MedicalContraindication\",\n    \"name\": \"Patients may need to wear a knee brace for the first 1 to 6 weeks, limiting certain activities.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/007208.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "You will need to follow a rehabilitation program for 4 to 6 months."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "ACL reconstruction rehabilitation",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007208.htm"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Physical therapy program after ACL reconstruction; the ACL connects the shin bone (tibia) to the thigh bone (femur).",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007208.htm"
          ]
        },
        {
          "jsonPath": "$.bodyLocation",
          "value": "Knee",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007208.htm"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "You will need to follow a rehabilitation program for 4 to 6 months.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007208.htm"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "Knee that gives way or feels unstable during daily activities; inability to return to sports or other activities.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007208.htm"
          ]
        },
        {
          "jsonPath": "$.followup",
          "value": "Full return to activities and sports often takes 4 to 6 months; quick-direction sports may require 9 to 12 months.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007208.htm"
          ]
        },
        {
          "jsonPath": "$.contraindication.name",
          "value": "Patients may need to wear a knee brace for the first 1 to 6 weeks, limiting certain activities.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/007208.htm"
          ]
        }
      ]
    }
  },
  "schema:Physician": {
    "id": "schema:Physician",
    "whenToUse": "Use Physician for a licensed practitioner who serves as a primary care provider — a doctor, physician assistant, or nurse practitioner who delivers preventive care, diagnoses and treats routine medical conditions, evaluates severity, refers to specialists, and may participate in managing a patient's hospital care.",
    "whenNotToUse": "Don't use Physician for the practice or building where the doctor works (use MedicalBusiness or MedicalClinic) or for the health system that employs them (use MedicalOrganization). Don't use it for a dentist, optician, or veterinarian — those have their own types.",
    "whoItsFor": "Provider-directory editors and health-system content teams building 'find a doctor' pages, and reference publishers documenting primary care roles and referral pathways.",
    "seoNotes": "Physician pages anchor 'doctor near me' style queries when paired with hospitalAffiliation, medicalSpecialty, and a clear address. Linking each Physician to their MedicalBusiness or Hospital lets assistants answer 'where does Dr. X practice'.",
    "commonCombos": [
      "schema:Hospital",
      "schema:MedicalSpecialty",
      "schema:MedicalBusiness"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/ency/article/001939.htm) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Physician\",\n  \"name\": \"Primary Care Provider\",\n  \"description\": \"A health care practitioner who sees people that have common medical problems, serving as the patient's main health care provider in non-emergency situations.\",\n  \"availableService\": [\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Preventive care\",\n      \"description\": \"Delivering preventive care and promoting healthy lifestyle choices.\"\n    },\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Diagnosis and treatment of routine medical conditions\",\n      \"description\": \"Diagnosing and treating routine medical conditions, and evaluating the severity of health concerns.\"\n    },\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Specialist referral\",\n      \"description\": \"Referring patients to specialists when medical or surgical expertise is needed.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/001939.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A primary care provider (PCP) is a health care practitioner who sees people that have common medical problems. This person is most often a doctor. However, a PCP may be a physician assistant or a nurse practitioner. Your PCP is your main health care provider in non-emergency situations."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A health care practitioner who sees people that have common medical problems, serving as the patient's main health care provider in non-emergency situations.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001939.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[0].name",
          "value": "Preventive care",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001939.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[0].description",
          "value": "Delivering preventive care and promoting healthy lifestyle choices.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001939.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[1].name",
          "value": "Diagnosis and treatment of routine medical conditions",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001939.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[1].description",
          "value": "Diagnosing and treating routine medical conditions, and evaluating the severity of health concerns.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001939.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[2].name",
          "value": "Specialist referral",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001939.htm"
          ]
        },
        {
          "jsonPath": "$.availableService[2].description",
          "value": "Referring patients to specialists when medical or surgical expertise is needed.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001939.htm"
          ]
        }
      ]
    }
  },
  "schema:Physiotherapy": {
    "id": "schema:Physiotherapy",
    "whenToUse": "Use Physiotherapy when scoping a clinician or service line to physical therapy — orthopedic PT, neuro rehab, vestibular therapy, and post-op rehabilitation. Pair with MedicalCondition entities like Low Back Pain or Stroke and with MedicalProcedure entities for therapeutic exercise and manual therapy."
  },
  "schema:PlaceboControlledTrial": {
    "id": "schema:PlaceboControlledTrial",
    "whenToUse": "Use PlaceboControlledTrial when one arm receives an inert comparator matched to the active intervention. Combine with the appropriate blinding value (Single, Double, or TripleBlindedTrial) since placebo control and blinding are independent design choices."
  },
  "schema:PlasticSurgery": {
    "id": "schema:PlasticSurgery",
    "whenToUse": "Use PlasticSurgery when scoping a Physician or service line to plastic and reconstructive surgery — cosmetic, reconstructive, hand, craniofacial, and burn reconstruction. Pair with MedicalProcedure entities for specific reconstructive operations and keep cosmetic-only med-spa work distinct from board-certified plastic surgery."
  },
  "schema:Podiatric": {
    "id": "schema:Podiatric",
    "whenToUse": "Use Podiatric when scoping a podiatrist or foot-and-ankle practice to podiatric medicine and surgery — diabetic foot care, sports-podiatry, and forefoot/rearfoot reconstruction. Pair with MedicalCondition entities like Diabetic Foot Ulcer and with MedicalBusiness for DPM-led practices."
  },
  "schema:PrescriptionOnly": {
    "id": "schema:PrescriptionOnly",
    "whenToUse": "Use PrescriptionOnly when the drug requires a valid prescription from an authorized prescriber for legal dispensing. Reflect the current DailyMed label — status changes (Rx-to-OTC switches) need a same-release update so consumer pages don't misdirect users."
  },
  "schema:PreventionIndication": {
    "id": "schema:PreventionIndication",
    "whenToUse": "Use PreventionIndication when the medical use is to prevent a condition rather than treat one — aspirin for cardiovascular prevention, statins for primary prevention of atherosclerotic events, vaccines for infectious-disease prevention. It's the right subtype when the page is structured around risk reduction.",
    "whenNotToUse": "Don't use PreventionIndication when the page describes active treatment of an established condition — use TreatmentIndication. Don't use it for symptom relief; use ApprovedIndication or TreatmentIndication. Don't use it for screening protocols; those belong under MedicalTest.",
    "whoItsFor": "Public-health editors, preventive-medicine content teams, and patient-education writers covering risk-reduction interventions.",
    "seoNotes": "PreventionIndication is consumed via Drug.indication. Google does not currently issue a dedicated rich result; the value is in distinguishing risk-reduction claims from acute-treatment claims for medical knowledge graphs.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalCondition",
      "schema:MedicalRiskFactor"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682878.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"PreventionIndication\",\n  \"name\": \"Aspirin for cardiovascular prevention\",\n  \"description\": \"Aspirin is used to prevent heart attacks, strokes or mini-strokes, and to reduce the risk of death in people who are experiencing or who have had a heart attack.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682878.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Prescription aspirin is used to prevent heart attacks, strokes or mini-strokes (also known as transient ischemic attacks or TIA), and to reduce the risk of death in people who are experiencing or who have had a heart attack."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Aspirin for cardiovascular prevention",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682878.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Aspirin is used to prevent heart attacks, strokes or mini-strokes, and to reduce the risk of death in people who are experiencing or who have had a heart attack.",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682878.html"
          ]
        }
      ]
    }
  },
  "schema:PrimaryCare": {
    "id": "schema:PrimaryCare",
    "whenToUse": "Use PrimaryCare when scoping a Physician, clinic, or service line to first-contact comprehensive care — family medicine, internal medicine, and general pediatrics. Pair with MedicalClinic and with chronic-disease MedicalCondition entities like Hypertension and Type 2 Diabetes that primary care manages over time."
  },
  "schema:Prion": {
    "id": "schema:Prion",
    "whenToUse": "Use Prion when the etiologic agent is a misfolded protein responsible for transmissible spongiform encephalopathy — Creutzfeldt-Jakob disease, variant CJD, kuru, or fatal familial insomnia. Apply it on neurodegenerative disease entries that need to be classified separately from microbial agents because the pathogen is a protein, not an organism."
  },
  "schema:Protozoa": {
    "id": "schema:Protozoa",
    "whenToUse": "Use Protozoa when the etiologic agent is a single-celled eukaryotic parasite — Plasmodium species, Giardia, Entamoeba histolytica, Toxoplasma, Trypanosoma, or Leishmania. Apply it on entries covering malaria, giardiasis, amoebiasis, toxoplasmosis, and trypanosomal infections where antiprotozoal therapy is the relevant therapeutic class."
  },
  "schema:Psychiatric": {
    "id": "schema:Psychiatric",
    "whenToUse": "Use Psychiatric when scoping a Physician or service line to psychiatry — mood disorders, anxiety, psychotic disorders, addiction, and consult-liaison psychiatry. Pair with MentalHealth-relevant MedicalCondition entities and reserve psychotherapy-only practices for a Psychology or counseling-organization markup pattern."
  },
  "schema:PsychologicalTreatment": {
    "id": "schema:PsychologicalTreatment",
    "whenToUse": "Use PsychologicalTreatment for mental-health interventions delivered by a psychologist, therapist, or counselor — CBT for depression or anxiety, exposure therapy for PTSD, family therapy, group therapy. Behavioral-health service lines, therapist-bio pages, and mental-health condition pages explaining treatment options all anchor here.",
    "whenNotToUse": "Don't use PsychologicalTreatment for psychiatric medication management — that belongs under Drug administration framed as TherapeuticProcedure. Don't use it for general MedicalTherapy that isn't psychological in nature. For broad therapy explainers spanning modalities, MedicalTherapy can be the parent.",
    "whoItsFor": "Behavioral health practices, psychology and psychiatry groups, depression and anxiety treatment programs, and condition pages explaining therapy options.",
    "seoNotes": "PsychologicalTreatment markup paired with the relevant MedicalCondition supports both classic SEO (depression treatment near me) and LLM grounding for treatment-option questions. Be specific about modality (CBT, DBT, EMDR) in name and description so disambiguation downstream is clean.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:Physician",
      "schema:MedicalGuideline",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus (https://medlineplus.gov/depression.html) on 2026-05-05. Not for use in client deliverables.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"PsychologicalTreatment\",\n  \"name\": \"Cognitive behavioral therapy for depression\",\n  \"alternateName\": [\"CBT for depression\", \"Talk therapy for depression\"],\n  \"description\": \"Psychotherapy (talk therapy) under the care of a mental health provider can help you recognize and change troubling emotions, thoughts, and behaviors.\",\n  \"howPerformed\": \"This may be done one-on-one or in a group setting. It can give you and your family support, education, skills, and coping strategies.\",\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"Depression\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/depression.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Psychotherapy (talk therapy) under the care of a mental health provider can help you recognize and change troubling emotions, thoughts, and behaviors."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Cognitive behavioral therapy for depression",
          "sourceUrls": [
            "https://medlineplus.gov/depression.html"
          ]
        },
        {
          "jsonPath": "$.alternateName",
          "value": "CBT for depression, Talk therapy for depression",
          "sourceUrls": [
            "https://medlineplus.gov/depression.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Psychotherapy (talk therapy) under the care of a mental health provider can help you recognize and change troubling emotions, thoughts, and behaviors.",
          "sourceUrls": [
            "https://medlineplus.gov/depression.html"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "This may be done one-on-one or in a group setting. It can give you and your family support, education, skills, and coping strategies.",
          "sourceUrls": [
            "https://medlineplus.gov/depression.html"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "Depression",
          "sourceUrls": [
            "https://medlineplus.gov/depression.html"
          ]
        }
      ]
    }
  },
  "schema:PublicHealth": {
    "id": "schema:PublicHealth",
    "whenToUse": "Use PublicHealth when scoping an organization or program to population-level disease prevention and protection — epidemiology, immunization, sanitation, and health-equity work. Pair with GovernmentOrganization or MedicalOrganization for health departments and reserve CommunityHealth for geographically-defined community programs."
  },
  "schema:Pulmonary": {
    "id": "schema:Pulmonary",
    "whenToUse": "Use Pulmonary when scoping a Physician or service line to pulmonology — COPD, asthma, interstitial lung disease, sleep medicine, and pulmonary critical care. Pair with MedicalCondition entities like Asthma or COPD and with MedicalTest entities for spirometry and bronchoscopy."
  },
  "schema:RadiationTherapy": {
    "id": "schema:RadiationTherapy",
    "whenToUse": "Use RadiationTherapy for any radiation-based cancer treatment — external beam, brachytherapy, stereotactic radiosurgery. Radiation oncology service-line pages, treatment-planning explainers, and procedure-detail pages all anchor here.",
    "whenNotToUse": "Don't use RadiationTherapy for diagnostic imaging that uses radiation — CT and X-ray are DiagnosticProcedure. Don't use it for radiopharmaceutical drug administration alone — that's a Drug or TherapeuticProcedure depending on framing. For a multi-modality cancer regimen page, use MedicalTherapy or list each modality discretely.",
    "whoItsFor": "Radiation oncology departments, cancer center service lines, and patient-education pages explaining a specific radiation modality and what to expect during treatment.",
    "seoNotes": "RadiationTherapy markup with bodyLocation, doseSchedule, and the targeted MedicalCondition gives crawlers a structured handle on cancer-specific treatment pages. LLMs frequently differentiate radiation modalities, so include the device or technique name in the description when relevant.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:DoseSchedule",
      "schema:Hospital",
      "schema:Physician",
      "schema:AnatomicalStructure"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from National Cancer Institute (https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam) on 2026-05-05. Not for use in client deliverables.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"RadiationTherapy\",\n  \"name\": \"External beam radiation therapy\",\n  \"description\": \"External beam radiation therapy comes from a machine that aims radiation at your cancer.\",\n  \"howPerformed\": \"You will either lie down on a treatment table or sit in a special chair. You will get radiation for 1 to 5 minutes.\",\n  \"doseSchedule\": {\n    \"@type\": \"DoseSchedule\",\n    \"frequency\": \"Most people have external beam radiation therapy once a day, five days a week, Monday through Friday.\"\n  },\n  \"preparation\": \"Before starting, you will have a 1- to 2-hour meeting with your doctor or nurse including physical exam and discussion of benefits and side effects. A simulation session involves marking treatment areas with tattoos or ink dots.\",\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"External beam radiation therapy is used to treat many types of cancer.\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam",
          "publisher": "National Cancer Institute",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "External beam radiation therapy comes from a machine that aims radiation at your cancer."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "External beam radiation therapy",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "External beam radiation therapy comes from a machine that aims radiation at your cancer.",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "Lie down on a treatment table or sit in a special chair; receive radiation for 1 to 5 minutes.",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam"
          ]
        },
        {
          "jsonPath": "$.doseSchedule.frequency",
          "value": "Most people have external beam radiation therapy once a day, five days a week, Monday through Friday.",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam"
          ]
        },
        {
          "jsonPath": "$.preparation",
          "value": "1- to 2-hour meeting with doctor or nurse; simulation session with tattoos or ink dots marking treatment areas.",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "External beam radiation therapy is used to treat many types of cancer.",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam"
          ]
        }
      ]
    }
  },
  "schema:Radiography": {
    "id": "schema:Radiography",
    "whenToUse": "Use Radiography when scoping a technologist, imaging center, or service line to imaging that uses ionizing radiation — plain X-ray, fluoroscopy, and CT. Pair with MedicalImagingTechnique values for specific modalities and reserve Radiology-physician interpretation work for a separate Pathology-style discipline label."
  },
  "schema:RandomizedTrial": {
    "id": "schema:RandomizedTrial",
    "whenToUse": "Use RandomizedTrial when participants were assigned to study arms by a random allocation procedure. This is the single most-asked methodology question on a trial page, so surface it on every randomized study record."
  },
  "schema:RecommendedDoseSchedule": {
    "id": "schema:RecommendedDoseSchedule",
    "whenToUse": "Use RecommendedDoseSchedule for a label-derived starting or maintenance dose — the dose a clinician is expected to begin with for a given indication and population. It's the right type when the page reflects FDA labelling, professional-society guidance, or DailyMed dosing instructions.",
    "whenNotToUse": "Don't use RecommendedDoseSchedule for a not-to-exceed value — use MaximumDoseSchedule. Don't use it for self-reported dosing patterns from real-world data — use ReportedDoseSchedule. Don't use it as a generic dose container if the page doesn't actually represent a recommendation.",
    "whoItsFor": "HCP-facing prescribing-information editors, formulary content teams, and patient-education writers translating label dosing into plain language.",
    "seoNotes": "RecommendedDoseSchedule is consumed via Drug.doseSchedule. Google does not currently issue a dedicated rich result; structured separation of recommended vs. maximum vs. reported dosing supports clinical knowledge-graph alignment.",
    "commonCombos": [
      "schema:Drug",
      "schema:TreatmentIndication",
      "schema:DrugStrength"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a696005.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"RecommendedDoseSchedule\",\n  \"name\": \"Metformin extended-release recommended schedule\",\n  \"frequency\": \"once daily with the evening meal\",\n  \"targetPopulation\": \"Adults with type 2 diabetes\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a696005.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The extended-release tablet is usually taken once daily with the evening meal. Metformin is used to treat type 2 diabetes."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Metformin extended-release recommended schedule",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.frequency",
          "value": "once daily with the evening meal",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.targetPopulation",
          "value": "Adults with type 2 diabetes",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        }
      ]
    }
  },
  "schema:Recruiting": {
    "id": "schema:Recruiting",
    "whenToUse": "Use Recruiting when the trial is actively accepting new participants who meet the eligibility criteria. Keep this value current to the day — recruiting pages drive real enrollment traffic and stale values misroute candidates."
  },
  "schema:Registry": {
    "id": "schema:Registry",
    "whenToUse": "Use Registry when the study is built on a disease, device, or exposure registry — a systematic collection of standardized data on a defined population. Name the registry by its public title in description so the underlying data source is identifiable."
  },
  "schema:ReimbursementCap": {
    "id": "schema:ReimbursementCap",
    "whenToUse": "Use ReimbursementCap when the cost figure represents the maximum amount an insurer or payer will reimburse for the drug — the ceiling above which the patient or provider absorbs the difference. Apply it on payer-facing formulary pages and Medicare Part D resource pages where the published price is a reimbursement limit, not a market price."
  },
  "schema:Renal": {
    "id": "schema:Renal",
    "whenToUse": "Use Renal when scoping a Physician or service line to nephrology — chronic kidney disease, dialysis, transplant nephrology, and electrolyte disorders. Pair with MedicalCondition entities like Chronic Kidney Disease or End-Stage Renal Disease and with MedicalProcedure entities for hemodialysis and peritoneal dialysis."
  },
  "schema:ReportedDoseSchedule": {
    "id": "schema:ReportedDoseSchedule",
    "whenToUse": "Use ReportedDoseSchedule when documenting real-world dosing — what patients actually take, derived from self-report, claims data, or chart review — rather than a label recommendation. It's the right type for pharmacovigilance summaries and adherence research write-ups.",
    "whenNotToUse": "Don't use ReportedDoseSchedule for the official label recommendation — use RecommendedDoseSchedule. Don't use it for upper bounds — use MaximumDoseSchedule. Don't use it to surface trial-protocol dosing; that belongs in clinical-study markup.",
    "whoItsFor": "Real-world-evidence editors, pharmacoepidemiology content teams, and consumer-research publishers reporting how a medicine is used in practice.",
    "seoNotes": "ReportedDoseSchedule sits alongside Recommended and Maximum subtypes under DoseSchedule. Google does not currently issue a dedicated rich result; the value is in transparent labeling of dose source as observed rather than recommended.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalObservationalStudy",
      "schema:DoseSchedule"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a682159.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n//\n// The schedule below mirrors the OTC pain-or-fever instructions on the\n// MedlinePlus ibuprofen page, used here to illustrate a self-administered\n// real-world dosing pattern rather than a clinician-prescribed schedule.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"ReportedDoseSchedule\",\n  \"name\": \"Ibuprofen self-administered schedule for pain or fever\",\n  \"frequency\": \"every 4 to 6 hours as needed\",\n  \"targetPopulation\": \"Adults and children older than 12 years of age\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a682159.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Adults and children older than 12 years of age may usually take nonprescription ibuprofen every 4 to 6 hours as needed for pain or fever."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Ibuprofen self-administered schedule for pain or fever",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.frequency",
          "value": "every 4 to 6 hours as needed",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        },
        {
          "jsonPath": "$.targetPopulation",
          "value": "Adults and children older than 12 years of age",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a682159.html"
          ]
        }
      ]
    }
  },
  "schema:RespiratoryTherapy": {
    "id": "schema:RespiratoryTherapy",
    "whenToUse": "Use RespiratoryTherapy when scoping a clinician or service to respiratory care — ventilator management, oxygen therapy, pulmonary rehabilitation, and airway clearance. Pair with Pulmonary as the physician-led specialty partner and with MedicalCondition entities like COPD or Cystic Fibrosis."
  },
  "schema:ResultsAvailable": {
    "id": "schema:ResultsAvailable",
    "whenToUse": "Use ResultsAvailable when summary results have been posted to the registry of record or published in a peer-reviewed venue, and the study page links to that publication or registry results section. This signals to AI answer engines that the trial is citable, not just registered."
  },
  "schema:ResultsNotAvailable": {
    "id": "schema:ResultsNotAvailable",
    "whenToUse": "Use ResultsNotAvailable when a study has Completed or Terminated but no summary results have been posted yet. Carry this value openly rather than dropping the status field so users and assistants can see the reporting gap."
  },
  "schema:Retail": {
    "id": "schema:Retail",
    "whenToUse": "Use Retail when the cost is the price a consumer pays at the pharmacy counter — cash price, list price, or shelf price for an over-the-counter product. This is the right category for patient-facing drug-information pages that quote a representative consumer price."
  },
  "schema:Rheumatologic": {
    "id": "schema:Rheumatologic",
    "whenToUse": "Use Rheumatologic when scoping a Physician or service line to rheumatology — autoimmune, inflammatory-joint, and connective-tissue disease. Pair with MedicalCondition entities like Rheumatoid Arthritis, Lupus, or Psoriatic Arthritis, and with MedicalTest entities for autoantibody panels."
  },
  "schema:SingleBlindedTrial": {
    "id": "schema:SingleBlindedTrial",
    "whenToUse": "Use SingleBlindedTrial when only one party — either the participant or the investigator — is blinded to the assignment, while the other knows. Spell out which party is blinded in description so readers don't have to infer it from context."
  },
  "schema:SingleCenterTrial": {
    "id": "schema:SingleCenterTrial",
    "whenToUse": "Use SingleCenterTrial when the entire study runs at one investigative site. State the institution and city on the trial-listing page so readers searching by geography can immediately see whether the site is reachable for them."
  },
  "schema:Skin": {
    "id": "schema:Skin",
    "whenToUse": "Use Skin for dermatologic exam — total-body skin inspection, lesion description, palpation of texture and turgor, and nail and hair assessment. Pair with MedicalCondition entities like Melanoma, Psoriasis, or Eczema."
  },
  "schema:SpeakableSpecification": {
    "id": "schema:SpeakableSpecification",
    "whenToUse": "Use SpeakableSpecification on news, alert, and announcement pages to flag the headline-and-summary block that is safe to read aloud on a voice assistant. The specification is a child of the speakable property on the parent CreativeWork (Article, NewsArticle, SpecialAnnouncement) and points at the page DOM via cssSelector or xpath.",
    "whenNotToUse": "Don't use SpeakableSpecification on pages where listening to a partial extract would be misleading — long-form clinical guidance, dosing tables, or anything where context is required. Don't supply both cssSelector and xpath on the same node.",
    "whoItsFor": "Public-health and newsroom editors preparing alert pages for Google Assistant and other voice surfaces, and accessibility teams marking the canonical spoken summary on time-sensitive announcements.",
    "seoNotes": "Per Google's speakable structured data guidance, you must choose either cssSelector or xPath on each SpeakableSpecification — not both. Keep the selected block to the headline and a 1–2 sentence summary; voice assistants truncate, so front-load the actionable information.",
    "commonCombos": [
      "schema:SpecialAnnouncement",
      "schema:NewsArticle",
      "schema:Article"
    ],
    "example": {
      "jsonld": "// Reference example — speakable property usage follows Google's\n// structured data guidance\n// (https://developers.google.com/search/docs/appearance/structured-data/speakable);\n// the underlying CDC alert content is sourced from\n// https://www.cdc.gov/measles/data-research/index.html, retrieved on\n// 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"SpecialAnnouncement\",\n  \"name\": \"2025 U.S. Measles Outbreak Update\",\n  \"datePosted\": \"2026-01-15\",\n  \"expires\": \"2026-12-31\",\n  \"text\": \"A total of 2,288 confirmed measles cases were reported in the United States during 2025. The best way to protect yourself against measles is with the measles, mumps, and rubella (MMR) vaccine.\",\n  \"speakable\": {\n    \"@type\": \"SpeakableSpecification\",\n    \"cssSelector\": [\".announcement-headline\", \".announcement-summary\"]\n  }\n}\n",
      "sources": [
        {
          "url": "https://developers.google.com/search/docs/appearance/structured-data/speakable",
          "publisher": "Google Search Central",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Addresses content in the annotated pages (such as class attribute). Use either cssSelector or xPath; don't use both."
        },
        {
          "url": "https://www.cdc.gov/measles/data-research/index.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A total of 2,288 confirmed measles cases were reported in the United States. The best way to protect yourself against measles is with the measles, mumps, and rubella (MMR) vaccine."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "2025 U.S. Measles Outbreak Update",
          "sourceUrls": [
            "https://www.cdc.gov/measles/data-research/index.html"
          ]
        },
        {
          "jsonPath": "$.text",
          "value": "A total of 2,288 confirmed measles cases were reported in the United States during 2025. The best way to protect yourself against measles is with the measles, mumps, and rubella (MMR) vaccine.",
          "sourceUrls": [
            "https://www.cdc.gov/measles/data-research/index.html"
          ]
        },
        {
          "jsonPath": "$.speakable['@type']",
          "value": "SpeakableSpecification",
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/speakable"
          ]
        },
        {
          "jsonPath": "$.speakable.cssSelector[0]",
          "value": ".announcement-headline",
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/speakable"
          ]
        },
        {
          "jsonPath": "$.speakable.cssSelector[1]",
          "value": ".announcement-summary",
          "sourceUrls": [
            "https://developers.google.com/search/docs/appearance/structured-data/speakable"
          ]
        }
      ]
    }
  },
  "schema:SpecialAnnouncement": {
    "id": "schema:SpecialAnnouncement",
    "whenToUse": "Use SpecialAnnouncement for time-bounded public-health notices — outbreak alerts, facility closures, vaccination-clinic activations, emergency-room diversions. The type was introduced for COVID-era communication and remains the right wrapper for any urgent, dated health update tied to a location.",
    "whenNotToUse": "Don't use SpecialAnnouncement for evergreen content (a standing FAQ or condition page is not an announcement) and don't use it for marketing promotions. Don't omit datePosted or expires — without those, the announcement can't be triaged by retrieval systems.",
    "whoItsFor": "Public-health communications teams at CDC, state and local health departments, and health-system marketing-communications teams who need to publish time-sensitive outbreak or operational notices.",
    "seoNotes": "SpecialAnnouncement is consumed by Google, Bing, and several public-health aggregators; populate datePosted and expires in ISO 8601 and tie announcementLocation to a CivicStructure or Place. Use category to point to the canonical CDC or WHO topic URL so the announcement clusters with related guidance.",
    "commonCombos": [
      "schema:Place",
      "schema:GovernmentOrganization",
      "schema:WebContent"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC\n// (https://www.cdc.gov/measles/data-research/index.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"SpecialAnnouncement\",\n  \"name\": \"2025 U.S. Measles Outbreak Update\",\n  \"text\": \"A total of 2,288 confirmed measles cases were reported in the United States during 2025, with 48 outbreaks reported and 90% of confirmed cases (2,065 of 2,288) being outbreak-associated. The best way to protect yourself against measles is with the measles, mumps, and rubella (MMR) vaccine.\",\n  \"datePosted\": \"2026-01-15\",\n  \"expires\": \"2026-12-31\",\n  \"category\": \"https://www.wikidata.org/wiki/Q60380\",\n  \"announcementLocation\": {\n    \"@type\": \"GovernmentOrganization\",\n    \"name\": \"U.S. Centers for Disease Control and Prevention\",\n    \"url\": \"https://www.cdc.gov/\"\n  },\n  \"diseasePreventionInfo\": {\n    \"@type\": \"WebContent\",\n    \"url\": \"https://www.cdc.gov/measles/data-research/index.html\",\n    \"name\": \"Measles Cases and Outbreaks\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/measles/data-research/index.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A total of 2,288 confirmed measles cases were reported in the United States. There were 48 outbreaks reported in 2025, and 90% of confirmed cases (2,065 of 2,288) were outbreak-associated. The best way to protect yourself against measles is with the measles, mumps, and rubella (MMR) vaccine."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "2025 U.S. Measles Outbreak Update",
          "sourceUrls": [
            "https://www.cdc.gov/measles/data-research/index.html"
          ]
        },
        {
          "jsonPath": "$.text",
          "value": "A total of 2,288 confirmed measles cases were reported in the United States during 2025, with 48 outbreaks reported and 90% of confirmed cases (2,065 of 2,288) being outbreak-associated. The best way to protect yourself against measles is with the measles, mumps, and rubella (MMR) vaccine.",
          "sourceUrls": [
            "https://www.cdc.gov/measles/data-research/index.html"
          ]
        },
        {
          "jsonPath": "$.announcementLocation.name",
          "value": "U.S. Centers for Disease Control and Prevention",
          "sourceUrls": [
            "https://www.cdc.gov/measles/data-research/index.html"
          ]
        },
        {
          "jsonPath": "$.announcementLocation.url",
          "value": "https://www.cdc.gov/",
          "sourceUrls": [
            "https://www.cdc.gov/measles/data-research/index.html"
          ]
        },
        {
          "jsonPath": "$.diseasePreventionInfo.url",
          "value": "https://www.cdc.gov/measles/data-research/index.html",
          "sourceUrls": [
            "https://www.cdc.gov/measles/data-research/index.html"
          ]
        },
        {
          "jsonPath": "$.diseasePreventionInfo.name",
          "value": "Measles Cases and Outbreaks",
          "sourceUrls": [
            "https://www.cdc.gov/measles/data-research/index.html"
          ]
        }
      ]
    }
  },
  "schema:SpeechPathology": {
    "id": "schema:SpeechPathology",
    "whenToUse": "Use SpeechPathology when scoping a clinician or service to speech-language pathology — articulation, language, voice, fluency, cognitive-communication, and swallowing therapy. Pair with MedicalCondition entities like Dysphagia, Aphasia, or Stuttering, and with MedicalProcedure entities for swallow studies."
  },
  "schema:StrengthTraining": {
    "id": "schema:StrengthTraining",
    "whenToUse": "Use StrengthTraining for resistance work that loads muscle and bone to drive strength and lean-mass adaptations — free weights, machines, resistance bands, bodyweight progressions. Apply it on plans that prescribe sets, reps, and load progression across major muscle groups, including programs supporting bone health and sarcopenia prevention."
  },
  "schema:Substance": {
    "id": "schema:Substance",
    "whenToUse": "Use Substance as a generic chemical or biological entity reference — caffeine, ethanol, melatonin, naloxone — when the page describes the substance itself rather than a marketed Drug or DietarySupplement product. It's the right type for substance encyclopedia entries and ingredient profile pages.",
    "whenNotToUse": "Don't use Substance for a marketed prescription or OTC product — use Drug. Don't use it for a finished supplement product — use DietarySupplement. Don't use it for a food ingredient context where Recipe markup is more appropriate.",
    "whoItsFor": "Reference-content editors at health portals, toxicology and pharmacology educators, and ingredient-database publishers.",
    "seoNotes": "Substance is the parent for Drug and DietarySupplement. Google does not currently issue a dedicated rich result; the value is in entity disambiguation for substance-level knowledge-graph nodes.",
    "commonCombos": [
      "schema:Drug",
      "schema:DietarySupplement",
      "schema:DefinedTerm"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/caffeine.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Substance\",\n  \"name\": \"Caffeine\",\n  \"description\": \"A bitter substance that occurs naturally in more than 60 plants. Stimulates the central nervous system and is found in coffee beans, tea leaves, kola nuts, and cacao pods.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/caffeine.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Caffeine is a bitter substance that occurs naturally in more than 60 plants. Caffeine stimulates your central nervous system, which can make you feel more awake."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Caffeine",
          "sourceUrls": [
            "https://medlineplus.gov/caffeine.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "A bitter substance that occurs naturally in more than 60 plants. Stimulates the central nervous system and is found in coffee beans, tea leaves, kola nuts, and cacao pods.",
          "sourceUrls": [
            "https://medlineplus.gov/caffeine.html"
          ]
        }
      ]
    }
  },
  "schema:SuperficialAnatomy": {
    "id": "schema:SuperficialAnatomy",
    "whenToUse": "Use SuperficialAnatomy for surface-of-the-body landmarks visible or palpable from outside — skin regions, anatomical surface markings, the palm of the hand, the antecubital fossa. It is the right type for dermatology reference, examination-technique pages, and skin-and-surface anatomy explainers.",
    "whenNotToUse": "Don't use SuperficialAnatomy for organs beneath the surface (use AnatomicalStructure) or for skin diseases (use MedicalCondition). Don't use it as the parent for a tattoo, scar, or cosmetic procedure — those have their own MedicalProcedure entries.",
    "whoItsFor": "Dermatology practice editors, physical-exam education content teams, skin-cancer screening publishers, and patient-education editors covering wound care and surface findings.",
    "seoNotes": "SuperficialAnatomy entries are uncommonly marked up on the open web, so well-formed entries punch above their weight as disambiguators for LLM-based assistants. Pair with the relevant skin-condition MedicalCondition pages via associatedAnatomy.",
    "commonCombos": [
      "schema:AnatomicalStructure",
      "schema:MedicalCondition",
      "schema:MedicalProcedure"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/skinconditions.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"SuperficialAnatomy\",\n  \"name\": \"Skin\",\n  \"description\": \"Your skin is your body's largest organ. It covers the entire outside of your body.\",\n  \"associatedPathophysiology\": \"Holds body fluids in, which helps prevent you from getting dehydrated. Keeps out harmful germs, which helps prevent infections. Helps you feel things like heat, cold, and pain. Helps control your body temperature. Makes vitamin D when the sun shines on it.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/skinconditions.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Your skin is your body's largest organ. It covers the entire outside of your body. It... Holds body fluids in, which helps prevent you from getting dehydrated. Keeps out harmful germs, which helps prevent infections. Helps you feel things like heat, cold, and pain. Helps control your body temperature. Makes vitamin D when the sun shines on it."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Skin",
          "sourceUrls": [
            "https://medlineplus.gov/skinconditions.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Your skin is your body's largest organ. It covers the entire outside of your body.",
          "sourceUrls": [
            "https://medlineplus.gov/skinconditions.html"
          ]
        },
        {
          "jsonPath": "$.associatedPathophysiology",
          "value": "Holds body fluids in, which helps prevent you from getting dehydrated. Keeps out harmful germs, which helps prevent infections. Helps you feel things like heat, cold, and pain. Helps control your body temperature. Makes vitamin D when the sun shines on it.",
          "sourceUrls": [
            "https://medlineplus.gov/skinconditions.html"
          ]
        }
      ]
    }
  },
  "schema:Surgical": {
    "id": "schema:Surgical",
    "whenToUse": "Use Surgical when scoping a Physician or service line to general surgery and broader operative care — abdominal, endocrine, breast, and acute-care surgery. Pair with MedicalProcedure entities for specific operations and reserve subspecialty surgical scopes (cardiothoracic, plastic, orthopedic) for their dedicated specialty values."
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
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
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
  },
  "schema:Suspended": {
    "id": "schema:Suspended",
    "whenToUse": "Use Suspended when a trial has paused recruitment and intervention but the sponsor expects to resume. Note the suspension reason in description so a clinician evaluating the page can judge whether the pause is administrative or safety-driven."
  },
  "schema:Terminated": {
    "id": "schema:Terminated",
    "whenToUse": "Use Terminated when a trial has stopped early and will not resume. Pair with a description of the termination reason so the public-facing record matches the registry of record without requiring a separate click-through."
  },
  "schema:Therapeutic": {
    "id": "schema:Therapeutic",
    "whenToUse": "Use Therapeutic when the device's intended purpose is to treat, mitigate, or replace a body function — implantable defibrillators, infusion pumps, joint replacements, ventilators, dialysis machines, and surgical instruments. The device acts on the patient to deliver care rather than to gather diagnostic information."
  },
  "schema:TherapeuticProcedure": {
    "id": "schema:TherapeuticProcedure",
    "whenToUse": "Use TherapeuticProcedure for non-surgical treatments delivered by a clinician — chemotherapy infusion, IV antibiotic administration, joint injection, dialysis. Pages describing infusion services, oncology day-hospital workflows, or nurse-administered treatments fit here.",
    "whenNotToUse": "Don't use TherapeuticProcedure for surgical operations (SurgicalProcedure), radiation delivery (RadiationTherapy), or rehabilitative care (PhysicalTherapy, OccupationalTherapy). For diagnostic-only work, use DiagnosticProcedure. Drug objects themselves are Drug, not TherapeuticProcedure — the procedure is the act of administering the drug.",
    "whoItsFor": "Infusion centers, oncology service lines, dialysis programs, and any clinic page describing how a treatment is delivered, dosed, and monitored.",
    "seoNotes": "TherapeuticProcedure markup that links the drug, doseSchedule, and adverseOutcome fields gives both crawlers and LLMs a complete picture of the treatment workflow. Pair with the relevant MedicalCondition the procedure treats to strengthen topical clusters.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalCondition",
      "schema:DoseSchedule",
      "schema:Hospital",
      "schema:Physician"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from National Cancer Institute (https://www.cancer.gov/about-cancer/treatment/types/chemotherapy) on 2026-05-05. Not for use in client deliverables.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"TherapeuticProcedure\",\n  \"name\": \"Chemotherapy infusion\",\n  \"description\": \"Chemotherapy (also called chemo) is a type of cancer treatment that uses drugs to kill cancer cells.\",\n  \"procedureType\": {\n    \"@type\": \"MedicalProcedureType\",\n    \"name\": \"Therapeutic\"\n  },\n  \"howPerformed\": \"Chemotherapy is most often given with an IV, through a thin needle that is placed in a vein on your hand or lower arm.\",\n  \"indication\": {\n    \"@type\": \"MedicalIndication\",\n    \"name\": \"Chemotherapy can be used to cure cancer, lessen the chance it will return, or stop or slow its growth.\"\n  },\n  \"followup\": \"You will see your doctor often. During these visits, they will ask you how you feel, do a physical exam, and order medical tests and scans.\",\n  \"adverseOutcome\": {\n    \"@type\": \"MedicalEntity\",\n    \"name\": \"Mouth sores, nausea, and hair loss\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy",
          "publisher": "National Cancer Institute",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Chemotherapy (also called chemo) is a type of cancer treatment that uses drugs to kill cancer cells."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Chemotherapy infusion",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Chemotherapy (also called chemo) is a type of cancer treatment that uses drugs to kill cancer cells.",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
          ]
        },
        {
          "jsonPath": "$.procedureType.name",
          "value": "Therapeutic",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
          ]
        },
        {
          "jsonPath": "$.howPerformed",
          "value": "Chemotherapy is most often given with an IV, through a thin needle that is placed in a vein on your hand or lower arm.",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
          ]
        },
        {
          "jsonPath": "$.indication.name",
          "value": "Chemotherapy can be used to cure cancer, lessen the chance it will return, or stop or slow its growth.",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
          ]
        },
        {
          "jsonPath": "$.followup",
          "value": "Doctor visits to assess how you feel, perform a physical exam, and order medical tests and scans.",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
          ]
        },
        {
          "jsonPath": "$.adverseOutcome.name",
          "value": "Mouth sores, nausea, and hair loss",
          "sourceUrls": [
            "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
          ]
        }
      ]
    }
  },
  "schema:Throat": {
    "id": "schema:Throat",
    "whenToUse": "Use Throat for oropharyngeal exam — lips, gums, tongue, tonsils, and posterior pharynx inspection. Pair with MedicalCondition entities like Pharyngitis, Tonsillitis, or Oral Candidiasis."
  },
  "schema:Toxicologic": {
    "id": "schema:Toxicologic",
    "whenToUse": "Use Toxicologic when scoping a clinician or service to medical toxicology — overdose, poisoning, envenomation, and occupational or environmental exposure. Pair with PoisonControl-style MedicalOrganization entities and with MedicalCondition entities like Acetaminophen Toxicity or Lead Poisoning."
  },
  "schema:TraditionalChinese": {
    "id": "schema:TraditionalChinese",
    "whenToUse": "Use TraditionalChinese for interventions drawn from the traditional Chinese medical system, including acupuncture, Chinese herbal formulas, cupping, moxibustion, qigong, and tui na. Apply it on therapy and supplement entries whose theoretical basis sits in TCM rather than in conventional pharmacology or physiotherapy."
  },
  "schema:TreatmentIndication": {
    "id": "schema:TreatmentIndication",
    "whenToUse": "Use TreatmentIndication when a drug or therapy is used to treat an established condition — metformin for type 2 diabetes, beta-blockers for hypertension, antibiotics for bacterial infection. It's the right subtype when the page describes management of an active disease state rather than prevention.",
    "whenNotToUse": "Don't use TreatmentIndication for risk reduction in patients without the condition — use PreventionIndication. Don't use it for off-label promotional claims. Don't use it for symptom-only relief if the page does not establish an underlying treated condition.",
    "whoItsFor": "Disease-state content editors, medical-affairs teams at pharma manufacturers, and clinical-knowledge curators.",
    "seoNotes": "TreatmentIndication is consumed via Drug.indication. Google does not currently issue a dedicated rich result; the value is structured separation of treatment from prevention claims for clinical knowledge graphs.",
    "commonCombos": [
      "schema:Drug",
      "schema:MedicalCondition",
      "schema:MedicalTherapy"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/druginfo/meds/a696005.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"TreatmentIndication\",\n  \"name\": \"Metformin for type 2 diabetes\",\n  \"description\": \"Metformin is used to treat type 2 diabetes, a condition in which the body does not use insulin normally and cannot control the amount of sugar in the blood.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/druginfo/meds/a696005.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Metformin is used to treat type 2 diabetes (condition in which the body does not use insulin normally and, therefore, cannot control the amount of sugar in the blood)."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Metformin for type 2 diabetes",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Metformin is used to treat type 2 diabetes, a condition in which the body does not use insulin normally and cannot control the amount of sugar in the blood.",
          "sourceUrls": [
            "https://medlineplus.gov/druginfo/meds/a696005.html"
          ]
        }
      ]
    }
  },
  "schema:TripleBlindedTrial": {
    "id": "schema:TripleBlindedTrial",
    "whenToUse": "Use TripleBlindedTrial when participant, treating clinician, and outcome assessor are all blinded to assignment. Carry this value where the protocol explicitly specifies triple blinding rather than using it as a synonym for unusually rigorous double-blinding."
  },
  "schema:Ultrasound": {
    "id": "schema:Ultrasound",
    "whenToUse": "Use Ultrasound for sonographic imaging that uses high-frequency sound waves to image tissue in real time — obstetric ultrasound, abdominal and pelvic ultrasound, vascular Doppler, echocardiography, point-of-care lung and FAST exams. Apply it on imaging-test entries where the radiation-free, real-time, and bedside-capable nature of the modality is the defining feature."
  },
  "schema:Urologic": {
    "id": "schema:Urologic",
    "whenToUse": "Use Urologic when scoping a Physician or service line to urology — kidney stones, BPH, urologic oncology, voiding dysfunction, and male reproductive health. Pair with MedicalCondition entities like Prostate Cancer or Nephrolithiasis and with MedicalProcedure entities for cystoscopy and TURP."
  },
  "schema:Vein": {
    "id": "schema:Vein",
    "whenToUse": "Use Vein for any page about a named venous vessel — superior vena cava, inferior vena cava, jugular, saphenous, portal vein. It is the right type for venous-anatomy reference content and the anatomical anchor on phlebology, vascular-surgery, and hematology pages.",
    "whenNotToUse": "Don't use Vein for arteries (use Artery), capillaries (use Vessel), or lymphatic vessels (use LymphaticVessel). Don't apply it to varicose veins, DVT, or thrombosis — those are MedicalCondition with the vein referenced as associatedAnatomy.",
    "whoItsFor": "Vascular-surgery and phlebology practice editors, vein-clinic marketers, IR and IV-access content teams, and patient-education editors covering DVT, varicose veins, and venous insufficiency.",
    "seoNotes": "Vein pages benefit from explicit drainage relationships — which regions the vein drains and which larger vessel it empties into — so LLM-based assistants can answer anatomic-trace questions. Connect to the cardiovascular AnatomicalSystem via partOfSystem.",
    "commonCombos": [
      "schema:AnatomicalSystem",
      "schema:Vessel",
      "schema:MedicalCondition"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/ency/article/001097.htm) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Vein\",\n  \"name\": \"Superior vena cava\",\n  \"description\": \"The second largest vein in the human body.\",\n  \"function\": \"Moves blood from the upper parts of the body to the heart.\",\n  \"partOfSystem\": {\n    \"@type\": \"AnatomicalSystem\",\n    \"name\": \"Vascular system\"\n  }\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/ency/article/001097.htm",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The superior vena cava is the second largest vein in the human body. It moves blood from the upper parts of the body to the heart."
        },
        {
          "url": "https://medlineplus.gov/vasculardiseases.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "The vascular system is your body's network of blood vessels."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Superior vena cava",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001097.htm"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "The second largest vein in the human body.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001097.htm"
          ]
        },
        {
          "jsonPath": "$.function",
          "value": "Moves blood from the upper parts of the body to the heart.",
          "sourceUrls": [
            "https://medlineplus.gov/ency/article/001097.htm"
          ]
        },
        {
          "jsonPath": "$.partOfSystem.name",
          "value": "Vascular system",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        }
      ]
    }
  },
  "schema:Vessel": {
    "id": "schema:Vessel",
    "whenToUse": "Use Vessel as the generic parent type when a page describes a tubular conduit that carries fluid in the body but is not specifically an artery, vein, or lymphatic vessel — capillaries, microvasculature explainers, and overview content that crosses sub-types. It is the right type for general blood-vessel reference pages.",
    "whenNotToUse": "Don't use Vessel when a more specific subtype applies — use Artery, Vein, or LymphaticVessel. Don't apply it to a vascular system overview (use AnatomicalSystem) or to vascular disease (use MedicalCondition).",
    "whoItsFor": "Vascular-medicine and cardiology editors building 101-style overview content, patient-education editors covering circulation basics, and reference publishers who need a stable parent type for sub-type pages.",
    "seoNotes": "Vessel is mostly useful as a graph anchor — pages should link to the vascular AnatomicalSystem and to specific Artery, Vein, and LymphaticVessel subtypes. Google does not issue a dedicated rich result for Vessel.",
    "commonCombos": [
      "schema:Artery",
      "schema:Vein",
      "schema:AnatomicalSystem"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/vasculardiseases.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Vessel\",\n  \"name\": \"Blood vessel\",\n  \"description\": \"Your body's network of blood vessels is called the vascular system.\",\n  \"partOfSystem\": {\n    \"@type\": \"AnatomicalSystem\",\n    \"name\": \"Vascular system\"\n  },\n  \"relatedCondition\": [\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Atherosclerosis\",\n      \"description\": \"Plaque buildup.\"\n    },\n    {\n      \"@type\": \"MedicalCondition\",\n      \"name\": \"Vasculitis\",\n      \"description\": \"Blood vessel inflammation.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/vasculardiseases.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Your vascular system is your body's network of blood vessels. Common problems include... atherosclerosis (plaque buildup)... vasculitis (blood vessel inflammation)."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Blood vessel",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Your body's network of blood vessels is called the vascular system.",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.partOfSystem.name",
          "value": "Vascular system",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[0].name",
          "value": "Atherosclerosis",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[0].description",
          "value": "Plaque buildup.",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[1].name",
          "value": "Vasculitis",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        },
        {
          "jsonPath": "$.relatedCondition[1].description",
          "value": "Blood vessel inflammation.",
          "sourceUrls": [
            "https://medlineplus.gov/vasculardiseases.html"
          ]
        }
      ]
    }
  },
  "schema:VeterinaryCare": {
    "id": "schema:VeterinaryCare",
    "whenToUse": "Use VeterinaryCare for a veterinary practice where regular visits keep pets and families healthy through vaccines, deworming, flea and tick control, and household-specific advice from a veterinarian. It is the right type for clinics that provide ongoing preventive animal care.",
    "whenNotToUse": "Don't use VeterinaryCare for human-only health facilities (use Hospital or MedicalClinic) or for an animal-shelter adoption page that doesn't describe clinical services. Don't use it for the broader public-health agency that veterinarians collaborate with — that's MedicalOrganization.",
    "whoItsFor": "Independent veterinary practice owners and chain veterinary brands building location pages, and One Health communicators describing the role of veterinarians in preventing zoonotic disease.",
    "seoNotes": "VeterinaryCare inherits LocalBusiness, so address and openingHours drive local results. Populating availableService with vaccines, deworming, and parasite control aligns with the search intent behind 'vet near me' and assistant queries like 'where can I take my pet for shots'.",
    "commonCombos": [
      "schema:LocalBusiness",
      "schema:MedicalProcedure",
      "schema:MedicalOrganization"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from CDC Healthy Pets\n// (https://www.cdc.gov/healthy-pets/about/index.html and\n// https://www.cdc.gov/one-health/about/index.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"VeterinaryCare\",\n  \"name\": \"Community Veterinary Practice\",\n  \"description\": \"A veterinary practice where regular visits help keep pets and families healthy, and where veterinarians serve as partners in human, animal, and environmental health.\",\n  \"availableService\": [\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Pet vaccinations\",\n      \"description\": \"Keep up with your pet's vaccines, deworming, and flea and tick control.\"\n    },\n    {\n      \"@type\": \"MedicalProcedure\",\n      \"name\": \"Veterinary consultation\",\n      \"description\": \"Talk to a veterinarian to determine the best pet for your household and how to keep your pet healthy.\"\n    }\n  ]\n}\n",
      "sources": [
        {
          "url": "https://www.cdc.gov/healthy-pets/about/index.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Regular veterinary visits are essential to keeping your pet and family healthy. Keep up with your pet's vaccines, deworming, and flea and tick control. Talk to a veterinarian to determine the best pet for your household. Talk to a veterinarian about how to keep your pet healthy."
        },
        {
          "url": "https://www.cdc.gov/one-health/about/index.html",
          "publisher": "U.S. Centers for Disease Control and Prevention",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "disease detectives, laboratorians, physicians, and veterinarians"
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.description",
          "value": "A veterinary practice where regular visits help keep pets and families healthy, and where veterinarians serve as partners in human, animal, and environmental health.",
          "sourceUrls": [
            "https://www.cdc.gov/healthy-pets/about/index.html",
            "https://www.cdc.gov/one-health/about/index.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].name",
          "value": "Pet vaccinations",
          "sourceUrls": [
            "https://www.cdc.gov/healthy-pets/about/index.html"
          ]
        },
        {
          "jsonPath": "$.availableService[0].description",
          "value": "Keep up with your pet's vaccines, deworming, and flea and tick control.",
          "sourceUrls": [
            "https://www.cdc.gov/healthy-pets/about/index.html"
          ]
        },
        {
          "jsonPath": "$.availableService[1].name",
          "value": "Veterinary consultation",
          "sourceUrls": [
            "https://www.cdc.gov/healthy-pets/about/index.html"
          ]
        },
        {
          "jsonPath": "$.availableService[1].description",
          "value": "Talk to a veterinarian to determine the best pet for your household and how to keep your pet healthy.",
          "sourceUrls": [
            "https://www.cdc.gov/healthy-pets/about/index.html"
          ]
        }
      ]
    }
  },
  "schema:Virus": {
    "id": "schema:Virus",
    "whenToUse": "Use Virus when the etiologic agent is a viral pathogen — influenza viruses, SARS-CoV-2, HIV, hepatitis viruses, herpesviruses, measles, or rabies. Apply it on InfectiousDisease entries where antiviral therapy, vaccination, or supportive care for self-limited viral illness is the relevant clinical context."
  },
  "schema:VitalSign": {
    "id": "schema:VitalSign",
    "whenToUse": "Use VitalSign for the four core measurements clinicians take at every encounter — blood pressure, heart rate, respiratory rate, and temperature. It is the right type for patient-education pages explaining what a measurement is and how it is taken.",
    "whenNotToUse": "Do not use VitalSign for body composition, lab values, or imaging findings — those are MedicalTest results. Do not use it for derived scores like BMI or shock index.",
    "whoItsFor": "Health-system patient-portal editors, home-monitoring device marketers, and primary-care educators.",
    "seoNotes": "Vital-sign pages are highly cited by virtual-care assistants because the patient is often holding a measurement and asking what it means. Pair VitalSign markup with FAQPage answering threshold questions.",
    "commonCombos": [
      "schema:MedicalTest",
      "schema:MedicalCondition",
      "schema:FAQPage"
    ],
    "example": {
      "jsonld": "// Reference example — built from public data sourced from NIH MedlinePlus\n// (https://medlineplus.gov/vitalsigns.html) on 2026-05-05.\n// Not for use in client deliverables. Generate your own markup using your\n// content in the Generator.\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"VitalSign\",\n  \"name\": \"Blood Pressure\",\n  \"description\": \"Blood pressure measures the force of your blood pushing against the walls of your arteries. Your blood pressure has two numbers. The first number is the pressure when your heart beats and is pumping the blood. The second is from when your heart is at rest, between beats.\",\n  \"normalRange\": \"A normal blood pressure reading for adults is lower than 120/80 and higher than 90/60.\"\n}\n",
      "sources": [
        {
          "url": "https://medlineplus.gov/vitalsigns.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Blood pressure measures the force of your blood pushing against the walls of your arteries."
        },
        {
          "url": "https://medlineplus.gov/vitalsigns.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "Your blood pressure has two numbers. The first number is the pressure when your heart beats and is pumping the blood. The second is from when your heart is at rest, between beats."
        },
        {
          "url": "https://medlineplus.gov/vitalsigns.html",
          "publisher": "NIH MedlinePlus",
          "accessedAt": "2026-05-05T00:00:00Z",
          "quote": "A normal blood pressure reading for adults is lower than 120/80 and higher than 90/60."
        }
      ],
      "verification": "verified",
      "verifiedBy": "joseph@jsthomas.org",
      "verifiedAt": "2026-05-05T23:25:41.635Z",
      "factsExtracted": [
        {
          "jsonPath": "$.name",
          "value": "Blood Pressure",
          "sourceUrls": [
            "https://medlineplus.gov/vitalsigns.html"
          ]
        },
        {
          "jsonPath": "$.description",
          "value": "Blood pressure measures the force of your blood pushing against the walls of your arteries. Your blood pressure has two numbers. The first number is the pressure when your heart beats and is pumping the blood. The second is from when your heart is at rest, between beats.",
          "sourceUrls": [
            "https://medlineplus.gov/vitalsigns.html"
          ]
        },
        {
          "jsonPath": "$.normalRange",
          "value": "A normal blood pressure reading for adults is lower than 120/80 and higher than 90/60.",
          "sourceUrls": [
            "https://medlineplus.gov/vitalsigns.html"
          ]
        }
      ]
    }
  },
  "schema:WesternConventional": {
    "id": "schema:WesternConventional",
    "whenToUse": "Use WesternConventional for the mainstream allopathic system of medicine practiced by MDs and DOs and grounded in biomedical science, regulated drugs, surgery, and standardized clinical guidelines. Apply it as the default value on integrative-medicine pages where conventional offerings need to be distinguished from complementary or traditional-system content."
  },
  "schema:Wholesale": {
    "id": "schema:Wholesale",
    "whenToUse": "Use Wholesale when the cost is the wholesale acquisition cost (WAC) paid by a pharmacy or distributor to the manufacturer, before rebates and dispensing fees. Reserve it for B2B-facing drug-pricing data and reference-price pages where WAC is the explicit figure being published."
  },
  "schema:Withdrawn": {
    "id": "schema:Withdrawn",
    "whenToUse": "Use Withdrawn when a trial was registered but stopped before any participants were enrolled. Keep the registry record live with this status rather than removing the page so prior citations and outbound links don't 404."
  },
  "schema:XRay": {
    "id": "schema:XRay",
    "whenToUse": "Use XRay for plain projection radiography that produces two-dimensional images from a single X-ray exposure — chest radiograph, extremity series for fracture, abdominal flat plate, dental bitewings. Apply it on imaging-test entries that need to be distinguished from CT, where the study is a single projection rather than a cross-sectional reconstruction."
  },
  "schema:activeIngredient": {
    "id": "schema:activeIngredient",
    "whenToUse": "Use activeIngredient on Drug, Substance, or DietarySupplement to name the chemical or biologic compound responsible for the pharmacologic effect. Value is plain Text — use the INN or USAN where one exists, not a brand or trade name.",
    "whenNotToUse": "Don't use activeIngredient for excipients, fillers, or coatings — those aren't covered by a dedicated schema.org property and belong in long-form description. For combination products, repeat the property once per component rather than concatenating into a single string.",
    "commonCombos": [
      "schema:Drug",
      "schema:Substance",
      "schema:DietarySupplement"
    ]
  },
  "schema:activityDuration": {
    "id": "schema:activityDuration",
    "whenToUse": "Use activityDuration on ExercisePlan to express how long a single session lasts. Prefer Duration in ISO 8601 form (PT30M) over QuantitativeValue when you only need a single magnitude — reserve QuantitativeValue for ranges with min/max.",
    "whenNotToUse": "Don't use activityDuration for total program length across weeks — that's a separate concept and belongs in description or a custom property. For session cadence per week, use activityFrequency.",
    "commonCombos": [
      "schema:ExercisePlan"
    ]
  },
  "schema:activityFrequency": {
    "id": "schema:activityFrequency",
    "whenToUse": "Use activityFrequency on ExercisePlan to express how often a session repeats — '3 times per week', 'daily'. QuantitativeValue with unitText is preferred when you can express it numerically, falling back to Text for natural-language cadence.",
    "whenNotToUse": "Don't conflate frequency with duration of a single session — that's activityDuration. Don't use this for one-off events; ExercisePlan implies repetition, and a single workout belongs on ExerciseAction instead.",
    "commonCombos": [
      "schema:ExercisePlan"
    ]
  },
  "schema:additionalVariable": {
    "id": "schema:additionalVariable",
    "whenToUse": "Use additionalVariable on ExercisePlan for prescription details that don't fit duration, frequency, intensity, or repetitions — load progressions, rest intervals between sets, RPE targets, tempo cues. Free Text, but keep each variable to one short sentence so it stays parseable.",
    "whenNotToUse": "Don't use additionalVariable for the core dose-response fields that already have dedicated properties (intensity, repetitions, workload). If the value is structured numeric data, model it as a separate QuantitativeValue rather than burying it here.",
    "commonCombos": [
      "schema:ExercisePlan"
    ]
  },
  "schema:administrationRoute": {
    "id": "schema:administrationRoute",
    "whenToUse": "Use administrationRoute on Drug to declare how the drug enters the body — oral, intravenous, topical, intramuscular, subcutaneous, inhalation. Value is Text; pick a single canonical term per route and reuse it across the catalog so consumers can group products consistently.",
    "whenNotToUse": "Don't use administrationRoute to describe the device used to deliver the drug — that belongs on a related MedicalDevice. For multi-route products, repeat the property rather than packing routes into one comma-separated string.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:adverseOutcome": {
    "id": "schema:adverseOutcome",
    "whenToUse": "Use adverseOutcome on TherapeuticProcedure or MedicalDevice to link to a MedicalEntity representing a known complication or side effect. The value should be a referenceable MedicalEntity (often MedicalCondition or MedicalSignOrSymptom), not a free-text description.",
    "whenNotToUse": "Don't use adverseOutcome for drug side effects — Drug uses seriousAdverseOutcome and adverseOutcome differently in practice; check the parent type. For warnings tied to lifestyle interactions (alcohol, pregnancy), use the dedicated warning properties on Drug.",
    "commonCombos": [
      "schema:MedicalDevice",
      "schema:TherapeuticProcedure"
    ]
  },
  "schema:affectedBy": {
    "id": "schema:affectedBy",
    "whenToUse": "Use affectedBy on MedicalTest to link to Drug entities that interfere with the test's accuracy — assays where biotin causes false readings, metabolites that confound a urine screen. Value must be a Drug reference, ideally one you also publish so the link resolves.",
    "whenNotToUse": "Don't use affectedBy for non-drug interference (timing, fasting state, recent exercise) — that belongs in the test's description or normalRange context. Don't list general drug-drug interactions here; those live on Drug via interactingDrug.",
    "commonCombos": [
      "schema:MedicalTest"
    ]
  },
  "schema:alcoholWarning": {
    "id": "schema:alcoholWarning",
    "whenToUse": "Use alcoholWarning on Drug for a single-paragraph caution about combining the drug with alcohol — sedation amplification, hepatotoxicity risk, disulfiram-like reactions. Keep it self-contained Text so it can render verbatim in a label or product page.",
    "whenNotToUse": "Don't use alcoholWarning for general contraindications unrelated to alcohol — use contraindication. For pregnancy or breastfeeding cautions, use pregnancyWarning or breastfeedingWarning so consumers can surface the right label per cohort.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:algorithm": {
    "id": "schema:algorithm",
    "whenToUse": "Use algorithm on MedicalRiskScore to describe the calculation behind the score — input variables, weighting, and the output transformation. Text value; if the formula is mathematical, render it readably (e.g., 'Sum of points: age (1), sex (1), …') rather than embedding LaTeX.",
    "whenNotToUse": "Don't use algorithm to list the cohort the score was derived in — that's estimatesRiskOf or description context. For the citation behind the algorithm, use citation on the parent rather than embedding it inside this Text field.",
    "commonCombos": [
      "schema:MedicalRiskScore"
    ]
  },
  "schema:antagonist": {
    "id": "schema:antagonist",
    "whenToUse": "Use antagonist on Muscle to point at the Muscle whose action opposes the subject muscle at a given joint — biceps brachii antagonized by triceps brachii during elbow extension. Reference a Muscle node so users can navigate the agonist/antagonist pair.",
    "whenNotToUse": "Don't use antagonist for receptor pharmacology — that's a separate domain and isn't modeled here. For synergists or stabilizers around the same joint, neither has a dedicated property; describe them in the muscle's description rather than overloading antagonist.",
    "commonCombos": [
      "schema:Muscle"
    ]
  },
  "schema:applicableLocation": {
    "id": "schema:applicableLocation",
    "whenToUse": "Use applicableLocation on DrugLegalStatus or DrugCost to scope the statement to a jurisdiction — a country, state, or other AdministrativeArea. Without it, a price or legal status reads as global, which it almost never is.",
    "whenNotToUse": "Don't use applicableLocation for the patient's location of care or the pharmacy's address — those belong on the relevant MedicalBusiness or postalAddress. For drug strength availability by geography, use availableIn on DrugStrength instead.",
    "commonCombos": [
      "schema:DrugLegalStatus",
      "schema:DrugCost"
    ]
  },
  "schema:arterialBranch": {
    "id": "schema:arterialBranch",
    "whenToUse": "Use arterialBranch on Artery to enumerate the named branches that arise from the parent vessel — the celiac trunk's left gastric, splenic, and common hepatic branches. Each value should reference an AnatomicalStructure (an Artery node) so the vascular tree stays navigable.",
    "whenNotToUse": "Don't use arterialBranch for the vessel a branch arises from — that direction belongs on the child via partOfSystem or a description note. For vessels supplying a specific organ or muscle, use bloodSupply on the target structure instead.",
    "commonCombos": [
      "schema:Artery"
    ]
  },
  "schema:aspect": {
    "id": "schema:aspect",
    "whenToUse": "Use aspect on MedicalWebPage to declare the clinical lens of the page — 'diagnosis', 'treatment', 'prevention', 'symptoms', 'pathophysiology'. Pick from a small controlled vocabulary so a hub of pages about one condition can be filtered cleanly by user intent.",
    "whenNotToUse": "Don't use aspect when the page covers a condition end-to-end — leave it unset or use a generic value rather than inventing one. For the underlying condition itself, use about pointing to a MedicalCondition rather than encoding the topic in aspect.",
    "commonCombos": [
      "schema:MedicalWebPage"
    ]
  },
  "schema:associatedAnatomy": {
    "id": "schema:associatedAnatomy",
    "whenToUse": "Use associatedAnatomy on MedicalCondition or PhysicalActivity to link to the anatomy involved — an organ (AnatomicalStructure), a system (AnatomicalSystem), or a body region (SuperficialAnatomy). Pick the most specific level you can support with a real referenceable node.",
    "whenNotToUse": "Don't use associatedAnatomy for procedures — those use bodyLocation. Don't pile on every tangentially related structure; one or two anchors per condition keep the entity graph crisp and avoid diluting relevance signals.",
    "commonCombos": [
      "schema:PhysicalActivity",
      "schema:MedicalCondition"
    ]
  },
  "schema:associatedPathophysiology": {
    "id": "schema:associatedPathophysiology",
    "whenToUse": "Use associatedPathophysiology on AnatomicalStructure, AnatomicalSystem, or SuperficialAnatomy to describe the disease mechanisms relevant to that anatomy — what goes wrong when the structure fails. Single Text block, written for clinical readers but free of citations (those go on the parent).",
    "whenNotToUse": "Don't use associatedPathophysiology to enumerate specific diseases — link those as MedicalCondition entities via the condition's associatedAnatomy back-reference. Keep this property focused on mechanism, not catalog.",
    "commonCombos": [
      "schema:AnatomicalSystem",
      "schema:SuperficialAnatomy",
      "schema:AnatomicalStructure"
    ]
  },
  "schema:availableIn": {
    "id": "schema:availableIn",
    "whenToUse": "Use availableIn on DrugStrength to scope a strength to the AdministrativeArea where it's marketed — a 75 mg tablet sold in the EU but not the US. Always reference an AdministrativeArea node rather than free-text country names.",
    "whenNotToUse": "Don't use availableIn for legal status (use applicableLocation on DrugLegalStatus) or for the drug's overall market footprint at the Drug level. Strength-by-strength geography is the only use case here.",
    "commonCombos": [
      "schema:DrugStrength"
    ]
  },
  "schema:availableService": {
    "id": "schema:availableService",
    "whenToUse": "Use availableService on Hospital, MedicalClinic, or Physician to enumerate the procedures, tests, and therapies the provider offers. Each value should reference a real MedicalProcedure, MedicalTest, or MedicalTherapy node so service-line pages and provider profiles can interlink.",
    "whenNotToUse": "Don't use availableService for medical specialties of the staff — use medicalSpecialty for that. Don't list every CPT code as a separate service; group at the patient-recognizable level (e.g., 'colonoscopy', not each variant code).",
    "commonCombos": [
      "schema:Hospital",
      "schema:MedicalClinic",
      "schema:Physician"
    ]
  },
  "schema:availableStrength": {
    "id": "schema:availableStrength",
    "whenToUse": "Use availableStrength on Drug to attach one or more DrugStrength nodes describing the dose forms the product ships in — 25 mg, 50 mg, 100 mg tablets. Repeat the property per strength rather than concatenating them so each can carry its own availableIn and maximumIntake.",
    "whenNotToUse": "Don't use availableStrength for the recommended therapeutic dose to a patient — that's doseSchedule. Don't put the unit (mg, mL) in plain Text; structure it as DrugStrength with strengthValue and strengthUnit so tooling can compare across products.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:availableTest": {
    "id": "schema:availableTest",
    "whenToUse": "Use availableTest on DiagnosticLab to enumerate the panels and assays the lab performs. Each entry should reference a MedicalTest node — a BloodTest, ImagingTest, or PathologyTest — so the catalog interlinks with the test's normalRange and usedToDiagnose pages.",
    "whenNotToUse": "Don't use availableTest for tests merely sent out to a reference lab; reserve it for what the facility actually runs in-house, otherwise the directory misleads patients. For service offerings beyond testing, use availableService on the parent provider type.",
    "commonCombos": [
      "schema:DiagnosticLab"
    ]
  },
  "schema:biomechnicalClass": {
    "id": "schema:biomechnicalClass",
    "whenToUse": "Use biomechnicalClass on Joint (note schema.org's misspelling — keep it verbatim) to classify the joint by its mechanical behavior — hinge, ball-and-socket, pivot, saddle, plane, condyloid. Pick a single canonical term per joint and reuse it.",
    "whenNotToUse": "Don't use biomechnicalClass for the structural classification (fibrous, cartilaginous, synovial) — those describe tissue, not motion. Put structural detail in description and reserve this property for the functional motion class.",
    "commonCombos": [
      "schema:Joint"
    ]
  },
  "schema:bloodSupply": {
    "id": "schema:bloodSupply",
    "whenToUse": "Use bloodSupply on Muscle to point at the Vessel (almost always an Artery) that perfuses it — the brachial artery supplying the biceps brachii. Reference a real Vessel node so vascular and musculoskeletal pages interlink in the entity graph.",
    "whenNotToUse": "Don't use bloodSupply for venous drainage — schema.org has no dedicated property, so describe venous return in the muscle's description. For named arterial branches as a tree, use arterialBranch on the parent Artery instead.",
    "commonCombos": [
      "schema:Muscle"
    ]
  },
  "schema:bodyLocation": {
    "id": "schema:bodyLocation",
    "whenToUse": "Use bodyLocation on AnatomicalStructure or MedicalProcedure as a Text descriptor of where the entity sits or operates — 'right upper quadrant', 'cervical spine C5-C6'. Plain text, written in clinical shorthand patients can also parse.",
    "whenNotToUse": "Don't use bodyLocation when you can reference a structured AnatomicalStructure — for procedures, prefer linking via a MedicalProcedure-specific anatomy property when one exists. For conditions, use associatedAnatomy with a real node, not free text.",
    "commonCombos": [
      "schema:AnatomicalStructure",
      "schema:MedicalProcedure"
    ]
  },
  "schema:branch": {
    "id": "schema:branch",
    "whenToUse": "Use branch on Nerve to enumerate the named branches that arise from the nerve trunk — median nerve giving off the anterior interosseous and recurrent branches. Each value should reference an AnatomicalStructure, ideally a Nerve node, so the neuroanatomy tree stays traversable.",
    "whenNotToUse": "Don't confuse this with arterialBranch — keep this property for nerves only. For organizational subdivisions of an Organization, schema.org uses BranchOf at a different scope; this property is anatomical only.",
    "commonCombos": [
      "schema:Nerve"
    ]
  },
  "schema:breastfeedingWarning": {
    "id": "schema:breastfeedingWarning",
    "whenToUse": "Use breastfeedingWarning on Drug for a self-contained Text caution about lactation safety — milk transfer, infant exposure, alternative therapies. Write it so it can render alone on a label or product detail without surrounding context.",
    "whenNotToUse": "Don't use breastfeedingWarning for pregnancy guidance — that's pregnancyWarning, and the two carry different evidence bases. For general contraindications unrelated to lactation, use contraindication.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:cause": {
    "id": "schema:cause",
    "whenToUse": "Use cause on MedicalCondition to point at a MedicalCause node describing the etiology — infectious agent, genetic mutation, environmental exposure. Repeat the property for multifactorial conditions rather than packing causes into a single node.",
    "whenNotToUse": "Don't use cause for risk factors that raise probability without being causal (use riskFactor) or for pathophysiology mechanisms (use associatedPathophysiology on the relevant anatomy). Reserve cause for established etiologic agents.",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:causeOf": {
    "id": "schema:causeOf",
    "whenToUse": "Use causeOf on MedicalCause as the inverse of cause — point at the MedicalEntity (a MedicalCondition, MedicalSignOrSymptom, or complication) that this cause produces. This makes etiology pages discoverable from both directions.",
    "whenNotToUse": "Don't use causeOf to enumerate every downstream sequela the cause might trigger; keep it to the direct, well-attested outcomes so the graph stays trustworthy. For looser association, use a description field on the parent.",
    "commonCombos": [
      "schema:MedicalCause"
    ]
  },
  "schema:clincalPharmacology": {
    "id": "schema:clincalPharmacology",
    "whenToUse": "Use clincalPharmacology on Drug only if you must mirror an existing dataset that uses schema.org's misspelled property name. New work should prefer the correctly spelled clinicalPharmacology — schema.org keeps both for legacy compatibility.",
    "whenNotToUse": "Don't introduce clincalPharmacology in greenfield catalogs; the misspelling causes parser confusion and downstream tooling drift. Migrate to clinicalPharmacology and treat this property as deprecated-by-spelling.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:clinicalPharmacology": {
    "id": "schema:clinicalPharmacology",
    "whenToUse": "Use clinicalPharmacology on Drug to capture absorption, distribution, metabolism, and excretion in a single Text block. Aim for one paragraph per ADME phase so the field stays readable and stays parseable for assistants summarizing the drug.",
    "whenNotToUse": "Don't use clinicalPharmacology for the mechanism of action — that's mechanismOfAction. Don't put dose recommendations or interaction warnings here; they have dedicated properties (doseSchedule, interactingDrug, contraindication) and consumers expect them there.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:code": {
    "id": "schema:code",
    "whenToUse": "Use code on any MedicalEntity to attach a MedicalCode node carrying the controlled-vocabulary identifier — ICD-10, SNOMED CT, RxNorm, LOINC, CPT. Repeat the property for each system you can map to so consumers can pick whichever ontology they index against.",
    "whenNotToUse": "Don't use code for internal product SKUs or proprietary identifiers — use identifier with a PropertyValue for those. Don't put the codingSystem name in the same string as the value; structure them as separate fields on the MedicalCode node.",
    "commonCombos": [
      "schema:MedicalEntity"
    ]
  },
  "schema:codingSystem": {
    "id": "schema:codingSystem",
    "whenToUse": "Use codingSystem on MedicalCode to name the vocabulary the codeValue belongs to — 'ICD-10', 'ICD-10-CM', 'SNOMED CT', 'RxNorm', 'LOINC'. Pick a single canonical spelling per system and reuse it; consumers group codes by exact-match string.",
    "whenNotToUse": "Don't use codingSystem to point at the version (ICD-10 vs ICD-10-CM is fine, but '2023 release' isn't) — version belongs in description if needed. Don't include the code value here; keep that on codeValue so the pair stays parseable.",
    "commonCombos": [
      "schema:MedicalCode"
    ]
  },
  "schema:comprisedOf": {
    "id": "schema:comprisedOf",
    "whenToUse": "Use comprisedOf on AnatomicalSystem to enumerate the AnatomicalStructure or sub-AnatomicalSystem nodes the system contains — the cardiovascular system comprised of the heart and the vessels. Reference real nodes so an LLM can traverse from a system page down to its constituent organs.",
    "whenNotToUse": "Don't use comprisedOf for functional collaborators across systems — those belong in description. For an organ being part of a system, use partOfSystem on the structure rather than re-stating the relationship from the system side every time.",
    "commonCombos": [
      "schema:AnatomicalSystem"
    ]
  },
  "schema:connectedTo": {
    "id": "schema:connectedTo",
    "whenToUse": "Use connectedTo on AnatomicalStructure for the named structures that meet the subject — bones articulating at a joint, muscles attaching to a tendon, vessels anastomosing with another. Reference AnatomicalStructure nodes so the connection graph stays bidirectional.",
    "whenNotToUse": "Don't use connectedTo for containment (use partOfSystem) or for the vessel that supplies a muscle (use bloodSupply). Reserve this property for direct anatomic adjacency, not functional or vascular relationships.",
    "commonCombos": [
      "schema:AnatomicalStructure"
    ]
  },
  "schema:contraindication": {
    "id": "schema:contraindication",
    "whenToUse": "Use contraindication on MedicalTherapy or MedicalDevice for situations in which the intervention should not be used — pregnancy, renal failure, concurrent MAOI use. Prefer a MedicalContraindication node over plain Text when you can structure it, since downstream consumers can filter on it.",
    "whenNotToUse": "Don't use contraindication for cautions about lifestyle interactions on a Drug — use alcoholWarning, pregnancyWarning, or breastfeedingWarning. Don't use it for adverse outcomes that have already occurred; those are adverseOutcome.",
    "commonCombos": [
      "schema:MedicalTherapy",
      "schema:MedicalDevice"
    ]
  },
  "schema:costCategory": {
    "id": "schema:costCategory",
    "whenToUse": "Use costCategory on DrugCost with a DrugCostCategory enum — wholesale, retail, reimbursement-cap — so price points across products are comparable on the same basis. Without it, a costPerUnit number is ambiguous between manufacturer and pharmacy-counter pricing.",
    "whenNotToUse": "Don't use costCategory for the payer or insurance plan — that belongs in costOrigin or a related context field. Don't invent ad-hoc category strings; stick to the DrugCostCategory enumeration.",
    "commonCombos": [
      "schema:DrugCost"
    ]
  },
  "schema:costCurrency": {
    "id": "schema:costCurrency",
    "whenToUse": "Use costCurrency on DrugCost with the ISO 4217 three-letter code — 'USD', 'EUR', 'GBP'. Always pair it with costPerUnit; a price without a currency is a hazard for any consumer that auto-formats it.",
    "whenNotToUse": "Don't use symbols ('$', '€') or country names — the property requires a three-letter currency code. For multi-currency listings, create a separate DrugCost node per currency rather than overloading one node.",
    "commonCombos": [
      "schema:DrugCost"
    ]
  },
  "schema:costOrigin": {
    "id": "schema:costOrigin",
    "whenToUse": "Use costOrigin on DrugCost as a Text field naming the source of the price datum — 'Medicare Part B 2025', 'NADAC weekly file', 'manufacturer list price'. This is the provenance breadcrumb that lets consumers judge whether the number is current and applicable to them.",
    "whenNotToUse": "Don't use costOrigin to encode the jurisdiction (use applicableLocation) or the pricing tier (use costCategory). Keep it focused on dataset or publisher attribution.",
    "commonCombos": [
      "schema:DrugCost"
    ]
  },
  "schema:costPerUnit": {
    "id": "schema:costPerUnit",
    "whenToUse": "Use costPerUnit on DrugCost as a Number when you have an exact price, QualitativeValue when you only have a band ('low', 'moderate', 'high'), or Text when the source publishes a formatted string. Always pair with costCurrency and costCategory so the unit is unambiguous.",
    "whenNotToUse": "Don't use costPerUnit for total prescription cost — this is per-unit (per tablet, per mL, per dose) by definition. Don't bundle currency into the number; keep them on separate fields.",
    "commonCombos": [
      "schema:DrugCost"
    ]
  },
  "schema:diagnosis": {
    "id": "schema:diagnosis",
    "whenToUse": "Use diagnosis on a Patient or DDxElement to point to a MedicalCondition node representing the working or confirmed diagnosis. The value must be a MedicalCondition reference, not free text — pitfall is dropping the condition name into a string when downstream consumers expect a graph link.",
    "whenNotToUse": "Don't use diagnosis to express a list of conditions ruled out — use differentialDiagnosis. For symptoms or signs that prompted the workup, use signOrSymptom on the condition itself.",
    "commonCombos": [
      "schema:DDxElement",
      "schema:Patient"
    ]
  },
  "schema:diagram": {
    "id": "schema:diagram",
    "whenToUse": "Use diagram on an AnatomicalStructure to attach a labeled illustration that clarifies internal layout or relationships among components. The value should be an ImageObject with caption and contentUrl, not a bare URL string.",
    "whenNotToUse": "Don't use diagram for a generic photograph of the structure — use image. For non-anatomy schematics like care pathways, attach an ImageObject via image on the parent entity instead.",
    "commonCombos": [
      "schema:AnatomicalStructure"
    ]
  },
  "schema:dietFeatures": {
    "id": "schema:dietFeatures",
    "whenToUse": "Use dietFeatures on a Diet to enumerate the food-group rules, macro emphases, and behavioral guardrails that define the pattern. Repeat the property for each distinct rule rather than concatenating into one string — each value should be a short Text descriptor.",
    "whenNotToUse": "Don't use dietFeatures for nutrient totals of a single meal — use NutritionInformation on a Recipe. For expert advice or caveats about the plan, use expertConsiderations.",
    "commonCombos": [
      "schema:Diet"
    ]
  },
  "schema:differentialDiagnosis": {
    "id": "schema:differentialDiagnosis",
    "whenToUse": "Use differentialDiagnosis on a MedicalCondition to enumerate the alternate diagnoses a clinician should rule out. Each value must be a DDxElement, which lets you pair the alternate diagnosis with its distinguishingSign — flat strings break the workup logic.",
    "whenNotToUse": "Don't use differentialDiagnosis to record the patient's confirmed diagnosis — use diagnosis on the Patient. For comorbid conditions present alongside the primary, model them as separate MedicalCondition entries.",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:distinguishingSign": {
    "id": "schema:distinguishingSign",
    "whenToUse": "Use distinguishingSign on a DDxElement to attach the MedicalSignOrSymptom that separates this alternate diagnosis from the primary. Pair it with the diagnosis property on the same DDxElement so consumers see both sides of the rule-out.",
    "whenNotToUse": "Don't use distinguishingSign on a MedicalCondition's signOrSymptom slot — that's for general presentation, not differential logic.",
    "commonCombos": [
      "schema:DDxElement"
    ]
  },
  "schema:dosageForm": {
    "id": "schema:dosageForm",
    "whenToUse": "Use dosageForm on a Drug to record the physical formulation a patient receives — tablet, capsule, oral suspension, transdermal patch, IV solution. The value is a short Text string; if multiple forms are marketed, repeat the property rather than comma-joining.",
    "whenNotToUse": "Don't use dosageForm to express strength like '500 mg' — that belongs on DrugStrength. For administration route as a separate axis, use administrationRoute.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:doseUnit": {
    "id": "schema:doseUnit",
    "whenToUse": "Use doseUnit on a DoseSchedule to record the unit of measure for the dose — mg, mL, IU, mcg/kg. Keep the unit string aligned with the doseValue you publish so consumers can render '500 mg' from the pair.",
    "whenNotToUse": "Don't bake the unit into doseValue as a string — keep them separate so calculators and assistants can reason over the number.",
    "commonCombos": [
      "schema:DoseSchedule"
    ]
  },
  "schema:doseValue": {
    "id": "schema:doseValue",
    "whenToUse": "Use doseValue on a DoseSchedule to record the numeric dose. Prefer Number for fixed values; switch to QualitativeValue when the dose is described as a range or graded category.",
    "whenNotToUse": "Don't pack the unit into doseValue — use doseUnit. Don't use it to express frequency like 'twice daily' — that's frequency.",
    "commonCombos": [
      "schema:DoseSchedule"
    ]
  },
  "schema:drainsTo": {
    "id": "schema:drainsTo",
    "whenToUse": "Use drainsTo on a Vein to point to the next Vessel in the venous return path. The value should be a Vessel reference so the graph can be traversed proximally toward the heart.",
    "whenNotToUse": "Don't use drainsTo on an Artery — arteries supply rather than drain; use the inverse perfusion modeling on the source artery instead. For lymphatic drainage, model the lymphatic vessel separately.",
    "commonCombos": [
      "schema:Vein"
    ]
  },
  "schema:drugUnit": {
    "id": "schema:drugUnit",
    "whenToUse": "Use drugUnit on a Drug or DrugCost to describe the dispensable unit — '5 mg tablet', '100 mg/mL vial'. The string captures both formulation and per-unit strength so cost and supply data align.",
    "whenNotToUse": "Don't use drugUnit to express a per-dose schedule — that's DoseSchedule with doseValue and doseUnit. For pure formulation without strength, use dosageForm.",
    "commonCombos": [
      "schema:Drug",
      "schema:DrugCost"
    ]
  },
  "schema:duplicateTherapy": {
    "id": "schema:duplicateTherapy",
    "whenToUse": "Use duplicateTherapy on a MedicalTherapy to flag another therapy that overlaps in mechanism or class, where coadministration would double-count the same effect. The value is another MedicalTherapy node, not free text.",
    "whenNotToUse": "Don't use duplicateTherapy for drug-drug interactions of different mechanisms — those belong on Drug interactions. For substitutes considered equivalent, use seriousAdverseOutcome modeling at the prescription layer instead.",
    "commonCombos": [
      "schema:MedicalTherapy"
    ]
  },
  "schema:endorsers": {
    "id": "schema:endorsers",
    "whenToUse": "Use endorsers on a Diet to credit the Organizations or Persons whose authority backs the eating pattern — society guidelines, expert panels, named clinicians. Each value should be a fully-typed Organization or Person reference so consumers can verify the endorsement.",
    "whenNotToUse": "Don't use endorsers to list authors of an article — use author on the Article. For a guideline's issuing body, use guidelineSubject or recognizingAuthority on the relevant entity.",
    "commonCombos": [
      "schema:Diet"
    ]
  },
  "schema:epidemiology": {
    "id": "schema:epidemiology",
    "whenToUse": "Use epidemiology on a MedicalCondition or PhysicalActivity to describe the demographics and risk profile of the affected population — age bands, sex distribution, geographic prevalence. The value is Text; keep it tight enough to summarize without restating the full population study.",
    "whenNotToUse": "Don't use epidemiology to describe transmission mechanisms — use transmissionMethod on InfectiousDisease. For risk factors specific to one trigger, use riskFactor.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:PhysicalActivity"
    ]
  },
  "schema:estimatesRiskOf": {
    "id": "schema:estimatesRiskOf",
    "whenToUse": "Use estimatesRiskOf on a MedicalRiskEstimator to point to the MedicalEntity whose probability the calculator predicts — the condition, complication, or adverse event. The value must be the target entity, not a description of the score itself.",
    "whenNotToUse": "Don't use estimatesRiskOf for the inputs feeding the calculator — those go on relevantSpecialty or as separate riskFactor values on the target condition.",
    "commonCombos": [
      "schema:MedicalRiskEstimator"
    ]
  },
  "schema:evidenceLevel": {
    "id": "schema:evidenceLevel",
    "whenToUse": "Use evidenceLevel on a MedicalGuideline to attach the MedicalEvidenceLevel enumeration value that grades the underlying evidence. Use the enumeration tokens (EvidenceLevelA, B, or C) so consumers can map to standard grading.",
    "whenNotToUse": "Don't put a free-text grade in evidenceLevel — that breaks consumer parsing. For the source of evidence (RCT, consensus), use evidenceOrigin.",
    "commonCombos": [
      "schema:MedicalGuideline"
    ]
  },
  "schema:evidenceOrigin": {
    "id": "schema:evidenceOrigin",
    "whenToUse": "Use evidenceOrigin on a MedicalGuideline to describe the methodology behind the evidence — randomized controlled trial, meta-analysis, expert consensus, observational cohort. Pair with evidenceLevel so consumers see both source and strength.",
    "whenNotToUse": "Don't use evidenceOrigin for the publication or guideline body — that's citation on the parent entity. For the date the guideline was issued, use guidelineDate.",
    "commonCombos": [
      "schema:MedicalGuideline"
    ]
  },
  "schema:exerciseRelatedDiet": {
    "id": "schema:exerciseRelatedDiet",
    "whenToUse": "Use exerciseRelatedDiet on an ExerciseAction when the activity instance pairs with a specific eating pattern — pre-workout fueling, post-event recovery nutrition. The value is a Diet reference, distinct from the action's instrument-level diet.",
    "whenNotToUse": "Don't use exerciseRelatedDiet on an ExercisePlan for the recommended ongoing nutrition pairing — model that as a separate Diet linked from the broader regimen. For a single meal, use Recipe.",
    "commonCombos": [
      "schema:ExerciseAction"
    ]
  },
  "schema:exerciseType": {
    "id": "schema:exerciseType",
    "whenToUse": "Use exerciseType on an ExercisePlan or ExerciseAction to label the modality — strength training, aerobic, flexibility, balance, HIIT. The value is Text; repeat the property if a session blends modalities rather than concatenating into one label.",
    "whenNotToUse": "Don't use exerciseType to record duration or intensity — use activityDuration or intensity. For the equipment used, use exercisePlan or related instrument properties.",
    "commonCombos": [
      "schema:ExercisePlan",
      "schema:ExerciseAction"
    ]
  },
  "schema:expectedPrognosis": {
    "id": "schema:expectedPrognosis",
    "whenToUse": "Use expectedPrognosis on a MedicalCondition to summarize the anticipated clinical course — recovery timeline, expected residual deficits, survival outlook. Keep the Text value clinical and time-bounded; consumers and assistants ground 'what to expect' answers on this field.",
    "whenNotToUse": "Don't use expectedPrognosis for the condition's natural history without intervention — use naturalProgression. For specific outcome measures from a trial, use outcome on a MedicalStudy.",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:expertConsiderations": {
    "id": "schema:expertConsiderations",
    "whenToUse": "Use expertConsiderations on a Diet to capture clinician guardrails — populations who should consult before adopting, monitoring needs, contraindications. The value is Text; repeat for distinct considerations rather than packing everything into one paragraph.",
    "whenNotToUse": "Don't use expertConsiderations for the food-group rules of the plan — use dietFeatures. For a Drug's clinical advisories, use warning or contraindication.",
    "commonCombos": [
      "schema:Diet"
    ]
  },
  "schema:followup": {
    "id": "schema:followup",
    "whenToUse": "Use followup on a MedicalProcedure to describe post-procedure care expected of the patient or care team — wound checks, imaging intervals, return-visit timing. The Text should be specific enough that a patient knows what to schedule.",
    "whenNotToUse": "Don't use followup to describe the procedure itself — use howPerformed. For long-term surveillance protocols rather than immediate aftercare, model as a separate MedicalGuideline.",
    "commonCombos": [
      "schema:MedicalProcedure"
    ]
  },
  "schema:foodWarning": {
    "id": "schema:foodWarning",
    "whenToUse": "Use foodWarning on a Drug to flag food or beverage interactions a patient must avoid or time around the dose — grapefruit, dairy, alcohol, tyramine-rich foods. The Text should name the food and the action required.",
    "whenNotToUse": "Don't use foodWarning for drug-drug interactions — use interactingDrug. For pregnancy or pediatric warnings, use the dedicated DrugPregnancyCategory and audience properties.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:frequency": {
    "id": "schema:frequency",
    "whenToUse": "Use frequency on a DoseSchedule to record how often the dose is taken — 'twice daily', 'every 8 hours', 'weekly'. Keep the Text short and consistent across products so consumers can normalize to a count-per-day for downstream rendering.",
    "whenNotToUse": "Don't use frequency for the dose amount — that's doseValue. For the duration the regimen runs, model with the DoseSchedule's start and end dates rather than embedding into frequency.",
    "commonCombos": [
      "schema:DoseSchedule"
    ]
  },
  "schema:functionalClass": {
    "id": "schema:functionalClass",
    "whenToUse": "Use functionalClass on a Joint to describe the degree of mobility — synarthrosis, amphiarthrosis, diarthrosis. Either reference a MedicalEntity enumeration node or use Text; pick one convention and apply it across the joint catalog.",
    "whenNotToUse": "Don't use functionalClass to describe structural classification (fibrous, cartilaginous, synovial) — that's a separate axis. For range-of-motion measurements, model as observations on the structure.",
    "commonCombos": [
      "schema:Joint"
    ]
  },
  "schema:guideline": {
    "id": "schema:guideline",
    "whenToUse": "Attach to a MedicalEntity to link an associated MedicalGuideline (recommendation, contraindication, or similar). Use when the entity is governed by or referenced in a formally published guideline rather than a single study or claim.",
    "whenNotToUse": "Do not use for general citations or evidence-level metadata; use citation or evidenceOrigin for those, and study to attach a discrete trial or cohort.",
    "commonCombos": [
      "schema:MedicalEntity"
    ]
  },
  "schema:guidelineDate": {
    "id": "schema:guidelineDate",
    "whenToUse": "Use on a MedicalGuideline to record the date the recommendation was issued or last revised. Provide an ISO 8601 Date so consumers can assess currency relative to evolving evidence.",
    "whenNotToUse": "Do not use for the publication date of a containing article or webpage; use datePublished or dateModified on the document instead.",
    "commonCombos": [
      "schema:MedicalGuideline"
    ]
  },
  "schema:guidelineSubject": {
    "id": "schema:guidelineSubject",
    "whenToUse": "Use on a MedicalGuideline to point at the MedicalEntity (condition, treatment, test, drug) the recommendation addresses. One guideline may have multiple subjects when scope spans related entities.",
    "whenNotToUse": "Do not use for the population or audience the guideline targets; use recognizingAuthority for issuer and pair the guideline with healthCondition or relevantSpecialty on the affected entity.",
    "commonCombos": [
      "schema:MedicalGuideline"
    ]
  },
  "schema:healthCondition": {
    "id": "schema:healthCondition",
    "whenToUse": "Use to bind a MedicalCondition to the audience, study population, or patient it characterizes. Reference a coded MedicalCondition node rather than free text so downstream tools can reason about the condition.",
    "whenNotToUse": "Do not use on a MedicalEntity to describe what the entity treats; use indication or diagnosticOf for that direction of relationship.",
    "commonCombos": [
      "schema:PeopleAudience",
      "schema:MedicalStudy",
      "schema:Patient"
    ]
  },
  "schema:hospitalAffiliation": {
    "id": "schema:hospitalAffiliation",
    "whenToUse": "Use on a Physician to declare admitting or staff privileges at a Hospital. Repeat the property when the clinician holds privileges across multiple facilities.",
    "whenNotToUse": "Do not use for a clinic where the physician practices outpatient care; use worksFor or memberOf for employment and group membership.",
    "commonCombos": [
      "schema:Physician"
    ]
  },
  "schema:howPerformed": {
    "id": "schema:howPerformed",
    "whenToUse": "Use on a MedicalProcedure to describe the technique, approach, or steps performed. Keep the text patient- or clinician-readable depending on the document audience and avoid embedding dosing or device specs that belong on dedicated properties.",
    "whenNotToUse": "Do not use for preparation steps before the procedure (use preparation) or expected post-procedure care (use followup).",
    "commonCombos": [
      "schema:MedicalProcedure"
    ]
  },
  "schema:identifyingExam": {
    "id": "schema:identifyingExam",
    "whenToUse": "Use on a MedicalSign to link the PhysicalExam maneuver that elicits or detects the sign. Reference a discrete PhysicalExam node so the maneuver itself can carry its own description and sources.",
    "whenNotToUse": "Do not use for laboratory or imaging workups; use identifyingTest with a MedicalTest subtype.",
    "commonCombos": [
      "schema:MedicalSign"
    ]
  },
  "schema:identifyingTest": {
    "id": "schema:identifyingTest",
    "whenToUse": "Use on a MedicalSign to link the MedicalTest (lab, imaging, pathology) used to confirm the sign. Repeat for each test that meaningfully establishes the finding.",
    "whenNotToUse": "Do not use for bedside maneuvers; use identifyingExam. Do not use to express test results or thresholds, which belong on the test or its result.",
    "commonCombos": [
      "schema:MedicalSign"
    ]
  },
  "schema:imagingTechnique": {
    "id": "schema:imagingTechnique",
    "whenToUse": "Use on an ImagingTest to declare the modality (MRI, CT, ultrasound, etc.) via the MedicalImagingTechnique enumeration. Pick the most specific enumerated value the modality supports.",
    "whenNotToUse": "Do not use for the body region imaged or contrast protocol; use bodyLocation and a procedure description instead.",
    "commonCombos": [
      "schema:ImagingTest"
    ]
  },
  "schema:includedRiskFactor": {
    "id": "schema:includedRiskFactor",
    "whenToUse": "Use on a MedicalRiskEstimator (score, calculator, model) to enumerate each MedicalRiskFactor it ingests. Repeat for every input variable so consumers can match patient data to the estimator's requirements.",
    "whenNotToUse": "Do not use for the outcome the estimator predicts; use estimatesRiskOf for the predicted condition or event.",
    "commonCombos": [
      "schema:MedicalRiskEstimator"
    ]
  },
  "schema:increasesRiskOf": {
    "id": "schema:increasesRiskOf",
    "whenToUse": "Use on a MedicalRiskFactor to point to the MedicalEntity (condition, complication, event) whose risk the factor raises. Reference a coded condition node rather than free text so the relationship is machine-resolvable.",
    "whenNotToUse": "Do not use to express protective effects or unrelated associations; model those on the condition with separate cause or contraindication relationships.",
    "commonCombos": [
      "schema:MedicalRiskFactor"
    ]
  },
  "schema:infectiousAgent": {
    "id": "schema:infectiousAgent",
    "whenToUse": "Use on an InfectiousDisease to name the specific organism (e.g., Mycobacterium tuberculosis, SARS-CoV-2). Provide the formal binomial or recognized strain identifier as text.",
    "whenNotToUse": "Do not use for the broad organism class; use infectiousAgentClass for the bacteria/virus/prion category.",
    "commonCombos": [
      "schema:InfectiousDisease"
    ]
  },
  "schema:infectiousAgentClass": {
    "id": "schema:infectiousAgentClass",
    "whenToUse": "Use infectiousAgentClass on an InfectiousDisease to declare the pathogen category — viral, bacterial, fungal, parasitic, prion, or protozoan. Pair with infectiousAgent to name the specific organism (e.g., influenza A virus, MRSA).",
    "whenNotToUse": "Don't use infectiousAgentClass on conditions that aren't transmissible infections — autoimmune, metabolic, or genetic conditions belong on MedicalCondition without this property. Don't repeat the class as a free-text description; the InfectiousAgentClass enumeration values are the canonical machine-readable label.",
    "commonCombos": [
      "schema:InfectiousDisease"
    ]
  },
  "schema:insertion": {
    "id": "schema:insertion",
    "whenToUse": "Use on a Muscle to identify the AnatomicalStructure where its distal tendon attaches (the moving point). Reference a coded anatomical node so the relationship is traversable from either end.",
    "whenNotToUse": "Do not use for the fixed proximal attachment; use the corresponding origin-style relationship on the muscle. Do not use for innervation or vascular supply.",
    "commonCombos": [
      "schema:Muscle"
    ]
  },
  "schema:intensity": {
    "id": "schema:intensity",
    "whenToUse": "Use on an ExercisePlan to express training load as a QuantitativeValue (e.g., METs, %VO2max, RPE) or descriptive text when no numeric metric applies. Prefer QuantitativeValue with explicit unit so the plan is comparable across programs.",
    "whenNotToUse": "Do not use for duration, frequency, or repetitions; those have dedicated properties on ExercisePlan.",
    "commonCombos": [
      "schema:ExercisePlan"
    ]
  },
  "schema:interactingDrug": {
    "id": "schema:interactingDrug",
    "whenToUse": "Use on a Drug to reference another Drug with a clinically relevant interaction. Repeat the property for each interacting agent and rely on coded Drug nodes so interaction graphs can be queried.",
    "whenNotToUse": "Do not use for food, supplement, or condition interactions; model those with appropriate properties or narrative on contraindication.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:isAvailableGenerically": {
    "id": "schema:isAvailableGenerically",
    "whenToUse": "Use on a Drug as a Boolean stating whether any generic equivalent exists, independent of the current entity's brand status. Set true even when the page describes the brand, as long as a generic form is on market.",
    "whenNotToUse": "Do not use to indicate whether this specific entity is the generic version; use isProprietary for that distinction.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:isProprietary": {
    "id": "schema:isProprietary",
    "whenToUse": "Use on a Drug or DietarySupplement as a Boolean: true when the name on this entity is a brand or trade name, false when it is the generic or non-proprietary name. Pair with nonProprietaryName to make both names discoverable.",
    "whenNotToUse": "Do not use to express market exclusivity or patent status; those belong on legalStatus or separate regulatory metadata.",
    "commonCombos": [
      "schema:DietarySupplement",
      "schema:Drug"
    ]
  },
  "schema:labelDetails": {
    "id": "schema:labelDetails",
    "whenToUse": "Use on a Drug to point at the canonical prescribing information or product label as a URL. Prefer the regulator-hosted document (FDA DailyMed, EMA SmPC) over secondary republications.",
    "whenNotToUse": "Do not use for marketing pages or general drug monographs; use sameAs or url for those.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:legalStatus": {
    "id": "schema:legalStatus",
    "whenToUse": "Use on a Drug, DietarySupplement, or other MedicalEntity to declare regulatory status: a DrugLegalStatus node, a MedicalEnumeration value (e.g., Rx, OTC), or text when neither fits. Prefer the structured DrugLegalStatus when scheduling or jurisdiction matters.",
    "whenNotToUse": "Do not use for approval indications or therapeutic class; use clinicalPharmacology or category-specific properties.",
    "commonCombos": [
      "schema:DietarySupplement",
      "schema:MedicalEntity",
      "schema:Drug"
    ]
  },
  "schema:maximumIntake": {
    "id": "schema:maximumIntake",
    "whenToUse": "Use on a Drug, DrugStrength, or Substance to record the upper safe intake as a MaximumDoseSchedule, including the target population, frequency, and unit. Repeat per population when limits differ by age, weight, or condition.",
    "whenNotToUse": "Do not use for therapeutic dose ranges; use doseSchedule or recommendedIntake for normal dosing guidance.",
    "commonCombos": [
      "schema:DrugStrength",
      "schema:Drug",
      "schema:Substance"
    ]
  },
  "schema:mechanismOfAction": {
    "id": "schema:mechanismOfAction",
    "whenToUse": "Use on a Drug or DietarySupplement to describe the molecular or physiological pathway the agent acts through. Keep the text concise and focused on the proximate mechanism rather than downstream clinical effects.",
    "whenNotToUse": "Do not use for therapeutic indications or pharmacokinetics; use indication or clinicalPharmacology respectively.",
    "commonCombos": [
      "schema:Drug",
      "schema:DietarySupplement"
    ]
  },
  "schema:muscleAction": {
    "id": "schema:muscleAction",
    "whenToUse": "Use on a Muscle to describe the joint movement produced (flexion, extension, rotation, etc.). Keep the text precise and anatomically grounded so it can support clinical or educational rendering.",
    "whenNotToUse": "Do not use for innervation or attachment points; use insertion and the nerve relationship for those.",
    "commonCombos": [
      "schema:Muscle"
    ]
  },
  "schema:naturalProgression": {
    "id": "schema:naturalProgression",
    "whenToUse": "Use to describe the untreated trajectory of a condition, including expected stages, complications, and outcomes absent intervention. Helpful for prognostic content and patient-facing decision aids.",
    "whenNotToUse": "Do not use for treated outcomes or therapy efficacy; use possibleTreatment or expectedPrognosis instead.",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:nerveMotor": {
    "id": "schema:nerveMotor",
    "whenToUse": "Use on a Nerve to enumerate the muscles it controls, building the motor side of the innervation graph. Pair with Muscle.nerve so motor lookups resolve from either direction.",
    "whenNotToUse": "Do not use for sensory dermatomes or autonomic targets — those belong on different relations.",
    "commonCombos": [
      "schema:Nerve"
    ]
  },
  "schema:nonProprietaryName": {
    "id": "schema:nonProprietaryName",
    "whenToUse": "Use to record the generic (USAN/INN) name of a Drug or DietarySupplement so consumers and assistants can map brand names to the underlying active ingredient. Essential for disambiguation across formularies and search.",
    "whenNotToUse": "Do not use for brand or trade names — use proprietaryName or alternateName for those.",
    "commonCombos": [
      "schema:Drug",
      "schema:DietarySupplement"
    ]
  },
  "schema:normalRange": {
    "id": "schema:normalRange",
    "whenToUse": "Use on a MedicalTest to express the reference interval for a healthy adult population, with units and any qualifiers needed to interpret a result. Pair with signDetected for abnormal-result interpretation guidance.",
    "whenNotToUse": "Do not use for population-specific cutoffs that vary by age or sex without also documenting that context — split into multiple values or use MedicalEnumeration.",
    "commonCombos": [
      "schema:MedicalTest"
    ]
  },
  "schema:originatesFrom": {
    "id": "schema:originatesFrom",
    "whenToUse": "Use on a LymphaticVessel to point to the upstream Vessel it drains from (its afferent source). Forms the inflow side of the lymphatic graph; pair with runsTo for the outflow.",
    "whenNotToUse": "Do not use for arterial or venous origin on non-lymphatic vessels — those belong on Artery or Vein with their own anatomical relations.",
    "commonCombos": [
      "schema:LymphaticVessel"
    ]
  },
  "schema:overdosage": {
    "id": "schema:overdosage",
    "whenToUse": "Use on a Drug to describe signs, symptoms, and management of overdose, including supportive care and antidote where applicable. Critical for HCP prescribing pages and poison-control reference content.",
    "whenNotToUse": "Do not use for routine adverse effects at therapeutic doses — those belong on adverseOutcome or seriousAdverseOutcome.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:partOfSystem": {
    "id": "schema:partOfSystem",
    "whenToUse": "Use on an AnatomicalStructure to declare the AnatomicalSystem it belongs to (e.g. heart partOfSystem cardiovascular). Anchors the structure inside the system-level graph for navigation and entity resolution.",
    "whenNotToUse": "Do not use for parent structures that are not full systems — use isPartOf or subStructure for nested anatomy.",
    "commonCombos": [
      "schema:AnatomicalStructure"
    ]
  },
  "schema:pathophysiology": {
    "id": "schema:pathophysiology",
    "whenToUse": "Use on a MedicalCondition or PhysicalActivity to describe the mechanistic chain of biochemical, cellular, and physiologic changes that produce the disease state or activity effect. Best for HCP-facing reference content where mechanism matters.",
    "whenNotToUse": "Do not use for clinical signs and symptoms (use signOrSymptom) or for what causes the condition (use cause).",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:PhysicalActivity"
    ]
  },
  "schema:physiologicalBenefits": {
    "id": "schema:physiologicalBenefits",
    "whenToUse": "Use on a Diet to summarize the physiologic outcomes the plan is designed to support — cardiovascular markers, glycemic control, weight management. Helpful for matching diets to clinical or wellness goals.",
    "whenNotToUse": "Do not use for unsupported marketing claims, and do not duplicate ingredient lists or meal structure here.",
    "commonCombos": [
      "schema:Diet"
    ]
  },
  "schema:possibleComplication": {
    "id": "schema:possibleComplication",
    "whenToUse": "Use on a MedicalCondition to flag unfavorable downstream events that can develop from the primary condition (e.g. diabetic retinopathy as a complication of diabetes). Supports patient-education risk framing and HCP differential thinking.",
    "whenNotToUse": "Do not use for the original symptoms of the condition itself — those belong on signOrSymptom.",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:possibleTreatment": {
    "id": "schema:possibleTreatment",
    "whenToUse": "Use on a MedicalCondition or MedicalSignOrSymptom to point at therapies, drugs, drug classes, or lifestyle modifications used to manage it. The cleanest way to wire condition pages to their therapy options for entity-graph and assistant lookups.",
    "whenNotToUse": "Do not use for preventative interventions before disease onset — use primaryPrevention. Do not list contraindicated treatments here.",
    "commonCombos": [
      "schema:MedicalCondition",
      "schema:MedicalSignOrSymptom"
    ]
  },
  "schema:postOp": {
    "id": "schema:postOp",
    "whenToUse": "Use on a MedicalDevice to describe postoperative care after implantation or use — recovery timeline, follow-up imaging, activity restrictions. Pair with preOp to give a full periprocedural picture.",
    "whenNotToUse": "Do not use for general procedural recovery unrelated to a specific device — that belongs on the relevant MedicalProcedure or aftercare property.",
    "commonCombos": [
      "schema:MedicalDevice"
    ]
  },
  "schema:preOp": {
    "id": "schema:preOp",
    "whenToUse": "Use on a MedicalDevice to describe preoperative workup, eligibility testing, anticoagulation holds, and patient prep required before implantation or use. Pair with postOp for the matched recovery picture.",
    "whenNotToUse": "Do not use for routine patient prep unrelated to a specific device — use preparation on the relevant MedicalProcedure.",
    "commonCombos": [
      "schema:MedicalDevice"
    ]
  },
  "schema:pregnancyCategory": {
    "id": "schema:pregnancyCategory",
    "whenToUse": "Use on a Drug to set the regulatory pregnancy category (e.g. former FDA letters A-X or current narrative classification). Important for prescribing pages and safety filtering in clinical tools.",
    "whenNotToUse": "Do not use for narrative pregnancy guidance or warnings — use pregnancyWarning for prose. Do not use on non-Drug entities.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:pregnancyWarning": {
    "id": "schema:pregnancyWarning",
    "whenToUse": "Use on a Drug to express prose-level cautions, contraindications, or trimester-specific guidance for use in pregnancy. Pair with pregnancyCategory for the regulatory classification.",
    "whenNotToUse": "Do not use for lactation guidance — that belongs on a separate breastfeeding warning property if available, or in narrative content.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:preparation": {
    "id": "schema:preparation",
    "whenToUse": "Use on a MedicalProcedure to describe what the patient must do before the procedure — fasting, medication holds, bowel prep, transport plans. Drives patient-education and pre-visit instruction pages.",
    "whenNotToUse": "Do not use for clinician-side procedural setup or for device-specific workup; use preOp on a MedicalDevice for the latter.",
    "commonCombos": [
      "schema:MedicalProcedure"
    ]
  },
  "schema:prescribingInfo": {
    "id": "schema:prescribingInfo",
    "whenToUse": "Use on a Drug to link to the official prescribing information document (USPI, SmPC, monograph). Lets HCPs and assistants jump from the entity to the regulatory source of truth.",
    "whenNotToUse": "Do not use for marketing pages or non-regulatory summaries — use sameAs or url for those instead.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:prescriptionStatus": {
    "id": "schema:prescriptionStatus",
    "whenToUse": "Use on a Drug to flag whether it is OTC, prescription-only, or scheduled, using DrugPrescriptionStatus values where possible. Critical for formulary, e-commerce, and consumer-safety filtering.",
    "whenNotToUse": "Do not use for legal-status nuances like FDA approval phase — use legalStatus or DrugLegalStatus for that.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:primaryPrevention": {
    "id": "schema:primaryPrevention",
    "whenToUse": "Use on a MedicalCondition to point at therapies, vaccines, or behaviors used to stop the condition from occurring in a never-affected population. Pair with secondaryPrevention for relapse-prevention guidance.",
    "whenNotToUse": "Do not use for treatment of established disease (use possibleTreatment) or for screening (use identifyingTest).",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:procedure": {
    "id": "schema:procedure",
    "whenToUse": "Use on a MedicalDevice to describe how the device is set up, used, or installed in narrative form. Useful for IFU-derived patient or HCP guidance pages.",
    "whenNotToUse": "Do not use for the surgical procedure itself — model that as a MedicalProcedure entity. Do not duplicate preOp or postOp content here.",
    "commonCombos": [
      "schema:MedicalDevice"
    ]
  },
  "schema:procedureType": {
    "id": "schema:procedureType",
    "whenToUse": "Use on a MedicalProcedure to classify it as Surgical, Noninvasive, Percutaneous, Diagnostic, or Therapeutic via MedicalProcedureType. Drives faceting in service-line directories and procedure-finder UIs.",
    "whenNotToUse": "Do not use for the body part involved (use bodyLocation) or for the indication (use indication).",
    "commonCombos": [
      "schema:MedicalProcedure"
    ]
  },
  "schema:proprietaryName": {
    "id": "schema:proprietaryName",
    "whenToUse": "Use on a Drug or DietarySupplement to record the brand or trade name given by the originator. Pair with nonProprietaryName so search and assistants can resolve brand-to-generic mappings cleanly.",
    "whenNotToUse": "Do not use for the generic name (use nonProprietaryName) or for arbitrary marketing slogans.",
    "commonCombos": [
      "schema:Drug",
      "schema:DietarySupplement"
    ]
  },
  "schema:publicationType": {
    "id": "schema:publicationType",
    "whenToUse": "Use on a MedicalScholarlyArticle to declare the NLM MeSH publication type — Review, Meta-Analysis, Randomized Controlled Trial, Case Reports. Lets evidence pyramids and citation tools sort articles by study design.",
    "whenNotToUse": "Do not use for the topic of the article (use about) or for the journal it appears in (use isPartOf).",
    "commonCombos": [
      "schema:MedicalScholarlyArticle"
    ]
  },
  "schema:recognizingAuthority": {
    "id": "schema:recognizingAuthority",
    "whenToUse": "Use on a MedicalEntity to point to the regulatory or accrediting body that recognizes the entity (FDA, EMA, Joint Commission). Adds verifiable provenance for drugs, devices, and care organizations.",
    "whenNotToUse": "Do not use for publishers of guidelines (use publisher on the guideline) or for hospital ownership relationships.",
    "commonCombos": [
      "schema:MedicalEntity"
    ]
  },
  "schema:recommendationStrength": {
    "id": "schema:recommendationStrength",
    "whenToUse": "Use on a MedicalGuidelineRecommendation to express the strength tier (Class I, IIa, IIb, III; or Strong/Conditional). Lets readers and assistants weigh recommendations consistently across guideline bodies.",
    "whenNotToUse": "Do not use for evidence quality — that belongs on evidenceLevel via MedicalEvidenceLevel.",
    "commonCombos": [
      "schema:MedicalGuidelineRecommendation"
    ]
  },
  "schema:recommendedIntake": {
    "id": "schema:recommendedIntake",
    "whenToUse": "Use on a DietarySupplement to express the recommended daily or per-occasion intake for a defined population using RecommendedDoseSchedule. Useful for nutrition labels, clinical-supplement pages, and consumer-product detail.",
    "whenNotToUse": "Do not use for prescription-drug dosing — that belongs on doseSchedule with the appropriate Drug-side schedule type.",
    "commonCombos": [
      "schema:DietarySupplement"
    ]
  },
  "schema:regionDrained": {
    "id": "schema:regionDrained",
    "whenToUse": "Use on a Vein or LymphaticVessel to identify the body region or system whose fluid it carries away. Anchors venous and lymphatic anatomy to functional drainage territories.",
    "whenNotToUse": "Do not use for arterial supply — those vessels feed regions and use a different relation. Do not use for upstream vessel sources (use originatesFrom on lymphatics).",
    "commonCombos": [
      "schema:Vein",
      "schema:LymphaticVessel"
    ]
  },
  "schema:relatedAnatomy": {
    "id": "schema:relatedAnatomy",
    "whenToUse": "Use on a SuperficialAnatomy entry to link to the deeper systems or structures it overlies or relates to. Helps tie surface-anatomy reference content to the underlying anatomy it represents.",
    "whenNotToUse": "Do not use on AnatomicalStructure or AnatomicalSystem entries — they have their own associatedAnatomy and partOfSystem relations.",
    "commonCombos": [
      "schema:SuperficialAnatomy"
    ]
  },
  "schema:relatedCondition": {
    "id": "schema:relatedCondition",
    "whenToUse": "Use on an AnatomicalSystem, SuperficialAnatomy, or AnatomicalStructure to link to MedicalCondition entries that affect that anatomy. Makes anatomy pages discoverable from disease pages and vice versa.",
    "whenNotToUse": "Do not use to point at therapies or procedures — use relatedTherapy for therapy crosslinks.",
    "commonCombos": [
      "schema:AnatomicalSystem",
      "schema:SuperficialAnatomy",
      "schema:AnatomicalStructure"
    ]
  },
  "schema:relatedDrug": {
    "id": "schema:relatedDrug",
    "whenToUse": "Use on a Drug to link to alternates, same-class drugs, or commonly co-prescribed drugs. Powers cross-sells, switch-therapy guidance, and assistant follow-up suggestions.",
    "whenNotToUse": "Do not use for known interactions (use interactingDrug) or for the parent drug class (use drugClass).",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:relatedStructure": {
    "id": "schema:relatedStructure",
    "whenToUse": "Use on an AnatomicalSystem to point at structures that work with the system but are not formally part of it. Useful for capturing functional adjacency without distorting partOf graphs.",
    "whenNotToUse": "Do not use for components that are part of the system — use comprisedOf or its inverse partOfSystem.",
    "commonCombos": [
      "schema:AnatomicalSystem"
    ]
  },
  "schema:relatedTherapy": {
    "id": "schema:relatedTherapy",
    "whenToUse": "Use on a SuperficialAnatomy, AnatomicalStructure, or AnatomicalSystem to link to MedicalTherapy entries focused on that anatomy. Connects anatomy reference pages to relevant treatment hubs.",
    "whenNotToUse": "Do not use on a MedicalCondition page — use possibleTreatment to express therapy relationships there.",
    "commonCombos": [
      "schema:SuperficialAnatomy",
      "schema:AnatomicalStructure",
      "schema:AnatomicalSystem"
    ]
  },
  "schema:relevantSpecialty": {
    "id": "schema:relevantSpecialty",
    "whenToUse": "Use on any MedicalEntity to flag the MedicalSpecialty that owns or most-often handles it (e.g. cardiology for atrial fibrillation). Drives faceting in find-a-doctor, content hubs, and assistant routing.",
    "whenNotToUse": "Do not use for hospital departments or service lines — those belong on the Hospital or MedicalOrganization side as departments.",
    "commonCombos": [
      "schema:MedicalEntity"
    ]
  },
  "schema:repetitions": {
    "id": "schema:repetitions",
    "whenToUse": "Use on an ExercisePlan to express how many times an exercise is repeated per set, as a Number or QuantitativeValue. Pair with restPeriods and activityFrequency to fully describe the prescription.",
    "whenNotToUse": "Do not use for total session count over a program (that's a higher-level frequency) or for time-under-tension prescriptions where duration is the variable.",
    "commonCombos": [
      "schema:ExercisePlan"
    ]
  },
  "schema:restPeriods": {
    "id": "schema:restPeriods",
    "whenToUse": "Use on an ExercisePlan to specify rest between sets or sessions, as a QuantitativeValue or short text. Important for hypertrophy, strength, and HIIT plans where rest interval is part of the dose.",
    "whenNotToUse": "Do not use for overall recovery days between training sessions — express that with activityFrequency.",
    "commonCombos": [
      "schema:ExercisePlan"
    ]
  },
  "schema:riskFactor": {
    "id": "schema:riskFactor",
    "whenToUse": "Use on a MedicalCondition to enumerate modifiable and non-modifiable factors that raise risk (smoking, family history, obesity). Anchors prevention-focused content and risk-calculator pages.",
    "whenNotToUse": "Do not use for direct causes (use cause) or for downstream complications (use possibleComplication).",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:risks": {
    "id": "schema:risks",
    "whenToUse": "Use on a Diet to summarize physiologic risks the plan may carry (electrolyte derangement on very-low-carb, nutrient gaps on restrictive elimination diets). Balances physiologicalBenefits for honest decision-aid content.",
    "whenNotToUse": "Do not use for adverse reactions to a single food allergen and do not use on Drug or DietarySupplement entries.",
    "commonCombos": [
      "schema:Diet"
    ]
  },
  "schema:runsTo": {
    "id": "schema:runsTo",
    "whenToUse": "Use on a LymphaticVessel to point at the downstream Vessel it drains into (its efferent destination). Pair with originatesFrom to make the lymphatic graph traversable in both directions.",
    "whenNotToUse": "Do not use for arterial branching or for venous tributary relationships — those use vessel-specific anatomical relations.",
    "commonCombos": [
      "schema:LymphaticVessel"
    ]
  },
  "schema:safetyConsideration": {
    "id": "schema:safetyConsideration",
    "whenToUse": "Use safetyConsideration on DietarySupplement to surface interaction risks, contraindicated populations, or known toxicity thresholds for the product. Keep each consideration to a single concern; repeat the property for multiple distinct warnings.",
    "whenNotToUse": "Don't use this for marketing disclaimers or generic 'consult your physician' boilerplate — surface those in description. Drug-specific FDA black-box content belongs on Drug.warning instead.",
    "commonCombos": [
      "schema:DietarySupplement"
    ]
  },
  "schema:secondaryPrevention": {
    "id": "schema:secondaryPrevention",
    "whenToUse": "Use secondaryPrevention on MedicalCondition to capture therapies, drug classes, or lifestyle modifications used to prevent recurrence after an initial episode has been treated. Distinct from primaryPrevention, which targets first-onset prevention in at-risk populations.",
    "whenNotToUse": "Don't use this for ongoing maintenance therapy of an active condition — that's a treatment, not prevention. Population-level screening programs belong on the test or guideline, not here.",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:sensoryUnit": {
    "id": "schema:sensoryUnit",
    "whenToUse": "Use sensoryUnit on Nerve to name the peripheral structure or anatomical region whose afferent signals the nerve carries to the central nervous system. Pair with sourcedFrom to describe the full afferent pathway from receptor to CNS origin.",
    "whenNotToUse": "Don't use this for purely motor nerves — leave sensoryUnit unset and document innervation via the appropriate efferent properties. Avoid repurposing it for autonomic targets.",
    "commonCombos": [
      "schema:Nerve"
    ]
  },
  "schema:seriousAdverseOutcome": {
    "id": "schema:seriousAdverseOutcome",
    "whenToUse": "Use seriousAdverseOutcome on MedicalTherapy or MedicalDevice to flag complications that are life-threatening, require hospitalization, cause persistent disability, or are otherwise FDA-reportable. Each outcome should be a separate MedicalEntity reference so it can carry its own description and codes.",
    "whenNotToUse": "Don't use this for mild or transient side effects — those belong in adverseOutcome. Avoid bundling multiple complications into a single freeform string.",
    "commonCombos": [
      "schema:MedicalTherapy",
      "schema:MedicalDevice"
    ]
  },
  "schema:signDetected": {
    "id": "schema:signDetected",
    "whenToUse": "Use signDetected on MedicalTest to enumerate the objective findings the test can identify — e.g., a murmur on auscultation or a mass on imaging. Pair with usedToDiagnose when the same sign points to a specific condition.",
    "whenNotToUse": "Don't use this for patient-reported symptoms — those aren't signs in the clinical sense and don't belong here. Avoid listing every theoretical finding; restrict to those the test reliably detects.",
    "commonCombos": [
      "schema:MedicalTest"
    ]
  },
  "schema:signOrSymptom": {
    "id": "schema:signOrSymptom",
    "whenToUse": "Use signOrSymptom on MedicalCondition to list the observable signs and patient-reported symptoms that present with the condition. Each entry should be a MedicalSignOrSymptom reference so SNOMED or ICD codes can attach via its own properties.",
    "whenNotToUse": "Don't use this for diagnostic test results — those belong on the test via signDetected. Avoid combining multiple findings into one freeform string.",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:significance": {
    "id": "schema:significance",
    "whenToUse": "Use significance on SuperficialAnatomy to explain the clinical or diagnostic relevance of the surface feature — for example, what changes in appearance signal underlying pathology. Keep the value concise and clinically focused.",
    "whenNotToUse": "Don't use this as a general description field for the structure itself — that belongs in description. Avoid restating anatomical location, which goes in relatedAnatomy.",
    "commonCombos": [
      "schema:SuperficialAnatomy"
    ]
  },
  "schema:sourcedFrom": {
    "id": "schema:sourcedFrom",
    "whenToUse": "Use sourcedFrom on Nerve to identify the brain or spinal cord nucleus where the nerve's neurons originate. Pair with sensoryUnit or innervation targets to describe the complete neurological pathway.",
    "whenNotToUse": "Don't use this for peripheral branching points — those are documented through anatomical relationships, not origin. Avoid using it for spinal segment level alone; use a BrainStructure or named nucleus reference.",
    "commonCombos": [
      "schema:Nerve"
    ]
  },
  "schema:stage": {
    "id": "schema:stage",
    "whenToUse": "Use stage on MedicalCondition to attach a MedicalConditionStage node carrying the staging system, numeric stage, and any substage suffix. Keep the staging system explicit (TNM, FIGO, Ann Arbor) on the stage node itself.",
    "whenNotToUse": "Don't use this for severity grading scales like NYHA or GOLD — those are functional classifications, not anatomic stages, and belong in description or a custom extension. Avoid free-text stage values inline; always reference a MedicalConditionStage.",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:stageAsNumber": {
    "id": "schema:stageAsNumber",
    "whenToUse": "Use stageAsNumber on MedicalConditionStage to record the numeric stage value — 1, 2, 3, 4 — independent of any substage letter. Keep the value as a plain Number so it sorts and filters correctly.",
    "whenNotToUse": "Don't encode Roman numerals or substage letters here; use subStageSuffix for letters like 'a' or 'b'. Avoid using it for non-numeric staging schemes.",
    "commonCombos": [
      "schema:MedicalConditionStage"
    ]
  },
  "schema:status": {
    "id": "schema:status",
    "whenToUse": "Use status to flag the operational state of a MedicalStudy (recruiting, completed), a MedicalCondition (active, in remission), or a MedicalProcedure (scheduled, performed). Prefer an enumerated value from EventStatusType or MedicalStudyStatus over freeform Text when one fits.",
    "whenNotToUse": "Don't use this to describe disease severity or trial phase — those have dedicated properties. Avoid mixing study and condition statuses on the same node.",
    "commonCombos": [
      "schema:MedicalStudy",
      "schema:MedicalCondition",
      "schema:MedicalProcedure"
    ]
  },
  "schema:strengthUnit": {
    "id": "schema:strengthUnit",
    "whenToUse": "Use strengthUnit on DrugStrength to record the unit of measure — 'mg', 'mcg', 'IU', 'mg/mL' — that pairs with strengthValue. Keep it consistent with regulatory labeling so dose comparisons remain unambiguous.",
    "whenNotToUse": "Don't combine value and unit into a single Text field; the two properties are split intentionally for machine readability. Avoid abbreviating in ways that drift from FDA label conventions.",
    "commonCombos": [
      "schema:DrugStrength"
    ]
  },
  "schema:strengthValue": {
    "id": "schema:strengthValue",
    "whenToUse": "Use strengthValue on DrugStrength to record the numeric quantity of the active ingredient per unit dose, paired with strengthUnit. Use the exact value from the approved label so it can be matched against formulary databases.",
    "whenNotToUse": "Don't include the unit string here; that goes in strengthUnit. Avoid using this for total package contents — it describes the strength per dose unit.",
    "commonCombos": [
      "schema:DrugStrength"
    ]
  },
  "schema:structuralClass": {
    "id": "schema:structuralClass",
    "whenToUse": "Use structuralClass on Joint to capture the structural classification — fibrous, cartilaginous, or synovial — that describes how the bones connect. Pair with functionalClass when also documenting movement type.",
    "whenNotToUse": "Don't conflate this with functional joint classifications like synarthrosis or diarthrosis; those describe motion, not structure. Avoid arbitrary descriptive text; stick to recognized anatomical classes.",
    "commonCombos": [
      "schema:Joint"
    ]
  },
  "schema:study": {
    "id": "schema:study",
    "whenToUse": "Use study on any MedicalEntity to link to a MedicalStudy or MedicalTrial that investigated it — useful for connecting a drug, device, or condition to its evidence base. Each linked study should carry its own status, design, and outcome data on its own node.",
    "whenNotToUse": "Don't use this to embed a literature citation or single publication — those belong on citation or via ScholarlyArticle. Avoid linking studies that merely mention the entity in passing.",
    "commonCombos": [
      "schema:MedicalEntity"
    ]
  },
  "schema:studyDesign": {
    "id": "schema:studyDesign",
    "whenToUse": "Use studyDesign on MedicalObservationalStudy to specify the design pattern — cohort, case-control, cross-sectional, registry — using the MedicalObservationalStudyDesign enumeration. This is how downstream consumers know whether causal claims are appropriate.",
    "whenNotToUse": "Don't use this for interventional trials; those use trialDesign on MedicalTrial. Avoid freeform descriptions when an enumerated value applies.",
    "commonCombos": [
      "schema:MedicalObservationalStudy"
    ]
  },
  "schema:studyLocation": {
    "id": "schema:studyLocation",
    "whenToUse": "Use studyLocation on MedicalStudy to point at the AdministrativeArea — country, state, or city — where the study was conducted. Multi-site studies should repeat the property once per site rather than listing locations in a single string.",
    "whenNotToUse": "Don't use this for the sponsor's headquarters or coordinating center if those differ from where data was collected. Avoid Place or specific address values; the range is AdministrativeArea.",
    "commonCombos": [
      "schema:MedicalStudy"
    ]
  },
  "schema:studySubject": {
    "id": "schema:studySubject",
    "whenToUse": "Use studySubject on MedicalStudy to name the entity under investigation — a drug, device, condition, or procedure. Repeat the property when a study evaluates multiple subjects, such as a drug-versus-drug comparison.",
    "whenNotToUse": "Don't use this for the study population; population characteristics belong elsewhere on the trial design. Avoid using it for outcomes or endpoints.",
    "commonCombos": [
      "schema:MedicalStudy"
    ]
  },
  "schema:subStageSuffix": {
    "id": "schema:subStageSuffix",
    "whenToUse": "Use subStageSuffix on MedicalConditionStage to record the letter qualifier — 'a', 'b', 'c' — that refines the numeric stage. Combined with stageAsNumber it produces a complete designation like 'IIIa'.",
    "whenNotToUse": "Don't include the numeric stage here; that's stageAsNumber. Avoid using it for grade or risk modifiers that aren't part of the staging nomenclature.",
    "commonCombos": [
      "schema:MedicalConditionStage"
    ]
  },
  "schema:subStructure": {
    "id": "schema:subStructure",
    "whenToUse": "Use subStructure on AnatomicalStructure to enumerate the component parts that comprise the structure — for example, naming the four chambers as subStructures of the heart. The relationship is mereological, so each subStructure should itself be an AnatomicalStructure.",
    "whenNotToUse": "Don't use this to link adjacent or connected structures; that relationship belongs on connectedTo or relatedTo. Avoid mixing functional subdivisions with anatomical components.",
    "commonCombos": [
      "schema:AnatomicalStructure"
    ]
  },
  "schema:subTest": {
    "id": "schema:subTest",
    "whenToUse": "Use subTest on MedicalTestPanel to enumerate the individual assays bundled into the panel — for example, the ten or so analytes in a comprehensive metabolic panel. Each subTest should reference a discrete MedicalTest node so reference ranges and units carry through.",
    "whenNotToUse": "Don't use this for reflex tests that fire conditionally based on a primary result — model those as separate orderable tests. Avoid listing the same analyte under multiple panels without distinct test nodes.",
    "commonCombos": [
      "schema:MedicalTestPanel"
    ]
  },
  "schema:supplyTo": {
    "id": "schema:supplyTo",
    "whenToUse": "Use supplyTo on Artery to name the AnatomicalStructure or region the artery perfuses. Repeat the property when a single artery supplies multiple distinct territories.",
    "whenNotToUse": "Don't use this for venous drainage; that's tributary on Vein. Avoid listing collateral or anastomotic territories that aren't the primary supply.",
    "commonCombos": [
      "schema:Artery"
    ]
  },
  "schema:targetPopulation": {
    "id": "schema:targetPopulation",
    "whenToUse": "Use targetPopulation on DoseSchedule or DietarySupplement to describe the patient cohort the dose or product is intended for — pediatric, geriatric, pregnant, renal-impaired. Be specific enough that a clinician can match a patient to the correct schedule.",
    "whenNotToUse": "Don't use this for indications or diagnoses; those go on indication or healthCondition. Avoid vague qualifiers like 'adults' when a regulatory population definition exists.",
    "commonCombos": [
      "schema:DoseSchedule",
      "schema:DietarySupplement"
    ]
  },
  "schema:tissueSample": {
    "id": "schema:tissueSample",
    "whenToUse": "Use tissueSample on PathologyTest to specify the specimen type required — biopsy, cytology, resection, fine-needle aspirate. State the source tissue when relevant so collection and handling instructions are unambiguous.",
    "whenNotToUse": "Don't use this for blood or fluid specimens — those belong on the appropriate fluid-test properties. Avoid combining specimen type with collection method in a single string.",
    "commonCombos": [
      "schema:PathologyTest"
    ]
  },
  "schema:transmissionMethod": {
    "id": "schema:transmissionMethod",
    "whenToUse": "Use transmissionMethod on InfectiousDisease to describe how the pathogen spreads — direct contact, airborne droplet, fecal-oral, vector-borne with the named vector. Repeat the property when multiple routes are clinically relevant.",
    "whenNotToUse": "Don't use this for incubation period or infectivity window — those are temporal characteristics that belong elsewhere. Avoid combining route and prevention measures into one string.",
    "commonCombos": [
      "schema:InfectiousDisease"
    ]
  },
  "schema:trialDesign": {
    "id": "schema:trialDesign",
    "whenToUse": "Use trialDesign on MedicalTrial to specify the interventional design — randomized, double-blind, placebo-controlled, crossover — using the MedicalTrialDesign enumeration. Combining multiple enumerated values is the right pattern for trials with several design features.",
    "whenNotToUse": "Don't use this for observational studies; those use studyDesign on MedicalObservationalStudy. Avoid freeform Text when an enumerated value covers the design.",
    "commonCombos": [
      "schema:MedicalTrial"
    ]
  },
  "schema:tributary": {
    "id": "schema:tributary",
    "whenToUse": "Use tributary on Vein to name the larger venous structure that the vein drains into. Repeat the property when a vein has multiple downstream confluences — useful for portal system anatomy.",
    "whenNotToUse": "Don't use this for arterial flow; that's the inverse direction and belongs on supplyTo. Avoid using it for capillary beds or microvasculature that aren't named structures.",
    "commonCombos": [
      "schema:Vein"
    ]
  },
  "schema:typicalTest": {
    "id": "schema:typicalTest",
    "whenToUse": "Use typicalTest on MedicalCondition to point at MedicalTest nodes that are part of the standard diagnostic workup. Order the values from initial screening through confirmatory testing when sequence matters.",
    "whenNotToUse": "Don't use this for tests used only in research or specialist referral pathways. Avoid duplicating signDetected content; this property is about the test, not what it finds.",
    "commonCombos": [
      "schema:MedicalCondition"
    ]
  },
  "schema:usedToDiagnose": {
    "id": "schema:usedToDiagnose",
    "whenToUse": "Use usedToDiagnose on MedicalTest to point at the MedicalCondition the test confirms or rules out. The inverse of typicalTest, this lives on the test node and supports test-first navigation.",
    "whenNotToUse": "Don't use this for screening tests with no specific diagnostic target. Avoid listing every condition the test might incidentally surface; restrict to its accepted diagnostic indications.",
    "commonCombos": [
      "schema:MedicalTest"
    ]
  },
  "schema:usesDevice": {
    "id": "schema:usesDevice",
    "whenToUse": "Use usesDevice on MedicalTest to identify the MedicalDevice — analyzer, imaging system, point-of-care instrument — used to perform the test. Helpful when reference ranges or sensitivity vary by platform.",
    "whenNotToUse": "Don't use this for consumables or specimen containers. Avoid linking generic categories when a specific manufacturer-and-model device node exists.",
    "commonCombos": [
      "schema:MedicalTest"
    ]
  },
  "schema:warning": {
    "id": "schema:warning",
    "whenToUse": "Use warning on Drug to surface FDA black-box warnings, serious precautions, or boxed safety statements verbatim from the approved label. Use a URL when linking to the official label PDF; use Text when quoting the warning directly.",
    "whenNotToUse": "Don't paraphrase or summarize regulatory language — quote it precisely or link to the source. Avoid using this for routine adverse-effect listings; those belong on adverseOutcome.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:workload": {
    "id": "schema:workload",
    "whenToUse": "Use workload on ExercisePlan to quantify physiologic output — METs, watts, kcal/hour — using Energy or QuantitativeValue so unit and value travel together. Pair with intensity when both effort level and absolute output matter.",
    "whenNotToUse": "Don't use this for duration or repetition counts; those have dedicated properties. Avoid freeform strings; the structured QuantitativeValue keeps comparison and filtering possible.",
    "commonCombos": [
      "schema:ExercisePlan"
    ]
  },
  "schema:diet": {
    "id": "schema:diet",
    "whenToUse": "Use diet on an ExerciseAction to reference the Diet node followed during that activity instance. Value must be a Diet entity, allowing the eating pattern to be reused across actions and plans.",
    "whenNotToUse": "Don't use diet on an ExercisePlan to describe the broader nutritional pairing — use exerciseRelatedDiet. For a Drug's food restrictions, use foodWarning.",
    "commonCombos": [
      "schema:ExerciseAction"
    ]
  },
  "schema:doseSchedule": {
    "id": "schema:doseSchedule",
    "whenToUse": "Use doseSchedule on a Drug or TherapeuticProcedure to attach the DoseSchedule node carrying doseValue, doseUnit, and frequency. The value must be a DoseSchedule entity so consumers can reason over the structured fields rather than parsing prose.",
    "whenNotToUse": "Don't put dosing prose into doseSchedule — author the DoseSchedule node and link it. For a single recommended adult dose without scheduling complexity, still wrap it in a DoseSchedule for consistency.",
    "commonCombos": [
      "schema:TherapeuticProcedure",
      "schema:Drug"
    ]
  },
  "schema:drug": {
    "id": "schema:drug",
    "whenToUse": "Use drug to point from a DrugClass, TherapeuticProcedure, or MedicalCondition to a specific Drug entity used in the procedure or recommended for the condition. The value must be a Drug node so dosing, mechanism, and legal status are reachable.",
    "whenNotToUse": "Don't use drug for dietary supplements — use a DietarySupplement reference on the appropriate property. For unformulated active substances, use Substance instead of Drug.",
    "commonCombos": [
      "schema:DrugClass",
      "schema:TherapeuticProcedure",
      "schema:MedicalCondition"
    ]
  },
  "schema:drugClass": {
    "id": "schema:drugClass",
    "whenToUse": "Use drugClass on a Drug to attach the DrugClass it belongs to — statins, NSAIDs, ACE inhibitors. The value must be a DrugClass entity so consumers can navigate from the branded drug up to its class hub.",
    "whenNotToUse": "Don't pack the class name into a Drug's category field — use drugClass for the structured link. For mechanism descriptions, use mechanismOfAction.",
    "commonCombos": [
      "schema:Drug"
    ]
  },
  "schema:exercisePlan": {
    "id": "schema:exercisePlan",
    "whenToUse": "Use exercisePlan on an ExerciseAction to reference the ExercisePlan that scripts the activity — sets, reps, intervals. The value must be an ExercisePlan entity so the structured plan can be reused across action instances.",
    "whenNotToUse": "Don't use exercisePlan to record a single-instance workout description — author an ExercisePlan even for one-off prescribed routines. For nutritional pairing, use exerciseRelatedDiet, not exercisePlan.",
    "commonCombos": [
      "schema:ExerciseAction"
    ]
  },
  "schema:medicalAudience": {
    "id": "schema:medicalAudience",
    "whenToUse": "Use on a MedicalWebPage to declare the intended reader via a MedicalAudience node or MedicalAudienceType enumeration (Patient, Clinician, etc.). Repeat the property when content is written for multiple audiences.",
    "whenNotToUse": "Do not use to describe study participants or health condition cohorts; use healthCondition on a PeopleAudience instead.",
    "commonCombos": [
      "schema:MedicalWebPage"
    ]
  },
  "schema:medicalSpecialty": {
    "id": "schema:medicalSpecialty",
    "whenToUse": "Use on a Physician, MedicalClinic, or MedicalOrganization to declare clinical specialties via the MedicalSpecialty enumeration. Repeat for each specialty practiced rather than concatenating into one string.",
    "whenNotToUse": "Do not use for non-clinical departments or general business categories; use department or knowsAbout for those.",
    "commonCombos": [
      "schema:MedicalClinic",
      "schema:Physician",
      "schema:MedicalOrganization"
    ]
  },
  "schema:medicineSystem": {
    "id": "schema:medicineSystem",
    "whenToUse": "Use medicineSystem to declare the system of medicine that a MedicalEntity belongs to — WesternConventional, Ayurvedic, Chiropractic, Homeopathic, Osteopathic, or TraditionalChinese. Apply it on conditions, treatments, or therapies whose definition or evidence base is system-specific.",
    "whenNotToUse": "Don't use medicineSystem to flag general complementary content — if the entity is fully Western-conventional, the property is redundant and can be omitted. Don't combine it with efficacy claims; medicineSystem describes provenance, not effectiveness.",
    "commonCombos": [
      "schema:MedicalEntity",
      "schema:MedicalTherapy",
      "schema:MedicalCondition"
    ]
  },
  "schema:nerve": {
    "id": "schema:nerve",
    "whenToUse": "Use nerve on a Muscle to declare the motor nerve that innervates it. The value is a Nerve entity — name it with the standard anatomical term (e.g., median nerve, radial nerve) and link to the relevant MedlinePlus or anatomy reference.",
    "whenNotToUse": "Don't use nerve on AnatomicalStructure parents that aren't muscles — for vessels and other structures, use the appropriate body-system property. Don't list multiple nerves as a single string; repeat the property for muscles innervated by more than one nerve.",
    "commonCombos": [
      "schema:Muscle"
    ]
  }
} as const;

export const contentStats = {
  "draft": [],
  "verified": [
    "schema:AnatomicalStructure",
    "schema:AnatomicalSystem",
    "schema:ApprovedIndication",
    "schema:Artery",
    "schema:BloodTest",
    "schema:Bone",
    "schema:BrainStructure",
    "schema:ClaimReview",
    "schema:DDxElement",
    "schema:Dentist",
    "schema:DiagnosticLab",
    "schema:DiagnosticProcedure",
    "schema:Diet",
    "schema:DietarySupplement",
    "schema:DoseSchedule",
    "schema:Drug",
    "schema:DrugClass",
    "schema:DrugCost",
    "schema:DrugCostCategory",
    "schema:DrugLegalStatus",
    "schema:DrugPregnancyCategory",
    "schema:DrugPrescriptionStatus",
    "schema:DrugStrength",
    "schema:ExercisePlan",
    "schema:FAQPage",
    "schema:HealthInsurancePlan",
    "schema:HealthPlanCostSharingSpecification",
    "schema:HealthPlanFormulary",
    "schema:HealthPlanNetwork",
    "schema:Hospital",
    "schema:HowTo",
    "schema:ImagingTest",
    "schema:InfectiousAgentClass",
    "schema:InfectiousDisease",
    "schema:Joint",
    "schema:LifestyleModification",
    "schema:Ligament",
    "schema:LymphaticVessel",
    "schema:MaximumDoseSchedule",
    "schema:MedicalAudience",
    "schema:MedicalAudienceType",
    "schema:MedicalBusiness",
    "schema:MedicalCause",
    "schema:MedicalClinic",
    "schema:MedicalCode",
    "schema:MedicalCondition",
    "schema:MedicalConditionStage",
    "schema:MedicalContraindication",
    "schema:MedicalDevice",
    "schema:MedicalDevicePurpose",
    "schema:MedicalEntity",
    "schema:MedicalEnumeration",
    "schema:MedicalEvidenceLevel",
    "schema:MedicalGuideline",
    "schema:MedicalGuidelineContraindication",
    "schema:MedicalGuidelineRecommendation",
    "schema:MedicalImagingTechnique",
    "schema:MedicalIndication",
    "schema:MedicalIntangible",
    "schema:MedicalObservationalStudy",
    "schema:MedicalObservationalStudyDesign",
    "schema:MedicalOrganization",
    "schema:MedicalProcedure",
    "schema:MedicalProcedureType",
    "schema:MedicalRiskCalculator",
    "schema:MedicalRiskEstimator",
    "schema:MedicalRiskFactor",
    "schema:MedicalRiskScore",
    "schema:MedicalScholarlyArticle",
    "schema:MedicalSign",
    "schema:MedicalSignOrSymptom",
    "schema:MedicalSpecialty",
    "schema:MedicalStudy",
    "schema:MedicalStudyStatus",
    "schema:MedicalSymptom",
    "schema:MedicalTest",
    "schema:MedicalTestPanel",
    "schema:MedicalTherapy",
    "schema:MedicalTrial",
    "schema:MedicalTrialDesign",
    "schema:MedicalWebPage",
    "schema:MedicineSystem",
    "schema:Muscle",
    "schema:Nerve",
    "schema:OccupationalTherapy",
    "schema:Optician",
    "schema:PalliativeProcedure",
    "schema:PathologyTest",
    "schema:Patient",
    "schema:Pharmacy",
    "schema:PhysicalActivity",
    "schema:PhysicalActivityCategory",
    "schema:PhysicalExam",
    "schema:PhysicalTherapy",
    "schema:Physician",
    "schema:PreventionIndication",
    "schema:PsychologicalTreatment",
    "schema:RadiationTherapy",
    "schema:RecommendedDoseSchedule",
    "schema:ReportedDoseSchedule",
    "schema:SpeakableSpecification",
    "schema:SpecialAnnouncement",
    "schema:Substance",
    "schema:SuperficialAnatomy",
    "schema:SurgicalProcedure",
    "schema:TherapeuticProcedure",
    "schema:TreatmentIndication",
    "schema:Vein",
    "schema:Vessel",
    "schema:VeterinaryCare",
    "schema:VitalSign"
  ],
  "flagged": []
};
