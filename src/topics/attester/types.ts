import { BigNumberish } from "ethers";
import { ConstructedAttestationsCollection } from "../attestations-collection/types";
import { Attester } from "./attester";

export type ConstructAttesterFn = () => Promise<Attester>;

export type ConstructedAttester = {
  name: string;
  configuration: AttesterNetworkConfiguration;
  attestationsCollections: ConstructedAttestationsCollection[];
};

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
