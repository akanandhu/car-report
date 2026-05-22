"use client";

import { KeyboardEvent } from "react";
import { SegmentedRadioOptionValue, SegmentedRadioProps } from "./types";

const SegmentedRadio = ({
  options,
  value,
  name,
  disabled = false,
  className = "",
  optionClassName = "",
  onChange,
}: SegmentedRadioProps) => {
  const enabledOptions = options.filter((option) => !option.disabled);

  const selectOption = (nextValue: SegmentedRadioOptionValue) => {
    if (!disabled) {
      onChange(nextValue);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    if (disabled || enabledOptions.length === 0) return;

    const currentOption = options[currentIndex];
    const enabledIndex = enabledOptions.findIndex(
      (option) => option.value === currentOption.value,
    );

    if (enabledIndex === -1) return;

    const isNextKey = event.key === "ArrowRight" || event.key === "ArrowDown";
    const isPreviousKey = event.key === "ArrowLeft" || event.key === "ArrowUp";

    if (!isNextKey && !isPreviousKey) return;

    event.preventDefault();

    const nextIndex = isNextKey
      ? (enabledIndex + 1) % enabledOptions.length
      : (enabledIndex - 1 + enabledOptions.length) % enabledOptions.length;
    const nextOption = enabledOptions[nextIndex];
    const nextOriginalIndex = options.findIndex(
      (option) => option.value === nextOption.value,
    );

    selectOption(nextOption.value);

    const nextButton = event.currentTarget.parentElement?.querySelector(
      `[data-segmented-radio-index="${nextOriginalIndex}"]`,
    ) as HTMLButtonElement | null;

    nextButton?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={name ? `${name} options` : "Options"}
      className={`flex w-full gap-2 rounded-xl bg-[#eeeeF3] p-1 ${
        disabled ? "opacity-60" : ""
      } ${className}`}
    >
      {options.map((option, index) => {
        const isSelected = value === option.value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={`${name || "segmented-radio"}_${option.value}_${index}`}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            data-segmented-radio-index={index}
            disabled={isDisabled}
            tabIndex={isSelected || (!value && index === 0) ? 0 : -1}
            onClick={() => selectOption(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`flex-1 rounded-xl px-4 py-1.5 text-center text-base font-bold transition-all duration-200 sm:text-lg ${
              isSelected
                ? "bg-white text-black shadow-[0_2px_5px_rgba(0,0,0,0.20)]"
                : "bg-transparent text-[#747486] hover:bg-[#f8f8fa] hover:text-black"
            } ${
              isDisabled ? "cursor-not-allowed" : "cursor-pointer"
            } ${optionClassName}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedRadio;
