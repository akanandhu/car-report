import { RadioButtonProps } from "./types";

const RadioButton = ({
  label,
  containerClassName = "",
  className = "",
  id,
  name,
  disabled = false,
  ...rest
}: RadioButtonProps) => {
  const radioClasses = `w-5 h-5 accent-slate-700 cursor-pointer transition-all duration-200 ${
    disabled ? "opacity-60 cursor-not-allowed" : ""
  } ${className}`;

  const containerClasses = `flex items-center gap-3 ${containerClassName}`;

  return (
    <div className={containerClasses}>
      <input
        type="radio"
        id={id}
        name={name}
        className={radioClasses}
        disabled={disabled}
        {...rest}
      />

      {label && (
        <label
          htmlFor={id}
          className={`text-sm text-gray-700 font-medium ${
            disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioButton;
