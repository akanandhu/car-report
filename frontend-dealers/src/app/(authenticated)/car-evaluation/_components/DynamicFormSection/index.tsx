"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Input from "@/src/components/Input";
import ConditionSelect from "@/src/components/Select";
import RadioButton from "@/src/components/Radio";
import Checkbox from "@/src/components/Checkbox";
import ImageUpload from "@/src/components/ImageUpload";
import { FormFieldI } from "../CarEvaluationForm/types";
import { DynamicFormSectionProps } from "./types";
import { getEndpointDependencies, isFieldVisible, resolveEndpoint } from "./utils";
import { fetchCatalogueOptions } from "@/src/networks/catalogue";

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
      const rawVal = data[key];
      currentDeps[key] = rawVal && typeof rawVal === "object" && rawVal.id !== undefined
        ? String(rawVal.id)
        : String(rawVal ?? "");
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
        // Fields that should store { id, label } objects instead of plain string values
        const objectValueFields = ["car_brand", "car_model", "car_variant"];
        const isObjectValueField = objectValueFields.includes(commonKey);

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

        // Extract the string ID from object-valued fields for the Select component
        const selectValue = isObjectValueField && value && typeof value === "object" && value.id
          ? [String(value.id)]
          : Array.isArray(value) ? value : value ? [value] : [];

        return (
          <div key={field.id} className="w-full">
            <ConditionSelect
              label={
                field.isRequired ? `${field.label} *` : field.label
              }
              
              options={selectOptions}
              value={selectValue}
              onChange={(val) => {
                const selectedId = val.length === 1 ? val[0] : val;

                if (isObjectValueField && typeof selectedId === "string") {
                  // Store as { id, label } object for car_brand, car_model, car_variant
                  const selectedOption = selectOptions.find(
                    (opt) => opt.value === selectedId
                  );
                  onChange({
                    [commonKey]: {
                      id: selectedId,
                      label: selectedOption?.label || selectedId,
                    },
                  });
                } else {
                  onChange({ [commonKey]: selectedId });
                }
              }}
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
