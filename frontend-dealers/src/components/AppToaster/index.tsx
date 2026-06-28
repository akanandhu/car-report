'use client';
import { Capacitor } from "@capacitor/core";
import { Toaster } from "react-hot-toast";

const AppToaster = () => {
  const platform = Capacitor.getPlatform();
  const isWeb = platform === "web";
  return <Toaster position={isWeb ? "top-right" : "bottom-center"} />;
};

export default AppToaster;
