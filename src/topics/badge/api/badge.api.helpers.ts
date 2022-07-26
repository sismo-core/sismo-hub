import { BigNumberish } from "ethers";
import { Attester } from "../../attester";
import { Badge } from "../badge";
import { BadgeAPIType } from "./badge.api.types";

/**
 * Use this method to serialize a Badge object into an BadgeAPIType object for the end user.
 * @param badge The badge instance to serialize
 * @param internalCollectionId The internalCollectionId of the attestations collection to which the badge belongs
 * @param attester The attester to which the badge belongs
 * @returns The representation of the AttestationsCollection for the end user.
 */
export function serializeBadgeApiType(
  badge: Badge,
  internalCollectionId: BigNumberish,
  attester: Attester
): BadgeAPIType {
  badge.computeCollectionId(
    internalCollectionId,
    attester.currentNetworkConfiguration.firstCollectionId
  );

  return {
    collectionId: badge.collectionId,
    metadata: {
      name: badge.name,
      description: badge.description,
      requirements: badge.requirements,
      image: badge.image,
    },
  };
}
