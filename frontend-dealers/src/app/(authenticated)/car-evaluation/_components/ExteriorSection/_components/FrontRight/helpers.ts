import { Condition } from "./types";


type PartConfig = {
  name: string;
  conditions: Condition[];
};


export const PARTS: PartConfig[] = [
  {
    name: "RH-Fender",
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
      "Other"
    ],
  },
  {
    name: "RH-A Pillar",
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
      "Other"
    ],
  },

  {
    name: "Tyre Front RHS",
    conditions: [
      "0-25%",
      "25-50%",
      "50-75%",
      "75-100%",
      "Damaged"
    ],
  },

  {
    name: "Front RH Door",
    conditions: [
      "Good",
      "Replaced",
      "Repainted",
      "Rusted",
      "Scratched",
      "Dented",
      "Faded", 
      "Color Mismatch", 
      "Damaged",
      "Other"
    ],
  },
  {
    name: "Front Door Glass RH",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Replaced",
      "Repainted",
      "Cracked",
      "Chipped",
      "Other"
    ],
  }
];