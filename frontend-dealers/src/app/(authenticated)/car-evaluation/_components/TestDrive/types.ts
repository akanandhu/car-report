import { z } from "zod";

export const testDriveSchema = z.object({
  steeringSystem: z.string().optional(),
  steeringWheel: z.array(z.string()).optional(),
  steeringAdjustment: z.string().optional(),
  steeringMountedAudioControl: z.string().optional(),
  cruiseControl: z.array(z.string()).optional(),
  seatAdjustment: z.array(z.string()).optional(),
  suspensionSystem: z.array(z.string()).optional(),
  brakes: z.array(z.string()).optional(),
  clutchSystem: z.array(z.string()).optional(),
  transmissionAutomatic: z.array(z.string()).optional(),
  vehicleHorn: z.array(z.string()).optional(),
  testDriveOtherDetails: z.record(z.string()).optional(),
});

export type TestDriveFormData = z.infer<typeof testDriveSchema>;
