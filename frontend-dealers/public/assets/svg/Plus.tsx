const Plus = ({
  className,
  width,
  height,
  ...props
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "w-6 h-6"}
      {...props}
    >
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>      
    </svg>
  );
};

export default Plus;
