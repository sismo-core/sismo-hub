import { BigNumberish } from "ethers";
import { Attester } from "../attester";
import { Badge } from "../badge/badge";
import { Group } from "../group";
import { ConstructedAttestationsCollection } from "./types";

export type AttestationsCollectionsType = {
  groups: Group[];
  badge: Badge;
};

export class AttestationsCollection {
  public groups: Group[];
  public badge: Badge;

  constructor({ groups, badge }: AttestationsCollectionsType) {
    this.groups = groups;
    this.badge = badge;
  }

  compute(
    claimId: BigNumberish,
    attester: Attester
  ): ConstructedAttestationsCollection {
    return {
      badge: this.badge.compute(claimId, attester),
    };
  }
}
