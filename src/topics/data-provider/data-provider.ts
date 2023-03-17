export interface DataProviderInterface {
  name: string;
  iconUrl: string;
  providerClassName: string;
  functions: {
    name: string;
    functionName: string;
    countFunctionName: string;
    description: string;
    args: {
      name: string;
      argName: string;
      type: string;
      example: string;
      description: string;
    }[];
  }[];
}

export const supportedArgTypesInterfaces = [
  "string",
  "string[]",
  "number",
  "boolean",
  "JSON",
];

export type DataProvidersAPIEndpoints = {
  [providerName: string]: {
    [functionName: string]: (...args: any[]) => Promise<any>;
  };
};

export type DataProviders = {
  interfaces: () => DataProviderInterface[];
  apiEndpoints: DataProvidersAPIEndpoints;
};

export class DataProviderService {
  _dataProvider: DataProviders;

  constructor(dataProvider: DataProviders) {
    this._dataProvider = dataProvider;
  }

  public getDataProviderInterfaces(): DataProviderInterface[] {
    return this._dataProvider.interfaces();
  }

  public getDataProviderAPIEndpoints(): DataProvidersAPIEndpoints {
    return this._dataProvider.apiEndpoints;
  }
}
