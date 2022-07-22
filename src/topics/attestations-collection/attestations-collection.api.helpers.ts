import { BigNumberish } from "ethers";
import { Attester } from "../attester";
import { serialzeBadgeApiType } from "../badge/badge.api.helpers";
import { AttestationsCollection } from "./attestations-collection";
import { AttestationsCollectionAPIType } from "./attestations-collection.api.types";

export function serializeAttestationsCollectionApiType(
  attestationsCollection: AttestationsCollection,
  claimId: BigNumberish,
  attester: Attester
): AttestationsCollectionAPIType {
  return {
    badge: serialzeBadgeApiType(
      attestationsCollection.badge,
      claimId,
      attester
    ),
  };
}
