export type DocumentGroupI = {
  id: string;
  name: string;
  identifier: string;
  description?: string;
  type?: string;
  parentId?: string;
  groupName?: string;
  order?: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};
