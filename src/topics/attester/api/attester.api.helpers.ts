import { serializeAttestationsCollectionApiType } from "../../attestations-collection/api/attestations-collection.api.helpers";
import { Attester } from "../attester";
import { NetworkAttesters, NetworksAttesters } from "../attester.helper.types";
import {
  AttesterAPIType,
  NetworkAttestersAPIType,
  NetworksAttestersAPIType,
} from "./attester.api.types";

export function serializeAttesterApiType(attester: Attester): AttesterAPIType {
  return {
    name: attester?.name,
    configuration: attester?.currentNetworkConfiguration,
    attestationsCollections: attester?.attestationsCollections?.map(
      (attestationsCollection, index) =>
        serializeAttestationsCollectionApiType(
          attestationsCollection,
          index,
          attester
        )
    ),
  };
}

export function serializeNetworkAttestersApiType(
  networkAttesters: NetworkAttesters
): NetworkAttestersAPIType {
  return Object.keys(networkAttesters).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: serializeAttesterApiType(networkAttesters[curr]),
    }),
    {}
  );
}

export function serializeNetworksAttestersApiType(
  networksAttesters: NetworksAttesters
): NetworksAttestersAPIType {
  return Object.keys(networksAttesters).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: serializeNetworkAttestersApiType(networksAttesters[curr]),
    }),
    {}
  );
}
