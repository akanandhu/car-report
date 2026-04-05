"use client";
import useCarEvaluationForm from "./useHook";
import Progress from "@/src/components/Progress";
import StepperTabs from "@/src/components/StepperTabs";
import Button from "@/src/components/Button";
import ChevronLeft from "@/public/assets/svg/ChevronLeft";
import ChevronRight from "@/public/assets/svg/ChevronRight";
import Draft from "@/public/assets/svg/Draft";
import DynamicFormSection from "../DynamicFormSection";

const CarEvaluationForm = () => {
  const {
    sections,
    currentSection,
    formData,
    progress,
    currentFields,
    loading,
    fieldsLoading,
    configOptions,
    variantDerivedOptions,
    handleNext,
    handlePrevious,
    handleSectionChange,
    handleDataChange,
    handleSaveDraft,
    handleSubmit,
    handleBack,
  } = useCarEvaluationForm();

  const isLastSection = currentSection === sections.length - 1;

  // Loading skeleton for sections
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="h-4 w-full bg-gray-200 rounded-full animate-pulse mb-4" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">
            No evaluation sections available.
          </p>
          <Button variant="outlined" onClick={handleBack}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

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
                {sections[currentSection]?.label}
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
          {fieldsLoading ? (
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <DynamicFormSection
              fields={currentFields}
              data={formData}
              onChange={handleDataChange}
              configOptions={configOptions}
              variantDerivedOptions={variantDerivedOptions}
            />
          )}
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
