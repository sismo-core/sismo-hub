import { IResolver } from "./resolver";

export class EthereumResolver implements IResolver {
  public resolve = async (rawDataArray: string[]): Promise<string[]> => {
    return [rawDataArray[0]];
  };
}
