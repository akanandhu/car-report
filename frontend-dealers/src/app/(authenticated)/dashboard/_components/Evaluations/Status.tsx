import React from "react";
import { StatusProps } from "./types";

const Status = ({ status, className }: StatusProps) => {
  const baseStyles = "py-0.5 px-2 text-xs rounded-lg";
  const statusStyles = status === "In Sale" && "bg-green-300/50 text-green-600" || status === "Sold" && "bg-slate-300/50 text-slate-600";

  return (
    <div className={`${baseStyles} ${statusStyles} ${className}`}>{status}</div>
  );
};

export default Status;
