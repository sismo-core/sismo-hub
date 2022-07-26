import { AttestationsCollectionAPIType } from "../../attestations-collection/api";
import { AttesterNetworkConfiguration } from "../attester.types";

/**
 * @description An object that represents the Attester Object for the end user using the api.
 */
export type AttesterAPIType = {
  name: string;
  configuration: AttesterNetworkConfiguration;
  attestationsCollections: AttestationsCollectionAPIType[];
};

/**
 * @description An object that represents a set of Attesters for the end user using the api.
 * The key is the attester name.
 */
export type NetworkAttestersAPIType = {
  [key: string]: AttesterAPIType;
};

/**
 * @description An object that represents a set of Networks and their Attesters for the end user using the api.
 * The key is the network name.
 */
export type NetworksAttestersAPIType = {
  [key: string]: NetworkAttestersAPIType;
};
