import { ProgressProps } from "./types";

const Progress = ({ value, className = "" }: ProgressProps) => {
  const progressClasses = `w-full h-2 overflow-hidden rounded-full bg-slate-200 ${className}`;

  return (
    <div className={progressClasses}>
      <div
        className="h-full rounded-full bg-slate-950 transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;

