import { AnimatePresence, motion } from "framer-motion";
import DynamicFormSection from "../DynamicFormSection";
import { EvaluationFormFieldsPropsI } from "./types";

const EvaluationFormFields = ({
  currentSection,
  isLoading,
  currentFields,
  formData,
  handleDataChange,
  configOptions,
  variantDerivedOptions,
}: EvaluationFormFieldsPropsI) => {
  return (
    <div className="w-full p-7 mb-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 40, scale: 0.98 }} // start from right
          animate={{ opacity: 1, x: 0, scale: 1 }} // move to center
          exit={{ opacity: 0, x: -40, scale: 0.99 }} 
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 32,
            mass: 0.7,
          }}
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
            <DynamicFormSection
              fields={currentFields}
              data={formData}
              onChange={handleDataChange}
              configOptions={configOptions}
              variantDerivedOptions={variantDerivedOptions}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EvaluationFormFields;
