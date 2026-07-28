import { BaseModel } from '@shared/common/interface/base-model.interface';
import { Prisma } from '@prisma/client';

export type FormFieldI = BaseModel & {
  documentGroupId: string;
  type: string;
  label: string;
  fieldKey: string;
  placeholder?: string | null;
  subgroup?: string | null;
  defaultValue?: string | null;
  isRequired: boolean;
  order: number;
  validation?: Prisma.JsonValue | null;
  options?: Prisma.JsonValue | null;
  endpoint?: string | null;
  conditions?: Prisma.JsonValue | null;
  isEnabled: boolean;
};

// Validation rules that can be stored in the validation JSON column
export type ValidationRulesI = {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  min?: number;
  max?: number;
  allowedFileTypes?: string[];
  maxFileSize?: number; // in bytes
};

// Option item for select/radio/checkbox fields
export type FieldOptionI = {
  label: string;
  value: string;
};

// Simple condition (single dependency)
export type SimpleConditionI = {
  dependsOn: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'contains'
    | 'not_empty'
    | 'empty'
    | 'in'
    | 'greater_than'
    | 'less_than';
  value?: string | string[];
  action: 'show' | 'hide';
};

// Complex condition (multiple dependencies)
export type ComplexConditionI = {
  logic: 'AND' | 'OR';
  action: 'show' | 'hide';
  rules: (SimpleConditionRuleI | ComplexConditionI)[];
};

export type SimpleConditionRuleI = {
  dependsOn: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'contains'
    | 'not_empty'
    | 'empty'
    | 'in'
    | 'greater_than'
    | 'less_than';
  value?: string | string[];
};

export type FieldConditionI = SimpleConditionI | ComplexConditionI;

// Supported field types
export const FIELD_TYPES = [
  'textfield',
  'textarea',
  'number',
  'select',
  'radio',
  'checkbox',
  'upload',
  'date',
  'email',
  'phone',
] as const;

export type FieldTypeI = (typeof FIELD_TYPES)[number];

export const isFieldType = (value: string): value is FieldTypeI => {
  return FIELD_TYPES.some((fieldType) => fieldType === value);
};
