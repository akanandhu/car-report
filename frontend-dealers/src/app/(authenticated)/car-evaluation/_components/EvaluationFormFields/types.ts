import { FormFieldGroupI } from "@/src/networks/form-fields/types";
import { FormDataI, FormFieldI } from "../CarEvaluationForm/types";
import { OptionMap } from "../CarEvaluationForm/useHook";

export type EvaluationFormFieldsPropsI = {
    currentSection: number;
    isLoading: boolean;
    currentFields: FormFieldI[];
    currentFieldGroups: FormFieldGroupI[];
    formData: FormDataI;
    handleDataChange: (newData: Partial<FormDataI>) => void;
    configOptions: OptionMap;
    variantDerivedOptions: OptionMap;


}
