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
  public resolve = async (rawDataArray: FetchedData): Promise<FetchedData> => {
    const rawData = Object.keys(rawDataArray)[0];
    const res = memoryMapping[rawData.split(":")[1]];
    if (res === "undefined") {
      return { undefined: 1 };
    }

    const resolvedAccount = resolveAccount("5151", res);

    return { [resolvedAccount]: Object.values(rawDataArray)[0] };
  };
}
