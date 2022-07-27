import { AttestationsCollectionAPIType } from "../../attestations-collection/api";
import { AttesterNetworkConfiguration } from "../attester.types";

export type AttesterAPIType = {
  name: string;
  configuration: AttesterNetworkConfiguration;
  attestationsCollections: AttestationsCollectionAPIType[];
};

/**
 * The key is the attester name.
 */
export type NetworkAttestersAPIType = {
  [key: string]: AttesterAPIType;
};

/**
 * The key is the network name.
 */
export type NetworksAttestersAPIType = {
  [key: string]: NetworkAttestersAPIType;
};
