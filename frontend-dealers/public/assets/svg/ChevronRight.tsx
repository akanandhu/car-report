import React from "react";

const ChevronRight = ({
  className,
  width,
  height,
  color,
  ...props
}: {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "24"}
      height={height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={
        className ||
        "lucide lucide-chevron-right w-5 h-5 text-gray-400 group-hover:text-slate-400"
      }
      {...props}
    >
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  );
};

export default ChevronRight;
