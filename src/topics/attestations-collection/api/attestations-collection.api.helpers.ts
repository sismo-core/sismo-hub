import { BigNumberish } from "ethers";
import { Attester } from "../../attester";
import { serializeBadgeApiType } from "../../badge/api/badge.api.helpers";
import { AttestationsCollection } from "../attestations-collection";
import { AttestationsCollectionAPIType } from "./attestations-collection.api.types";

/**
 * Use this method to serialize an AttestationsCollection object to an AttestationsCollectionAPIType object for the end user.
 * @param attestationsCollection The AttestationsCollection object to serialize.
 * @param internalCollectionId The internalCollectionId of the attester to which the attestations collection belongs.
 * @param attester The attester to which the attestations collection belongs.
 * @returns The representation of the AttestationsCollection for the end user.
 */
export function serializeAttestationsCollectionApiType(
  attestationsCollection: AttestationsCollection,
  internalCollectionId: BigNumberish,
  attester: Attester
): AttestationsCollectionAPIType {
  return {
    badge: serializeBadgeApiType(
      attestationsCollection.badge,
      internalCollectionId,
      attester
    ),
  };
}
