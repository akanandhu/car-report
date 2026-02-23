"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";
import ImageUpload from "@/src/components/ImageUpload";
import Input from "@/src/components/Input";
import Accordion from "@/src/components/Accordion";
import useInteriorElectricalForm from "./useHooks";
import { InteriorElectricalFormData } from "./types";
import { interiorUploadLabels } from "./helper";

const InteriorElectrical = ({ data, onChange }: SectionComponentPropsI) => {
  const { control, errors, handleFile, setValue, watch } =
    useInteriorElectricalForm({ data });
  const [uploads, setUploads] = useState<
    { id: string; preview: string | null; fileType: "image" | "video" | null }[]
  >([{ id: "upload-1", preview: null, fileType: null }]);

  const addUploadFromFile = useCallback(
    (file: File) => {
      const preview = URL.createObjectURL(file);
      const fileType = file.type.startsWith("video") ? "video" : "image";
      setUploads((prev) => [
        ...prev,
        {
          id: `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          preview,
          fileType,
        },
      ]);
      handleFile(file);
    },
    [handleFile],
  );

  const GOOD_VALUES = useMemo(
    () => new Set(["Good", "Working", "Functioning", "All Windows Working"]),
    [],
  );

  const getMultiValue = (name: keyof InteriorElectricalFormData) =>
    (watch(name) as string[]) ?? [];

  const getSingleValue = (name: keyof InteriorElectricalFormData) =>
    (watch(name) as string) ?? "";

  const handleToggleMulti = (
    name: keyof InteriorElectricalFormData,
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
    name: keyof InteriorElectricalFormData,
    option: string,
  ) => {
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
    name: keyof InteriorElectricalFormData,
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
    name: keyof InteriorElectricalFormData,
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
      title: "Cluster Panel *",
      badge: getBadge(getMultiValue("clusterPanel")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "clusterPanel",
            [
              "Good",
              "Speedometer Not Working",
              "Warning Light",
              "Speedometer Damaged",
              "Other",
            ],
            ["Good"],
          )}
          {getMultiValue("clusterPanel").includes("Warning Light") && (
            <Input
              label="Warning Details"
              type="text"
              placeholder="Enter warning light details"
              value={getSingleValue("clusterPanelWarningDetails")}
              onChange={(e) => {
                const nextValue = e.target.value;
                setValue("clusterPanelWarningDetails", nextValue, {
                  shouldValidate: true,
                });
                onChange({ clusterPanelWarningDetails: nextValue });
              }}
            />
          )}
          <ImageUpload label="Cluster Panel Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Dashboard *",
      badge: getBadge(getMultiValue("dashboard")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "dashboard",
            [
              "Good",
              "Faded",
              "Broken",
              "Rattling sound",
              "Scratched",
              "AC Vent Grill Broken",
              "Other",
            ],
            ["Good"],
          )}
          <ImageUpload label="Dashboard Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Front Seat *",
      badge: getBadge(getMultiValue("frontSeat")),
      children: renderMultiOptions("frontSeat", [
        "Good",
        "Fabric",
        "Leather",
        "Fabric Damaged",
        "Leather Damaged",
        "Dirty",
        "Other",
      ]),
    },
    {
      title: "Rear Seat *",
      badge: getBadge(getMultiValue("rearSeat")),
      children: renderMultiOptions("rearSeat", [
        "Good",
        "Fabric",
        "Leather",
        "Fabric Damaged",
        "Leather Damaged",
        "Dirty",
        "Other",
      ]),
    },
    {
      title: "Roof Lining *",
      badge: getBadge(getMultiValue("roofLining")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "roofLining",
            ["Good", "Damaged", "Cracked", "Faded"],
            ["Good"],
          )}
          <ImageUpload label="Roof Lining Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Inside Rear View Mirror *",
      badge: getBadge(getMultiValue("insideRearViewMirror")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "insideRearViewMirror",
            ["Good", "Damaged", "Scratched"],
            ["Good"],
          )}
          <ImageUpload
            label="Inside Rear View Mirror Image *"
            onFileSelect={handleFile}
          />
        </div>
      ),
    },
    {
      title: "Interior View from Rear Seat to Dashboard *",
      badge: null,
      children: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Inside boot to front windshield and downside gear shifting area.
          </p>
          <ImageUpload
            label="Interior View Image *"
            onFileSelect={handleFile}
          />
        </div>
      ),
    },
    {
      title: "Power Window-Panel Image *",
      badge: null,
      children: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Visual confirmation of the power window&apos;s condition.
          </p>
          <ImageUpload
            label="Power Window-Panel Image *"
            onFileSelect={handleFile}
          />
        </div>
      ),
    },
    {
      title: "Push Button (On/Off) *",
      badge: getBadge(
        getSingleValue("pushButton")
          ? [getSingleValue("pushButton")]
          : [],
      ),
      children: renderSingleOptions("pushButton", [
        "Functioning",
        "Not Functioning",
        "Not Available",
      ]),
    },
    {
      title: "Dashboard Switches *",
      badge: getBadge(
        getSingleValue("dashboardSwitches")
          ? [getSingleValue("dashboardSwitches")]
          : [],
      ),
      children: renderSingleOptions("dashboardSwitches", [
        "Good",
        "Damaged",
        "Other",
      ]),
    },
    {
      title: "Power Window & Window Lock *",
      badge: getBadge(getMultiValue("powerWindowAndWindowLock")),
      children: renderMultiOptions(
        "powerWindowAndWindowLock",
        [
          "Front RH Power Window Not Working",
          "Front RH Power Window Working",
          "Front RH Power Window Stuck",
          "Rear RH Power Window Not Working",
          "Rear RH Power Window Working",
          "Rear RH Power Window Stuck",
          "Front LH Power Window Not Working",
          "Front LH Power Window Working",
          "Front LH Power Window Stuck",
          "Rear LH Power Window Not Working",
          "Rear LH Power Window Working",
          "Rear LH Power Window Stuck",
          "Not Available",
          "Damaged",
          "All Windows Working",
        ],
        ["All Windows Working", "Not Available"],
      ),
    },
    {
      title: "Hand Brake *",
      badge: getBadge(getMultiValue("handBrake")),
      children: renderMultiOptions("handBrake", [
        "Working",
        "Not Working",
        "Not Satisfactory",
        "Other",
      ]),
    },
    {
      title: "Car Electrical *",
      badge: getBadge(getMultiValue("carElectrical")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "carElectrical",
            [
              "Good",
              "ECM Malfunction",
              "Fuel Pump Not Working",
              "Wiring Damaged",
              "Rat Damage",
              "Other",
            ],
            ["Good"],
          )}
          <ImageUpload label="Car Electrical Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "CNG/LPG Kit Image Condition",
      badge: null,
      children: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Upload required if a kit is installed.
          </p>
          <ImageUpload label="CNG/LPG Kit Image" onFileSelect={handleFile} />
        </div>
      ),
    },
    {
      title: "Second Key *",
      badge: getBadge(
        getSingleValue("secondKey") ? [getSingleValue("secondKey")] : [],
      ),
      children: renderSingleOptions("secondKey", [
        "Damaged",
        "Not Available",
        "Good",
      ]),
    },
    {
      title: "Platform *",
      badge: getBadge(getMultiValue("platform")),
      children: (
        <div className="space-y-4">
          {renderMultiOptions(
            "platform",
            ["Good", "Rusted", "Damaged", "Replaced", "Welded", "Repainted", "Other"],
            ["Good"],
          )}
          <ImageUpload label="Platform Image *" onFileSelect={handleFile} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Interior & Electrical
        </h2>
        <p className="text-sm text-gray-600">
          Assess the interior and electrical condition of the vehicle
        </p>
      </div>

      <div>
        <h2 className="text-md font-bold text-gray-900 mb-2">
          Upload Interior/Electrical Images or Videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-10">
          {interiorUploadLabels.map((label) => (
            <div key={label}>
              <ImageUpload label={label} onFileSelect={handleFile} />
            </div>
          ))}
          {uploads.map((upload, index) => (
            <div key={upload.id}>
              <ImageUpload
                label={index === 0 ? "Upload *" : "Additional"}
                onFileSelect={handleFile}
                // initialPreview={upload.preview}
                // initialFileType={upload.fileType}
                // onAddFile={addUploadFromFile}
                // showAddButton
              />
            </div>
          ))}
        </div>
      </div>

      <Controller
        name={"interiorComments" satisfies keyof InteriorElectricalFormData}
        control={control}
        render={({ field }) => (
          <div>
            <Input
              label="Interior & Electrical Comments"
              type="text"
              placeholder="Enter detailed remarks and observations"
              value={field.value || ""}
              onChange={(e) => {
                const nextValue = e.target.value;
                field.onChange(nextValue);
                onChange({ interiorComments: nextValue });
              }}
            />
            {errors.interiorComments?.message && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors.interiorComments?.message}
              </p>
            )}
          </div>
        )}
      />

      <Accordion items={accordionItems} />
    </div>
  );
};

export default InteriorElectrical;
