import { AttestationsCollection } from "../attestations-collection/attestations-collection";
import { ConstructedAttestationsCollection } from "../attestations-collection/types";
import {
  AttesterNetwork,
  AttesterNetworkConfiguration,
  ConstructedAttester,
} from "./types";

export type AttesterConstructor = {
  name: string;
  attestationsCollections: AttestationsCollection[];
  configurations: { [key: string]: AttesterNetworkConfiguration };
  defaultCurrentTargetNetwork: AttesterNetwork;
};

export class Attester {
  public name: string;
  public attestationsCollections: AttestationsCollection[];
  public availableNetworkConfigurations: {
    [key: string]: AttesterNetworkConfiguration;
  };
  public currentTargetNetwork: AttesterNetwork;

  constructor({
    name,
    attestationsCollections,
    configurations,
    defaultCurrentTargetNetwork,
  }: AttesterConstructor) {
    this.name = name;
    this.attestationsCollections = attestationsCollections;
    this.availableNetworkConfigurations = configurations;
    this.currentTargetNetwork = defaultCurrentTargetNetwork;
  }

  getForNetwork(network: AttesterNetwork): Attester {
    this.currentTargetNetwork = network;

    return this;
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
      name: this.name,
      configuration:
        this.availableNetworkConfigurations[this.currentTargetNetwork],
      attestationsCollections: computedAttestationCollections,
    };
  }
}
