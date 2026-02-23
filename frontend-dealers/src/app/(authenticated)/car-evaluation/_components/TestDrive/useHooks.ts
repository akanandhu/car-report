import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CarEvaluationFormDataI } from "../CarEvaluationForm/types";
import { TestDriveFormData, testDriveSchema } from "./types";

const getDefaultValues = (data: CarEvaluationFormDataI): TestDriveFormData => ({
  steeringSystem: data.steeringSystem ?? "",
  steeringWheel: data.steeringWheel ?? [],
  steeringAdjustment: data.steeringAdjustment ?? "",
  steeringMountedAudioControl: data.steeringMountedAudioControl ?? "",
  cruiseControl: data.cruiseControl ?? [],
  seatAdjustment: data.seatAdjustment ?? [],
  suspensionSystem: data.suspensionSystem ?? [],
  brakes: data.brakes ?? [],
  clutchSystem: data.clutchSystem ?? [],
  transmissionAutomatic: data.transmissionAutomatic ?? [],
  vehicleHorn: data.vehicleHorn ?? [],
});

const useTestDriveForm = ({ data }: { data: CarEvaluationFormDataI }) => {
  const {
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TestDriveFormData>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: getDefaultValues(data),
  });

  useEffect(() => {
    reset(getDefaultValues(data));
  }, [data, reset]);

  return {
    control,
    errors,
    setValue,
    watch,
  };
};

export default useTestDriveForm;
