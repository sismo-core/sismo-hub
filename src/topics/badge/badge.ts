import { Network } from "topics/attester";

export type BadgeMetadata = {
  internalCollectionId: number;
  name: string;
  description: string;
  image: string;
  attributes: { [attributeName: string]: string };
  requirements: string[];
};

export type Badge = BadgeMetadata & {
  collectionId: number;
  network: Network;
};

export type BadgesCollection = {
  collectionIdFirsts: { [network in Network]?: number };
  badges: BadgeMetadata[];
};

export class BadgeService {
  badgesCollections: BadgesCollection[];

  constructor(badgesCollections: BadgesCollection[]) {
    this.badgesCollections = badgesCollections;
  }

  public getBadges(network: Network): Badge[] {
    const badges: Badge[] = [];
    for (const badge of Object.values(this.badgesCollections)) {
      badges.push(...this._getCollectionBadges(badge, network));
    }
    return badges;
  }

  private _getCollectionBadges(
    collection: BadgesCollection,
    network: Network
  ): Badge[] {
    const firstCollectionId = collection.collectionIdFirsts[network];
    if (!firstCollectionId) {
      return [];
    }
    return collection.badges.map((badge) => ({
      ...badge,
      collectionId: badge.internalCollectionId + firstCollectionId,
      network: network,
    }));
  }
}
