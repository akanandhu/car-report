'use client';
import { StepperTabsProps } from "./types";

const StepperTabs = ({
  sections,
  activeSection,
  onSectionChange,
  className = "",
  maxAccessibleSection = sections.length - 1,
}: StepperTabsProps) => {
  return (
    <div
      className={`hide-scrollbar flex gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1.5 ${className}`}
    >
      {sections.map((section, index) => {
        const isActive = index === activeSection;
        const isDisabled = index > maxAccessibleSection;

        return (
          <button
            key={section.id}
            type="button"
            disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) onSectionChange(index);
            }}
            className={`shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white text-slate-950 shadow-sm"
                : isDisabled
                  ? "cursor-not-allowed bg-transparent text-slate-300"
                  : "bg-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            }`}
          >
            <span
              className={`mr-2 text-xs ${
                isActive
                  ? "text-slate-500"
                  : isDisabled
                    ? "text-slate-300"
                    : "text-slate-400"
              }`}
            >
              {index + 1}
            </span>
            {section.label}
          </button>
        );
      })}
    </div>
  );
};

export default StepperTabs;
