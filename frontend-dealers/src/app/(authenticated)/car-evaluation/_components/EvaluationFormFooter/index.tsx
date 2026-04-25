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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outlined"
            onClick={handlePrevious}
            className="px-4"
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
              className="px-8"
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
