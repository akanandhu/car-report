"use client";
import Input from "@/src/components/Input";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";

const ExteriorSection = ({ data, onChange }: SectionComponentPropsI) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Exterior Condition
        </h2>
        <p className="text-sm text-gray-600">
          Assess the exterior condition of the vehicle
        </p>
      </div>

      <Input
        label="Exterior Condition"
        type="text"
        name="exteriorCondition"
        placeholder="e.g., Excellent, Good, Fair, Poor"
        value={data.exteriorCondition || ""}
        onChange={handleChange}
      />

      <Input
        label="Paint Condition"
        type="text"
        name="paintCondition"
        placeholder="e.g., Original, Repainted"
        value={data.paintCondition || ""}
        onChange={handleChange}
      />

      <Input
        label="Tyre Condition"
        type="text"
        name="tyreCondition"
        placeholder="e.g., Good, Needs Replacement"
        value={data.tyreCondition || ""}
        onChange={handleChange}
      />

      <div>
        <p className="text-sm font-bold text-gray-900 mb-2">
          Additional Notes
        </p>
        <p className="text-xs text-gray-600">
          You can add photos and detailed notes after submission
        </p>
      </div>
    </div>
  );
};

export default ExteriorSection;

