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
    validationErrors,
    handleNext,
    handlePrevious,
    handleSectionChange,
    handleDataChange,
    handleSaveDraft,
    handleSubmit,
    handleBack,
    handleMediaUpload,
  } = useCarEvaluationForm();

  const isLastSection = currentSection === sections.length - 1;

  if (loading) {
    return <CarEvaluationShimmer />;
  }

  if (sections.length === 0) {
    return <CarEvaluationNoSection handleBack={handleBack} />;
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-100 p-3">
      <div
        id="form-container"
        className="mx-auto flex h-[calc(100vh-1.5rem)] w-full max-w-[1440px] flex-col overflow-hidden bg-white"
      >
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
          currentSectionLabel={sections[currentSection]?.label}
          isLoading={fieldsLoading}
          currentFields={currentFields}
          currentFieldGroups={currentFieldGroups}
          formData={formData}
          handleDataChange={handleDataChange}
          configOptions={configOptions}
          variantDerivedOptions={variantDerivedOptions}
          validationErrors={validationErrors}
          handleMediaUpload={handleMediaUpload}
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
