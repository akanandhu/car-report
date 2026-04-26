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
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="space-y-4 px-5 py-5 sm:px-8">
        <span className="text-xs font-semibold tracking-[0.18em] text-slate-500">
          STEP {currentSection + 1} OF {sections.length}
        </span>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <span className="block truncate text-2xl font-semibold tracking-tight text-slate-950 sm:text-[30px]">
              {sections[currentSection]?.label}
            </span>
          </div>
          <Button
            variant="outlined"
            onClick={handleSaveDraft}
            disabled={submitting}
            className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm hover:border-slate-300 hover:bg-slate-50"
          >
            <div className="flex items-center gap-2">
              <Draft className="w-4 h-4" />
              <span className="hidden text-sm font-semibold sm:inline">
                Save Draft
              </span>
            </div>
          </Button>
        </div>

        <StepperTabs
          sections={sections}
          activeSection={currentSection}
          onSectionChange={handleSectionChange}
          className="bg-slate-100/80"
        />

        <Progress value={progress} />
      </div>
    </div>
  );
};

export default EvaluationFormHead;
