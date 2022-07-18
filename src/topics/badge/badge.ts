import { BigNumber, BigNumberish, ethers } from "ethers";
import { Attester } from "../attester";
import { ConstructedBadge } from "./types";

export type BadgeConstructor = {
  name?: string;
  description?: string;
  image?: string;
  requirements?: string[];
};

export class Badge {
  public name?: string;
  public description?: string;
  public image?: string;
  public requirements?: string[];
  public collectionId?: string;

  public constructor(badgeConstructor: BadgeConstructor) {
    this.name = badgeConstructor.name;
    this.description = badgeConstructor.description;
    this.image = badgeConstructor.image;
  }

  public computeCollectionId(claimId: BigNumberish, attester: Attester) {
    const collectionId = BigNumber.from(claimId).add(
      attester.availableNetworkConfigurations[attester.currentTargetNetwork]
        .firstCollectionId
    );
    this.collectionId = ethers.utils
      .hexZeroPad(collectionId.toHexString(), 32)
      .slice(2);
  }

  public compute(claimId: BigNumberish, attester: Attester): ConstructedBadge {
    this.computeCollectionId(claimId, attester);

    return {
      collectionId: this.collectionId ?? claimId,
      metadata: {
        name: this.name ?? "",
        description: this.description ?? "",
        image: this.image ?? "",
        requirements: this.requirements ?? [],
      },
    };
  }
}
