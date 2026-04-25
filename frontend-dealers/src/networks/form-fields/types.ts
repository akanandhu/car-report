export type FormFieldOptionI = {
  label: string;
  value: string;
};

export type FormFieldConditionI = {
  dependsOn: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "not_empty"
    | "empty"
    | "in"
    | "greater_than"
    | "less_than";
  value?: string | string[];
  action: "show" | "hide";
};

export type FormFieldComplexConditionI = {
  logic: "AND" | "OR";
  action: "show" | "hide";
  rules: (Omit<FormFieldConditionI, "action"> | FormFieldComplexConditionI)[];
};

export type FormFieldValidationI = {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  min?: number;
  max?: number;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  dateFormat?: string;
};

export type FormFieldI = {
  id: string;
  type: string;
  label: string;
  fieldKey: string;
  placeholder?: string;
  subgroup?: string | null;
  defaultValue?: string;
  isRequired: boolean;
  order: number;
  validation?: FormFieldValidationI;
  options?: FormFieldOptionI[];
  endpoint?: string;
  conditions?: FormFieldConditionI | FormFieldComplexConditionI;
  isEnabled: boolean;
  documentGroupId: string;
};
