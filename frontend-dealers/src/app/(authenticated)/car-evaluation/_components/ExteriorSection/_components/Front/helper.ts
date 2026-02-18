import { Condition } from "./types";


type PartConfig = {
  name: string;
  conditions: Condition[];
};


export const PARTS: PartConfig[] = [
  {
    name: "Bonnet",
    conditions: [
      "Good",
      "Scratched",
      "Dented",
      "Damaged",
      "Repaired",
      "Replaced",
      "Rusted",
      "Other",
      "Not Available",
    ],
  },
  {
    name: "Headlight Support",
    conditions: [
      "Good",
      "Welded",
      "Clamped",
      "Damaged",
      "Repaired",
      "Other",
      "Not Available",

    ],
  },

  {
    name: "Front Windshield",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Rusted",
      "Replaced",
      "Spots",
      "Chipped",
      "Other",
      "Not Available"
    ],
  },

  {
    name: "Roof",
    conditions: [
      "Good",
      "Scratched",
      "Welded",
      "Replaced",
      "Dented",
      "Repaired",
      "Faded",  
      "Repainted",
      "Damaged",
      "Rusted",
      "Cracked",
      "Other",
      "Not Available",
    ],
  },
  {
    name: "Front Bumper",
    conditions: [
      "Good",
      "Scratched",
      "Dented",
      "Damaged",
      "Repaired",
      "Replaced",
      "Rusted",
      "Repainted",
      "Other",
      "Not Available",
    ],
  },
  {
    name: "Front Grill",
    conditions: [
      "Good",
      "Damaged",
      "Other",
      "Not Available",
    ],
  },
  {
    name: "Headlights - RH",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Replaced",
      "Faded",
      "Foggy",
      "Non-Functional",
      "Other",
      "Not Available",
    ],
  },
  {
    name: "Headlights - LH",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Replaced",
      "Faded",
      "Foggy",
      "Non-Functional",
      "Other",
      "Not Available",
    ],
  },
  {
    name: "Fog Lamp",
    conditions: [
      "Working",
      "Not Working",
      "Not Available",
      "Damaged",
    ],
  },
];