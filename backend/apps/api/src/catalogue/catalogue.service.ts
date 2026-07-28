import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface MakeResultItem {
  id: number;
  display_name: string;
  is_procurable: boolean;
  is_usable: boolean;
  logo_url: string;
  tags: string[];
  logo_with_name: string;
}

export interface MakeListResponse {
  results: MakeResultItem[];
  is_success: boolean;
  status_code: number;
}

export interface MakeOption {
  label: string;
  value: string;
}

export type Category = {
  display_name: string;
  name: string;
};

export type MakeYear = {
  display_name: number | string;
  name: number;
  active: boolean;
};

export type Mileage = {
  display_name: string;
  name: number;
  active: boolean;
};

export type Owner = {
  display_name: string;
  name: number;
};

export type SellTime = {
  display_name: string;
  name: string;
  description: string;
};

export type Filters = {
  categories: Category[];
  make_year: MakeYear[];
  mileage: Mileage[];
  no_of_owners: Owner[];
  sell_time: SellTime[];
};

export interface ConfigResponse {
  status: string;
  message: string;
  data: {
    filters: Filters;
    is_success: boolean;
    status_code: number;
  };
}

type CatalogueItemI = {
  id: number;
  display_name: string;
};

type VariantItemI = CatalogueItemI & {
  fuel_type: string;
  transmission_type: string;
};

type ListResponseI<T> = {
  results?: T[];
};

type ConfigItemI = {
  active?: boolean;
  display_name: string | number;
  name: string | number;
};

type ConfigFiltersI = {
  make_year?: ConfigItemI[];
  mileage?: ConfigItemI[];
  no_of_owners?: ConfigItemI[];
  sell_time?: ConfigItemI[];
};

type ConfigResponseI = ConfigFiltersI & {
  filters?: ConfigFiltersI;
  data?: {
    filters?: ConfigFiltersI;
  };
};

@Injectable()
export class CatalogueService {
  private readonly SPINNY_BASE_URL = 'https://api.spinny.com/v3/api/catalogue';
  private readonly SPINNY_CONFIG_URL = 'https://api.spinny.com/api/c/configs';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetch vehicle makes from external Spinny API
   */
  async getMakes(): Promise<{
    options: MakeOption[];
  }> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<MakeListResponse>(
          `${this.SPINNY_BASE_URL}/make-list`,
        ),
      );

      const results = response.data.results || [];

      const options: MakeOption[] = results.map((make) => ({
        label: make.display_name,
        value: String(make.id),
      }));

      return { options };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      throw new HttpException(
        'Failed to fetch vehicle makes from external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * Fetch vehicle models from external Spinny API
   */
  async getModels(
    make_id: string,
    make_year: string,
  ): Promise<{ options: MakeOption[] }> {
    try {
      const url = `${this.SPINNY_BASE_URL}/model-list`;
      const response = await this.httpService.axiosRef.get<
        ListResponseI<CatalogueItemI>
      >(url, {
        params: {
          make_id,
          make_year,
          city_name: 'chennai',
          remove_from_other: true,
          page_size: 100,
          page: 1,
          fields: 'id,name,display_name,is_usable',
          is_public: true,
        },
      });

      const results = response.data?.results || [];
      const options: MakeOption[] = results.map((model) => ({
        label: model.display_name,
        value: String(model.id),
      }));

      return { options };
    } catch {
      throw new HttpException(
        'Failed to fetch vehicle models from external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * Fetch vehicle variants from external Spinny API
   */
  async getVariants(
    model_id: string,
    make_year: string,
  ): Promise<{ options: MakeOption[] }> {
    try {
      const url = `${this.SPINNY_BASE_URL}/variant-list`;
      const response = await this.httpService.axiosRef.get<
        ListResponseI<VariantItemI>
      >(url, {
        params: {
          model: model_id,
          make_year,
          procurement_category: 'assured,budget',
          city_name: 'chennai',
          page_size: 100,
          page: 1,
          is_public: true,
          sell_page_filter: true,
        },
      });

      const results = response.data?.results || [];
      const options: MakeOption[] = results.map((variant) => ({
        label: variant.display_name,
        value: String(variant.id),
      }));

      return { options };
    } catch {
      throw new HttpException(
        'Failed to fetch vehicle variants from external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * Fetch full vehicle variant data from external Spinny API
   * Returns id, display_name, fuel_type, transmission_type for each variant
   */
  async getVariantsFull(
    model_id: string,
    make_year: string,
  ): Promise<{
    variants: {
      id: number;
      display_name: string;
      fuel_type: string;
      transmission_type: string;
    }[];
  }> {
    try {
      const url = `${this.SPINNY_BASE_URL}/variant-list`;
      const response = await this.httpService.axiosRef.get<
        ListResponseI<VariantItemI>
      >(url, {
        params: {
          model: model_id,
          make_year,
          procurement_category: 'assured,budget',
          city_name: 'chennai',
          page_size: 100,
          page: 1,
          is_public: true,
          sell_page_filter: true,
        },
      });

      const results = response.data?.results || [];
      const variants = results.map((variant) => ({
        id: variant.id,
        display_name: variant.display_name,
        fuel_type: variant.fuel_type,
        transmission_type: variant.transmission_type,
      }));

      return { variants };
    } catch {
      throw new HttpException(
        'Failed to fetch vehicle variants from external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getConfig(city_name: string): Promise<ConfigResponseI> {
    try {
      const url = `${this.SPINNY_CONFIG_URL}/?city_name=${city_name}&v2`;
      console.log('Fetching:', url);
      const response =
        await this.httpService.axiosRef.get<ConfigResponseI>(url);
      const result = response.data;
      return result;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch configs from external API ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getConfigFull(city_name: string): Promise<{
    make_year: MakeOption[];
    mileage: MakeOption[];
    no_of_owners: MakeOption[];
    sell_time: MakeOption[];
  }> {
    const config = await this.getConfig(city_name);
    const filters = config.filters ?? config.data?.filters ?? config;

    const mapField = (items: ConfigItemI[] = []): MakeOption[] =>
      items
        .filter((item) => item.active !== false)
        .map((item) => ({
          label: String(item.display_name),
          value: String(item.name),
        }));

    return {
      make_year: mapField(filters.make_year),
      mileage: mapField(filters.mileage),
      no_of_owners: mapField(filters.no_of_owners),
      sell_time: mapField(filters.sell_time),
    };
  }
}
