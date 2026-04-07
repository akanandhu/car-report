import { apiClient } from "../client";
import {
  SaveStepDataPayload,
  SubmitAllStepsPayload,
  SubmitAllStepsResponse,
  VehicleDocumentResponse,
} from "./types";

interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

/**
 * Save form data for a specific step (creates or updates as DRAFT)
 */
export const saveStepData = async (
  vehicleId: string,
  payload: SaveStepDataPayload
): Promise<VehicleDocumentResponse> => {
  const res = await apiClient<ApiResponse<VehicleDocumentResponse>>(
    `vehicle-documents/${vehicleId}/step-data`,
    {
      method: "POST",
      body: payload,
    }
  );
  return res.data;
};

/**
 * Submit all steps for a vehicle (DRAFT → SUBMITTED)
 */
export const submitAllSteps = async (
  vehicleId: string,
  type: string,
  payload?: SubmitAllStepsPayload
): Promise<SubmitAllStepsResponse> => {
  const res = await apiClient<ApiResponse<SubmitAllStepsResponse>>(
    `vehicle-documents/${vehicleId}/submit/${type}`,
    {
      method: "POST",
      body: payload ?? {},
    }
  );
  return res.data;
};

/**
 * Get all form data for a vehicle (optionally filtered by type)
 */
export const getVehicleFormData = async (
  vehicleId: string,
  type?: string
): Promise<VehicleDocumentResponse[]> => {
  const res = await apiClient<ApiResponse<VehicleDocumentResponse[]>>(
    `vehicle-documents/${vehicleId}/form-data`,
    {
      params: type ? { type } : undefined,
    }
  );
  return res.data;
};
