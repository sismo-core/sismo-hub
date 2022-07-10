import { BigNumberish } from "ethers";
import { AttestationsCollection } from "../attestations-collection/attestations-collection";

export type AttesterConstructor = {
  attestationsCollections: AttestationsCollection[];
  collectionIdFirst: BigNumberish;
};

export class Attester {
  public attestationsCollections: AttestationsCollection[];
  public collectionIdFirst: BigNumberish;

  constructor({
    attestationsCollections,
    collectionIdFirst,
  }: AttesterConstructor) {
    this.attestationsCollections = attestationsCollections;
    this.collectionIdFirst = collectionIdFirst;
  }
}
