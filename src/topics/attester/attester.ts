import { BigNumberish } from "ethers";
import { AttestationsCollection } from "../attestations-collection/attestations-collection";
import { ConstructedAttestationsCollection } from "../attestations-collection/types";
import { AttesterChain, ConstructedAttester } from "./types";

export type AttesterConstructor = {
  attestationsCollections: AttestationsCollection[];
  chain: AttesterChain;
  contractAddress: string;
  collectionIdFirst: BigNumberish;
};

export class Attester {
  public attestationsCollections: AttestationsCollection[];
  public chain: AttesterChain;
  public contractAddress: string;
  public collectionIdFirst: BigNumberish;

  constructor({
    attestationsCollections,
    chain,
    contractAddress,
    collectionIdFirst,
  }: AttesterConstructor) {
    this.attestationsCollections = attestationsCollections;
    this.chain = chain;
    this.contractAddress = contractAddress;
    this.collectionIdFirst = collectionIdFirst;
  }

  compute(): ConstructedAttester {
    const computedAttestationCollections: ConstructedAttestationsCollection[] =
      [];

    for (const attestationCollectionIndex in this.attestationsCollections) {
      computedAttestationCollections.push(
        this.attestationsCollections[attestationCollectionIndex].compute(
          attestationCollectionIndex,
          this
        )
      );
    }

    return {
      address: this.contractAddress,
      chain: this.chain,
      firstCollectionId: this.collectionIdFirst,
      attestationsCollections: computedAttestationCollections,
    };
  }
}
