/**
 * Editorial top-level categories for the Browse view.
 * Lifted verbatim from build brief Section 4.2.
 *
 * Multi-category assignment is allowed: a term can appear in more than one
 * category if that's clearer for users. Any term not assigned here is
 * surfaced as "Uncategorized" in build-audit.json so editors can decide
 * whether to add it.
 *
 * NOTE: brief Section 4.2 lists 12 categories despite Section 12 (Phase 2)
 * referring to "the eleven categories". Using all 12 below; flagging the
 * cross-reference inconsistency in the README.
 */

export interface Category {
  id: string;
  label: string;
  description: string;
  /** Term IDs assigned to this category. Order matters for display. */
  termIds: readonly string[];
}

export const CATEGORIES: readonly Category[] = [
  {
    id: 'conditions-symptoms',
    label: 'Conditions & symptoms',
    description:
      'Diseases, signs, symptoms, risk factors, and the diagnostic concepts that describe them.',
    termIds: [
      'schema:MedicalCondition',
      'schema:MedicalConditionStage',
      'schema:InfectiousDisease',
      'schema:MedicalSign',
      'schema:MedicalSymptom',
      'schema:MedicalSignOrSymptom',
      'schema:VitalSign',
      'schema:DDxElement',
      'schema:MedicalCause',
      'schema:MedicalRiskFactor',
    ],
  },
  {
    id: 'drugs-substances',
    label: 'Drugs & substances',
    description:
      'Branded and generic medications, supplements, dose schedules, indications, and contraindications.',
    termIds: [
      'schema:Drug',
      'schema:DrugClass',
      'schema:DrugCost',
      'schema:DrugLegalStatus',
      'schema:DrugStrength',
      'schema:DietarySupplement',
      'schema:Substance',
      'schema:DoseSchedule',
      'schema:MaximumDoseSchedule',
      'schema:RecommendedDoseSchedule',
      'schema:ReportedDoseSchedule',
      'schema:ApprovedIndication',
      'schema:PreventionIndication',
      'schema:TreatmentIndication',
      'schema:MedicalIndication',
      'schema:MedicalContraindication',
    ],
  },
  {
    id: 'procedures-therapies',
    label: 'Procedures & therapies',
    description: 'Surgical, diagnostic, therapeutic, and palliative procedures and therapy modalities.',
    termIds: [
      'schema:MedicalProcedure',
      'schema:SurgicalProcedure',
      'schema:DiagnosticProcedure',
      'schema:TherapeuticProcedure',
      'schema:PalliativeProcedure',
      'schema:MedicalTherapy',
      'schema:RadiationTherapy',
      'schema:OccupationalTherapy',
      'schema:PhysicalTherapy',
      'schema:PsychologicalTreatment',
    ],
  },
  {
    id: 'tests-diagnostics',
    label: 'Tests & diagnostics',
    description: 'Lab tests, imaging, pathology, and the devices used to perform them.',
    termIds: [
      'schema:MedicalTest',
      'schema:MedicalTestPanel',
      'schema:BloodTest',
      'schema:ImagingTest',
      'schema:PathologyTest',
      'schema:MedicalDevice',
    ],
  },
  {
    id: 'anatomy',
    label: 'Anatomy',
    description: 'Anatomical structures, systems, and the named tissues that compose them.',
    termIds: [
      'schema:AnatomicalStructure',
      'schema:AnatomicalSystem',
      'schema:Artery',
      'schema:Bone',
      'schema:BrainStructure',
      'schema:Joint',
      'schema:Ligament',
      'schema:LymphaticVessel',
      'schema:Muscle',
      'schema:Nerve',
      'schema:SuperficialAnatomy',
      'schema:Vein',
      'schema:Vessel',
    ],
  },
  {
    id: 'studies-evidence',
    label: 'Studies & evidence',
    description: 'Clinical trials, observational studies, guidelines, and scholarly articles.',
    termIds: [
      'schema:MedicalStudy',
      'schema:MedicalTrial',
      'schema:MedicalObservationalStudy',
      'schema:MedicalGuideline',
      'schema:MedicalGuidelineContraindication',
      'schema:MedicalGuidelineRecommendation',
      'schema:MedicalScholarlyArticle',
    ],
  },
  {
    id: 'risk-decision',
    label: 'Risk & decision tools',
    description: 'Risk calculators, estimators, and the score values they produce.',
    termIds: [
      'schema:MedicalRiskCalculator',
      'schema:MedicalRiskEstimator',
      'schema:MedicalRiskScore',
    ],
  },
  {
    id: 'orgs-people',
    label: 'Healthcare organizations & people',
    description: 'Hospitals, clinics, pharmacies, individual practitioners, and patients.',
    termIds: [
      'schema:Hospital',
      'schema:MedicalClinic',
      'schema:MedicalOrganization',
      'schema:MedicalBusiness',
      'schema:Pharmacy',
      'schema:Physician',
      'schema:Dentist',
      'schema:Optician',
      'schema:DiagnosticLab',
      'schema:VeterinaryCare',
      'schema:Patient',
      // Brief lists `NursingHome` here; not present in schema.org V30.0.
    ],
  },
  {
    id: 'lifestyle-wellness',
    label: 'Lifestyle & wellness',
    description: 'Diet, exercise, physical activity, and lifestyle modifications.',
    termIds: [
      'schema:Diet',
      'schema:ExercisePlan',
      'schema:PhysicalActivity',
      'schema:LifestyleModification',
    ],
  },
  {
    id: 'insurance-access',
    label: 'Insurance & access',
    description: 'Health insurance plans, formularies, networks, and cost-sharing structures.',
    termIds: [
      'schema:HealthInsurancePlan',
      'schema:HealthPlanFormulary',
      'schema:HealthPlanNetwork',
      'schema:HealthPlanCostSharingSpecification',
    ],
  },
  {
    id: 'pages-content',
    label: 'Pages & content types',
    description: 'Page-level types and content patterns that wrap medical entities.',
    termIds: [
      'schema:MedicalWebPage',
      'schema:FAQPage',
      'schema:HowTo',
      'schema:SpecialAnnouncement',
      'schema:ClaimReview',
      // Brief lists `Speakable`; in V30.0 the type is `SpeakableSpecification`.
      'schema:SpeakableSpecification',
    ],
  },
  {
    id: 'codes-metadata',
    label: 'Codes & metadata',
    description: 'Coding-system references, abstract parent types, and audience descriptors.',
    termIds: [
      'schema:MedicalCode',
      'schema:MedicalEntity',
      'schema:MedicalIntangible',
      'schema:MedicalAudience',
    ],
  },
] as const;

export const CATEGORIES_BY_ID: ReadonlyMap<string, Category> = new Map(
  CATEGORIES.map((c) => [c.id, c]),
);

/** Inverse index: termId → categoryIds the term belongs to. */
export const CATEGORY_INDEX_BY_TERM_ID: ReadonlyMap<string, readonly string[]> = (() => {
  const index = new Map<string, string[]>();
  for (const category of CATEGORIES) {
    for (const termId of category.termIds) {
      const list = index.get(termId) ?? [];
      list.push(category.id);
      index.set(termId, list);
    }
  }
  return index;
})();

/** All term IDs that have at least one category assignment. */
export const CATEGORIZED_TERM_IDS: ReadonlySet<string> = new Set(
  CATEGORIES.flatMap((c) => c.termIds),
);
