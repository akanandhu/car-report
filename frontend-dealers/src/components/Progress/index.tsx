import { ProgressProps } from "./types";

const Progress = ({ value, className = "" }: ProgressProps) => {
  const progressClasses = `w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`;

  return (
    <div className={progressClasses}>
      <div
        className="h-full bg-slate-700 transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;

