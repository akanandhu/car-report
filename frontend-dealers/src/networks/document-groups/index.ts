import { apiClient } from "../client";
import { DocumentGroupI } from "./types";

type FetchDocumentGroupsResponse = DocumentGroupI[] | {
  data: DocumentGroupI[];
};

export const fetchDocumentGroups = async (type: "FORM_STEP" | "FORM_TYPE"): Promise<DocumentGroupI[]> => {
  const res = await apiClient<FetchDocumentGroupsResponse>(
    "document-groups", {
    params: {
      type
    }
  }
  );

  return Array.isArray(res) ? res : res.data ?? [];
};