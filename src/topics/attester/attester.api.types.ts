import { AttestationsCollectionAPIType } from "../attestations-collection/attestations-collection.api.types";
import { AttesterNetworkConfiguration } from "./attester.types";

export type AttesterAPIType = {
  name: string;
  configuration: AttesterNetworkConfiguration;
  attestationsCollections: AttestationsCollectionAPIType[];
};

export type NetworkAttestersAPIType = {
  [key: string]: AttesterAPIType;
};

export type NetworksAttestersAPIType = {
  [key: string]: NetworkAttestersAPIType;
};
