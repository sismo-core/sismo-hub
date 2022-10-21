import { IResolver } from "./resolver";

export class EthereumResolver implements IResolver {
  public resolve = async (rawData: string): Promise<string> => {
    return rawData;
  };
}
