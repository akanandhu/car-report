import { StepperTabsProps } from "./types";

const StepperTabs = ({
  sections,
  activeSection,
  onSectionChange,
  className = "",
}: StepperTabsProps) => {
  return (
    <div className={`flex overflow-x-auto ${className}`}>
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(index)}
          className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            index === activeSection
              ? "border-slate-700 text-slate-700"
              : "border-transparent text-gray-600"
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
};

export default StepperTabs;

