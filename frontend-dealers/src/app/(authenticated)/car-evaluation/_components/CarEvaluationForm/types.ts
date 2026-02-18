export type SectionId = "seller" | "registration" | "specs" | "documents" | "exterior" | "engine";

export interface SectionI {
  id: SectionId;
  label: string;
}

export interface CarEvaluationFormDataI {
  sellerName?: string;
  sellerAddress?: string;
  sellerPhone?: string;
  sellerEmail?: string;

  registrationNumber?: string;
  registrationDate?: string;
  registrationState?: string;
  ownershipType?: string;

  make?: string;
  model?: string;
  year?: string;
  variant?: string;
  color?: string;
  fuelType?: string;
  transmission?: string;
  kmDriven?: string;

  rcBook?: boolean;
  insurance?: boolean;
  pollutionCertificate?: boolean;
  servicingHistory?: boolean;

  exteriorCondition?: string;
  paintCondition?: string;
  tyreCondition?: string;
  images?: File[];
  
  engineSound?: string;
  engineCondition?: string;
  sump?: string;
  clutchOperations?: string;
  gearbox?: string;
  engineOil?: string;
  turboCharger?: string;
  engineMount?: string;
  battery?: string;
  radiator?: string;
  startingMotor?: string;
  coolant?: string;
  blowbyBackCompression?: string;
  silencer?: string;
}

export interface SectionComponentPropsI {
  data: CarEvaluationFormDataI;
  onChange: (newData: Partial<CarEvaluationFormDataI>) => void;
}

