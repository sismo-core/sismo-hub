import { inject, injectable } from "tsyringe";
import { AttestationsCollection } from "../attestations-collection";
import { GroupStore } from "../group";
import {
  AttesterNetwork,
  AttesterNetworkConfiguration,
} from "./attester.types";

@injectable()
export class Attester {
  public name: string;
  public attestationsCollections: AttestationsCollection[];
  public networkConfigurations: {
    [key: string]: AttesterNetworkConfiguration;
  };
  protected currentTargetNetwork: AttesterNetwork;

  constructor(@inject("GroupStore") protected groupStore: GroupStore) {}

  switchNetwork(network: AttesterNetwork): Attester {
    this.currentTargetNetwork = network;

    return this;
  }

  hasNetworkConfiguration(networkConfiguration: AttesterNetwork) {
    return this.networkConfigurations[networkConfiguration] !== undefined;
  }

  get currentNetworkConfiguration() {
    if (this.currentTargetNetwork === undefined) {
      throw new Error("No network selected");
    }

    return this.networkConfigurations[this.currentTargetNetwork];
  }
}
