export interface SaveStepDataPayload {
  documentGroupId: string;
  documentSpec: Record<string, unknown>;
  submittedBy?: string;
}

export interface SubmitAllStepsPayload {
  submittedBy?: string;
}

export interface VehicleDocumentResponse {
  id: string;
  documentGroupId: string;
  vehicleId: string;
  documentSpec: Record<string, unknown> | null;
  status: "DRAFT" | "SUBMITTED" | "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";
  submittedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitAllStepsResponse {
  message: string;
  submittedCount: number;
  totalSteps: number;
}
