/**
 * Health-relevant types named in build brief Section 2 that the brief calls
 * "core" — i.e. outside the health-lifesci extension layer.
 *
 * Reconciliation against schema.org V30.0 (the brief was authored against
 * V29.4):
 *  - 4 of the 19 listed in the brief are now actually IN health-lifesci as of
 *    V30.0 (Optician, DiagnosticLab, VeterinaryCare, Patient). They are
 *    therefore already counted in the 80 health-lifesci Types and don't need
 *    re-listing here, but the brief author's intent is preserved.
 *  - 5 of the 19 live in the `pending.schema.org` namespace
 *    (SpecialAnnouncement, HealthInsurancePlan, HealthPlanFormulary,
 *    HealthPlanNetwork, HealthPlanCostSharingSpecification). The filter
 *    accepts them via this allowlist regardless of partOf.
 *  - `NursingHome` is not a schema.org type in V30.0 (no replacement available).
 *    Dropped from the list with a build-audit note. If schema.org adds it
 *    later, restore here.
 *  - `Speakable` is also not a type — `SpeakableSpecification` is the V30.0
 *    name for the same concept (used via the `speakable` property).
 *
 * IDs use the prefixed form, matching the primary key in `SchemaTerm.id`.
 */

export const CORE_TYPE_IDS: readonly string[] = [
  // Stable core (no partOf in V30.0)
  'schema:Hospital',
  'schema:Physician',
  'schema:MedicalOrganization',
  'schema:Pharmacy',
  'schema:Dentist',
  'schema:FAQPage',
  'schema:HowTo',
  'schema:ClaimReview',
  'schema:SpeakableSpecification',
  // Pending (lives at pending.schema.org, still useful for agency markup)
  'schema:SpecialAnnouncement',
  'schema:HealthInsurancePlan',
  'schema:HealthPlanFormulary',
  'schema:HealthPlanNetwork',
  'schema:HealthPlanCostSharingSpecification',
  // Already in health-lifesci as of V30.0 (listed for documentation; the filter
  // sees them as health-lifesci first and won't double-count).
  'schema:Optician',
  'schema:DiagnosticLab',
  'schema:VeterinaryCare',
  'schema:Patient',
] as const;

export const CORE_TYPE_SET: ReadonlySet<string> = new Set(CORE_TYPE_IDS);

export function isCoreType(id: string): boolean {
  return CORE_TYPE_SET.has(id);
}
