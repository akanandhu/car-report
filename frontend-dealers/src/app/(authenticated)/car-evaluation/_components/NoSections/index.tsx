import Button from "@/src/components/Button";

const CarEvaluationNoSection = ({ handleBack }: { handleBack: () => void }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="mb-4 text-xl text-slate-500">
          No evaluation sections available.
        </p>
        <Button
          variant="outlined"
          onClick={handleBack}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm hover:border-slate-300 hover:bg-slate-50"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default CarEvaluationNoSection;
