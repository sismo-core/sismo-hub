import { BigNumberish } from "ethers";
import { ConstructedAttestationsCollection } from "../attestations-collection/types";
import { Attester } from "./attester";

export type ConstructAttesterFn = () => Promise<Attester>;

export type ConstructedAttester = {
  chain: AttesterChain;
  address: string;
  firstCollectionId: BigNumberish;
  attestationsCollections: ConstructedAttestationsCollection[];
};

export enum AttesterChain {
  Rinkeby = "rinkeby",
  Kovan = "kovan",
  Polygon = "polygon",
  Mainnet = "mainnet",
}
