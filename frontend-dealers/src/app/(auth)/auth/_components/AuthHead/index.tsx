import BrandLogoDetail from "@/src/components/BrandLogoDetail";

const AuthHead = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center text-center mb-8">
      <BrandLogoDetail />
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Evaluate Cars with Confidence
        </h1>
        <p className="text-gray-600 text-lg">Professional assessment for automotive evaluators</p>
      </div>
    </div>
  );
};

export default AuthHead;
