import BrandLogoDetail from "@/src/components/BrandLogoDetail";
import React from "react";

const AuthHead = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center text-center">
      <BrandLogoDetail />
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Welcome to Car Report App
        </h1>
        <p className="text-gray-700 text-lg">Reports for your dealership</p>
      </div>
    </div>
  );
};

export default AuthHead;
