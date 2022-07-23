import { BigNumberish } from "ethers";
import { Attester } from "../attester";
import { Badge } from "./badge";
import { BadgeAPIType } from "./badge.api.types";

export function serialzeBadgeApiType(
  badge: Badge,
  claimId: BigNumberish,
  attester: Attester
): BadgeAPIType {
  badge.computeCollectionId(
    claimId,
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
