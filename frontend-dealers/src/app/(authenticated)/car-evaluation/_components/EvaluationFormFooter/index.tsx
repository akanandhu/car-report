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
  console.log("Is last action ", isLastSection)
  return (
    <div className="sticky bottom-0 z-20 shrink-0 border-t border-slate-200 bg-white">
      <div className="mx-auto w-full">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outlined"
              onClick={handlePrevious}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-none hover:border-slate-300 hover:bg-slate-50"
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
              className="rounded-lg bg-slate-950 px-8 py-2 text-sm font-semibold shadow-none hover:bg-slate-800"
              disabled={submitting}
            >
              <div className="flex items-center gap-2">
                {submitting && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                <span className="font-semibold">
                  {isLastSection
                    ? submitting
                      ? "Submitting..."
                      : "Submit"
                    : submitting
                      ? "Saving..."
                      : "Next Section"}
                </span>
                {!isLastSection && !submitting && (
                  <ChevronRight className="h-5 w-5" />
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationFormFooter;
