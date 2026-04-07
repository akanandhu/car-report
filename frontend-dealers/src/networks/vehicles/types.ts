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

export interface VehicleResponse {
  id: string;
  name: string;
  vehicleNumber: string;
  status: string;
  model: string;
  createdBy: string | null;
  lastModifiedBy: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
