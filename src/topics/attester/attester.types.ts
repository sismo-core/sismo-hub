import { BigNumberish } from "ethers";

/**
 * An object that contains the network configuration for an attester.
 */
export type AttesterNetworkConfiguration = {
  address: string;
  firstCollectionId: BigNumberish;
};

export enum AttesterNetwork {
  Rinkeby = "rinkeby",
  Kovan = "kovan",
  Polygon = "polygon",
  Mainnet = "mainnet",
}
