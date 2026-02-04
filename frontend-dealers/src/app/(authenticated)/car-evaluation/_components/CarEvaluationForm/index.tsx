"use client";
import useCarEvaluationForm from "./useHook";
import Progress from "@/src/components/Progress";
import StepperTabs from "@/src/components/StepperTabs";
import Button from "@/src/components/Button";
import ChevronLeft from "@/public/assets/svg/ChevronLeft";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import SellerSection from "../SellerSection";
import RegistrationSection from "../RegistrationSection";
import CarSpecsSection from "../CarSpecsSection";
import DocumentsSection from "../DocumentsSection";
import ExteriorSection from "../ExteriorSection";
import Draft from "@/public/assets/svg/Draft";

const CarEvaluationForm = () => {
  const {
    sections,
    currentSection,
    formData,
    progress,
    handleNext,
    handlePrevious,
    handleSectionChange,
    handleDataChange,
    handleSaveDraft,
    handleSubmit,
    handleBack,
  } = useCarEvaluationForm();

  const renderSection = () => {
    const sectionProps = {
      data: formData,
      onChange: handleDataChange,
    };

    switch (sections[currentSection].id) {
      case "seller":
        return <SellerSection {...sectionProps} />;
      case "registration":
        return <RegistrationSection {...sectionProps} />;
      case "specs":
        return <CarSpecsSection {...sectionProps} />;
      case "documents":
        return <DocumentsSection {...sectionProps} />;
      case "exterior":
        return <ExteriorSection {...sectionProps} />;
      default:
        return null;
    }
  };

  const isLastSection = currentSection === sections.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Car Evaluation
            </h1>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentSection + 1} of {sections.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {sections[currentSection].label}
              </span>
            </div>
            <Progress value={progress} />
          </div>

          <StepperTabs
            sections={sections}
            activeSection={currentSection}
            onSectionChange={handleSectionChange}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          {renderSection()}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {currentSection > 0 && (
              <Button
                variant="outlined"
                onClick={handlePrevious}
                className="py-3 px-6"
              >
                <div className="flex items-center gap-2">
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-semibold">Previous</span>
                </div>
              </Button>
            )}

            {currentSection === 0 && <div />}

            <div className="flex items-center gap-4">
              <Button
                variant="outlined"
                onClick={handleSaveDraft}
                className="py-3 px-6"
              >
                <div className="flex items-center gap-2">
                  <Draft className="w-5 h-5" />
                  <span className="font-semibold">Save Draft</span>
                </div>
              </Button>

              <Button
                variant="contained"
                onClick={isLastSection ? handleSubmit : handleNext}
                className="py-3 px-6"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {isLastSection ? "Submit" : "Next"}
                  </span>
                  {!isLastSection && <ChevronRight className="w-5 h-5" />}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarEvaluationForm;

