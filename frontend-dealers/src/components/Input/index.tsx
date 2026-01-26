import { InputProps } from "./types";

const Input = ({
  label,
  error,
  helperText,
  fullWidth = true,
  containerClassName = "",
  className = "",
  disabled = false,
  ...rest
}: InputProps) => {
  const containerClasses = `${fullWidth ? "w-full" : ""} ${containerClassName}`;

  const inputClasses = `w-full px-5 py-4 border-2 rounded-xl focus:outline-none text-base transition-all duration-200 ${
    error
      ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200"
      : "border-gray-300 focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
  } ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white"} ${className}`;

  return (
    <div className={containerClasses}>
      {label && (
        <label className="block text-sm font-bold text-gray-900 mb-2">
          {label}
        </label>
      )}
      <input className={inputClasses} disabled={disabled} {...rest} />
      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-600">{helperText}</p>
      )}
    </div>
  );
};

export default Input;

