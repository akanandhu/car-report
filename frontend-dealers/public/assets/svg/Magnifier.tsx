const Magnifier = ({
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
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>      
    </svg>
  );
};

export default Magnifier;
