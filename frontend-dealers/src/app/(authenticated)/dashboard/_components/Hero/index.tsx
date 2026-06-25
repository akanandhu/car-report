import Plus from "@/public/assets/svg/Plus";
import Button from "@/src/components/Button";
import Link from "next/link";

const Hero = () => {
  return (
    <header>
      <div className="w-full px-4 pt-6 sm:px-8 sm:pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#081a43] sm:text-[24px]">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-[#5973a9] sm:text-[14px] sm:leading-7">
              Track your team&apos;s performance and recent evaluations.
            </p>
          </div>
          <Link href="/car-evaluation" className="w-full sm:w-auto">
            <Button
              variant="filled"
              size="md"
              startAdornment={<Plus className="h-4 w-4" />}
              className="w-full whitespace-nowrap font-semibold sm:w-auto"
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
