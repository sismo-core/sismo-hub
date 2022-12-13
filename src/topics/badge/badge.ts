import { Network } from "topics/attester";
import { Group, GroupStore } from "topics/group";
import {
  BadgeAttribute,
  BadgeAttributeValue,
} from "topics/badge/badge-attributes";

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
  groupGeneratorName?: string;
  curatedAttributes?: Record<BadgeAttribute, BadgeAttributeValue>;
  publicContacts: Contact[];
  eligibility: Eligibility;
  links?: Links[];
  networks: Network[];
};

export type Badge = Exclude<BadgeMetadata, "attributes"> & {
  collectionId: number;
  network: Network;
  isCurated: boolean;
  attributes: {
    trait_type: BadgeAttribute;
    value: BadgeAttributeValue;
  }[];
};

export type BadgesCollection = {
  collectionIdFirst: number;
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
    const firstCollectionId = collection.collectionIdFirst;
    if (firstCollectionId === undefined) {
      return [];
    }
    return collection.badges.map((badge) => ({
      ...badge,
      attributes: Object.entries(badge.curatedAttributes || {}).map(
        ([trait_type, value]) =>
          ({
            trait_type,
            value,
          } as { trait_type: BadgeAttribute; value: BadgeAttributeValue })
      ),
      isCurated: !!badge.curatedAttributes,
      collectionId: badge.internalCollectionId + firstCollectionId,
      network: network,
    }));
  }
}
