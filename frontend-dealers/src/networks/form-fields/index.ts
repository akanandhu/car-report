import { apiClient } from "../client";
import { DocumentGroupI } from "../document-groups/types";
import { FormFieldGroupI, FormFieldI } from "./types";

type FetchFormFieldsApiResponse = {
  fieldGroups: FormFieldGroupI[];
  documentGroup: DocumentGroupI;
};

type FetchFormFieldsResponse = FetchFormFieldsApiResponse & {
  fields: FormFieldI[];
};

export const fetchFormFields = async (
  documentGroupId: string,
): Promise<FetchFormFieldsResponse> => {
  const res = await apiClient<{ data: FetchFormFieldsApiResponse }>(
    "form-config/fields",
    {
      params: {
        documentGroupId,
      },
    },
  );
  const data = res.data;
  const fieldGroups = data.fieldGroups ?? [];

  return {
    fields: fieldGroups.flatMap((group) => group.fields),
    fieldGroups,
    documentGroup: data.documentGroup,
  };
};
