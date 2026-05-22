"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FormDataI, FormFieldI } from "../CarEvaluationForm/types";

type ExteriorSectionProps = {
  fields: FormFieldI[];
  data: FormDataI;
  onChange: (newData: Partial<FormDataI>) => void;
};

type ExteriorItem = {
  field: FormFieldI;
};

const INFO_IMAGE =
  "https://images.unsplash.com/photo-1769971361854-9e0927a2d8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBwYXJ0cyUyMGRpYWdyYW18ZW58MXx8fHwxNzc2ODM5MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const TYRE_INFO_IMAGE =
  "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlc3xlbnwxfHx8fDE3NzY4MzkxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const MACRO_INFO_IMAGE =
  "https://images.unsplash.com/photo-1533630217389-3a5e4dff5683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzc2ODM5MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080";

const TYRE_FIELD_KEYS = [
  "tyre_front_rhs",
  "tyre_rear_rhs",
  "spare_wheel",
  "jack_and_tool",
  "tyre_rear_lhs",
  "tyre_front_lhs",
];

const MACRO_FIELD_KEYS = ["missing_parts", "full_body_repaint"];

type InfoModalContent = {
  title: string;
  image: string;
  body: string;
};

const EXCLUDED_FIELD_KEYS = new Set([
  "front_image",
  "front_right_image",
  "right_image",
  "rear_right_image",
  "rear_left_image",
  "rear_image",
  "left_image",
  "front_left_image",
  "tyre_front_rhs",
  "tyre_rear_rhs",
  "spare_wheel",
  "jack_and_tool",
  "tyre_rear_lhs",
  "tyre_front_lhs",
  "missing_parts",
  "full_body_repaint",
]);

const getDisplayValue = (
  value: unknown,
  options: { label: string; value: string }[],
) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        const stringValue = String(item);
        return (
          options.find((option) => option.value === stringValue)?.label ||
          stringValue
        );
      })
      .join(", ");
  }

  if (typeof value === "string" || typeof value === "number") {
    const stringValue = String(value);
    return (
      options.find((option) => option.value === stringValue)?.label ||
      stringValue
    );
  }

  return "";
};

const getSelectedOptionClasses = (optionLabel: string) => {
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
};

const getExteriorOptionClasses = (
  optionLabel: string,
  isSelected: boolean,
) => {
  if (isSelected) {
    return getSelectedOptionClasses(optionLabel);
  }

  return "border-[#d7deea] bg-white text-[#22416f] hover:bg-[#f8fbff]";
};

const getExclusiveExteriorOption = (
  field: FormFieldI,
  optionValue: string,
) => {
  const matchedOption = field.options?.find(
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

const getBulkSelectionValue = (field: FormFieldI) => {
  const matchedOption = field.options?.find((option) => {
    const normalized = String(option.label ?? option.value).trim().toLowerCase();
    return normalized === "good" || normalized === "working";
  });

  return matchedOption ? String(matchedOption.value) : null;
};

const isBulkSelectedValue = (field: FormFieldI, value: unknown) => {
  const bulkValue = getBulkSelectionValue(field);
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

const ExteriorSection = ({ fields, data, onChange }: ExteriorSectionProps) => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<InfoModalContent | null>(null);
  const [portalMounted, setPortalMounted] = useState(false);

  useEffect(() => {
    setPortalMounted(true);
  }, []);

  const items = useMemo<ExteriorItem[]>(() => {
    return fields
      .filter((field) => field.type !== "file")
      .filter((field) => !EXCLUDED_FIELD_KEYS.has(field.fieldKey))
      .map((field) => ({ field }));
  }, [fields]);

  const completedCount = items.filter((item) => {
    const value = data[item.field.fieldKey];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;

  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  const tyreFields = useMemo(
    () =>
      TYRE_FIELD_KEYS.map((fieldKey) =>
        fields.find((field) => field.fieldKey === fieldKey),
      ).filter(Boolean) as FormFieldI[],
    [fields],
  );

  const macroFields = useMemo(
    () =>
      MACRO_FIELD_KEYS.map((fieldKey) =>
        fields.find((field) => field.fieldKey === fieldKey),
      ).filter(Boolean) as FormFieldI[],
    [fields],
  );

  const bulkSelectableItems = useMemo(
    () =>
      items.filter(({ field }) => getBulkSelectionValue(field) !== null),
    [items],
  );

  const areAllItemsMarkedGood = bulkSelectableItems.length > 0 &&
    bulkSelectableItems.every(({ field }) =>
      isBulkSelectedValue(field, data[field.fieldKey]),
    );

  const markAllGood = () => {
    const nextData: Record<string, unknown> = {};
    const shouldReset = areAllItemsMarkedGood;

    bulkSelectableItems.forEach(({ field }) => {
      const bulkValue = getBulkSelectionValue(field);
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

  const toggleOption = (field: FormFieldI, optionValue: string) => {
    const currentValue = data[field.fieldKey];

    if (field.type === "checkbox") {
      const currentValues = Array.isArray(currentValue) ? currentValue : [];
      const exclusiveValue = getExclusiveExteriorOption(field, optionValue);
      const currentExclusiveValue = currentValues.find((value) =>
        getExclusiveExteriorOption(field, String(value)),
      );

      let nextValues: string[];

      if (currentValues.includes(optionValue)) {
        nextValues = currentValues.filter((value) => value !== optionValue);
      } else if (exclusiveValue) {
        nextValues = [exclusiveValue];
      } else {
        nextValues = currentExclusiveValue
          ? [...currentValues.filter((value) => value !== currentExclusiveValue), optionValue]
          : [...currentValues, optionValue];
      }

      onChange({ [field.fieldKey]: nextValues });
      return;
    }

    onChange({ [field.fieldKey]: optionValue });
  };

  const renderInfoButton = (content: InfoModalContent) => (
    <button
      type="button"
      onClick={() => setInfoModal(content)}
      className="text-slate-400 transition-colors hover:text-blue-500"
      aria-label={`Open ${content.title} info`}
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
  );

  const renderChoiceField = (
    field: FormFieldI,
    labelOverride?: string,
    compact = false,
    useFigmaSegmented = false,
  ) => {
    const value = data[field.fieldKey];
    const options = field.options || [];
    const selectedValues = Array.isArray(value)
      ? value.map(String)
      : value !== undefined && value !== null && value !== ""
        ? [String(value)]
        : [];

    return (
      <div
        className={
          compact
            ? "rounded-xl border border-slate-200 bg-slate-50 p-3"
            : "w-full"
        }
      >
        <label
          className={
            compact
              ? "mb-2 block text-xs font-bold text-slate-700"
              : "mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-[#5c78a3]"
          }
        >
          {labelOverride || field.label}
        </label>
        <div
          className={
            useFigmaSegmented
              ? `flex flex-wrap gap-1 rounded-md bg-[#ececf0] p-1 ${compact ? "inline-flex" : "w-full"}`
              : "flex flex-wrap gap-3"
          }
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);

            return (
              <button
                key={`${field.fieldKey}_${option.value}`}
                type="button"
                onClick={() => toggleOption(field, String(option.value))}
                className={
                  useFigmaSegmented
                    ? `inline-flex min-w-9 flex-1 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-white text-[#030213] shadow-sm"
                          : "text-[#717182] hover:bg-white/50 hover:text-[#030213]"
                      }`
                    : `rounded-full border px-[14px] py-[7px] text-[13px] font-medium leading-[20px] transition-colors ${
                        getExteriorOptionClasses(option.label, isSelected)
                      }`
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-950">
              <ExteriorPanelIcon className="h-5 w-5 shrink-0 text-blue-500" />
              Exterior Panel Inspection
              {renderInfoButton({
                title: "Exterior Panel Inspection Info",
                image: INFO_IMAGE,
                body:
                  "Carefully examine each panel for scratches, dents, and paint consistency. If multiple panels have been repainted or replaced, this is a strong indicator of a major accident. Remember to open the hood and trunk to inspect the inner apron and pillar conditions!",
              })}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select condition for all {items.length} exterior points. (
              {completedCount} completed)
            </p>
          </div>
          <button
            type="button"
            onClick={markAllGood}
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
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 mt-5">
        {items.map(({ field }) => {
          const isExpanded = expandedKey === field.fieldKey;
          const summary = getDisplayValue(
            data[field.fieldKey],
            field.options || [],
          );
          const value = data[field.fieldKey];
          const isComplete = Array.isArray(value)
            ? value.length > 0
            : Boolean(value);
          const options = field.options || [];
          const selectedValues = Array.isArray(value)
            ? value.map(String)
            : value !== undefined && value !== null && value !== ""
              ? [String(value)]
              : [];

          return (
            <div
              key={field.fieldKey}
              className={`overflow-hidden rounded-2xl border-2 bg-white transition-all ${
                isExpanded
                  ? "border-[#2f73ff] shadow-[0_6px_18px_rgba(47,115,255,0.16)] md:col-span-2 xl:col-span-3"
                  : "border-[#d9e2ef] hover:border-[#c9d7ea]"
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedKey(isExpanded ? null : field.fieldKey)
                }
                className="flex w-full items-center justify-between gap-4 px-[22px] py-[18px] text-left"
              >
                <div className="flex items-center gap-3">
                  {isComplete ? (
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
                    {field.label}
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
                    key={`${field.fieldKey}-content`}
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
                      <label className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-[#5c78a3]">
                        CONDITION STATUS
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {options.map((option) => {
                          const isSelected = selectedValues.includes(
                            option.value,
                          );

                          return (
                            <button
                              key={`${field.fieldKey}_${option.value}`}
                              type="button"
                              onClick={() =>
                                toggleOption(field, String(option.value))
                              }
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {tyreFields.length > 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-950 sm:text-xl">
              Tyre Condition (Tread Remaining)
              {renderInfoButton({
                title: "Tyre Condition (Tread Remaining)",
                image: TYRE_INFO_IMAGE,
                body:
                  "Check the remaining tread depth of all 4 tires and the spare wheel. Ensure you also check for cracks, bubbles, or uneven wear on the sidewalls. Don't forget to verify the presence of the jack and toolkit.",
              })}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tyreFields.map((field) => (
              <div key={field.fieldKey}>
                {renderChoiceField(field, field.label, true, true)}
              </div>
            ))}
          </div>
        </div>
      )}

      {macroFields.length > 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-950 sm:text-xl">
              Macro Status
              {renderInfoButton({
                title: "Macro Status",
                image: MACRO_INFO_IMAGE,
                body:
                  "Log big picture details here, such as if the car has received a full body repaint which usually indicates major accident history. Also explicitly list any visibly missing exterior parts.",
              })}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {macroFields.map((field) => {
              if (field.type === "radio" || field.type === "checkbox") {
                return (
                  <div key={field.fieldKey}>
                    {renderChoiceField(field, field.label, false, true)}
                  </div>
                );
              }

              return (
                <div key={field.fieldKey} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-800">
                    {field.label}
                  </label>
                  <input
                    value={String(data[field.fieldKey] || "")}
                    onChange={(event) =>
                      onChange({ [field.fieldKey]: event.target.value })
                    }
                    placeholder={field.placeholder || ""}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-colors outline-none focus:border-[#2f73ff] focus:ring-2 focus:ring-[#dce9ff]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {portalMounted &&
        createPortal(
          <AnimatePresence>
            {infoModal && (
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
                      {infoModal.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setInfoModal(null)}
                      className="rounded-full bg-[#f1f1f5] p-2 text-[#7a7a8c] transition-colors hover:text-slate-900"
                      aria-label={`Close ${infoModal.title}`}
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
                        src={infoModal.image}
                        alt={infoModal.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-sm leading-relaxed text-[#717182]">
                      {infoModal.body}
                    </p>
                    <button
                      type="button"
                      onClick={() => setInfoModal(null)}
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
    </>
  );
};

export default ExteriorSection;
