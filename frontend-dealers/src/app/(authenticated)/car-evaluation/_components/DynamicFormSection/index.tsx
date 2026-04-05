"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Input from "@/src/components/Input";
import ConditionSelect from "@/src/components/Select";
import RadioButton from "@/src/components/Radio";
import Checkbox from "@/src/components/Checkbox";
import ImageUpload from "@/src/components/ImageUpload";
import { FormFieldI, FormDataI } from "../CarEvaluationForm/types";
import { FormFieldComplexConditionI, FormFieldConditionI } from "@/src/networks/form-fields/types";
import { fetchCatalogueOptions } from "@/src/networks/catalogue";

interface DynamicFormSectionProps {
  fields: FormFieldI[];
  data: FormDataI;
  onChange: (newData: Partial<FormDataI>) => void;
  /** Options from cached config API, keyed by fieldKey (e.g. manufacturing_year, ownership_number) */
  configOptions?: Record<string, { label: string; value: string }[]>;
  /** Options derived from variant data, keyed by fieldKey (e.g. fuel_type, transmission_type, car_variant) */
  variantDerivedOptions?: Record<string, { label: string; value: string }[]>;
}

/**
 * Replace `{fieldKey}` placeholders in an endpoint string with actual form data values.
 * Returns null if any placeholder cannot be resolved (value missing/empty).
 */
function resolveEndpoint(
  endpointTemplate: string,
  data: FormDataI
): string | null {
  const placeholderRegex = /\{(\w+)\}/g;
  let resolved = endpointTemplate;
  let match: RegExpExecArray | null;

  while ((match = placeholderRegex.exec(endpointTemplate)) !== null) {
    const fieldKey = match[1];
    const value = data[fieldKey];
    if (value === undefined || value === null || value === "") {
      return null; // Can't resolve — dependency not yet filled
    }
    resolved = resolved.replace(match[0], String(value));
  }

  return resolved;
}

/**
 * Extract field keys from {placeholder} patterns in an endpoint template.
 */
function getEndpointDependencies(endpointTemplate: string): string[] {
  const deps: string[] = [];
  const regex = /\{(\w+)\}/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(endpointTemplate)) !== null) {
    deps.push(match[1]);
  }
  return deps;
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
  configOptions = {},
  variantDerivedOptions = {},
}: DynamicFormSectionProps) => {

  const injectedOptions: Record<string, { label: string; value: string }[]> = {
    ...configOptions,
    ...variantDerivedOptions,
  };

  // Cache for options fetched from API endpoints, keyed by resolved endpoint URL
  const [endpointOptions, setEndpointOptions] = useState<
    Record<string, { label: string; value: string }[]>
  >({});
  const [loadingEndpoints, setLoadingEndpoints] = useState<
    Record<string, boolean>
  >({});

  // Track previous dependency values to detect changes and clear children
  const prevDepsRef = useRef<Record<string, string>>({});

  /**
   * Fetch options for a resolved endpoint URL
   */
  const fetchOptionsForEndpoint = useCallback(
    async (resolvedEndpoint: string) => {
      if (endpointOptions[resolvedEndpoint] || loadingEndpoints[resolvedEndpoint]) return;

      setLoadingEndpoints((prev) => ({ ...prev, [resolvedEndpoint]: true }));

      try {
        const options = await fetchCatalogueOptions(resolvedEndpoint);
        setEndpointOptions((prev) => ({ ...prev, [resolvedEndpoint]: options }));
      } catch (error) {
        console.error(`Failed to fetch options from endpoint: ${resolvedEndpoint}`, error);
        setEndpointOptions((prev) => ({ ...prev, [resolvedEndpoint]: [] }));
      } finally {
        setLoadingEndpoints((prev) => ({ ...prev, [resolvedEndpoint]: false }));
      }
    },
    [endpointOptions, loadingEndpoints]
  );

  // Detect parent field changes and clear dependent child fields
  useEffect(() => {
    const cascadingFields = fields.filter(
      (f) => f.endpoint && getEndpointDependencies(f.endpoint).length > 0
    );

    const depFieldKeys = new Set<string>();
    cascadingFields.forEach((f) => {
      getEndpointDependencies(f.endpoint!).forEach((dep) => depFieldKeys.add(dep));
    });

    const currentDeps: Record<string, string> = {};
    depFieldKeys.forEach((key) => {
      currentDeps[key] = String(data[key] ?? "");
    });

    const changedKeys = new Set<string>();
    depFieldKeys.forEach((key) => {
      if (prevDepsRef.current[key] !== undefined && prevDepsRef.current[key] !== currentDeps[key]) {
        changedKeys.add(key);
      }
    });

    if (changedKeys.size > 0) {
      // Find all child fields whose endpoint depends on a changed field and clear their values
      const fieldsToClear: Record<string, string> = {};
      cascadingFields.forEach((f) => {
        const deps = getEndpointDependencies(f.endpoint!);
        if (deps.some((dep) => changedKeys.has(dep))) {
          fieldsToClear[f.fieldKey] = "";
        }
      });

      if (Object.keys(fieldsToClear).length > 0) {
        onChange(fieldsToClear);
      }
    }

    prevDepsRef.current = currentDeps;
  }, [data, fields]);

  // Fetch options for all visible select/radio fields that have endpoints
  // Skip fields that already have injected options (from config cache or variant data)
  useEffect(() => {
    fields.forEach((field) => {
      if (
        (field.type === "select" || field.type === "radio") &&
        field.endpoint &&
        !injectedOptions[field.fieldKey] &&
        isFieldVisible(field, data)
      ) {
        const resolved = resolveEndpoint(field.endpoint, data);
        if (resolved && !endpointOptions[resolved] && !loadingEndpoints[resolved]) {
          fetchOptionsForEndpoint(resolved);
        }
      }
    });
  }, [fields, data, fetchOptionsForEndpoint, endpointOptions, loadingEndpoints]);

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

      case "select": {
        // Check if this field has injected options (from config cache or variant data)
        const hasInjectedOptions = !!injectedOptions[commonKey];

        // Resolve endpoint with dynamic params (only if not using injected options)
        const isEndpointField = !hasInjectedOptions && !!field.endpoint;
        let resolvedEndpoint: string | null = null;
        if (isEndpointField) {
          resolvedEndpoint = resolveEndpoint(field.endpoint!, data);
        }

        const isLoading =
          isEndpointField &&
          (resolvedEndpoint
            ? loadingEndpoints[resolvedEndpoint]
            : true); // still loading if can't resolve yet

        const selectOptions = hasInjectedOptions
          ? injectedOptions[commonKey]
          : isEndpointField
            ? resolvedEndpoint
              ? endpointOptions[resolvedEndpoint] || []
              : []
            : field.options || [];

        return (
          <div key={field.id} className="w-full">
            <ConditionSelect
              label={
                field.isRequired ? `${field.label} *` : field.label
              }
              
              options={selectOptions}
              value={Array.isArray(value) ? value : value ? [value] : []}
              onChange={(val) =>
                onChange({ [commonKey]: val.length === 1 ? val[0] : val })
              }
              isMulti={false}
              placeholder={
                isLoading
                  ? "Loading options..."
                  : field.placeholder || `Select ${field.label.toLowerCase()}`
              }
            />
          </div>
        );
      }

      case "radio": {
        // Check if this field has injected options (from config cache or variant data)
        const hasInjectedRadioOptions = !!injectedOptions[commonKey];

        // Support static options, injected options, and endpoint-fetched options
        let radioOptions = hasInjectedRadioOptions
          ? injectedOptions[commonKey]
          : field.options || [];

        if (!hasInjectedRadioOptions && field.endpoint) {
          const resolvedEp = resolveEndpoint(field.endpoint!, data);
          if (resolvedEp && endpointOptions[resolvedEp]) {
            radioOptions = endpointOptions[resolvedEp];
          } else if (resolvedEp && loadingEndpoints[resolvedEp]) {
            return (
              <div key={field.id} className="w-full">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  {field.label}
                  {requiredMark}
                </label>
                <p className="text-sm text-gray-400">Loading options...</p>
              </div>
            );
          }
        }

        return (
          <div key={field.id} className="w-full">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              {field.label}
              {requiredMark}
            </label>
            <div className="flex flex-wrap gap-4">
              {radioOptions.map((opt: { value: string | number | readonly string[] | undefined; label: string | undefined; }, idx: number) => (
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
      }

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
