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

type Links = {
  logoUrl: string;
  label: string;
  url: string;
};

export type hydraS1BadgeMetadata = {
  groupSnapshot: {
    groupName: string;
    timestamp?: number;
  };
  groupFetcher?: (groupStore: GroupStore) => Promise<Group[]>;
};

export type BadgeMetadata = hydraS1BadgeMetadata & {
  internalCollectionId: number;
  name: string;
  description: string;
  image: string;
  curatedAttributes?: Record<BadgeAttribute, BadgeAttributeValue>;
  publicContacts: Contact[];
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
  configuredNetworks: Network[];

  constructor(badgesCollections: BadgesCollection[], networks: Network[]) {
    this.badgesCollections = badgesCollections;
    this.configuredNetworks = networks;
  }

  public async getAllBadges(): Promise<Badge[]> {
    const badges: Badge[] = [];
    for (const network of this.configuredNetworks) {
      const badgesWithFilteredNetworks = this.getBadges(network).map(
        (badge) => ({
          ...badge,
          networks: badge.networks.filter((network) =>
            this.configuredNetworks.includes(network)
          ),
        })
      );

      badges.push(...badgesWithFilteredNetworks);
    }
    return badges;
  }

  public getBadges(network: Network): Badge[] {
    if (!this.configuredNetworks.includes(network)) {
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
