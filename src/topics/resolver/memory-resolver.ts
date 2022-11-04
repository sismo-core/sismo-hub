import { IResolver } from "./resolver";
import { resolveAccount } from "./utils";

type MemoryMapping = {
  [name: string]: string;
};

export const memoryMapping: MemoryMapping = {
  sismo: "1",
};

export class MemoryResolver implements IResolver {
  public resolve = async (rawData: string): Promise<string> => {
    const resolvedAccount = resolveAccount(
      "5151",
      memoryMapping[rawData.slice(5)]
    );

    return resolvedAccount;
  };
}
