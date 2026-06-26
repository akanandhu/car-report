import type { CapacitorConfig } from "@capacitor/cli";

const target = process.env.CAP_TARGET;
const devServerUrl =
  target === "android-dev"
    ? process.env.CAP_SERVER_URL_ANDROID
    : target === "ios-dev"
      ? process.env.CAP_SERVER_URL_IOS
      : undefined;

const config: CapacitorConfig = {
  appId: "com.carreport.dealers",
  appName: "Car Report Dealers",
  webDir: "out",
  ...(devServerUrl && {
    server: {
      url: devServerUrl,
      androidScheme: "http",
      cleartext: true,
    },
  }),
};

export default config;
