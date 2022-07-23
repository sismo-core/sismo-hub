import { AttestationsCollection } from "../attestations-collection/attestations-collection";
import {
  AttesterNetwork,
  AttesterNetworkConfiguration,
} from "./attester.types";

export type AttesterConstructor = {
  name: string;
  attestationsCollections: AttestationsCollection[];
  configurations: { [key: string]: AttesterNetworkConfiguration };
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
  }: AttesterConstructor) {
    this.name = name;
    this.attestationsCollections = attestationsCollections;
    this.availableNetworkConfigurations = configurations;
  }

  switchNetwork(network: AttesterNetwork): Attester {
    this.currentTargetNetwork = network;

    return this;
  }

  hasNetworkConfiguration(networkConfiguration: AttesterNetwork) {
    return (
      this.availableNetworkConfigurations[networkConfiguration] !== undefined
    );
  }

  get currentNetworkConfiguration() {
    if (this.currentTargetNetwork === undefined) {
      throw new Error("No network selected");
    }

    return this.availableNetworkConfigurations[this.currentTargetNetwork];
  }
}
