import Filter from "@/public/assets/svg/Filter";
import Magnifier from "@/public/assets/svg/Magnifier";
import Plus from "@/public/assets/svg/Plus";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import React from "react";

const Hero = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="px-4 py-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Car Evaluations</h1>
          <Button
            variant="filled"
            size="sm"
            startAdornment={<Plus className="w-4 h-4" />}
          >
            Create
          </Button>
        </div>
        <div className="flex">
          <div className="w-full relative mr-2">
            <Magnifier className="absolute h-4 w-4 text-slate-500 top-2.5 left-3" />
            <Input
              className="h-9 pl-8 pr-2 py-1 text-sm"
              placeholder="Search by make, model, reg no, seller..."
            />
          </div>
          <Button variant="outlined" size="xs" className="px-3"><Filter className="h-4 w-4"/></Button>
        </div>
      </div>
    </header>
  );
};
export default Hero;
