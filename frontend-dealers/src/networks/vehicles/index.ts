import { apiClient } from "../client";
import {
  CreateVehiclePayload,
  PaginatedApiResponse,
  UpdateVehiclePayload,
  VehicleListStatus,
  VehicleResponse,
} from "./types";

interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export const fetchVehicles = async (
  page: number = 1,
  limit: number = 20,
  search?: string,
  status?: VehicleListStatus,
): Promise<PaginatedApiResponse<VehicleResponse>> => {
  const res = await apiClient<PaginatedApiResponse<VehicleResponse>>(
    "vehicles",
    {
      params: { page, limit, ...(search ? { search } : {}), status },
    },
  );
  return res;
};

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
