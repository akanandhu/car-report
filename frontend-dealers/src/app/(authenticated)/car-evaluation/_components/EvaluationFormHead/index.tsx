import Progress from "@/src/components/Progress";
import StepperTabs from "@/src/components/StepperTabs";
import { CarFormHeadPropsI } from "./types";
import Button from "@/src/components/Button";
import Draft from "@/public/assets/svg/Draft";
import { X } from "lucide-react";

const EvaluationFormHead = ({
  currentSection,
  sections,
  progress,
  handleSectionChange,
  handleSaveDraft,
  handleBack,
  submitting,
  canSaveDraft,
  maxAccessibleSection,
}: CarFormHeadPropsI) => {
  return (
    <div className="sticky top-0 z-20 shrink-0 border-b border-slate-200 bg-white">
      <div className="space-y-5 px-5 py-6 sm:px-8">
        <span className="text-xs sm:text-sm font-semibold text-[#717182] mb-1 tracking-wider uppercase">
          STEP {currentSection + 1} OF {sections.length}
        </span>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <span className="block truncate text-2xl font-semibold tracking-tight text-slate-950 sm:text-[30px]">
              {sections[currentSection]?.label}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outlined"
              onClick={handleSaveDraft}
              disabled={submitting || !canSaveDraft}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm shadow-none hover:border-slate-400 hover:bg-slate-50"
            >
              <div className="flex items-center gap-2">
                <Draft className="w-4 h-4" />
                <span className="hidden text-sm font-semibold sm:inline">
                  Save Draft
                </span>
              </div>
            </Button>

            <button onClick={handleBack} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-transparent hover:bg-muted text-muted-foreground hover:text-foreground h-9 w-9 p-0">
              <X size={20} />
            </button>
          </div>  
        </div>

        <StepperTabs
          sections={sections}
          activeSection={currentSection}
          onSectionChange={handleSectionChange}
          maxAccessibleSection={maxAccessibleSection}
          className="bg-slate-100/80"
        />

        <Progress value={progress} />
      </div>
    </div>
  );
};

export default EvaluationFormHead;
