"use client";

import { useEffect, useRef, useState } from "react";



export default function ConditionSelect({
  label,
  options,
  value,
  onChange,
  isMulti = true,
  placeholder = "Select condition",
  exclusiveValue = "Good",
}: ConditionSelectProps) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isExclusiveSelected = value.includes(exclusiveValue);

  // âœ… Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // âœ… Detect if dropdown should open upward (footer case)
  const updateDropDirection = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = dropdownRef.current?.offsetHeight ?? 240;

    // Open upward if there isn't enough space below and more room above.
    setDropUp(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
  };

  useEffect(() => {
    if (!open) return;

    const raf = requestAnimationFrame(updateDropDirection);
    const handleResizeOrScroll = () => updateDropDirection();

    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll, true);
    };
  }, [open]);

  const handleSelect = (selectedValue: string) => {
    let updatedValues: string[] = [];

    if (isMulti) {
      // Multi Select (checkbox)
      if (value.includes(selectedValue)) {
        updatedValues = value.filter((v) => v !== selectedValue);
      } else {
        updatedValues = [...value, selectedValue];
      }
    } else {
      // Single Select (radio)
      updatedValues = [selectedValue];
      setOpen(false); // close after select
    }

    onChange(updatedValues);
  };
  const isDisabled = (optionValue: string) => {
    if (!isMulti) return false;

    return (
      (isExclusiveSelected && optionValue !== exclusiveValue) ||
      (!isExclusiveSelected &&
        value.length > 0 &&
        optionValue === exclusiveValue)
    );
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    return value
      .map((v) => options.find((opt) => opt.value === v)?.label ?? v)
      .join(", ");
  };

  return (
    <div ref={containerRef} className="w-full relative">
      {label && (
        <p className="text-sm font-bold text-gray-900 mb-2">{label}</p>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl 
        flex justify-between items-center text-left bg-white"
      >
        <span className="text-gray-700 truncate">
          {getDisplayText()}
        </span>

        <span className="text-gray-400">{open ? "^" : "v"}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className={`absolute w-full bg-white border rounded-xl shadow-lg z-50 max-h-60 overflow-auto 
          ${dropUp ? "mb-2 bottom-full" : "top-full mt-2"}`}
        >
          {options.map((opt) => {
            const checked = value.includes(opt.value);
            const disabled = isDisabled(opt.value);

            return (
              <label
                key={opt.value}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50
                ${disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                  }`}
              >
                {/* Checkbox Multi */}
                {isMulti ? (
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => handleSelect(opt.value)}
                    className="w-4 h-4 accent-slate-700"
                  />
                ) : (
                  /* Radio Single */
                  <input
                    type="radio"
                    checked={checked}
                    onChange={() => handleSelect(opt.value)}
                    className="w-4 h-4 accent-slate-700 hidden"
                  />
                )}

                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

