import { FormFieldGroupI } from "@/src/networks/form-fields/types";
import { FormDataI, FormFieldI } from "../CarEvaluationForm/types";
import { UploadedMedia } from "@/src/utils/media";

export type DynamicFormSectionProps = {
  fields: FormFieldI[];
  fieldGroups: FormFieldGroupI[];
  sectionLabel?: string;
  data: FormDataI;
  onChange: (newData: Partial<FormDataI>) => void;
  /** Options from cached config API, keyed by fieldKey (e.g. manufacturing_year, ownership_number) */
  configOptions?: Record<string, { label: string; value: string }[]>;
  /** Options derived from variant data, keyed by fieldKey (e.g. fuel_type, transmission_type, car_variant) */
  variantDerivedOptions?: Record<string, { label: string; value: string }[]>;
  validationErrors?: Record<string, string>;
  onMediaUpload: (payload: {
    documentGroupId: string;
    fieldKey: string;
    file: File;
  }) => Promise<UploadedMedia>;
  onMediaDelete: (payload: {
    documentGroupId: string;
    fieldKey: string;
    media: UploadedMedia;
  }) => Promise<void>;
  mediaPreviewUrls: Record<string, string>;
};
