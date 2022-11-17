import { dataProvidersFactorySchemas } from "@group-generators/helpers/data-providers";

export type DataProvider = {
  name: string;
  iconUrl: string;
  providerClassName: string;
  functions: {
    name: string;
    functionName: string;
    description: string;
    args: {
      name: string;
      type: string;
      example: string;
      description: string;
    }[];
  }[];
};

export class DataProviderService {
  dataProviders: DataProvider[];

  constructor(dataProviders: DataProvider[]) {
    this.dataProviders = dataProviders;
  }

  public getDataProviders(): DataProvider[] {
    return dataProvidersFactorySchemas;
  }
}
