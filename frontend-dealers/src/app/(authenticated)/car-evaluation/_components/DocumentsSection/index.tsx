"use client";
import Checkbox from "@/src/components/Checkbox";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";

const DocumentsSection = ({ data, onChange }: SectionComponentPropsI) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Documents Verification
        </h2>
        <p className="text-sm text-gray-600">
          Check all available documents
        </p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-300 p-6 space-y-4">
        <Checkbox
          id="rcBook"
          name="rcBook"
          label="RC Book (Registration Certificate)"
          checked={data.rcBook || false}
          onChange={handleChange}
        />

        <Checkbox
          id="insurance"
          name="insurance"
          label="Valid Insurance"
          checked={data.insurance || false}
          onChange={handleChange}
        />

        <Checkbox
          id="pollutionCertificate"
          name="pollutionCertificate"
          label="Pollution Certificate (PUC)"
          checked={data.pollutionCertificate || false}
          onChange={handleChange}
        />

        <Checkbox
          id="servicingHistory"
          name="servicingHistory"
          label="Servicing History"
          checked={data.servicingHistory || false}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DocumentsSection;

