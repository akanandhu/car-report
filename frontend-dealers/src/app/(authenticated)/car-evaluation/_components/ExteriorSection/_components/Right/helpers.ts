import { Condition } from "./types";


type PartConfig = {
  name: string;
  conditions: Condition[];
};


export const PARTS: PartConfig[] = [
  {
    name: "RH-B Pillar",
    conditions: [
      "Good",
      "Replaced",
      "Repainted",
      "Rusted",
      "Scratched",
      "Dented",
      "Color Mismatch",
      "Damaged",
      "Welded",
      "Other"
    ],
  },
  {
    name: "RH Running Board",
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
      "Welded",
      "Other"
    ],
  },

  {
    name: "Rare RH Door",
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
    name: "Rear Door Glass RH",
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
  },
  {
    name: "RH C Pillar",
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
      "Welded",
      "Other"
    ],
  },
  {
    name: "RH-Quarter Panel",
    conditions: [
      "Good",
      "Replaced",
      "Repainted",
      "Rusted",
      "Dented",
      "Faded",
      "Damaged",
      "Color Mismatch",
      "Other"
    ],
  },
  {
    name: "Chassis Extension",
    conditions: [
      "Welded",
      "Replaced",
      "Repaired",
      "Damaged",
      "Rusted",
      "Other"
    ],
  },
  {
    name: "Tyre Rear RHS",
    conditions: [
      "0-25%",
      "25-50%",
      "50-75%",
      "75-100%",
      "Damaged"
    ],
  }
];