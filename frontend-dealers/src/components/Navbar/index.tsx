import React from "react";
import Button from "../Button";
import Logout from "@/public/assets/svg/Logout";

const Navbar = () => {
  return (
    <div className="flex justify-between md:px-32 px-2 w-full sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="w-full mx-auto px-3 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">CarAsses</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">name</p>
            <p className="text-xs text-slate-500">email</p>
          </div>
          {/* <button className="flex items-center px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors border-none">
            <Logout />
            <span className="text-sm font-medium">Logout</span>
          </button> */}
          <Button
            variant="outlined"
            startAdornment={<Logout />}
            className="py-2 px-4 border-none"
            size="xs"
          >
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
