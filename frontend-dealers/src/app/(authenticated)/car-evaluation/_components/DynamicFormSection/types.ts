import { FormDataI, FormFieldI } from "../CarEvaluationForm/types";

export type DynamicFormSectionProps = {
  fields: FormFieldI[];
  data: FormDataI;
  onChange: (newData: Partial<FormDataI>) => void;
  /** Options from cached config API, keyed by fieldKey (e.g. manufacturing_year, ownership_number) */
  configOptions?: Record<string, { label: string; value: string }[]>;
  /** Options derived from variant data, keyed by fieldKey (e.g. fuel_type, transmission_type, car_variant) */
  variantDerivedOptions?: Record<string, { label: string; value: string }[]>;
};
