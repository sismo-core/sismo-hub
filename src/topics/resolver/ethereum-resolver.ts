import { IResolver } from "./resolver";
import { FetchedData } from "topics/group";

export class EthereumResolver implements IResolver {
  public resolve = async (rawDataArray: FetchedData): Promise<FetchedData> => {
    return rawDataArray;
  };
}
