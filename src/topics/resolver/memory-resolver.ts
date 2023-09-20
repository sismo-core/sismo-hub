import { BigNumber } from "ethers";
import { IResolver } from "./resolver";
import { resolveAccount } from "./utils";
import { AccountSource, FetchedData } from "topics/group";

type MemoryMapping = {
  [name: string]: string;
};

export const memoryMapping: MemoryMapping = {
  sismo: "1",
  incorrect: "undefined",
};

export class MemoryResolver implements IResolver {
  public resolve = async (
    rawData: FetchedData
  ): Promise<{
    accountSources: string[];
    resolvedAccountsRaw: FetchedData;
    resolvedAccounts: FetchedData;
  }> => {
    const updatedAccounts: FetchedData = {};
    const resolvedAccounts: FetchedData = {};

    Object.keys(rawData).forEach((account) => {
      const splitLength = account.split(":").length;
      let res;
      if (splitLength === 3) {
        res = account.split(":")[2];
      }
      res = memoryMapping[account.split(":")[1]];
      if (res !== "undefined") {
        const resolvedAccount = resolveAccount("5151", res);
        if (resolvedAccounts[resolvedAccount]) {
          // take the bigger value
          if (
            BigNumber.from(resolvedAccounts[resolvedAccount]).lt(BigNumber.from(rawData[account]))
          ) {
            resolvedAccounts[resolvedAccount] = rawData[account];
            updatedAccounts[account] = rawData[account];
          }
        } else {
          resolvedAccounts[resolvedAccount] = rawData[account];
          updatedAccounts[account] = rawData[account];
        }
      }
    });

    return {
      accountSources: [AccountSource.TEST],
      resolvedAccountsRaw: updatedAccounts,
      resolvedAccounts,
    };
  };
}
