"use client";
import { SectionComponentPropsI } from "../CarEvaluationForm/types";
import Front from "./_components/Front";
import FrontLeft from "./_components/FrontLeft";
import FrontRight from "./_components/FrontRight";
import Left from "./_components/Left";
import Rare from "./_components/Rare";
import RareRight from "./_components/RareRight";

const ExteriorSection = ({ data }: SectionComponentPropsI) => {
  
  const onChange = (sectionData: Partial<SectionComponentPropsI["data"]>) => {
    data = { ...data, ...sectionData };
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
      <Front data={data} onChange={onChange} />
      <FrontRight data={data} onChange={onChange} />
      <RareRight data={data} onChange={onChange} />
      <Rare data={data} onChange={onChange} />
      <Left data={data} onChange={onChange} />
      <FrontLeft data={data} onChange={onChange} />
    </div>
  );
};

export default ExteriorSection;
