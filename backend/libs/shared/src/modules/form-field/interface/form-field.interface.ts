
import { BaseModel } from "@shared/common/interface/base-model.interface";

export interface FormFieldInterface extends BaseModel {
    documentGroupId: string;
    type: string;
    label: string;
    fieldKey: string;
    placeholder?: string | null;
    defaultValue?: string | null;
    isRequired: boolean;
    order: number;
    validation?: any | null;
    options?: any | null;
    endpoint?: string | null;
    conditions?: any | null;
    isEnabled: boolean;
}

// Validation rules that can be stored in the validation JSON column
export interface ValidationRules {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    patternMessage?: string;
    min?: number;
    max?: number;
    allowedFileTypes?: string[];
    maxFileSize?: number; // in bytes
}

// Option item for select/radio/checkbox fields
export interface FieldOption {
    label: string;
    value: string;
}

// Simple condition (single dependency)
export interface SimpleCondition {
    dependsOn: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'not_empty' | 'empty' | 'in' | 'greater_than' | 'less_than';
    value?: string | string[];
    action: 'show' | 'hide';
}

// Complex condition (multiple dependencies)
export interface ComplexCondition {
    logic: 'AND' | 'OR';
    action: 'show' | 'hide';
    rules: (SimpleConditionRule | ComplexCondition)[];
}

export interface SimpleConditionRule {
    dependsOn: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'not_empty' | 'empty' | 'in' | 'greater_than' | 'less_than';
    value?: string | string[];
}

export type FieldCondition = SimpleCondition | ComplexCondition;

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

export type FieldType = typeof FIELD_TYPES[number];
