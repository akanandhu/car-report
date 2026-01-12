import { BaseModel } from "@shared/common/interface/base-model.interface";

export interface VehicleInterface extends BaseModel {
    name: string;
    model: string;
    year: number;
    registrationNumber?: string;
    vin?: string;
    color?: string;
    mileage?: number;
}

