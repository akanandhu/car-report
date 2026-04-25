"use client";
import useCarEvaluationForm from "./useHook";
import CarEvaluationShimmer from "../CarEvaluationShimmer";
import CarEvaluationNoSection from "../NoSections";
import EvaluationFormHead from "../EvaluationFormHead";
import EvaluationFormFields from "../EvaluationFormFields";
import EvaluationFormFooter from "../EvaluationFormFooter";

const CarEvaluationForm = () => {
  const {
    sections,
    currentSection,
    formData,
    progress,
    currentFields,
    currentFieldGroups,
    loading,
    fieldsLoading,
    submitting,
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

  if (loading) {
    return <CarEvaluationShimmer />;
  }

  if (sections.length === 0) {
    return <CarEvaluationNoSection handleBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div id="form-container" className="bg-white m-4">
        <EvaluationFormHead
          currentSection={currentSection}
          sections={sections}
          progress={progress}
          handleBack={handleBack}
          handleSectionChange={handleSectionChange}
          handleSaveDraft={handleSaveDraft}
          submitting={submitting}
        />

        <EvaluationFormFields
          currentSection={currentSection}
          isLoading={fieldsLoading}
          currentFields={currentFields}
          currentFieldGroups={currentFieldGroups}
          formData={formData}
          handleDataChange={handleDataChange}
          configOptions={configOptions}
          variantDerivedOptions={variantDerivedOptions}
        />

        <EvaluationFormFooter
          currentSection={currentSection}
          submitting={submitting}
          isLastSection={isLastSection}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CarEvaluationForm;
