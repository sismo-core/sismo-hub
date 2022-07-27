import { inject, injectable } from "tsyringe";
import { AttestationsCollection } from "../attestations-collection";
import { GroupStore } from "../group";
import {
  AttesterNetwork,
  AttesterNetworkConfiguration,
} from "./attester.types";

/**
 * @description The representation of an Attester.
 */
@injectable()
export class Attester {
  public name: string;
  public attestationsCollections: AttestationsCollection[];
  public networkConfigurations: {
    [key: string]: AttesterNetworkConfiguration;
  };
  protected currentTargetNetwork: AttesterNetwork;

  constructor(@inject("GroupStore") protected groupStore: GroupStore) {}

  /**
   * Use this method to switch the currentTargetNetwork of the Attester.
   * @param network The network to switch to.
   * @returns The current attester
   */
  switchNetwork(network: AttesterNetwork): Attester {
    this.currentTargetNetwork = network;

    return this;
  }

  /**
   * Use this method to verify if a network configuration is present.
   * @param networkConfiguration The network configuration to check.
   * @returns
   */
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
