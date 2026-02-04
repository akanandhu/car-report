"use client";
import Input from "@/src/components/Input";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";

const RegistrationSection = ({ data, onChange }: SectionComponentPropsI) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Registration Details
        </h2>
        <p className="text-sm text-gray-600">
          Enter the vehicle registration information
        </p>
      </div>

      <Input
        label="Registration Number"
        type="text"
        name="registrationNumber"
        placeholder="e.g., MH12AB1234"
        value={data.registrationNumber || ""}
        onChange={handleChange}
      />

      <Input
        label="Registration Date"
        type="date"
        name="registrationDate"
        value={data.registrationDate || ""}
        onChange={handleChange}
      />

      <Input
        label="Registration State"
        type="text"
        name="registrationState"
        placeholder="e.g., Maharashtra"
        value={data.registrationState || ""}
        onChange={handleChange}
      />

      <Input
        label="Ownership Type"
        type="text"
        name="ownershipType"
        placeholder="e.g., First Owner, Second Owner"
        value={data.ownershipType || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default RegistrationSection;

