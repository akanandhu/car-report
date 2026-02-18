import { Condition } from "./types";


type PartConfig = {
  name: string;
  conditions: Condition[];
};


export const PARTS: PartConfig[] = [
  {
    name: "RH Rear View Mirror",
    conditions: [
      "Good",
      "Scratched",
      "Repaired",
      "Missing",
      "Non-Functional",
      "Folding Motor Not Working",
      "Other"
    ],
  },
  {
    name: "Fuel Lid",
    conditions: [
      "Good",
      "Damaged",
      "Rusted",
      "Other"
    ],
  },

  {
    name: "Dicky Door",
    conditions: [
      "Good",
      "Replaced",
      "Repainted",
      "Repaired",
      "Rusted",
      "Scratched",
      "Faded", 
      "Damaged",
      "Color Mismatch", 
      "Other"
    ],
  },

  {
    name: "Rear Windshield",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Not Available",
      "Spots",
      "Rusted",
      "Replaced",
      "Chipped",
      "Faded", 
      "Other"
    ],
  },
  {
    name: "Rear Bumper",
    conditions: [
      "Good",
      "Scratched",
      "Dented",
      "Damaged",
      "Repaired",
      "Replaced",
      "Rusted",
      "Repainted",
      "Other"
    ],
  },
  {
    name: "Tail Light RH",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Faded",
      "Foggy",
      "Non-Functional",
      "Other"
    ],
  },
  {
    name: "Tail Light LH",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Faded",
      "Foggy",
      "Non-Functional",
      "Other"
    ],
  }
];