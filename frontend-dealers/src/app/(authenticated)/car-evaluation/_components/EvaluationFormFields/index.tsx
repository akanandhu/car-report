import DynamicFormSection from "../DynamicFormSection";
import { EvaluationFormFieldsPropsI } from "./types";

const EvaluationFormFields = ({
  isLoading,
  currentFields,
  formData,
  handleDataChange,
  configOptions,
  variantDerivedOptions,
}: EvaluationFormFieldsPropsI) => {
  return (
    <div className="w-full px-6 py-8 mb-20">
      <div className=" rounded-2xl border border-gray-100 p-8">
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
      </div>
    </div>
  );
};

export default EvaluationFormFields;
