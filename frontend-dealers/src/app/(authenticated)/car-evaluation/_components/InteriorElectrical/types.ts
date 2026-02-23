import { z } from "zod";

export const interiorElectricalSchema = z.object({
  interiorComments: z.string().optional(),
  clusterPanel: z.array(z.string()).optional(),
  clusterPanelWarningDetails: z.string().optional(),
  dashboard: z.array(z.string()).optional(),
  frontSeat: z.array(z.string()).optional(),
  rearSeat: z.array(z.string()).optional(),
  roofLining: z.array(z.string()).optional(),
  insideRearViewMirror: z.array(z.string()).optional(),
  pushButton: z.string().optional(),
  dashboardSwitches: z.string().optional(),
  powerWindowAndWindowLock: z.array(z.string()).optional(),
  handBrake: z.array(z.string()).optional(),
  carElectrical: z.array(z.string()).optional(),
  secondKey: z.string().optional(),
  platform: z.array(z.string()).optional(),
  interiorElectricalOtherDetails: z.record(z.string()).optional(),
});

export type InteriorElectricalFormData = z.infer<
  typeof interiorElectricalSchema
>;
