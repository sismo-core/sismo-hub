import { IResolver } from "./resolver";
import { resolveAccount } from "./utils";
import { FetchedData } from "topics/group";

type MemoryMapping = {
  [name: string]: string;
};

export const memoryMapping: MemoryMapping = {
  sismo: "1",
  incorrect: "undefined",
};

export class MemoryResolver implements IResolver {
  resolvedAccounts: FetchedData = {};

  public resolve = async (rawData: FetchedData): Promise<FetchedData> => {
    Object.keys(rawData).forEach((account) => {
      const res = memoryMapping[account.split(":")[1]];
      if (res) {
        this.resolvedAccounts[resolveAccount("5151", res)] = rawData[account];
      }
    });

    return this.resolvedAccounts;
  };
}
