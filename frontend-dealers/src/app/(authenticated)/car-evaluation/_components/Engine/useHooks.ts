import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CarEvaluationFormDataI } from "../CarEvaluationForm/types";
import { EngineFormData, engineSchema } from "./types";



const getDefaultValues = (data: CarEvaluationFormDataI): EngineFormData => ({
  engineSound: data.engineSound ?? "",
  engineCondition: data.engineCondition ?? [],
  smoke: data.smoke ?? "",
  engineIdleStart: data.engineIdleStart ?? "",
  battery: data.battery ?? [],
  radiator: data.radiator ?? "",
  startingMotor: data.startingMotor ?? "",
  coolant: data.coolant ?? "",
  blowbyBackCompression: data.blowbyBackCompression ?? [],
  silencer: data.silencer ?? [],
  clutchOperations: data.clutchOperations ?? [],
  gearbox: data.gearbox ?? [],
  engineOil: data.engineOil ?? [],
  turboCharger: data.turboCharger ?? [],
  gearboxLeakage: data.gearboxLeakage ?? "",
  engineComments: data.engineComments ?? "",
  engineMount: data.engineMount ?? [],
  sump: data.sump ?? [],
  engineOtherDetails: data.engineOtherDetails ?? {},
});

const useEngineForm = ({
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
  } = useForm<EngineFormData>({
    resolver: zodResolver(engineSchema),
    defaultValues: getDefaultValues(data),
  });

  useEffect(() => {
    reset(getDefaultValues(data));
  }, [data, reset]);

  const handleFile = (file: File) => {
    // You can add additional logic here to handle the file, such as uploading it to a server or storing it in state
  };

  return {
    handleFile,
    control,
    errors,
    setValue,
    watch,
  };
};

export default useEngineForm;
