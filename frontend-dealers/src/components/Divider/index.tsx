import React from "react";

const Divider = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  if (children) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-gray-500 text-sm whitespace-nowrap">
          {children}
        </span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>
    );
  }

  return <div className={`h-px bg-gray-300 ${className}`} />;
};

export default Divider;
