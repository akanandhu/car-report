import React, { useState } from "react";
import { Condition } from "./types";

const useFrontRight = () => {
  const MAJOR_ISSUES: Condition[] = [
    "Damaged",
    "Replaced",
    "Rusted",
    "Repaired",
    "Other",
    "Welded",
    "Spots",
    "Cracked",
    "Non-Functional",
    "Not Working",
    "Other"
  ];

  const GOOD_CONDITION : Condition[] = [
    "Good"
  ]

  const [formData, setFormData] = useState<
    Record<
      string,
      {
        selected: Condition[];
        otherText?: string;
      }
    >
  >({});
  const [clicked, setClicked] = useState(false);
  const updateOtherText = (part: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [part]: {
        ...prev[part],
        otherText: value,
      },
    }));
  };
  const toggleCondition = (part: string, condition: Condition) => {
    console.log("Part", part, "Condition ", condition);
    setFormData((prev) => {
      const existing = prev[part]?.selected || [];

      // Not Available overrides everything
      if (condition === "Not Available") {
        return {
          ...prev,
          [part]: { selected: ["Not Available"] },
        };
      }

      // Remove Not Available
      let updated = existing.filter((c) => c !== "Not Available");

      // Good is exclusive
      if (condition === "Good") {
        if (clicked) {
          setClicked(false);
          return {
            ...prev,
            [part]: { selected: [] },
          };
        }
        setClicked(true);
        return {
          ...prev,
          [part]: { selected: ["Good"] },
        };
      }

      if (condition === "Working") {
        if (clicked) {
          setClicked(false);
          return {
            ...prev,
            [part]: { selected: [] },
          };
        }
        setClicked(true);
        return {
          ...prev,
          [part]: { selected: ["Working"] },
        };
      }
      updated = updated.filter((c) => c !== "Good");
      updated = updated.filter((c) => c !== "Working");
      if (updated.includes(condition)) {
        updated = updated.filter((c) => c !== condition);
      } else {
        updated.push(condition);
      }
      console.log("Updated ", updated);
      return {
        ...prev,
        [part]: {
          ...prev[part],
          selected: updated,
        },
      };
    });
  };

  const isMajor = (part: string) =>
    selectedConditions(part).some((c) => MAJOR_ISSUES.includes(c));

  const isGood = (part: string) =>
    selectedConditions(part).some((c) => GOOD_CONDITION.includes(c));

  const selectedConditions = (part: string) => formData[part]?.selected || [];
  const handleFile = (file: File) => {
    console.log("File ", file);
  };
  return {
    selectedConditions,
    isMajor,
    toggleCondition,
    updateOtherText,
    handleFile,
    isGood
  };
};

export default useFrontRight;
