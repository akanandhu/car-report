import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CarEvaluationFormDataI } from "../CarEvaluationForm/types";
import {
  InteriorElectricalFormData,
  interiorElectricalSchema,
} from "./types";

const getDefaultValues = (
  data: CarEvaluationFormDataI,
): InteriorElectricalFormData => ({
  interiorComments: data.interiorComments ?? "",
  clusterPanel: data.clusterPanel ?? [],
  clusterPanelWarningDetails: data.clusterPanelWarningDetails ?? "",
  dashboard: data.dashboard ?? [],
  frontSeat: data.frontSeat ?? [],
  rearSeat: data.rearSeat ?? [],
  roofLining: data.roofLining ?? [],
  insideRearViewMirror: data.insideRearViewMirror ?? [],
  pushButton: data.pushButton ?? "",
  dashboardSwitches: data.dashboardSwitches ?? "",
  powerWindowAndWindowLock: data.powerWindowAndWindowLock ?? [],
  handBrake: data.handBrake ?? [],
  carElectrical: data.carElectrical ?? [],
  secondKey: data.secondKey ?? "",
  platform: data.platform ?? [],
});

const useInteriorElectricalForm = ({
  data,
}: {
  data: CarEvaluationFormDataI;
}) => {
  const {
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<InteriorElectricalFormData>({
    resolver: zodResolver(interiorElectricalSchema),
    defaultValues: getDefaultValues(data),
  });

  useEffect(() => {
    reset(getDefaultValues(data));
  }, [data, reset]);

  const handleFile = (file: File) => {
    // You can add additional logic here to handle the file.
  };

  return {
    control,
    errors,
    handleFile,
    setValue,
    watch,
  };
};

export default useInteriorElectricalForm;
