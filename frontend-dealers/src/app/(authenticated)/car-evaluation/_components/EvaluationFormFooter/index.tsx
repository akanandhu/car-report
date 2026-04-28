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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto mx-auto w-full rounded-2xl border border-slate-200 bg-white/95 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outlined"
              onClick={handlePrevious}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm hover:border-slate-300 hover:bg-slate-50"
              disabled={submitting || currentSection === 0}
            >
              <div className="flex items-center gap-2">
                <ChevronLeft className="h-5 w-5" />
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
                {!isLastSection && <ChevronRight className="h-5 w-5" />}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationFormFooter;
