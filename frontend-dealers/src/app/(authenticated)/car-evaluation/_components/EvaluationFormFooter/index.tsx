import ChevronLeft from "@/public/assets/svg/ChevronLeft";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import Button from "@/src/components/Button";
import { EvaluationFormFooterPropsI } from "./types";

const EvaluationFormFooter = ({
  currentSection,
  submitting,
  isLastSection,
  handlePrevious,
  handleNext,
  handleSubmit,
}: EvaluationFormFooterPropsI) => {
  return (
    <div className="sticky bottom-0 z-30 shrink-0 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outlined"
            onClick={handlePrevious}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            disabled={submitting || currentSection === 0}
          >
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </div>
          </Button>

          <Button
            variant="contained"
            onClick={isLastSection ? handleSubmit : handleNext}
            className="rounded-xl bg-slate-950 px-8 py-2 text-sm font-semibold shadow-sm hover:bg-slate-800"
            disabled={submitting}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {isLastSection ? "Submit" : "Next Section"}
              </span>
              {!isLastSection && <ChevronRight className="w-5 h-5" />}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationFormFooter;
