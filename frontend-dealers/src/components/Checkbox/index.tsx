import { CheckboxProps } from "./types";

const Checkbox = ({
  label,
  containerClassName = "",
  className = "",
  id,
  disabled = false,
  ...rest
}: CheckboxProps) => {
  const checkboxClasses = `w-5 h-5 accent-slate-700 rounded cursor-pointer transition-all duration-200 ${
    disabled ? "opacity-60 cursor-not-allowed" : ""
  } ${className}`;

  const containerClasses = `flex items-start gap-3 ${containerClassName}`;

  return (
    <div className={containerClasses}>
      <input
        type="checkbox"
        id={id}
        className={checkboxClasses}
        disabled={disabled}
        {...rest}
      />
      {label && (
        <label
          htmlFor={id}
          className={`text-sm text-gray-700 leading-relaxed font-medium ${
            disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;

