import { apiClient } from "../client";
import { DocumentGroupI } from "../document-groups/types";
import { FormFieldI } from "./types";

type FetchFormFieldsResponse = {
  fields: FormFieldI[];
  documentGroup: DocumentGroupI;
};

export const fetchFormFields = async (
  documentGroupId: string,
): Promise<FetchFormFieldsResponse> => {
  const res = await apiClient<{ data: FetchFormFieldsResponse }>(
    "form-config/fields",
    {
      params: {
        documentGroupId,
      },
    },
  );
  const data = res.data;
  return {
    fields: data.fields ?? [],
    documentGroup: data.documentGroup,
  };
};
