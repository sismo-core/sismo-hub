import { BigNumber, BigNumberish, ethers } from "ethers";

/**
 * @description The BadgeConstructor type used to construct a badge.
 */
export type BadgeConstructor = {
  name: string;
  description: string;
  image: string;
  requirements: string[];
};

/**
 * @description The representation of a Badge for a specific AttestationsCollection that belongs to a specific Attester.
 */
export class Badge {
  public name: string;
  public description: string;
  public image: string;
  public requirements: string[];
  public collectionId: string;

  public constructor(badgeConstructor: BadgeConstructor) {
    this.name = badgeConstructor.name;
    this.description = badgeConstructor.description;
    this.image = badgeConstructor.image;
  }

  /**
   * Use this method to compute the collection id of the Badge.
   * @param internalCollectionId The internal id of the collection
   * @param attesterFirstCollectionId The first collection id of the attester
   */
  public computeCollectionId(
    internalCollectionId: BigNumberish,
    attesterFirstCollectionId: BigNumberish
  ): void {
    const collectionId = BigNumber.from(internalCollectionId).add(
      attesterFirstCollectionId
    );
    this.collectionId = ethers.utils
      .hexZeroPad(collectionId.toHexString(), 32)
      .slice(2);
  }
}
