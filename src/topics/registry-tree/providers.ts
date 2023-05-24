import { ethers } from "ethers";
import { Network, networkRpcUrls } from "./networks";

export const getProvider = (network: Network): ethers.providers.Provider => {
  if (network === Network.Goerli || network === Network.Mainnet) {
    return new ethers.providers.AlchemyProvider(
      network === Network.Mainnet ? "homestead" : Network.Goerli,
      process.env.ALCHEMY_API_KEY
    );
  }
  return new ethers.providers.JsonRpcProvider(networkRpcUrls[network]);
};
