"use client";
import DocumentVerificationItem from "@/src/components/DocumentVerificationItem";
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

      <div className="bg-white rounded-2xl border-2 border-gray-300 p-6 space-y-6">
        <DocumentVerificationItem
          id="rcBook"
          name="rcBook"
          label="RC Book (Registration Certificate)"
          checked={data.rcBook || false}
          onCheckedChange={handleChange}
        />

        <DocumentVerificationItem
          id="insurance"
          name="insurance"
          label="Valid Insurance"
          checked={data.insurance || false}
          onCheckedChange={handleChange}
        />

        <DocumentVerificationItem
          id="pollutionCertificate"
          name="pollutionCertificate"
          label="Pollution Certificate (PUC)"
          checked={data.pollutionCertificate || false}
          onCheckedChange={handleChange}
        />

        <DocumentVerificationItem
          id="servicingHistory"
          name="servicingHistory"
          label="Servicing History"
          checked={data.servicingHistory || false}
          onCheckedChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DocumentsSection;

