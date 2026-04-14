import { VehicleResponse } from "@/src/networks/vehicles/types";

export type VehicleStatus = "draft" | "completed" | "in_sale" | "sold";

export type StatusProps = {
  status: string;
  className?: string;
};

export type CardProps = {
  vehicle: VehicleResponse;
};