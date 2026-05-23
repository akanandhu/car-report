'use client';
import { StepperTabsProps } from "./types";

const StepperTabs = ({
  sections,
  activeSection,
  onSectionChange,
  sectionsWithErrors = {},
  className = "",
}: StepperTabsProps) => {
  return (
    <div
      className={`hide-scrollbar flex gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1.5 ${className}`}
    >
      {sections.map((section, index) => {
        const isActive = index === activeSection;
        const hasError = !!sectionsWithErrors[index];

        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(index)}
            className={`relative shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white text-slate-950 shadow-sm"
                : "bg-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            }`}
          >
            <span
              className={`mr-2 text-xs ${isActive ? "text-slate-500" : "text-slate-400"}`}
            >
              {index + 1}
            </span>
            {section.label}
            {hasError && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StepperTabs;
