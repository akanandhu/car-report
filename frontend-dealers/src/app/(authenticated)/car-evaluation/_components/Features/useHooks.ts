import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CarEvaluationFormDataI } from "../CarEvaluationForm/types";
import { FeaturesFormData, featuresSchema } from "./types";

const getDefaultValues = (data: CarEvaluationFormDataI): FeaturesFormData => ({
  keylessEntry: data.keylessEntry ?? [],
  stereoImage: data.stereoImage ?? [],
  stereoBrand: data.stereoBrand ?? "",
  rearParkingSensor: data.rearParkingSensor ?? "",
  sunroof: data.sunroof ?? [],
  gpsNavigation: data.gpsNavigation ?? "",
  alloyWheels: data.alloyWheels ?? [],
  fogLamps: data.fogLamps ?? "",
  airBag: data.airBag ?? [],
  seatBelt: data.seatBelt ?? "",
  absEbd: data.absEbd ?? [],
  gloveBox: data.gloveBox ?? [],
  interiorModifications: data.interiorModifications ?? "",
});

const useFeaturesForm = ({ data }: { data: CarEvaluationFormDataI }) => {
  const {
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FeaturesFormData>({
    resolver: zodResolver(featuresSchema),
    defaultValues: getDefaultValues(data),
  });

  useEffect(() => {
    reset(getDefaultValues(data));
  }, [data, reset]);

  const handleFile = (file: File) => {
    // Intentionally left blank for now.
  };

  return {
    errors,
    setValue,
    watch,
    handleFile,
  };
};

export default useFeaturesForm;
