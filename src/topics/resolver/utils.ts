import { utils } from "ethers";

export function resolveAccount(encoding: string, id: string) {
  return `0x${encoding}${utils.hexZeroPad(`0x${id}`, 20).slice(6)}`;
}
