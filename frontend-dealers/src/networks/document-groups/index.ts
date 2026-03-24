import { apiClient } from "../client";
import { DocumentGroupI } from "./types";

type FetchDocumentGroupsResponse = DocumentGroupI[] | {
  data: DocumentGroupI[];
};

export const fetchDocumentGroups = async (): Promise<DocumentGroupI[]> => {
  const res = await apiClient<FetchDocumentGroupsResponse>(
    "document-groups"
  );

  return Array.isArray(res) ? res : res.data ?? [];
};