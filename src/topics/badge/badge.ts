import { Network } from "topics/attester";
import { Group, GroupStore } from "topics/group";

type Contact = {
  type: string;
  contact: string;
};

type Eligibility = {
  shortDescription: string;
  specification: string;
};

type Links = {
  logoUrl: string;
  label: string;
  url: string;
};

export type hydraS1BadgeMetadata = {
  groupGeneratorName: string;
  groupFetcher?: (groupStore: GroupStore) => Promise<Group[]>;
};

export type BadgeMetadata = hydraS1BadgeMetadata & {
  internalCollectionId: number;
  name: string;
  description: string;
  image: string;
  publicContacts: Contact[];
  eligibility: Eligibility;
  links?: Links[];
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
    if (firstCollectionId === undefined) {
      return [];
    }
    return collection.badges.map((badge) => ({
      ...badge,
      collectionId: badge.internalCollectionId + firstCollectionId,
      network: network,
    }));
  }
}
