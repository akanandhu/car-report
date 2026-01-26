import { ButtonProps } from "./types";

const Button = ({
  children,
  variant = "outlined",
  size = "md",
  startAdornment,
  endAdornment,
  fullWidth = false,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...rest
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    outlined:
      "border-2 border-gray-300 bg-transparent text-gray-900 hover:border-slate-400 hover:bg-slate-50 focus:ring-slate-400",
    filled:
      "border-2 border-slate-700 bg-slate-700 text-white hover:bg-slate-800 hover:border-slate-800 focus:ring-slate-500",
    contained:
      "bg-slate-700 text-white hover:bg-slate-800 hover:shadow-lg focus:ring-slate-500 font-bold disabled:opacity-60",
  };

  const sizeStyles = {
    sm: "py-2 px-4 text-sm gap-2",
    md: "py-3 px-5 text-base gap-3",
    lg: "py-4 px-6 text-lg gap-4",
    xs:"py-1 px-2 text-xs gap-1"
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {startAdornment && (
        <span className="flex items-center">{startAdornment}</span>
      )}
      <span className="flex-1">
        {children}
      </span>
      {endAdornment && (
        <span className="flex items-center">{endAdornment}</span>
      )}
    </button>
  );
};

export default Button;
