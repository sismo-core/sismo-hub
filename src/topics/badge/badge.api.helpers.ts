import { BigNumberish } from "ethers";
import { Attester } from "../attester";
import { Badge } from "./badge";
import { BadgeAPIType } from "./badge.api.types";

export function serializeBadgeApiType(
  badge: Badge,
  internalCollectionId: BigNumberish,
  attester: Attester
): BadgeAPIType {
  badge.computeCollectionId(internalCollectionId, attester.firstCollectionId);

  return {
    collectionId: badge.collectionId,
    metadata: {
      name: badge.name,
      description: badge.description,
      attributes: badge.requirements,
      image: badge.image,
    },
  };
}
