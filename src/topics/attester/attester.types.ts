import { BigNumberish } from "ethers";

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
