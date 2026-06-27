export interface CreateVehiclePayload {
  name: string;
  vehicleNumber: string;
  status: string;
  model: string;
  createdBy?: string;
}

export interface UpdateVehiclePayload {
  name?: string;
  vehicleNumber?: string;
  status?: string;
  model?: string;
  lastModifiedBy?: string;
}

export interface VehicleUserSummary {
  id: string;
  name: string | null;
  email: string | null;
}

export interface VehicleResponse {
  id: string;
  name: string;
  vehicleNumber: string;
  status: string;
  model: string;
  createdBy: string | null;
  lastModifiedBy: string | null;
  creator?: VehicleUserSummary | null;
  modifier?: VehicleUserSummary | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type VehicleListStatus = "draft" | "completed";

export interface PaginatedApiResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  message: string;
  statusCode: number;
}
