"use client";
import Input from "@/src/components/Input";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";

const SellerSection = ({ data, onChange }: SectionComponentPropsI) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Seller Information
        </h2>
        <p className="text-sm text-gray-600">
          Enter the seller's contact details
        </p>
      </div>

      <Input
        label="Seller Full Name"
        type="text"
        name="sellerName"
        placeholder="Enter seller's full name"
        value={data.sellerName || ""}
        onChange={handleChange}
      />

      <Input
        label="Seller Address"
        type="text"
        name="sellerAddress"
        placeholder="Enter complete address"
        value={data.sellerAddress || ""}
        onChange={handleChange}
      />

      <Input
        label="Seller Phone Number"
        type="tel"
        name="sellerPhone"
        placeholder="Enter phone number"
        value={data.sellerPhone || ""}
        onChange={handleChange}
      />

      <Input
        label="Seller Email ID"
        type="email"
        name="sellerEmail"
        placeholder="Enter email address"
        value={data.sellerEmail || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default SellerSection;

