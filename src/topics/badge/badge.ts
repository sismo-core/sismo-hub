import { BigNumber, BigNumberish, ethers } from "ethers";
import { Attester, Network } from "topics/attester";

export type BadgeMetadata = {
  name: string;
  description: string;
  image: string;
  attributes: { [attributeName: string]: string };
  requirements: string[];
};

export type Badge = BadgeMetadata & {
  collectionId: string;
  network: Network;
};

export class BadgeService {
  attesters: { [name: string]: Attester };

  constructor(attesters: { [name: string]: Attester }) {
    this.attesters = attesters;
  }

  public getBadges(network: Network): Badge[] {
    const badges: Badge[] = [];
    for (const attester of Object.values(this.attesters)) {
      badges.push(...this._getAttesterBadges(attester, network));
    }
    return badges;
  }

  private _getAttesterBadges(attester: Attester, network: Network): Badge[] {
    const networkConfiguration = attester.networks[network];
    if (!networkConfiguration) {
      return [];
    }
    return attester.attestationsCollections.map((collection) => ({
      ...collection.badge,
      collectionId: this._computeCollectionId(
        networkConfiguration.collectionIdFirst,
        collection.internalCollectionId
      ),
      network: network,
    }));
  }

  private _computeCollectionId(
    collectionIdFirst: BigNumberish,
    internalCollectionId: number
  ): string {
    const collectionId =
      BigNumber.from(internalCollectionId).add(collectionIdFirst);
    return ethers.utils.hexZeroPad(collectionId.toHexString(), 32).slice(2);
  }
}
