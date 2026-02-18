import { Condition } from "./types";

type PartConfig = {
  name: string;
  conditions: Condition[];
};

export const PARTS: PartConfig[] = [
  {
    name: "Boot",
    conditions: [
      "Good",
      "Damaged",
      "Repaired",
      "Rusted",
      "Welded",
      "Water Inside",
      "Sealant",
      "Broken",
      "Other",
    ],
  },
  {
    name: "Spare Wheel",
    conditions: [
      "Yes",
      "No",
      "0-25%",
      "25-50%",
      "50-75%",
      "75-100%",
      "Damaged",
    ],
  },

  {
    name: "Jack & Tool",
    conditions: ["Yes", "No"],
  },

  {
    name: "LH-C Pillar",
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
      "Other",
    ],
  },
  {
    name: "LH Quarter Panel",
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
  {
    name: "Tyre Rear LHS",
    conditions: ["0-25%", "25-50%", "50-75%", "75-100%", "Damaged"],
  },
  {
    name: "Rear LH Door",
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
      "Other",
    ],
  },
  {
    name: "Rear Door Glass LH",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Replaced",
      "Repainted",
      "Cracked",
      "Chipped",
      "Other",
    ],
  },
  {
    name: "LH Running Board",
    conditions: [
      "Good",
      "Replaced",
      "Repainted",
      "Rusted",
      "Scratched",
      "Dented",
      "Repaired",
      "Faded",
      "Damaged",
      "Color Mismatch",
      "Welded",
      "Other",
    ],
  },
  {
    name: "LH-B Pillar",
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
    name: "Front LH Door",
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
      "Other",
    ],
  },
  {
    name: "Front Door Glass LH",
    conditions: [
      "Good",
      "Scratched",
      "Damaged",
      "Replaced",
      "Repainted",
      "Cracked",
      "Chipped",
      "Other",
    ],
  },
];
