type Option = {
  label: string;
  value: string;
};

type ConditionSelectProps = {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (val: string[]) => void;
  isMulti?: boolean;
  placeholder?: string;
};