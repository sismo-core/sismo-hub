import { GenerationContext } from "../../../src/helpers/utils/generation-context";

export const mockContext = (
  {
    timestamp,
  }: {
    timestamp: number;
  } = { timestamp: 1654344050 * 1000 }
): GenerationContext => {
  return {
    blockNumber: 123456789,
    timestamp,
  };
};
