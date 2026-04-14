import React from "react";
import { StatusProps } from "./types";

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: "bg-amber-100", text: "text-amber-700", label: "Draft" },
  completed: { bg: "bg-blue-100", text: "text-blue-700", label: "Completed" },
  in_sale: { bg: "bg-green-100", text: "text-green-700", label: "In Sale" },
  sold: { bg: "bg-slate-200", text: "text-slate-600", label: "Sold" },
  pending: { bg: "bg-orange-100", text: "text-orange-700", label: "Pending" },
  rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
};

const Status = ({ status, className = "" }: StatusProps) => {
  const normalized = status.toLowerCase().replace(/\s+/g, "_");
  const config = statusConfig[normalized] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
    label: status,
  };

  return (
    <div
      className={`py-0.5 px-2.5 text-xs font-medium rounded-lg ${config.bg} ${config.text} ${className}`}
    >
      {config.label}
    </div>
  );
};

export default Status;
