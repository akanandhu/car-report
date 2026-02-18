import { Condition } from "./types";

type PartConfig = {
  name: string;
  conditions: Condition[];
};

export const PARTS: PartConfig[] = [
  {
    name: "Apron LH",
    conditions: [
      "Good",
      "Replaced",
      "Repaired",
      "Damaged",
      "Rusted",
      "Repainted",
      "Other",
    ],
  },
  {
    name: "Apron RH",
    conditions: [
      "Good",
      "Replaced",
      "Repaired",
      "Damaged",
      "Rusted",
      "Repainted",
      "Other",
    ],
  },
  {
    name: "Upper Cross Member",
    conditions: [
      "Good",
      "Damaged",
      "Repaired",
      "Replaced",
      "Rusted",
      "Repainted",
      "Welded",
      "Other",
    ],
  },
  {
    name: "Lower Cross Member",
    conditions: [
      "Good",
      "Damaged",
      "Repaired",
      "Replaced",
      "Rusted",
      "Repainted",
      "Welded",
      "Other",
    ],
  },
  {
    name: "Cowl Top",
    conditions: ["Damaged", "Repainted", "Repaired", "Rusted", "Other"],
  },
  {
    name: "Firewall",
    conditions: ["Good", "Damaged", "Repaired", "Rusted", "Repainted", "Other"],
  },
  {
    name: "Rear Wiper",
    conditions: ["Good", "Damaged", "Replaced", "Not Available", "Other"],
  },
];
