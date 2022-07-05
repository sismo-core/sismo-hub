import { ethers } from "ethers";
import { logger } from "./logger";

export type GenerationContext = {
  blockNumber: number;
  timestamp: number;
};

let globalGenerationContext: GenerationContext;

export const createContext = async (): Promise<GenerationContext> => {
  if (globalGenerationContext) {
    return globalGenerationContext;
  }
  const blockNumber = process.env.BLOCK_NUMBER
    ? parseInt(process.env.BLOCK_NUMBER)
    : await ethers.getDefaultProvider().getBlockNumber();

  const timestamp = process.env.GENERATION_TIMESTAMP
    ? parseInt(process.env.GENERATION_TIMESTAMP)
    : Math.floor(Date.now() / 1000);

  const generationContext: GenerationContext = {
    blockNumber,
    timestamp: timestamp * 1000,
  };
  logger("====================== GENERATION CONTEXT ========================");
  logger(generationContext);
  logger("==================================================================");
  globalGenerationContext = generationContext;
  return generationContext;
};
