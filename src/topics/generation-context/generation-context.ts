import { ethers } from "ethers";
import { logger } from "../../helpers/utils/logger";
import {
  GenerationContext,
  GenerationContextConstructor,
} from "./generation-context.types";

export const createContext = async ({
  blockNumber,
  timestamp,
}: GenerationContextConstructor): Promise<GenerationContext> => {
  if (!blockNumber) {
    blockNumber = process.env.BLOCK_NUMBER
      ? parseInt(process.env.BLOCK_NUMBER)
      : await ethers.getDefaultProvider().getBlockNumber();
  }

  if (!timestamp) {
    timestamp = process.env.GENERATION_TIMESTAMP
      ? parseInt(process.env.GENERATION_TIMESTAMP)
      : Math.floor(Date.now() / 1000);
  }

  const generationContext: GenerationContext = {
    blockNumber,
    timestamp: timestamp * 1000,
  };
  logger("====================== GENERATION CONTEXT ========================");
  logger(generationContext);
  logger("==================================================================");
  return generationContext;
};
