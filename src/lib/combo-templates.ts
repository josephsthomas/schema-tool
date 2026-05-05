/**
 * Static loader for the 8 combo templates under
 * src/data/content/_combos/. Imported eagerly because the file count is small.
 */

import diseaseState from '@/data/content/_combos/disease-state.json';
import hcpProduct from '@/data/content/_combos/hcp-product.json';
import consumerProduct from '@/data/content/_combos/consumer-product.json';
import hospitalServiceLine from '@/data/content/_combos/hospital-service-line.json';
import riskCalculator from '@/data/content/_combos/risk-calculator.json';
import clinicalTrial from '@/data/content/_combos/clinical-trial.json';
import formularyEntry from '@/data/content/_combos/formulary-entry.json';
import patientEducationExplainer from '@/data/content/_combos/patient-education-explainer.json';

export interface ComboEntity {
  type: string;
  defaultLabel: string;
  parentRef: string | null;
}

export interface ComboTemplate {
  id: string;
  label: string;
  description: string;
  entities: ComboEntity[];
}

export const COMBO_TEMPLATES: readonly ComboTemplate[] = [
  diseaseState as ComboTemplate,
  hcpProduct as ComboTemplate,
  consumerProduct as ComboTemplate,
  hospitalServiceLine as ComboTemplate,
  riskCalculator as ComboTemplate,
  clinicalTrial as ComboTemplate,
  formularyEntry as ComboTemplate,
  patientEducationExplainer as ComboTemplate,
];
