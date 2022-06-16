import { ethers } from "ethers";
import { logger } from "./logger";

export type GenerationContext = {
  blockNumber: number;
  timestamp: number;
};

export const createContext = async (): Promise<GenerationContext> => {
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
  return generationContext;
};
