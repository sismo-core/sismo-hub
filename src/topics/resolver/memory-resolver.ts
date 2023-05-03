import { IResolver } from "./resolver";
import { resolveAccount } from "./utils";

type MemoryMapping = {
  [name: string]: string;
};

export const memoryMapping: MemoryMapping = {
  sismo: "1",
  incorrect: "undefined",
};

export class MemoryResolver implements IResolver {
  public resolve = async (rawDataArray: string[]): Promise<string[]> => {
    const rawData = rawDataArray[0];
    const res = memoryMapping[rawData.split(":")[1]];
    if (res === "undefined") {
      return ["undefined"];
    }

    const resolvedAccount = resolveAccount("5151", res);

    return [resolvedAccount];
  };
}
