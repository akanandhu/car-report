export interface MakeResultItem {
  id: number;
  display_name: string;
  is_procurable: boolean;
  is_usable: boolean;
  logo_url: string;
  tags: string[];
  logo_with_name: string;
}

export interface CatalogueOption {
  label: string;
  value: string;
}

export interface MakesResponse {
  data: {
    results: MakeResultItem[];
    options: CatalogueOption[];
  };
  message: string;
  statusCode: number;
}

export interface VariantFullItem {
  id: number;
  display_name: string;
  fuel_type: string;
  transmission_type: string;
}

export interface ConfigFullData {
  make_year: CatalogueOption[];
  mileage: CatalogueOption[];
  no_of_owners: CatalogueOption[];
  sell_time: CatalogueOption[];
}
