"use client";
import Input from "@/src/components/Input";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";

const CarSpecsSection = ({ data, onChange }: SectionComponentPropsI) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Car Specifications
        </h2>
        <p className="text-sm text-gray-600">
          Enter the vehicle specifications
        </p>
      </div>

      <Input
        label="Make"
        type="text"
        name="make"
        placeholder="e.g., Maruti Suzuki"
        value={data.make || ""}
        onChange={handleChange}
      />

      <Input
        label="Model"
        type="text"
        name="model"
        placeholder="e.g., Swift"
        value={data.model || ""}
        onChange={handleChange}
      />

      <Input
        label="Year"
        type="text"
        name="year"
        placeholder="e.g., 2020"
        value={data.year || ""}
        onChange={handleChange}
      />

      <Input
        label="Variant"
        type="text"
        name="variant"
        placeholder="e.g., VXI"
        value={data.variant || ""}
        onChange={handleChange}
      />

      <Input
        label="Color"
        type="text"
        name="color"
        placeholder="e.g., Pearl White"
        value={data.color || ""}
        onChange={handleChange}
      />

      <Input
        label="Fuel Type"
        type="text"
        name="fuelType"
        placeholder="e.g., Petrol, Diesel, CNG"
        value={data.fuelType || ""}
        onChange={handleChange}
      />

      <Input
        label="Transmission"
        type="text"
        name="transmission"
        placeholder="e.g., Manual, Automatic"
        value={data.transmission || ""}
        onChange={handleChange}
      />

      <Input
        label="KM Driven"
        type="text"
        name="kmDriven"
        placeholder="e.g., 45000"
        value={data.kmDriven || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default CarSpecsSection;

