"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Input from "@/src/components/Input";
import ConditionSelect from "@/src/components/Select";
import SegmentedRadio from "@/src/components/SegmentedRadio";
import Checkbox from "@/src/components/Checkbox";
import ImageUpload from "@/src/components/ImageUpload";
import { FormFieldI } from "../CarEvaluationForm/types";
import { DynamicFormSectionProps } from "./types";
import {
  getEndpointDependencies,
  isFieldVisible,
  resolveEndpoint,
} from "./utils";
import { fetchCatalogueOptions } from "@/src/networks/catalogue";
import { FormFieldGroupI } from "@/src/networks/form-fields/types";

const EXTERIOR_STATUS_FALLBACK = [
  { label: "Good", value: "Good" },
  { label: "Scratched", value: "Scratched" },
  { label: "Dented", value: "Dented" },
  { label: "Damaged", value: "Damaged" },
  { label: "Repaired", value: "Repaired" },
  { label: "Replaced", value: "Replaced" },
  { label: "Rusted", value: "Rusted" },
  { label: "Repainted", value: "Repainted" },
  { label: "Other", value: "Other" },
];

const getExteriorOptionClasses = (
  optionLabel: string,
  isSelected: boolean,
) => {
  if (isSelected) {
    const normalized = optionLabel.trim().toLowerCase();
    const isGood =
      normalized === "good" ||
      normalized === "normal" ||
      normalized === "working";
    const isBad = [
      "damaged",
      "leak",
      "weak",
      "noisy",
      "dirty",
      "not working",
      "non-functional",
    ].some((value) => normalized.includes(value));

    if (isGood) {
      return "bg-emerald-500 text-white border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]";
    }

    if (isBad) {
      return "bg-rose-500 text-white border-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.2)]";
    }

    return "bg-blue-600 text-white border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.2)]";
  }

  return "border-[#d7deea] bg-white text-[#22416f] hover:bg-[#f8fbff]";
};

const getExclusiveExteriorOption = (
  field: FormFieldI,
  optionValue: string,
  injectedOptions: Record<string, { label: string; value: string }[]>,
) => {
  const options = injectedOptions[field.fieldKey] ?? field.options ?? [];
  const matchedOption = options.find(
    (option) => String(option.value) === optionValue,
  );
  const normalized = (
    matchedOption?.label ??
    matchedOption?.value ??
    optionValue
  )
    .trim()
    .toLowerCase();

  if (normalized === "good" || normalized === "working") {
    return optionValue;
  }

  return null;
};

const getBulkSelectionValue = (
  field: FormFieldI,
  injectedOptions: Record<string, { label: string; value: string }[]>,
) => {
  const options = injectedOptions[field.fieldKey] ?? field.options ?? [];
  const matchedOption = options.find((option) => {
    const normalized = String(option.label ?? option.value).trim().toLowerCase();
    return normalized === "good" || normalized === "working";
  });

  return matchedOption ? String(matchedOption.value) : null;
};

const isBulkSelectedValue = (
  field: FormFieldI,
  value: unknown,
  injectedOptions: Record<string, { label: string; value: string }[]>,
) => {
  const bulkValue = getBulkSelectionValue(field, injectedOptions);
  if (!bulkValue) return false;

  if (field.type === "checkbox") {
    return (
      Array.isArray(value) &&
      value.length === 1 &&
      String(value[0]) === bulkValue
    );
  }

  return String(value ?? "") === bulkValue;
};

const ExteriorPanelIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 17h4" />
    <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
    <path d="M5 11h14v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
    <circle cx="7.5" cy="14.5" r="1.5" />
    <circle cx="16.5" cy="14.5" r="1.5" />
  </svg>
);

const EXTERIOR_BULK_EXCLUDED_SUBGROUPS = new Set([
  "Tyre Condition (Tread Remaining)",
  "Macro Status",
]);

const BASIC_DETAILS_DESCRIPTIONS: Record<string, string> = {
  "Seller Info":
    "Collect the seller's core contact details for ownership verification.",
  "Registration Details":
    "Capture the vehicle's registration and RC ownership information.",
  "Vehicle Specs & Dates":
    "Document model details, technical specs, and registration timelines.",
  "Condition & Pricing":
    "Record the asking price and key ownership or condition disclosures.",
};

const DOCUMENTS_DESCRIPTIONS: Record<string, string> = {
  "Registration Certificate (RC)":
    "Upload the RC images and capture any transfer or mismatch details.",
  "Insurance Policy":
    "Verify the insurance type, validity, policy details, and mismatch status.",
  "Finance & RTO Details":
    "Record hypothecation, NOC, Form 35, and related finance information.",
  "Document Remarks (Select all that apply)":
    "Tag any document-side concerns or exceptions noticed during evaluation.",
};

const ENGINE_DESCRIPTIONS: Record<string, string> = {
  "Engine & Mechanical Overview":
    "Capture engine bay media and assess major mechanical systems.",
  "Final Notes & Gearbox":
    "Document gearbox-specific observations and any final engine remarks.",
};

const OBJECT_VALUE_FIELDS = new Set(["car_brand", "car_model", "car_variant"]);

const ENGINE_OVERVIEW_KEYS = new Set([
  "engine_compartment_image",
  "engine_idle_start_video",
  "engine_sound",
  "smoke",
]);

const ENGINE_FINAL_NOTE_KEYS = new Set([
  "gearbox_leakage",
  "engine_comments",
]);

const ENGINE_SYSTEM_ORDER = [
  "engine_condition",
  "battery",
  "radiator",
  "starting_motor",
  "coolant",
  "blowby_back_compression",
  "silencer",
  "clutch_operations",
  "gearbox",
  "engine_oil",
  "turbo_charger",
  "engine_mount",
  "sump",
];

const DynamicFormSection = ({
  fields,
  fieldGroups,
  sectionLabel,
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
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [showPanelInfo, setShowPanelInfo] = useState(false);
  const [isPortalMounted, setIsPortalMounted] = useState(false);

  // Track previous dependency values to detect changes and clear children
  const prevDepsRef = useRef<Record<string, string>>({});

  /**
   * Fetch options for a resolved endpoint URL
   */
  const fetchOptionsForEndpoint = useCallback(
    async (resolvedEndpoint: string) => {
      if (
        endpointOptions[resolvedEndpoint] ||
        loadingEndpoints[resolvedEndpoint]
      )
        return;

      setLoadingEndpoints((prev) => ({ ...prev, [resolvedEndpoint]: true }));

      try {
        const options = await fetchCatalogueOptions(resolvedEndpoint);
        setEndpointOptions((prev) => ({
          ...prev,
          [resolvedEndpoint]: options,
        }));
      } catch (error) {
        console.error(
          `Failed to fetch options from endpoint: ${resolvedEndpoint}`,
          error,
        );
        setEndpointOptions((prev) => ({ ...prev, [resolvedEndpoint]: [] }));
      } finally {
        setLoadingEndpoints((prev) => ({ ...prev, [resolvedEndpoint]: false }));
      }
    },
    [endpointOptions, loadingEndpoints],
  );

  // Detect parent field changes and clear dependent child fields
  useEffect(() => {
    setIsPortalMounted(true);
  }, []);

  useEffect(() => {
    const cascadingFields = fields.filter(
      (f) => f.endpoint && getEndpointDependencies(f.endpoint).length > 0,
    );

    const depFieldKeys = new Set<string>();
    cascadingFields.forEach((f) => {
      getEndpointDependencies(f.endpoint!).forEach((dep) =>
        depFieldKeys.add(dep),
      );
    });

    const currentDeps: Record<string, string> = {};
    depFieldKeys.forEach((key) => {
      const rawVal = data[key];
      currentDeps[key] =
        rawVal && typeof rawVal === "object" && rawVal.id !== undefined
          ? String(rawVal.id)
          : String(rawVal ?? "");
    });

    const changedKeys = new Set<string>();
    depFieldKeys.forEach((key) => {
      if (
        prevDepsRef.current[key] !== undefined &&
        prevDepsRef.current[key] !== currentDeps[key]
      ) {
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
        if (
          resolved &&
          !endpointOptions[resolved] &&
          !loadingEndpoints[resolved]
        ) {
          fetchOptionsForEndpoint(resolved);
        }
      }
    });
  }, [
    fields,
    data,
    fetchOptionsForEndpoint,
    endpointOptions,
    loadingEndpoints,
  ]);

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
            label={field.isRequired ? `${field.label} *` : field.label}
            type="text"
            name={commonKey}
            placeholder={
              field.placeholder || `Enter ${field.label.toLowerCase()}`
            }
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
              placeholder={
                field.placeholder || `Enter ${field.label.toLowerCase()}`
              }
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
            label={field.isRequired ? `${field.label} *` : field.label}
            type="number"
            name={commonKey}
            placeholder={
              field.placeholder || `Enter ${field.label.toLowerCase()}`
            }
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
            label={field.isRequired ? `${field.label} *` : field.label}
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
            label={field.isRequired ? `${field.label} *` : field.label}
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
            label={field.isRequired ? `${field.label} *` : field.label}
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
          (resolvedEndpoint ? loadingEndpoints[resolvedEndpoint] : true); // still loading if can't resolve yet

        const selectOptions = hasInjectedOptions
          ? injectedOptions[commonKey]
          : isEndpointField
            ? resolvedEndpoint
              ? endpointOptions[resolvedEndpoint] || []
              : []
            : field.options || [];

        // Extract the string ID from object-valued fields for the Select component
        const selectValue =
          isObjectValueField && value && typeof value === "object" && value.id
            ? [String(value.id)]
            : Array.isArray(value)
              ? value
              : value
                ? [value]
                : [];

        return (
          <div key={field.id} className="w-full">
            <ConditionSelect
              label={field.isRequired ? `${field.label} *` : field.label}
              options={selectOptions}
              value={selectValue}
              onChange={(val) => {
                const selectedId = val.length === 1 ? val[0] : val;

                if (isObjectValueField && typeof selectedId === "string") {
                  // Store as { id, label } object for car_brand, car_model, car_variant
                  const selectedOption = selectOptions.find(
                    (opt) => opt.value === selectedId,
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
            <SegmentedRadio
              name={commonKey}
              options={radioOptions.map((opt) => ({
                label: opt.label,
                value: opt.value,
              }))}
              value={value}
              onChange={(selectedValue) =>
                onChange({ [commonKey]: selectedValue })
              }
            />
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
              {(field.options || []).map(
                (
                  opt: { value: string; label: string | undefined },
                  idx: number,
                ) => {
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
                },
              )}
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

  const hasValue = (value: unknown) => {
    if (Array.isArray(value)) return value.length > 0;
    if (value instanceof File) return true;
    if (value && typeof value === "object") {
      return Object.keys(value).length > 0;
    }

    return value !== undefined && value !== null && value !== "";
  };

  const isFieldCompleted = (field: FormFieldI) => {
    if (!isFieldVisible(field, data)) return true;
    return hasValue(data[field.fieldKey]);
  };

  const getFieldOptions = (field: FormFieldI) => {
    const hasInjectedOptions = !!injectedOptions[field.fieldKey];
    if (hasInjectedOptions) return injectedOptions[field.fieldKey];

    if (field.endpoint) {
      const resolvedEndpoint = resolveEndpoint(field.endpoint, data);
      if (resolvedEndpoint && endpointOptions[resolvedEndpoint]) {
        return endpointOptions[resolvedEndpoint];
      }
    }

    if (
      sectionLabel?.toLowerCase().includes("exterior") &&
      (field.label.toLowerCase().includes("condition") ||
        field.fieldKey.toLowerCase().includes("condition") ||
        field.fieldKey.toLowerCase().includes("status"))
    ) {
      return field.options?.length ? field.options : EXTERIOR_STATUS_FALLBACK;
    }

    return field.options || [];
  };

  const getFieldSummary = (field: FormFieldI) => {
    const value = data[field.fieldKey];
    const options = getFieldOptions(field);

    if (Array.isArray(value)) {
      return value
        .map(
          (item) =>
            options.find((option) => option.value === item)?.label || String(item),
        )
        .join(", ");
    }

    if (value && typeof value === "object" && "label" in value) {
      return String(value.label);
    }

    if (typeof value === "string" || typeof value === "number") {
      return (
        options.find((option) => option.value === String(value))?.label ||
        String(value)
      );
    }

    return "";
  };

  const updateExteriorChoice = (field: FormFieldI, nextValue: string) => {
    const currentValue = data[field.fieldKey];

    if (field.type === "checkbox") {
      const currentValues = Array.isArray(currentValue) ? currentValue : [];
      const exclusiveValue = getExclusiveExteriorOption(
        field,
        nextValue,
        injectedOptions,
      );
      const currentExclusiveValue = currentValues.find((value) =>
        getExclusiveExteriorOption(field, String(value), injectedOptions),
      );

      let updatedValues: string[];

      if (currentValues.includes(nextValue)) {
        updatedValues = currentValues.filter((value) => value !== nextValue);
      } else if (exclusiveValue) {
        updatedValues = [exclusiveValue];
      } else {
        updatedValues = currentExclusiveValue
          ? [...currentValues.filter((value) => value !== currentExclusiveValue), nextValue]
          : [...currentValues, nextValue];
      }

      onChange({ [field.fieldKey]: updatedValues });
      return;
    }

    if (field.type === "select") {
      onChange({ [field.fieldKey]: nextValue });
      return;
    }

    onChange({ [field.fieldKey]: nextValue });
  };

  const renderExteriorField = (field: FormFieldI) => {
    if (!isFieldVisible(field, data)) return null;

    const commonKey = field.fieldKey;
    const value = data[commonKey];

    if (
      (field.type === "radio" || field.type === "checkbox" || field.type === "select") &&
      getFieldOptions(field).length > 0
    ) {
      const options = getFieldOptions(field);
      const selectedValues = Array.isArray(value)
        ? value.map(String)
        : value !== undefined && value !== null && value !== ""
          ? [String(value)]
          : [];

      return (
        <div className="w-full">
          <label className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-[#5c78a3]">
            {field.label}
          </label>
          <div className="flex flex-wrap gap-3">
            {options.map((option) => {
              const isSelected = selectedValues.includes(String(option.value));

              return (
                <button
                  key={`${commonKey}_${option.value}`}
                  type="button"
                  onClick={() => updateExteriorChoice(field, String(option.value))}
                  className={`rounded-full border px-[14px] py-[7px] text-[13px] font-medium leading-[20px] transition-colors ${
                    getExteriorOptionClasses(option.label, isSelected)
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (field.type === "file") {
      return (
        <div className="w-full md:max-w-[320px]">
          <ImageUpload
            key={field.id}
            label={field.label}
            required={field.isRequired}
            onFileSelect={(file) => onChange({ [commonKey]: file })}
          />
        </div>
      );
    }

    return renderField(field);
  };

  const getGroupProgress = (group: FormFieldGroupI) => {
    const visibleFields = group.fields.filter((field) =>
      isFieldVisible(field, data),
    );

    if (visibleFields.length === 0) {
      return { completed: 0, total: 0, isComplete: false };
    }

    const completed = visibleFields.filter(isFieldCompleted).length;

    return {
      completed,
      total: visibleFields.length,
      isComplete: completed === visibleFields.length,
    };
  };

  const markGroupedFieldsGood = () => {
    const eligibleFields = fieldGroups.flatMap((group) =>
      EXTERIOR_BULK_EXCLUDED_SUBGROUPS.has(group.subgroup ?? "")
        ? []
        : group.fields.filter(
            (field) =>
              isFieldVisible(field, data) &&
              getBulkSelectionValue(field, injectedOptions) !== null,
          ),
    );
    const shouldReset =
      eligibleFields.length > 0 &&
      eligibleFields.every((field) =>
        isBulkSelectedValue(field, data[field.fieldKey], injectedOptions),
      );
    const nextData: Record<string, unknown> = {};

    eligibleFields.forEach((field) => {
      const bulkValue = getBulkSelectionValue(field, injectedOptions);
      if (!bulkValue) return;

      nextData[field.fieldKey] = shouldReset
        ? field.type === "checkbox"
          ? []
          : ""
        : field.type === "checkbox"
          ? [bulkValue]
          : bulkValue;
    });

    if (Object.keys(nextData).length > 0) {
      onChange(nextData);
    }
  };

  const renderExteriorLayout = () => {
    const groupedCards = fieldGroups.filter((group) => group.subgroup);
    const standaloneGroups = fieldGroups.filter((group) => !group.subgroup);
    const completedGroups = groupedCards.filter(
      (group) => getGroupProgress(group).isComplete,
    ).length;
    const totalGroups = groupedCards.length;
    const progress = totalGroups > 0 ? (completedGroups / totalGroups) * 100 : 0;
    const eligibleFields = fieldGroups.flatMap((group) =>
      EXTERIOR_BULK_EXCLUDED_SUBGROUPS.has(group.subgroup ?? "")
        ? []
        : group.fields.filter(
            (field) =>
              isFieldVisible(field, data) &&
              getBulkSelectionValue(field, injectedOptions) !== null,
          ),
    );
    const areAllItemsMarkedGood =
      eligibleFields.length > 0 &&
      eligibleFields.every((field) =>
        isBulkSelectedValue(field, data[field.fieldKey], injectedOptions),
      );

    return (
      <div className="flex flex-col gap-6 pb-12">
        {groupedCards.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-950">
                  <ExteriorPanelIcon className="h-5 w-5 shrink-0 text-blue-500" />
                  Exterior Panel Inspection
                  <button
                    type="button"
                    onClick={() => setShowPanelInfo(true)}
                    className="text-slate-400 transition-colors hover:text-blue-500"
                    aria-label="Open exterior panel inspection info"
                  >
                    <svg
                      className="h-[18px] w-[18px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </button>
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select condition for all {totalGroups} exterior points. (
                  {completedGroups} completed)
                </p>
              </div>
              <button
                type="button"
                onClick={markGroupedFieldsGood}
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition-all ${
                  areAllItemsMarkedGood
                    ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                <svg
                  className="h-[18px] w-[18px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {areAllItemsMarkedGood ? (
                    <>
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </>
                  ) : (
                    <path d="M20 6L9 17l-5-5" />
                  )}
                </svg>
                {areAllItemsMarkedGood ? "Reset All" : "Mark All Good"}
              </button>
            </div>

            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {groupedCards.map((group) => {
                const title = group.subgroup || "Group";
                const isExpanded = expandedGroup === title;
                const groupProgress = getGroupProgress(group);
                const summary = group.fields
                  .map((field) => getFieldSummary(field))
                  .filter(Boolean)
                  .join(", ");

                return (
                  <div
                    key={title}
                    className={`overflow-hidden rounded-2xl border-2 bg-white transition-all ${
                      isExpanded
                        ? "border-[#2f73ff] shadow-[0_6px_18px_rgba(47,115,255,0.16)] md:col-span-2 xl:col-span-3"
                        : "border-[#d9e2ef] hover:border-[#c9d7ea]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedGroup(isExpanded ? null : title)}
                      className="flex w-full items-center justify-between gap-4 px-[22px] py-[18px] text-left"
                    >
                      <div className="flex items-center gap-3">
                        {groupProgress.isComplete ? (
                          <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-[#00c98d] text-[#00c98d]">
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          </div>
                        ) : (
                          <div
                            className={`h-[7px] w-[7px] rounded-full ${
                              isExpanded ? "bg-[#2f73ff]" : "bg-[#d9e2ef]"
                            }`}
                          />
                        )}
                        <span className="text-[16px] font-semibold leading-6 text-[#1f3f6f]">
                          {title}
                        </span>
                      </div>
                      {!isExpanded && summary ? (
                        <span className="max-w-[180px] truncate text-[14px] font-semibold leading-5 text-[#8ea2c6]">
                          {summary}
                        </span>
                      ) : null}
                    </button>

                    <AnimatePresence initial={false} mode="wait">
                      {isExpanded && (
                        <motion.div
                          key={`${title}-content`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.16, ease: "easeOut" },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#edf2f8] bg-[#f7f9fc] px-[22px] py-5">
                            <div className="grid grid-cols-1 gap-4">
                              {group.fields.map((field) => (
                                <div key={field.id}>{renderExteriorField(field)}</div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isPortalMounted &&
          createPortal(
            <AnimatePresence>
              {showPanelInfo && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-[560px] overflow-hidden rounded-[22px] bg-white shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
                      <h4 className="flex items-center gap-2 text-[18px] font-bold leading-none text-[#18181b]">
                        <ExteriorPanelIcon className="h-5 w-5 shrink-0 text-blue-500" />
                        Exterior Panel Inspection Info
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowPanelInfo(false)}
                        className="rounded-full bg-[#f1f1f5] p-2 text-[#7a7a8c] transition-colors hover:text-slate-900"
                        aria-label="Close exterior panel inspection info"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-col gap-4 p-5">
                      <div className="h-48 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        <img
                          src="https://images.unsplash.com/photo-1769971361854-9e0927a2d8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBwYXJ0cyUyMGRpYWdyYW18ZW58MXx8fHwxNzc2ODM5MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Exterior panel inspection reference"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-sm leading-relaxed text-[#717182]">
                        Carefully examine each panel for scratches, dents, and
                        paint consistency. If multiple panels have been
                        repainted or replaced, this is a strong indicator of a
                        major accident. Remember to open the hood and trunk to
                        inspect the inner apron and pillar conditions!
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowPanelInfo(false)}
                        className="mt-2 w-full rounded-md bg-[#030213] py-2.5 text-base font-bold text-white transition-all hover:bg-[#10101d]"
                      >
                        Got it!
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body,
          )}

        {standaloneGroups.map((group, index) => {
          const visibleFields = group.fields.filter((field) =>
            isFieldVisible(field, data),
          );
          if (visibleFields.length === 0) return null;

          const hasMedia = visibleFields.every(
            (field) => field.type === "file",
          );
          const title =
            visibleFields[0]?.subgroup ||
            visibleFields[0]?.label ||
            `${sectionLabel || "Exterior"} ${index + 1}`;

          return (
            <div
              key={`${title}-${index}`}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-950 sm:text-xl">
                  {title}
                </h3>
              </div>

              <div
                className={
                  hasMedia
                    ? "grid grid-cols-2 gap-4 md:grid-cols-4"
                    : "grid grid-cols-1 gap-4 md:grid-cols-2"
                }
              >
                {visibleFields.map((field) => (
                  <div
                    key={field.id}
                    className={
                      !hasMedia && field.type === "textarea" ? "md:col-span-2" : ""
                    }
                  >
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBasicField = (field: FormFieldI) => {
    if (!isFieldVisible(field, data)) return null;

    const commonKey = field.fieldKey;
    const value = data[commonKey];
    const label = field.isRequired ? `${field.label} *` : field.label;
    const baseLabelClass =
      "mb-2 flex items-center text-sm font-medium leading-none text-slate-800";
    const baseInputClass =
      "h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

    switch (field.type) {
      case "textfield":
      case "text":
      case "number":
      case "email":
      case "phone":
      case "date":
      case "datepicker": {
        const typeMap: Record<string, string> = {
          textfield: "text",
          text: "text",
          number: "number",
          email: "email",
          phone: "tel",
          date: "date",
          datepicker: "date",
        };

        return (
          <div key={field.id} className="w-full">
            <label className={baseLabelClass}>{label}</label>
            <input
              type={typeMap[field.type] ?? "text"}
              name={commonKey}
              value={value || ""}
              min={field.validation?.min}
              max={field.validation?.max}
              placeholder={
                field.placeholder || `Enter ${field.label.toLowerCase()}`
              }
              onChange={(e) => onChange({ [commonKey]: e.target.value })}
              className={baseInputClass}
            />
          </div>
        );
      }

      case "textarea":
        return (
          <div key={field.id} className="w-full">
            <label className={baseLabelClass}>{label}</label>
            <textarea
              name={commonKey}
              rows={4}
              value={value || ""}
              placeholder={
                field.placeholder || `Enter ${field.label.toLowerCase()}`
              }
              onChange={(e) => onChange({ [commonKey]: e.target.value })}
              className="min-h-20 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        );

      case "select": {
        const hasInjectedOptions = !!injectedOptions[commonKey];
        const isEndpointField = !hasInjectedOptions && !!field.endpoint;
        const resolvedEndpoint = isEndpointField
          ? resolveEndpoint(field.endpoint!, data)
          : null;
        const selectOptions = hasInjectedOptions
          ? injectedOptions[commonKey]
          : isEndpointField
            ? resolvedEndpoint
              ? endpointOptions[resolvedEndpoint] || []
              : []
            : field.options || [];
        const isLoading =
          isEndpointField &&
          (resolvedEndpoint ? loadingEndpoints[resolvedEndpoint] : true);
        const selectedValue =
          OBJECT_VALUE_FIELDS.has(commonKey) &&
          value &&
          typeof value === "object" &&
          value.id
            ? String(value.id)
            : String(value ?? "");

        return (
          <div key={field.id} className="w-full">
            <label className={baseLabelClass}>{label}</label>
            <select
              name={commonKey}
              value={selectedValue}
              onChange={(e) => {
                const selectedId = e.target.value;

                if (!selectedId) {
                  onChange({ [commonKey]: "" });
                  return;
                }

                if (OBJECT_VALUE_FIELDS.has(commonKey)) {
                  const selectedOption = selectOptions.find(
                    (option) => option.value === selectedId,
                  );
                  onChange({
                    [commonKey]: {
                      id: selectedId,
                      label: selectedOption?.label || selectedId,
                    },
                  });
                  return;
                }

                onChange({ [commonKey]: selectedId });
              }}
              className={baseInputClass}
            >
              <option value="">
                {isLoading
                  ? "Loading options..."
                  : field.placeholder || `Select ${field.label}`}
              </option>
              {selectOptions.map((option) => (
                <option key={`${commonKey}_${option.value}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      }

      case "radio": {
        const hasInjectedRadioOptions = !!injectedOptions[commonKey];
        let radioOptions = hasInjectedRadioOptions
          ? injectedOptions[commonKey]
          : field.options || [];

        if (!hasInjectedRadioOptions && field.endpoint) {
          const resolvedEp = resolveEndpoint(field.endpoint, data);
          if (resolvedEp && endpointOptions[resolvedEp]) {
            radioOptions = endpointOptions[resolvedEp];
          }
        }

        return (
          <div key={field.id} className="w-full">
            <label className={baseLabelClass}>{label}</label>
            <SegmentedRadio
              name={commonKey}
              options={radioOptions.map((opt) => ({
                label: opt.label,
                value: opt.value,
              }))}
              value={value}
              onChange={(selectedValue) =>
                onChange({ [commonKey]: selectedValue })
              }
              className="!rounded-md !bg-slate-100 !p-1"
              optionClassName="!rounded-sm !px-3 !py-1.5 !text-sm !font-medium sm:!text-sm"
            />
          </div>
        );
      }

      case "checkbox":
        return (
          <div key={field.id} className="w-full">
            <label className={baseLabelClass}>{label}</label>
            <div className="flex flex-wrap gap-4 rounded-md border border-slate-200 bg-white p-3">
              {(field.options || []).map((opt, idx) => {
                const currentValues: string[] = Array.isArray(value) ? value : [];
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

      default:
        return renderField(field);
    }
  };

  const renderBasicDetailsLayout = () => {
    const groupsToRender =
      fieldGroups.length > 0
        ? [...fieldGroups].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        : [{ subgroup: null, order: 0, fields }];

    return (
      <div className="flex flex-col gap-4 pb-8">
        {groupsToRender.map((group, index) => {
          const visibleFields = [...group.fields]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .filter((field) => isFieldVisible(field, data));

          if (visibleFields.length === 0) return null;

          const title = group.subgroup || `${sectionLabel || "Basic Details"} ${index + 1}`;
          const description = BASIC_DETAILS_DESCRIPTIONS[title];

          return (
            <section
              key={`${title}_${index}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 border-b border-slate-200 pb-3">
                <h3 className="text-base font-semibold tracking-tight text-slate-950">
                  {title}
                </h3>
                {description ? (
                  <p className="mt-1 text-sm text-slate-500">{description}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {visibleFields.map((field) => (
                  <div
                    key={field.id}
                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    {renderBasicField(field)}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  };

  const renderCompactCheckboxField = (field: FormFieldI) => {
    const value = data[field.fieldKey];
    const currentValues: string[] = Array.isArray(value) ? value : [];

    return (
      <div className="w-full">
        <label className="mb-3 block text-sm font-medium leading-none text-slate-800">
          {field.isRequired ? `${field.label} *` : field.label}
        </label>
        <div className="flex flex-wrap gap-2">
          {(field.options || []).map((opt, idx) => {
            const isSelected = currentValues.includes(opt.value);

            return (
              <button
                key={`${field.fieldKey}_${opt.value}_${idx}`}
                type="button"
                onClick={() => {
                  const newValues = isSelected
                    ? currentValues.filter((v) => v !== opt.value)
                    : [...currentValues, opt.value];
                  onChange({ [field.fieldKey]: newValues });
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCompactSingleChoiceField = (field: FormFieldI) => {
    const value = data[field.fieldKey];
    const selectedValue = String(value ?? "");

    return (
      <div className="w-full">
        <label className="mb-3 block text-sm font-medium leading-none text-slate-800">
          {field.isRequired ? `${field.label} *` : field.label}
        </label>
        <div className="flex flex-wrap gap-2">
          {(field.options || []).map((opt, idx) => {
            const isSelected = selectedValue === String(opt.value);

            return (
              <button
                key={`${field.fieldKey}_${opt.value}_${idx}`}
                type="button"
                onClick={() => onChange({ [field.fieldKey]: opt.value })}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDocumentsLayout = () => {
    const groupsToRender =
      fieldGroups.length > 0
        ? [...fieldGroups].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        : [{ subgroup: null, order: 0, fields }];

    return (
      <div className="flex flex-col gap-5 pb-8">
        {groupsToRender.map((group, index) => {
          const visibleFields = [...group.fields]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .filter((field) => isFieldVisible(field, data));

          if (visibleFields.length === 0) return null;

          const title =
            group.subgroup || `${sectionLabel || "Documents"} ${index + 1}`;
          const description = DOCUMENTS_DESCRIPTIONS[title];
          const fileFields = visibleFields.filter((field) => field.type === "file");
          const nonFileFields = visibleFields.filter((field) => field.type !== "file");
          const isRemarksGroup = title === "Document Remarks (Select all that apply)";

          return (
            <section
              key={`${title}_${index}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              {title ? (
                <div className="mb-4 border-b border-slate-200 pb-3">
                  <h3 className="text-base font-semibold tracking-tight text-slate-950">
                    {title}
                  </h3>
                  {description ? (
                    <p className="mt-1 text-sm text-slate-500">{description}</p>
                  ) : null}
                </div>
              ) : null}

              {fileFields.length > 0 ? (
                <div
                  className={`grid gap-4 ${
                    title === "Registration Certificate (RC)"
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
                  {fileFields.map((field) => (
                    <div
                      key={field.id}
                      className={
                        title === "Insurance Policy" &&
                        field.fieldKey === "insurance_image"
                          ? "md:max-w-[320px]"
                          : title === "Finance & RTO Details" &&
                              (field.fieldKey === "chassis_impression_image" ||
                                field.fieldKey === "loan_noc_image" ||
                                field.fieldKey === "form_35_image")
                            ? "md:max-w-[320px]"
                            : ""
                      }
                    >
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              ) : null}

              {fileFields.length > 0 && nonFileFields.length > 0 ? (
                <div className="mt-4" />
              ) : null}

              {isRemarksGroup ? (
                nonFileFields.map((field) => (
                  <div key={field.id}>
                    {field.type === "checkbox"
                      ? renderCompactCheckboxField(field)
                      : renderBasicField(field)}
                  </div>
                ))
              ) : (
                <div
                  className={`grid gap-4 ${
                    title === "Finance & RTO Details"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
                  {nonFileFields.map((field) => {
                    const isWideRadio =
                      title === "Insurance Policy" &&
                      field.fieldKey === "insurance_type";
                    const isWideText =
                      title === "Registration Certificate (RC)" &&
                      field.fieldKey === "rc_mismatch_remarks";

                    return (
                      <div
                        key={field.id}
                        className={
                          isWideRadio || isWideText || field.type === "textarea"
                            ? "md:col-span-2 xl:col-span-3"
                            : ""
                        }
                      >
                        {field.type === "checkbox"
                          ? renderCompactCheckboxField(field)
                          : renderBasicField(field)}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    );
  };

  const renderEngineSystemCard = (
    field: FormFieldI,
    imageField?: FormFieldI,
  ) => {
    const visibleImageField =
      imageField && isFieldVisible(imageField, data) ? imageField : null;

    return (
      <div
        key={field.id}
        className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4"
      >
        <h4 className="text-sm font-bold text-slate-800">{field.label}</h4>
        {field.type === "checkbox"
          ? renderCompactCheckboxField(field)
          : renderBasicField(field)}
        {visibleImageField ? (
          <div className="mt-1 w-full md:w-2/3">{renderField(visibleImageField)}</div>
        ) : null}
      </div>
    );
  };

  const renderEngineLayout = () => {
    const sortedFields = [...fields]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .filter((field) => isFieldVisible(field, data));

    const fieldMap = new Map(sortedFields.map((field) => [field.fieldKey, field]));
    const overviewFields = sortedFields.filter((field) =>
      ENGINE_OVERVIEW_KEYS.has(field.fieldKey),
    );
    const finalNoteFields = sortedFields.filter((field) =>
      ENGINE_FINAL_NOTE_KEYS.has(field.fieldKey),
    );
    const systemCards = ENGINE_SYSTEM_ORDER.map((baseKey) => {
      const field = fieldMap.get(baseKey);
      if (!field) return null;

      return {
        field,
        imageField: fieldMap.get(`${baseKey}_image`),
      };
    }).filter(Boolean) as { field: FormFieldI; imageField?: FormFieldI }[];

    const overviewMediaFields = overviewFields.filter(
      (field) =>
        field.fieldKey === "engine_compartment_image" ||
        field.fieldKey === "engine_idle_start_video",
    );
    const overviewControlFields = overviewFields.filter(
      (field) =>
        field.fieldKey !== "engine_compartment_image" &&
        field.fieldKey !== "engine_idle_start_video",
    );

    return (
      <div className="flex flex-col gap-5 pb-12">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 border-b border-slate-200 pb-3">
            <h3 className="text-base font-semibold tracking-tight text-slate-950">
              Engine & Mechanical Overview
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {ENGINE_DESCRIPTIONS["Engine & Mechanical Overview"]}
            </p>
          </div>

          {overviewMediaFields.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {overviewMediaFields.map((field) => (
                <div key={field.id}>{renderField(field)}</div>
              ))}
            </div>
          ) : null}

          {overviewMediaFields.length > 0 && overviewControlFields.length > 0 ? (
            <div className="mt-4" />
          ) : null}

          {overviewControlFields.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {overviewControlFields.map((field) => (
                <div
                  key={field.id}
                  className={field.fieldKey === "smoke" ? "md:col-span-2" : ""}
                >
                  {field.fieldKey === "engine_sound" || field.fieldKey === "smoke"
                    ? renderCompactSingleChoiceField(field)
                    : field.type === "checkbox"
                    ? renderCompactCheckboxField(field)
                    : renderBasicField(field)}
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {systemCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {systemCards.map(({ field, imageField }) =>
              renderEngineSystemCard(field, imageField),
            )}
          </div>
        ) : null}

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 border-b border-slate-200 pb-3">
            <h3 className="text-base font-semibold tracking-tight text-slate-950">
              Final Notes & Gearbox
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {ENGINE_DESCRIPTIONS["Final Notes & Gearbox"]}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {finalNoteFields.map((field) => (
              <div key={field.id}>
                {field.type === "checkbox"
                  ? renderCompactCheckboxField(field)
                  : renderBasicField(field)}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  if (fields.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        <p className="text-lg">No fields configured for this section.</p>
      </div>
    );
  }

  if (sectionLabel?.toLowerCase().includes("exterior")) {
    return renderExteriorLayout();
  }

  if (sectionLabel?.toLowerCase().includes("basic")) {
    return renderBasicDetailsLayout();
  }

  if (sectionLabel?.toLowerCase().includes("document")) {
    return renderDocumentsLayout();
  }

  if (sectionLabel?.toLowerCase().includes("engine")) {
    return renderEngineLayout();
  }

  return (
    <div className="space-y-5">
      {fieldGroups.map((group) => {
        if (!group.subgroup) {
          return group.fields.map((field) => {
            return <div key={field.id}>{renderField(field)}</div>;
          });
        } else {
          return (
            <div className='border border-gray-200 rounded-2xl space-y-4 p-5' key={group.subgroup}>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {group.subgroup}
              </h3>
              <div className="border-b border-gray-200"></div>
              <div className="grid md:grid-cols-2 gap-2">
                {group.fields.map((field) => {
                  return <div key={field.id}>{renderField(field)}</div>;
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default DynamicFormSection;
