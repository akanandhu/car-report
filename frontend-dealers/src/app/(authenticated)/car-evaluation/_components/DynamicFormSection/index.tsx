"use client";

import Input from "@/src/components/Input";
import ConditionSelect from "@/src/components/Select";
import RadioButton from "@/src/components/Radio";
import Checkbox from "@/src/components/Checkbox";
import ImageUpload from "@/src/components/ImageUpload";
import { FormFieldI, FormDataI } from "../CarEvaluationForm/types";
import { FormFieldComplexConditionI, FormFieldConditionI } from "@/src/networks/form-fields/types";

interface DynamicFormSectionProps {
  fields: FormFieldI[];
  data: FormDataI;
  onChange: (newData: Partial<FormDataI>) => void;
}

/**
 * Evaluate a simple condition against current form data
 */
function evaluateSimpleCondition(
  condition: Omit<FormFieldConditionI, "action">,
  data: FormDataI
): boolean {
  const fieldValue = data[condition.dependsOn];

  switch (condition.operator) {
    case "equals":
      return (
        String(fieldValue ?? "").toLowerCase() ===
        String(condition.value ?? "").toLowerCase()
      );
    case "not_equals":
      return (
        String(fieldValue ?? "").toLowerCase() !==
        String(condition.value ?? "").toLowerCase()
      );
    case "contains":
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(condition.value);
      }
      return String(fieldValue ?? "").includes(String(condition.value ?? ""));
    case "not_empty":
      return fieldValue !== undefined && fieldValue !== null && fieldValue !== "";
    case "empty":
      return fieldValue === undefined || fieldValue === null || fieldValue === "";
    case "in":
      if (Array.isArray(condition.value)) {
        return condition.value.includes(String(fieldValue ?? ""));
      }
      return false;
    case "greater_than":
      return Number(fieldValue) > Number(condition.value);
    case "less_than":
      return Number(fieldValue) < Number(condition.value);
    default:
      return true;
  }
}

/**
 * Recursively evaluate conditions (simple or complex with AND/OR logic)
 */
function evaluateConditions(
  conditions: FormFieldConditionI | FormFieldComplexConditionI,
  data: FormDataI
): boolean {
  // Complex condition with logic (AND/OR)
  if ("logic" in conditions && "rules" in conditions) {
    const complex = conditions as FormFieldComplexConditionI;
    const results = complex.rules.map((rule) => {
      if ("logic" in rule) {
        return evaluateConditions(
          { ...rule, action: complex.action } as FormFieldComplexConditionI,
          data
        );
      }
      return evaluateSimpleCondition(rule, data);
    });

    const passed =
      complex.logic === "AND"
        ? results.every(Boolean)
        : results.some(Boolean);

    return complex.action === "show" ? passed : !passed;
  }

  // Simple condition
  const simple = conditions as FormFieldConditionI;
  const passed = evaluateSimpleCondition(simple, data);
  return simple.action === "show" ? passed : !passed;
}

/**
 * Check if a field should be visible based on its conditions
 */
function isFieldVisible(
  field: FormFieldI,
  data: FormDataI
): boolean {
  if (!field.conditions) return true;
  return evaluateConditions(field.conditions, data);
}

const DynamicFormSection = ({
  fields,
  data,
  onChange,
}: DynamicFormSectionProps) => {
  const renderField = (field: FormFieldI) => {
    if (!isFieldVisible(field, data)) return null;

    const commonKey = field.fieldKey;
    const value = data[commonKey];
    const requiredMark = field.isRequired ? (
      <span className="text-red-500 ml-1">*</span>
    ) : null;

    switch (field.type) {
      case "textfield":
      case "text":
        return (
          <Input
            key={field.id}
            label={
              field.isRequired ? `${field.label} *` : field.label
            }
            type="text"
            name={commonKey}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value={value || ""}
            onChange={(e) => onChange({ [commonKey]: e.target.value })}
          />
        );

      case "textarea":
        return (
          <div key={field.id} className="w-full">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              {field.label}
              {requiredMark}
            </label>
            <textarea
              name={commonKey}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              value={value || ""}
              onChange={(e) => onChange({ [commonKey]: e.target.value })}
              rows={4}
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-slate-700 focus:ring-2 focus:ring-slate-200 text-base transition-all duration-200 bg-white text-black resize-none"
            />
          </div>
        );

      case "number":
        return (
          <Input
            key={field.id}
            label={
              field.isRequired ? `${field.label} *` : field.label
            }
            type="number"
            name={commonKey}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value={value || ""}
            min={field.validation?.min}
            max={field.validation?.max}
            onChange={(e) => onChange({ [commonKey]: e.target.value })}
          />
        );

      case "email":
        return (
          <Input
            key={field.id}
            label={
              field.isRequired ? `${field.label} *` : field.label
            }
            type="email"
            name={commonKey}
            placeholder={field.placeholder || "Enter email address"}
            value={value || ""}
            onChange={(e) => onChange({ [commonKey]: e.target.value })}
          />
        );

      case "phone":
        return (
          <Input
            key={field.id}
            label={
              field.isRequired ? `${field.label} *` : field.label
            }
            type="tel"
            name={commonKey}
            placeholder={field.placeholder || "Enter phone number"}
            value={value || ""}
            onChange={(e) => onChange({ [commonKey]: e.target.value })}
          />
        );

      case "date":
      case "datepicker":
        return (
          <Input
            key={field.id}
            label={
              field.isRequired ? `${field.label} *` : field.label
            }
            type="date"
            name={commonKey}
            value={value || ""}
            onChange={(e) => onChange({ [commonKey]: e.target.value })}
          />
        );

      case "select":
        return (
          <ConditionSelect
            key={field.id}
            label={
              field.isRequired ? `${field.label} *` : field.label
            }
            options={field.options || []}
            value={Array.isArray(value) ? value : value ? [value] : []}
            onChange={(val) =>
              onChange({ [commonKey]: val.length === 1 ? val[0] : val })
            }
            isMulti={false}
            placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`}
          />
        );

      case "radio":
        return (
          <div key={field.id} className="w-full">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              {field.label}
              {requiredMark}
            </label>
            <div className="flex flex-wrap gap-4">
              {(field.options || []).map((opt: { value: string | number | readonly string[] | undefined; label: string | undefined; }, idx: number) => (
                <RadioButton
                  key={`${commonKey}_${opt.value}_${idx}`}
                  id={`${commonKey}_${opt.value}_${idx}`}
                  name={commonKey}
                  label={opt.label}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) =>
                    onChange({
                      [commonKey]: (e.target as HTMLInputElement).value,
                    })
                  }
                />
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="w-full">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              {field.label}
              {requiredMark}
            </label>
            <div className="flex flex-wrap gap-4">
              {(field.options || []).map((opt: { value: string; label: string | undefined; }, idx: number) => {
                const currentValues: string[] = Array.isArray(value)
                  ? value
                  : [];
                const isChecked = currentValues.includes(opt.value);

                return (
                  <Checkbox
                    key={`${commonKey}_${opt.value}_${idx}`}
                    id={`${commonKey}_${opt.value}_${idx}`}
                    label={opt.label}
                    checked={isChecked}
                    onChange={() => {
                      const newValues = isChecked
                        ? currentValues.filter((v) => v !== opt.value)
                        : [...currentValues, opt.value];
                      onChange({ [commonKey]: newValues });
                    }}
                  />
                );
              })}
            </div>
          </div>
        );

      case "file":
        return (
          <ImageUpload
            key={field.id}
            label={field.label}
            required={field.isRequired}
            onFileSelect={(file) => onChange({ [commonKey]: file })}
          />
        );

      default:
        // Fallback: render as a text input
        return (
          <Input
            key={field.id}
            label={field.label}
            type="text"
            name={commonKey}
            placeholder={field.placeholder || ""}
            value={value || ""}
            onChange={(e) => onChange({ [commonKey]: e.target.value })}
          />
        );
    }
  };

  if (fields.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        <p className="text-lg">No fields configured for this section.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <div key={field.id}>{renderField(field)}</div>
      ))}
    </div>
  );
};

export default DynamicFormSection;
