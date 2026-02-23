"use client";

import React, { useMemo } from "react";
import Accordion from "@/src/components/Accordion";
import ImageUpload from "@/src/components/ImageUpload";
import Input from "@/src/components/Input";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";
import useFeaturesForm from "./useHooks";
import { FeaturesFormData } from "./types";

const Features = ({ data, onChange }: SectionComponentPropsI) => {
  const { setValue, watch, handleFile } = useFeaturesForm({ data });

  const GOOD_VALUES = useMemo(
    () => new Set(["Good", "Working", "Functioning", "Available", "Yes"]),
    [],
  );

  const getMultiValue = (name: keyof FeaturesFormData) =>
    (watch(name) as string[]) ?? [];

  const getSingleValue = (name: keyof FeaturesFormData) =>
    (watch(name) as string) ?? "";

  const handleToggleMulti = (
    name: keyof FeaturesFormData,
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

  const handleToggleSingle = (name: keyof FeaturesFormData, option: string) => {
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
    name: keyof FeaturesFormData,
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
    name: keyof FeaturesFormData,
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
      title: "Keyless Entry *",
      badge: getBadge(getMultiValue("keylessEntry")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions("keylessEntry", [
            "Remote Lock",
            "Central Lock",
            "Not Available",
            "Not Working",
            "Remote Key Damaged",
            "Other",
          ])}
          <ImageUpload label="Keyless Entry Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Stereo Image *",
      badge: getBadge(getMultiValue("stereoImage")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions("stereoImage", [
            "Good",
            "Not Available",
            "Customer will take Stereo",
            "Touch Stereo",
            "Not Working",
            "Other",
          ])}
          <ImageUpload label="Stereo Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Stereo Brand *",
      badge: getBadge(getSingleValue("stereoBrand") ? ["Available"] : []),
      children: (
        <Input
          label="Stereo Brand"
          type="text"
          placeholder="Enter stereo brand"
          value={getSingleValue("stereoBrand")}
          onChange={(e) => {
            const nextValue = e.target.value;
            setValue("stereoBrand", nextValue, { shouldValidate: true });
            onChange({ stereoBrand: nextValue });
          }}
        />
      ),
    },
    {
      title: "Rear Parking Sensor",
      badge: getBadge(
        getSingleValue("rearParkingSensor")
          ? [getSingleValue("rearParkingSensor")]
          : [],
      ),
      children: renderSingleOptions("rearParkingSensor", [
        "Working",
        "Not Working",
        "Not Available",
      ]),
    },
    {
      title: "Sunroof *",
      badge: getBadge(getMultiValue("sunroof")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "sunroof",
            ["Working", "Not Available", "Not Working", "Damaged", "Replaced", "Other"],
            ["Working"],
          )}
          <ImageUpload label="Sunroof Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "GPS Navigation",
      badge: getBadge(
        getSingleValue("gpsNavigation")
          ? [getSingleValue("gpsNavigation")]
          : [],
      ),
      children: renderSingleOptions("gpsNavigation", [
        "Not Available",
        "Not Working",
        "Available",
      ]),
    },
    {
      title: "Alloy Wheels *",
      badge: getBadge(getMultiValue("alloyWheels")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions("alloyWheels", [
            "Yes",
            "Good",
            "Not available",
            "Scratched",
            "Drum Scratched",
            "Alloy Wheel Missing",
            "Damaged",
            "Other",
          ])}
          <ImageUpload label="Alloy Wheels Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Fog Lamps",
      badge: getBadge(
        getSingleValue("fogLamps") ? [getSingleValue("fogLamps")] : [],
      ),
      children: renderSingleOptions("fogLamps", [
        "Working",
        "Not Available",
        "Damaged",
        "Needs Replacement",
      ]),
    },
    {
      title: "Air Bag *",
      badge: getBadge(getMultiValue("airBag")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions("airBag", [
            "1",
            "2",
            "2+",
            "Not Available",
            "Damaged",
            "Deployed",
            "Other",
          ])}
          <ImageUpload label="Air Bag Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Seat Belt *",
      badge: getBadge(
        getSingleValue("seatBelt") ? [getSingleValue("seatBelt")] : [],
      ),
      children: renderSingleOptions("seatBelt", [
        "Working",
        "Not Working",
        "Damaged",
      ]),
    },
    {
      title: "ABS EBD (Anti-lock Braking System) *",
      badge: getBadge(getMultiValue("absEbd")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "absEbd",
            [
              "Functioning",
              "Not Functioning",
              "Not Available",
              "ABS EBD Sensor Damaged",
              "ABS EBD Module Damaged",
            ],
            ["Functioning"],
          )}
          <ImageUpload label="ABS EBD Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Glove Box *",
      badge: getBadge(getMultiValue("gloveBox")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions("gloveBox", [
            "Cooled Glove Box Available",
            "Good",
            "Damaged",
            "Door Damaged",
            "Scratched",
            "Other",
          ])}
          <ImageUpload label="Glove Box Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Any Interior Modifications",
      badge: getBadge(getSingleValue("interiorModifications") ? ["Available"] : []),
      children: (
        <Input
          label="Interior Modifications"
          type="text"
          placeholder="Describe any interior modifications"
          value={getSingleValue("interiorModifications")}
          onChange={(e) => {
            const nextValue = e.target.value;
            setValue("interiorModifications", nextValue, { shouldValidate: true });
            onChange({ interiorModifications: nextValue });
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Features</h2>
        <p className="text-sm text-gray-600">
          Review key features and in-cabin equipment
        </p>
      </div>

      <Accordion items={accordionItems} />
    </div>
  );
};

export default Features;
