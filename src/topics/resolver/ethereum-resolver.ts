import { IResolver } from "./resolver";
import { AccountSource, FetchedData } from "topics/group";

export class EthereumResolver implements IResolver {
  public resolve = async (
    rawDataArray: FetchedData
  ): Promise<{
    accountSources: string[];
    resolvedAccountsRaw: FetchedData;
    resolvedAccounts: FetchedData;
  }> => {
    return {
      accountSources: [AccountSource.ETHEREUM],
      resolvedAccountsRaw: rawDataArray,
      resolvedAccounts: rawDataArray,
    };
  };
}
