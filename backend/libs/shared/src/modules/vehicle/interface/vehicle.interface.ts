
import { BaseModel } from "@shared/common/interface/base-model.interface";

export interface VehicleInterface extends BaseModel {
    name: string;
    vehicleNumber: string;
    status: string;
    model: string;
    createdBy?: string | null;
    lastModifiedBy?: string | null;
}
