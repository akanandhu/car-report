"use client";

import { useMemo } from "react";
import Accordion from "@/src/components/Accordion";
import ImageUpload from "@/src/components/ImageUpload";
import Input from "@/src/components/Input";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";
import useEngineForm from "./useHooks";
import { EngineFormData } from "./types";

const Engine = ({ data, onChange }: SectionComponentPropsI) => {
  const { handleFile, errors, setValue, watch } = useEngineForm({ data });

  const GOOD_VALUES = useMemo(() => new Set(["Good", "Working", "Normal", "Condition Ok"]), []);
  const WARNING_VALUES = useMemo(() => new Set(["Weak"]), []);
  const BAD_VALUES = useMemo(() => new Set(["Damaged", "Leak", "Not Working", "Noisy", "Other", "Minor Sound", "Major Sound", "Critical Sound"]), []);
  const getMultiValue = (name: keyof EngineFormData) =>
    (watch(name) as string[]) ?? [];

  const getSingleValue = (name: keyof EngineFormData) =>
    (watch(name) as string) ?? "";

  const handleToggleMulti = (
    name: keyof EngineFormData,
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

  const handleToggleSingle = (
    name: keyof EngineFormData,
    option: string,
  ) => {
    const current = getSingleValue(name);
    const next = current === option ? "" : option;

    setValue(name, next, { shouldValidate: true });
    onChange({ [name]: next } as Partial<SectionComponentPropsI["data"]>);
  };

  const getBadge = (selected: string[]) => {
    if (!selected || selected.length === 0) return null;
    const hasGood = selected.some((value) => GOOD_VALUES.has(value));
    const hasbad = selected.some((value) => BAD_VALUES.has(value));
    const hasWarning = selected.some((value) => WARNING_VALUES.has(value) && !hasbad);
    console.log("Selected values for badge:", selected, "Has Good:", hasGood, "Has Warning:", hasWarning);
    return (
      <span
        className={`text-xs px-3 py-1 rounded-full ${
          hasGood ? "bg-green-100 text-green-700" : hasWarning ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
        }` }
      >
        {hasGood ? "Good Condition" : hasWarning ? "Minor Issue" : "Major Issue"}
      </span>
    );
  };

  const renderMultiOptions = (
    name: keyof EngineFormData,
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
    name: keyof EngineFormData,
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
      title: "Engine Sound *",
      badge: getBadge(
        getSingleValue("engineSound") ? [getSingleValue("engineSound")] : [],
      ),
      children: renderSingleOptions("engineSound", [
        "Normal",
        "Minor Sound",
        "Major Sound",
        "Critical Sound",
      ]),
    },
    {
      title: "Engine *",
      badge: getBadge(getMultiValue("engineCondition")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions("engineCondition", [
            "Condition Ok",
            "Repaired",
            "Tappet Noise",
            "Timing Noise",
            "Silencer Noise",
            "Turbo & Whistling Noise",
            "Injector Leakage",
            "Turbo Leakage",
            "Weak Compression",
            "Air Filter Box Damaged",
            "RPM Fluctuating",
            "Other",
          ])}
          <ImageUpload label="Engine Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Smoke *",
      badge: getBadge(getSingleValue("smoke") ? [getSingleValue("smoke")] : []),
      children: renderSingleOptions("smoke", [
        "Normal",
        "White",
        "Black",
        "Blue",
        "Other",
      ]),
    },
    {
      title: "Engine Idle Start Video *",
      badge: null,
      children: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Provide footage, if possible with acceleration and without
            acceleration for comprehensive assessment.
          </p>
          <ImageUpload label="Engine Idle Start Video *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Battery *",
      badge: getBadge(getMultiValue("battery")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "battery",
            ["Good", "Weak", "Terminal Corroded", "Fluid Leakage", "Jumpstart"],
            ["Good"],
          )}
          <ImageUpload label="Battery Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Radiator *",
      badge: getBadge(
        getSingleValue("radiator") ? [getSingleValue("radiator")] : [],
      ),
      children: renderSingleOptions("radiator", [
        "Good",
        "Damaged",
        "Leak",
        "Other",
      ]),
    },
    {
      title: "Starting Motor *",
      badge: getBadge(
        getSingleValue("startingMotor")
          ? [getSingleValue("startingMotor")]
          : [],
      ),
      children: renderSingleOptions("startingMotor", [
        "Good",
        "Damaged",
        "Manifold",
        "Malfunctioning",
        "Not Working",
        "Other",
      ]),
    },
    {
      title: "Coolant *",
      badge: getBadge(
        getSingleValue("coolant") ? [getSingleValue("coolant")] : [],
      ),
      children: renderSingleOptions("coolant", [
        "Good",
        "Dirty",
        "Oil Mix",
        "Leak",
        "Other",
      ]),
    },
    {
      title: "Blowby Back Compression *",
      badge: getBadge(getMultiValue("blowbyBackCompression")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions("blowbyBackCompression", [
            "No Blowby",
            "Blowby on Idle",
            "Oil Spillage on Idle",
            "Back Compression",
            "Other",
          ])}
          <ImageUpload
            label="Blowby Back Compression Image *"
            onFileSelect={handleFile}
          />
        </div>
      ),
    },
    {
      title: "Silencer *",
      badge: getBadge(getMultiValue("silencer")),
      children: renderMultiOptions(
        "silencer",
        ["Good", "Noisy", "Damaged", "Other"],
        ["Good"],
      ),
    },
    {
      title: "Clutch Operations *",
      badge: getBadge(getMultiValue("clutchOperations")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "clutchOperations",
            ["Good", "Slipping", "Hard", "Spongy", "Other"],
            ["Good"],
          )}
          <ImageUpload label="Clutch Operations Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Gearbox *",
      badge: getBadge(getMultiValue("gearbox")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "gearbox",
            [
              "Good",
              "Shift Hard",
              "Not Engaging",
              "Noisy",
              "Jittering",
              "Not Satisfactory",
              "Other",
            ],
            ["Good"],
          )}
          <ImageUpload label="Gearbox Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Engine Oil *",
      badge: getBadge(getMultiValue("engineOil")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "engineOil",
            [
              "Good",
              "Leakage from Tappet Cover",
              "Leakage from Side Cover",
              "Low",
              "Dirty",
              "Other",
            ],
            ["Good"],
          )}
          <ImageUpload label="Engine Oil Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Turbo Charger",
      badge: getBadge(getMultiValue("turboCharger")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "turboCharger",
            ["Working", "Leakage", "Not Working", "Noisy", "Other"],
            ["Working"],
          )}
          <ImageUpload label="Turbo Charger Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Gearbox Leakage *",
      badge: getBadge(
        getSingleValue("gearboxLeakage")
          ? [getSingleValue("gearboxLeakage")]
          : [],
      ),
      children: renderSingleOptions("gearboxLeakage", ["Yes", "No"]),
    },
    {
      title: "Engine Comments (Remark) *",
      badge: null,
      children: (
        <div>
          <Input
            label="Engine Comments (Remark)"
            type="text"
            placeholder="Enter detailed remarks and observations"
            value={getSingleValue("engineComments")}
            onChange={(e) => {
              const nextValue = e.target.value;
              setValue("engineComments", nextValue, { shouldValidate: true });
              onChange({ engineComments: nextValue });
            }}
          />
          {errors.engineComments?.message && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.engineComments?.message}
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Engine Mount",
      badge: getBadge(getMultiValue("engineMount")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "engineMount",
            ["Good", "Jerking", "Damaged", "Other"],
            ["Good"],
          )}
          <ImageUpload label="Engine Mount Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Sump *",
      badge: getBadge(getMultiValue("sump")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions("sump", ["Good", "Damaged", "Leakage", "Other"], [
            "Good",
          ])}
          <ImageUpload label="Sump Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Engine Condition
        </h2>
        <p className="text-sm text-gray-600">
          Assess the engine condition of the vehicle
        </p>
      </div>
      <Accordion items={accordionItems} />
    </div>
  );
};

export default Engine;
