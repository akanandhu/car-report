import { AnimatePresence, motion } from "framer-motion";
import DynamicFormSection from "../DynamicFormSection";
import ExteriorSection from "../ExteriorSection";
import { EvaluationFormFieldsPropsI } from "./types";

const EvaluationFormFields = ({
  currentSection,
  currentSectionLabel,
  isLoading,
  currentFields,
  currentFieldGroups,
  formData,
  handleDataChange,
  configOptions,
  variantDerivedOptions,
}: EvaluationFormFieldsPropsI) => {
  const isExteriorSection = currentSectionLabel?.toLowerCase().includes("exterior");

  return (
    <div className="w-full flex-1 px-4 pb-40 pt-6 sm:px-8 sm:pb-44">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 40, scale: 0.98 }} // start from right
          animate={{ opacity: 1, x: 0, scale: 1 }} // move to center
          exit={{ opacity: 0, x: -40, scale: 0.99 }}
          transition={{
            type: "tween",
            duration: 0.16,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="mx-auto w-full max-w-screen-2xl"
        >
          {isLoading ? (
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {isExteriorSection ? (
                <ExteriorSection
                  fields={currentFields}
                  data={formData}
                  onChange={handleDataChange}
                />
              ) : (
                <DynamicFormSection
                  fields={currentFields}
                  fieldGroups={currentFieldGroups}
                  sectionLabel={currentSectionLabel}
                  data={formData}
                  onChange={handleDataChange}
                  configOptions={configOptions}
                  variantDerivedOptions={variantDerivedOptions}
                />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EvaluationFormFields;
