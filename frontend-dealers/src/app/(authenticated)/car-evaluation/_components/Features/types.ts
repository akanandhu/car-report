import { z } from "zod";

export const featuresSchema = z.object({
  keylessEntry: z.array(z.string()).optional(),
  stereoImage: z.array(z.string()).optional(),
  stereoBrand: z.string().optional(),
  rearParkingSensor: z.string().optional(),
  sunroof: z.array(z.string()).optional(),
  gpsNavigation: z.string().optional(),
  alloyWheels: z.array(z.string()).optional(),
  fogLamps: z.string().optional(),
  airBag: z.array(z.string()).optional(),
  seatBelt: z.string().optional(),
  absEbd: z.array(z.string()).optional(),
  gloveBox: z.array(z.string()).optional(),
  interiorModifications: z.string().optional(),
  featuresOtherDetails: z.record(z.string()).optional(),
});

export type FeaturesFormData = z.infer<typeof featuresSchema>;
