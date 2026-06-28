import { buildApiUrl } from "../client";

const formatReportDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const sanitizeFileName = (value: string) => {
  const sanitized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return sanitized || "vehicle-report";
};

const getReportFileName = (name: string) => {
  const generatedDate = formatReportDate(new Date());
  return `${sanitizeFileName(name)}-report-${generatedDate}.pdf`;
};

const getErrorMessage = async (response: Response) => {
  try {
    const error = await response.json();
    return error?.message || "Unable to generate report.";
  } catch {
    return response.statusText || "Unable to generate report.";
  }
};

export const downloadVehicleReport = async (vehicleId: string, name: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const response = await fetch(buildApiUrl(`vehicles/${vehicleId}/report.pdf`), {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = getReportFileName(name);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
