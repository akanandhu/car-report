import Button from "@/src/components/Button";

const CarEvaluationNoSection = ({ handleBack }: { handleBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-gray-500 mb-4">
          No evaluation sections available.
        </p>
        <Button variant="outlined" onClick={handleBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default CarEvaluationNoSection;
