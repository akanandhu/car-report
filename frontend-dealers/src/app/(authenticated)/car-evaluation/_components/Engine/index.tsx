import React, { use, useState } from "react";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";
import ImageUpload from "@/src/components/ImageUpload";
import useEngineForm from "./useHooks";
import Select from "@/src/components/Select";
import { engineConditionOptions, engineSoundOptions } from "./helper";

const Engine = ({ data, onChange }: SectionComponentPropsI) => {
  const { handleFile } = useEngineForm();
  const [conditions, setConditions] = useState<string[]>([]);
  const [sounds, setSounds] = useState<string[]>([]);
  const handleSelect = (e: string[]) => {

    console.log("Engine onChange:",e);
    // const { name, value } = e.target;
    onChange({ "engineSound": e[0] });
    setSounds(e);
  };
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
      <div>
        <h2 className="text-md font-bold text-gray-900 mb-2">
          Upload Engine Compartment Images/Videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {["Front View *", "Left Angle", "Right Angle", "Damage Shot"].map(
            (label, i) => (
              <div key={label}>
                <ImageUpload label={label} onFileSelect={handleFile} />
              </div>
            ),
          )}
        </div>
        <div >
          <Select
            label="Engine Sound"
            options={engineSoundOptions}
            onChange={handleSelect}
            isMulti={false}
            value={sounds}
          />
        </div>
        {/* <div className="mt-5">
          <Select
            label="Engine Condition"
            options={engineConditionOptions}
            value={data.engineCondition || ""}
            onChange={handleChange}
            isMulti={false}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Engine;
