export interface ReportFieldI {
  label: string;
  value: string;
  fieldKey: string;
  type: string;
}

export interface ReportImageI {
  label: string;
  fieldKey: string;
  originalName: string;
  dataUrl?: string;
  fallbackText?: string;
}

export interface ReportSectionI {
  id: string;
  name: string;
  description: string | null;
  order: number | null;
  fields: ReportFieldI[];
  images: ReportImageI[];
}

export interface ReportVehicleI {
  id: string;
  name: string;
  vehicleNumber: string;
  model: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  evaluator: string;
}

export interface ReportMetricI {
  label: string;
  value: string;
}

export interface VehicleReportI {
  vehicle: ReportVehicleI;
  generatedAt: Date;
  metrics: ReportMetricI[];
  sections: ReportSectionI[];
}

export interface GeneratedReportI {
  buffer: Buffer;
  fileName: string;
}

export interface UploadedMediaI {
  type?: string;
  bucket: string;
  path: string;
  mimeType?: string;
  originalName?: string;
}

export interface FieldOptionI {
  label?: string;
  value?: string | number | boolean;
}
