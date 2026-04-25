'use client';
import { StepperTabsProps } from "./types";

const StepperTabs = ({
  sections,
  activeSection,
  onSectionChange,
  className = "",
}: StepperTabsProps) => {
  return (
    <div
      className={`flex overflow-x-auto gap-3 rounded-2xl bg-gray-100 p-2 ${className}`}
    >
      {sections.map((section, index) => {
        const isActive = index === activeSection;

        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(index)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-400  ${
              isActive
                ? "bg-white text-black shadow-md"
                : "bg-transparent hover:bg-gray-200 text-gray-500 hover:text-gray-700"
            }`}
          >
            <span
              className={`mr-2 ${isActive ? "text-gray-600" : "text-gray-400"}`}
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
