import Progress from "@/src/components/Progress";
import StepperTabs from "@/src/components/StepperTabs";
import { CarFormHeadPropsI } from "./types";
import Button from "@/src/components/Button";
import Draft from "@/public/assets/svg/Draft";

const EvaluationFormHead = ({
  currentSection,
  sections,
  progress,
  handleSectionChange,
  handleSaveDraft,
  submitting,
}: CarFormHeadPropsI) => {
  return (
    <div className="sticky bg-white top-0 border-b border-gray-200 z-10">
      <div className="space-y-6 px-6 py-4">
        <span className="text-xs font-semibold text-[#6B7280]">
          STEP {currentSection + 1} OF {sections.length}
        </span>

        <div className="flex justify-between items-end mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold  text-black">
              {sections[currentSection]?.label}
            </span>
          </div>
          <Button
            variant="outlined"
            onClick={handleSaveDraft}
            disabled={submitting}
          >
            <div className="flex items-center gap-2">
              <Draft className="w-4 h-4" />
              <span className="font-semibold text-sm">Save Draft</span>
            </div>
          </Button>
        </div>

        <StepperTabs
          sections={sections}
          activeSection={currentSection}
          onSectionChange={handleSectionChange}
        />

        <Progress value={progress} />
      </div>
    </div>
  );
};

export default EvaluationFormHead;
