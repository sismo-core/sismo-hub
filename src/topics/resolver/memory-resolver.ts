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
  public resolve = async (
    rawData: FetchedData
  ): Promise<[FetchedData, FetchedData]> => {
    const resolvedAccounts: FetchedData = {};
    const updatedAccounts = rawData;

    Object.keys(rawData).forEach((account) => {
      const res = memoryMapping[account.split(":")[1]];
      if (res !== "undefined") {
        resolvedAccounts[resolveAccount("5151", res)] = rawData[account];
      } else {
        delete updatedAccounts[account];
      }
    });

    return [updatedAccounts, resolvedAccounts];
  };
}
