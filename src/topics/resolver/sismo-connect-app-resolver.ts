/* istanbul ignore file */
import { IResolver } from "./resolver";
import { FetchedData } from "topics/group";

export class SismoConnectAppResolver implements IResolver {
  public resolve = async (
    accounts: FetchedData
  ): Promise<{
    accountSources: string[];
    resolvedAccountsRaw: FetchedData;
    resolvedAccounts: FetchedData;
  }> => {
    const resolvedAccountsRaw: FetchedData = accounts;
    const resolvedAccounts: FetchedData = {};
    const accountSources: string[] = [];

    for (const identifier of Object.keys(accounts)) {
      const vaultId = identifier.split(":")[1];
      const accountSource = identifier.split(":")[0];
      if (!accountSources.find((el) => el === accountSource)) {
        accountSources.push(accountSource);
      }
      resolvedAccounts[vaultId] = accounts[identifier];
    }

    return {
      accountSources,
      resolvedAccountsRaw,
      resolvedAccounts,
    };
  };
}
