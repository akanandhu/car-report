import { z } from "zod";

export const engineSchema = z.object({
  engineSound: z.string().min(1, "Engine sound is required"),
  engineCondition: z
    .array(z.string())
    .min(1, "Engine condition is required"),
  smoke: z.string().min(1, "Smoke condition is required"),
  engineIdleStart: z.string().optional(),
  battery: z.array(z.string()).min(1, "Battery is required"),
  radiator: z.string().min(1, "Radiator is required"),
  startingMotor: z.string().min(1, "Starting motor is required"),
  coolant: z.string().min(1, "Coolant is required"),
  blowbyBackCompression: z
    .array(z.string())
    .min(1, "Blowby/back compression is required"),
  silencer: z.array(z.string()).min(1, "Silencer is required"),
  clutchOperations: z.array(z.string()).min(1, "Clutch operations is required"),
  gearbox: z.array(z.string()).min(1, "Gearbox is required"),
  engineOil: z.array(z.string()).min(1, "Engine oil is required"),
  turboCharger: z.array(z.string()).min(1, "Turbo charger is required"),
  gearboxLeakage: z.string().min(1, "Gearbox leakage is required"),
  engineComments: z.string().min(1, "Engine comments is required"),
  engineMount: z.array(z.string()).min(1, "Engine mount is required"),
  sump: z.array(z.string()).min(1, "Sump is required"),
  engineOtherDetails: z.record(z.string()).optional(),
});

export type EngineFormData = z.infer<typeof engineSchema>;
