export interface DataProviderInterface {
  name: string;
  iconUrl: string;
  providerClassName: string;
  functions: {
    name: string;
    functionName: string;
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

export class DataProviderInterfaceService {
  dataProviderInterfaces: DataProviderInterface[];

  constructor(dataProviderInterfaces: DataProviderInterface[]) {
    this.dataProviderInterfaces = dataProviderInterfaces;
  }

  public getdataProviderInterfaces(): DataProviderInterface[] {
    return this.dataProviderInterfaces;
  }
}
