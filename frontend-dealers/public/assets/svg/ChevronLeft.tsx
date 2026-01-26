
const ChevronLeft = ({
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
        "lucide lucide-chevron-left w-5 h-5 text-slate-700"
      }
      {...props}
    >
      <path d="m15 18-6-6 6-6"></path>
    </svg>
  );
};

export default ChevronLeft;

