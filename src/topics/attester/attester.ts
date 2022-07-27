import { BigNumberish } from "ethers";
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
  public firstCollectionId: BigNumberish;
  public networkConfigurations: {
    [key: string]: AttesterNetworkConfiguration;
  };

  constructor(@inject("GroupStore") protected groupStore: GroupStore) {}

  hasNetworkConfiguration(networkConfiguration: AttesterNetwork) {
    return this.networkConfigurations[networkConfiguration] !== undefined;
  }
}
