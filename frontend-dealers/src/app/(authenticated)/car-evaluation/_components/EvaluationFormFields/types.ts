import { FormFieldGroupI } from "@/src/networks/form-fields/types";
import { FormDataI, FormFieldI } from "../CarEvaluationForm/types";
import { OptionMap } from "../CarEvaluationForm/useHook";
import { UploadedMedia } from "@/src/utils/media";

export type EvaluationFormFieldsPropsI = {
  currentSection: number;
  currentSectionLabel?: string;
  isLoading: boolean;
  currentFields: FormFieldI[];
  currentFieldGroups: FormFieldGroupI[];
  formData: FormDataI;
  handleDataChange: (newData: Partial<FormDataI>) => void;
  configOptions: OptionMap;
  variantDerivedOptions: OptionMap;
  validationErrors: Record<string, string>;
  handleMediaUpload: (payload: {
    documentGroupId: string;
    fieldKey: string;
    file: File;
  }) => Promise<UploadedMedia>;
};
