import { serializeAttestationsCollectionApiType } from "../../attestations-collection/api/attestations-collection.api.helpers";
import { Attester } from "../attester";
import { NetworkAttesters, NetworksAttesters } from "../attester.helper.types";
import {
  AttesterAPIType,
  NetworkAttestersAPIType,
  NetworksAttestersAPIType,
} from "./attester.api.types";

/**
 * Use this method to serialize an Attester object into an AttesterAPIType object.
 * @param attester The attester instance to serialize
 * @returns The serialized Api Type of an Attester
 */
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

/**
 * Use this method to serialize a set of Attester objects into an array of AttesterAPIType objects.
 * @param networkAttesters The attesters of a specific network to serialize
 * @returns The serialized Api Type of a NetworkAttesters that contains all the attesters of a specific network
 */
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

/**
 * Use this method to serialize a set of Networks that contains a set of Attester objects into an array of NetworksAttestersAPIType objects.
 * @param networksAttesters The attesters of multiple networks to serialize
 * @returns The serialized Api Type of a NetworksAttesters that contains all the attesters of multiple networks
 */
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
