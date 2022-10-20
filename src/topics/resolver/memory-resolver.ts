import { utils } from "ethers";
import { IResolver } from "./resolver";

type MemoryMapping = {
  [name: string]: string;
};

export const memoryMapping: MemoryMapping = {
  sismo: "1",
};

export class MemoryResolver implements IResolver {
  public resolve = async (rawData: string): Promise<string> => {
    const resolvedAccount = `0x5151110${utils
      .hexZeroPad(`0x${memoryMapping[rawData.slice(5)]}`, 20)
      .slice(9)}`;

    return resolvedAccount;
  };
}
