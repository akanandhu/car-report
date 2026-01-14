import { BaseModel } from "@shared/common/interface/base-model.interface";

export interface UserInterface extends BaseModel {
    name: string;
    clientId: string | null;
    password: string | null;
    mobile: string;
    email: string;
    mobileVerifiedAt: Date | null;
    emailVerifiedAt: Date | null;
}

