import ChevronLeft from "@/public/assets/svg/ChevronLeft";

const Back = ({ onBack }: { onBack: () => void }) => {
  return (
    <button
      type="button"
      onClick={onBack}
      className="flex items-center text-slate-700 hover:text-slate-900 font-semibold mb-4 transition-colors"
    >
      <ChevronLeft />
      Back
    </button>
  );
};

export default Back;
