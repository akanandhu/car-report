export type SectionId =
  | "seller"
  | "registration"
  | "specs"
  | "documents"
  | "exterior"
  | "interiorElectrical"
  | "testDrive"
  | "features"
  | "engine";

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
  exteriorConditions?: Record<
    string,
    {
      selected: string[];
      otherText?: string;
    }
  >;
  missingParts?: string;
  fullBodyRepaint?: string;
  
  engineSound?: string;
  engineCondition?: string[];
  smoke?: string;
  engineIdleStart?: string;
  battery?: string[];
  radiator?: string;
  startingMotor?: string;
  coolant?: string;
  blowbyBackCompression?: string[];
  silencer?: string[];
  clutchOperations?: string[];
  gearbox?: string[];
  engineOil?: string[];
  turboCharger?: string[];
  gearboxLeakage?: string;
  engineComments?: string;
  engineMount?: string[];
  sump?: string[];

  interiorComments?: string;
  clusterPanel?: string[];
  clusterPanelWarningDetails?: string;
  dashboard?: string[];
  frontSeat?: string[];
  rearSeat?: string[];
  roofLining?: string[];
  insideRearViewMirror?: string[];
  pushButton?: string;
  dashboardSwitches?: string;
  powerWindowAndWindowLock?: string[];
  handBrake?: string[];
  carElectrical?: string[];
  secondKey?: string;
  platform?: string[];

  steeringSystem?: string;
  steeringWheel?: string[];
  steeringAdjustment?: string;
  steeringMountedAudioControl?: string;
  cruiseControl?: string[];
  seatAdjustment?: string[];
  suspensionSystem?: string[];
  brakes?: string[];
  clutchSystem?: string[];
  transmissionAutomatic?: string[];
  vehicleHorn?: string[];
  testDriveOtherDetails?: Record<string, string>;

  keylessEntry?: string[];
  stereoImage?: string[];
  stereoBrand?: string;
  rearParkingSensor?: string;
  sunroof?: string[];
  gpsNavigation?: string;
  alloyWheels?: string[];
  fogLamps?: string;
  airBag?: string[];
  seatBelt?: string;
  absEbd?: string[];
  gloveBox?: string[];
  interiorModifications?: string;
  featuresOtherDetails?: Record<string, string>;

  engineOtherDetails?: Record<string, string>;
  interiorElectricalOtherDetails?: Record<string, string>;
}

export interface SectionComponentPropsI {
  data: CarEvaluationFormDataI;
  onChange: (newData: Partial<CarEvaluationFormDataI>) => void;
}

