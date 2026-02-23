"use client";

import React, { useMemo } from "react";
import Accordion from "@/src/components/Accordion";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";
import useTestDriveForm from "./useHooks";
import { TestDriveFormData } from "./types";

const TestDrive = ({ data, onChange }: SectionComponentPropsI) => {
  const { setValue, watch } = useTestDriveForm({ data });

  const GOOD_VALUES = useMemo(() => new Set(["Good", "Working"]), []);

  const getMultiValue = (name: keyof TestDriveFormData) =>
    (watch(name) as string[]) ?? [];

  const getSingleValue = (name: keyof TestDriveFormData) =>
    (watch(name) as string) ?? "";

  const handleToggleMulti = (
    name: keyof TestDriveFormData,
    option: string,
    exclusiveOptions: string[] = [],
  ) => {
    const current = getMultiValue(name);
    let next: string[] = [];

    if (exclusiveOptions.includes(option)) {
      next = current.includes(option) ? [] : [option];
    } else {
      next = current.filter((value) => !exclusiveOptions.includes(value));
      if (next.includes(option)) {
        next = next.filter((value) => value !== option);
      } else {
        next = [...next, option];
      }
    }

    setValue(name, next, { shouldValidate: true });
    onChange({ [name]: next } as Partial<SectionComponentPropsI["data"]>);
  };

  const handleToggleSingle = (name: keyof TestDriveFormData, option: string) => {
    const current = getSingleValue(name);
    const next = current === option ? "" : option;

    setValue(name, next, { shouldValidate: true });
    onChange({ [name]: next } as Partial<SectionComponentPropsI["data"]>);
  };

  const getBadge = (selected: string[]) => {
    if (!selected || selected.length === 0) return null;
    if (selected.length === 1 && selected[0] === "Not Available") {
      return (
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
          Not Available
        </span>
      );
    }
    const hasGood = selected.some((value) => GOOD_VALUES.has(value));
    return (
      <span
        className={`text-xs px-3 py-1 rounded-full ${
          hasGood ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {hasGood ? "Good Condition" : "Issue Noted"}
      </span>
    );
  };

  const renderMultiOptions = (
    name: keyof TestDriveFormData,
    options: string[],
    exclusiveOptions: string[] = [],
  ) => {
    const selected = getMultiValue(name);
    const hasExclusive = selected.some((value) =>
      exclusiveOptions.includes(value),
    );

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const active = selected.includes(option);
            const locked = hasExclusive && !exclusiveOptions.includes(option);

            return (
              <button
                key={option}
                disabled={locked}
                onClick={() => handleToggleMulti(name, option, exclusiveOptions)}
                className={`px-3 py-1 rounded-full text-sm border transition
                  ${
                    active
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }
                  ${locked ? "opacity-40 cursor-not-allowed" : "hover:bg-blue-100"}
                `}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSingleOptions = (
    name: keyof TestDriveFormData,
    options: string[],
  ) => {
    const selected = getSingleValue(name);

    return (
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              onClick={() => handleToggleSingle(name, option)}
              className={`px-3 py-1 rounded-full text-sm border transition
                ${
                  active
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }
                hover:bg-blue-100
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  };

  const accordionItems = [
    {
      title: "Steering System *",
      badge: getBadge(
        getSingleValue("steeringSystem")
          ? [getSingleValue("steeringSystem")]
          : [],
      ),
      children: renderSingleOptions("steeringSystem", [
        "Electric",
        "Hydraulic",
      ]),
    },
    {
      title: "Steering Wheel *",
      badge: getBadge(getMultiValue("steeringWheel")),
      children: renderMultiOptions(
        "steeringWheel",
        [
          "Good",
          "Hard",
          "Abnormal Noise",
          "Electric Not Working",
          "Hydraulic Not Working",
          "Not Working",
          "Other",
        ],
        ["Good"],
      ),
    },
    {
      title: "Steering Adjustment *",
      badge: getBadge(
        getSingleValue("steeringAdjustment")
          ? [getSingleValue("steeringAdjustment")]
          : [],
      ),
      children: renderSingleOptions("steeringAdjustment", [
        "Tilt",
        "Telescopic",
        "Not Available",
      ]),
    },
    {
      title: "Steering Mounted Audio Control *",
      badge: getBadge(
        getSingleValue("steeringMountedAudioControl")
          ? [getSingleValue("steeringMountedAudioControl")]
          : [],
      ),
      children: renderSingleOptions("steeringMountedAudioControl", [
        "Working",
        "Not Available",
        "Not Working",
        "Other",
      ]),
    },
    {
      title: "Cruise Control *",
      badge: getBadge(getMultiValue("cruiseControl")),
      children: renderMultiOptions(
        "cruiseControl",
        ["Working", "Not Working", "Not Available"],
        ["Working"],
      ),
    },
    {
      title: "Seat Adjustment",
      badge: getBadge(getMultiValue("seatAdjustment")),
      children: renderMultiOptions("seatAdjustment", [
        "Available",
        "Height Adjustable",
        "Not Available",
      ]),
    },
    {
      title: "Suspension System *",
      badge: getBadge(getMultiValue("suspensionSystem")),
      children: renderMultiOptions(
        "suspensionSystem",
        ["Good", "Leaking", "Abnormal Noise", "Damaged", "Weak", "Other"],
        ["Good"],
      ),
    },
    {
      title: "Brakes *",
      badge: getBadge(getMultiValue("brakes")),
      children: renderMultiOptions(
        "brakes",
        ["Good", "Weak", "Noisy", "Other"],
        ["Good"],
      ),
    },
    {
      title: "Clutch System *",
      badge: getBadge(getMultiValue("clutchSystem")),
      children: renderMultiOptions(
        "clutchSystem",
        ["Good", "Slipping", "Hard", "Other"],
        ["Good"],
      ),
    },
    {
      title: "Transmission Automatic *",
      badge: getBadge(getMultiValue("transmissionAutomatic")),
      children: renderMultiOptions(
        "transmissionAutomatic",
        ["Good", "Not Available", "Abnormal Noise", "Gear Not Engaged", "Other"],
        ["Good"],
      ),
    },
    {
      title: "Vehicle Horn *",
      badge: getBadge(getMultiValue("vehicleHorn")),
      children: renderMultiOptions("vehicleHorn", [
        "Good",
        "Working",
        "Modified",
        "Not Working",
        "Damaged",
        "Other",
      ]),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Test Drive</h2>
        <p className="text-sm text-gray-600">
          Assess steering, suspension, brakes, and drivetrain response
        </p>
      </div>

      <Accordion items={accordionItems} />
    </div>
  );
};

export default TestDrive;
