import { FormDataI, FormFieldI } from "../CarEvaluationForm/types";
import { OptionMap } from "../CarEvaluationForm/useHook";

export type EvaluationFormFieldsPropsI = {
    currentSection: number;
    isLoading: boolean;
    currentFields: FormFieldI[];
    formData: FormDataI;
    handleDataChange: (newData: Partial<FormDataI>) => void;
    configOptions: OptionMap;
    variantDerivedOptions: OptionMap;


}
