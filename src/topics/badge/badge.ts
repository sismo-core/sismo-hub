import { Network } from "topics/attester";
import {
  BadgeAttribute,
  BadgeAttributeValue,
} from "topics/badge/badge-attributes";
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
  networks: Network[];

  constructor(badgesCollections: BadgesCollection[], networks: Network[]) {
    this.badgesCollections = badgesCollections;
    this.networks = networks;
  }

  public getBadges(network: Network): Badge[] {
    if (!this.networks.includes(network)) {
      return [];
    }
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
    return collection.badges
      .filter((badge) => badge.networks.includes(network))
      .map((badge) => ({
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
