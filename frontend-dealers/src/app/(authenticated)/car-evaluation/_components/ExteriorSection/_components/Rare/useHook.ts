import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Condition } from "./types";
import { CarEvaluationFormDataI } from "../../../CarEvaluationForm/types";

type ExteriorFormData = {
  exteriorConditions: Record<
    string,
    {
      selected: Condition[];
      otherText?: string;
    }
  >;
};

const getDefaultValues = (data: CarEvaluationFormDataI): ExteriorFormData => ({
  exteriorConditions: data.exteriorConditions ?? {},
});

const useRare = ({
  data,
  onChange,
}: {
  data: CarEvaluationFormDataI;
  onChange: (newData: Partial<CarEvaluationFormDataI>) => void;
}) => {
  const MAJOR_ISSUES: Condition[] = [
    "Damaged",
    "Replaced",
    "Rusted",
    "Repaired",
    "Other",
    "Welded",
    "Spots",
    "Cracked",
    "Non-Functional",
    "Not Working",
    "0-25%"
  ];

  const GOOD_CONDITION : Condition[] = [
    "Good",
    "Working"
  ]

  const { reset, setValue, watch } = useForm<ExteriorFormData>({
    defaultValues: getDefaultValues(data),
  });

  useEffect(() => {
    reset(getDefaultValues(data));
  }, [data, reset]);

  const exteriorConditions = watch("exteriorConditions") ?? {};

  const updateOtherText = (part: string, value: string) => {
    const next = {
      ...exteriorConditions,
      [part]: {
        ...exteriorConditions[part],
        otherText: value,
      },
    };
    setValue("exteriorConditions", next, { shouldValidate: true });
    onChange({ exteriorConditions: next });
  };
  const toggleCondition = (part: string, condition: Condition) => {
    const existing = exteriorConditions[part]?.selected || [];

    if (condition === "Not Available") {
      const next = {
        ...exteriorConditions,
        [part]: { selected: existing.includes("Not Available") ? [] : ["Not Available"] },
      };
      setValue("exteriorConditions", next, { shouldValidate: true });
      onChange({ exteriorConditions: next });
      return;
    }

    if (condition === "Good" || condition === "Working") {
      const next = {
        ...exteriorConditions,
        [part]: { selected: existing.includes(condition) ? [] : [condition] },
      };
      setValue("exteriorConditions", next, { shouldValidate: true });
      onChange({ exteriorConditions: next });
      return;
    }

    let updated = existing.filter(
      (c) => c !== "Not Available" && c !== "Good" && c !== "Working",
    );
    if (updated.includes(condition)) {
      updated = updated.filter((c) => c !== condition);
    } else {
      updated = [...updated, condition];
    }
    const next = {
      ...exteriorConditions,
      [part]: {
        ...exteriorConditions[part],
        selected: updated,
      },
    };
    setValue("exteriorConditions", next, { shouldValidate: true });
    onChange({ exteriorConditions: next });
  };

  const isMajor = (part: string) =>
    selectedConditions(part).some((c) => MAJOR_ISSUES.includes(c));

  const isGood = (part: string) =>
    selectedConditions(part).some((c) => GOOD_CONDITION.includes(c));

  const selectedConditions = (part: string) =>
    exteriorConditions[part]?.selected || [];
  const otherText = (part: string) => exteriorConditions[part]?.otherText || "";
  const handleFile = (file: File) => {
  };
  return {
    selectedConditions,
    isMajor,
    toggleCondition,
    updateOtherText,
    handleFile,
    isGood,
    otherText,
  };
};

export default useRare;
