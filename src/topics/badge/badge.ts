import { Attester, AttestersLibrary, Network } from "topics/attester";

export type BadgeMetadata = {
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

export class BadgeService {
  attesters: AttestersLibrary;

  constructor(attesters: AttestersLibrary) {
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
      collectionId:
        networkConfiguration.collectionIdFirst +
        collection.internalCollectionId,
      network: network,
    }));
  }
}
