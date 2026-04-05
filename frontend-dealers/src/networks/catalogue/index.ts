import { apiClient } from "../client";
import {
  MakesResponse,
  CatalogueOption,
  VariantFullItem,
  ConfigFullData,
} from "./types";

/**
 * Fetch vehicle makes from the backend catalogue endpoint.
 * Returns options formatted for Select components: { label, value }[]
 */
export const fetchVehicleMakes = async (): Promise<CatalogueOption[]> => {
  const res = await apiClient<MakesResponse>("catalogue/makes");
  return res.data.options ?? [];
};

/**
 * Generic fetcher for catalogue endpoints.
 * Can be used by DynamicFormSection to fetch options for any endpoint.
 */
export const fetchCatalogueOptions = async (
  endpoint: string,
): Promise<CatalogueOption[]> => {
  const res = await apiClient<{
    data: { options: CatalogueOption[] };
  }>(endpoint);
  return res.data.options ?? [];
};

/**
 * Fetch full variant data (with fuel_type & transmission_type).
 * Called once when user selects a model.
 */
export const fetchVariantsFull = async (
  modelId: string,
  makeYear: string,
): Promise<VariantFullItem[]> => {
  const res = await apiClient<{
    data: { variants: VariantFullItem[] };
  }>("catalogue/variants-full", {
    params: { model_id: modelId, make_year: makeYear },
  });
  return res.data.variants ?? [];
};

/**
 * Fetch full config data in a single call.
 * Returns make_year, mileage, no_of_owners, sell_time option arrays.
 */
export const fetchConfigFull = async (
  cityName: string = "chennai",
): Promise<ConfigFullData> => {
  const res = await apiClient<{
    data: ConfigFullData;
  }>(`catalogue/configs-full/${cityName}`);
  return res.data;
};
