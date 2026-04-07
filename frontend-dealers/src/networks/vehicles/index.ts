import { apiClient } from "../client";
import {
  CreateVehiclePayload,
  UpdateVehiclePayload,
  VehicleResponse,
} from "./types";

interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export const createVehicle = async (
  payload: CreateVehiclePayload
): Promise<VehicleResponse> => {
  const res = await apiClient<ApiResponse<VehicleResponse>>("vehicles", {
    method: "POST",
    body: payload,
  });
  return res.data;
};

export const updateVehicle = async (
  id: string,
  payload: UpdateVehiclePayload
): Promise<VehicleResponse> => {
  const res = await apiClient<ApiResponse<VehicleResponse>>(`vehicles/${id}`, {
    method: "PUT",
    body: payload,
  });
  return res.data;
};
