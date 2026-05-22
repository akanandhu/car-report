import Plus from "@/public/assets/svg/Plus";
import Button from "@/src/components/Button";
import Link from "next/link";

const Hero = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#081a43] sm:text-[24px]">
              Dashboard Overview
            </h1>
            <p className="text-[13px] leading-7 text-[#5973a9] sm:text-[14px]">
              Track your team's performance and recent evaluations.
            </p>
          </div>
          <Link href="/car-evaluation">
            <Button
              variant="filled"
              size="sm"
              className="rounded-[18px] bg-[#06081d] font-semibold"
              startAdornment={<Plus className="h-4 w-4" />}
            >
              Create Car Evaluation
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Hero;
