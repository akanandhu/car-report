export type SegmentedRadioOptionValue = string | number;

export type SegmentedRadioOption = {
  label: string;
  value: SegmentedRadioOptionValue;
  disabled?: boolean;
};

export type SegmentedRadioProps = {
  options: SegmentedRadioOption[];
  value?: SegmentedRadioOptionValue | null;
  name?: string;
  disabled?: boolean;
  className?: string;
  optionClassName?: string;
  onChange: (value: SegmentedRadioOptionValue) => void;
};
