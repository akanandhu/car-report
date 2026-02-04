export type SectionId = "seller" | "registration" | "specs" | "documents" | "exterior";

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
}

export interface SectionComponentPropsI {
  data: CarEvaluationFormDataI;
  onChange: (newData: Partial<CarEvaluationFormDataI>) => void;
}

