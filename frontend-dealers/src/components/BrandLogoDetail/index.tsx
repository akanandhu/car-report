const BrandLogoDetail = () => {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="w-16 h-16 bg-linear-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-2xl">🚗</span>
      </div>
      <div className="text-start">
        <h2 className="text-3xl font-bold text-gray-900">CarAssess</h2>
        <h5 className="text-sm text-slate-600 font-medium">
          Trusted by 15,000+
        </h5>
      </div>
    </div>
  );
};

export default BrandLogoDetail;
