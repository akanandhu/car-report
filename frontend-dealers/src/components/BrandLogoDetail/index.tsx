import React from "react";

const BrandLogoDetail = () => {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="w-12 h-12 bg-linear-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-xl">🚗</span>
      </div>
      <div className="text-start">
        <h2 className="text-2xl font-bold text-gray-900">Car Report App</h2>
        <h5 className="text-xs text-slate-700 font-semibold">
          Trusted by Dealers
        </h5>
      </div>
    </div>
  );
};

export default BrandLogoDetail;
