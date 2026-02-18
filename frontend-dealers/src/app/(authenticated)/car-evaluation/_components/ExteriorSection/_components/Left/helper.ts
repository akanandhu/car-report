import { Condition } from "./types";

type PartConfig = {
  name: string;
  conditions: Condition[];
};


export const PARTS: PartConfig[] = [
  {
    name: "LH A Pillar",
    conditions: [
      "Good",
      "Replaced",
      "Repainted",
      "Rusted",
      "Scratched",
      "Dented",
      "Faded",
      "Damaged",
      "Color Mismatch",
      "Welded",
      "Other",
    ],
  },
  {
    name: "Tyre Front LHS",
    conditions: ["0-25%", "25-50%", "50-75%", "75-100%", "Damaged"],
  },
  {
    name: "LH Rear View Mirror",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Repaired",
      "Missing",
      "Non-Functional",
      "Folding Motor Not Working",
      "Other",
    ],
  },
  {
    name: "LH Fender",
    conditions: [
      "Good",
      "Scratched",
      "Dented",
      "Damaged",
      "Repaired",
      "Missing",
      "Rusted",
      "Repainted",
      "Other",
    ],
  },
];

