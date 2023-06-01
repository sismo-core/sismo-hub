import { ethers } from "ethers";
import { Network, networkRpcUrls } from "./networks";

export const getProvider = (network: Network): ethers.providers.Provider => {
  return new ethers.providers.JsonRpcProvider(networkRpcUrls[network]);
};
