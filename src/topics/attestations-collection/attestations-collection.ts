import { Badge } from "topics/badge";
import { Group } from "topics/group";

export type AttestationsCollectionsType = {
  internalCollectionId: number;
  groupFetcher: () => Promise<Group[]>;
  badge: Badge;
};

export class AttestationsCollection {
  public internalCollectionId: number;
  public groupFetcher: () => Promise<Group[]>;
  public badge: Badge;

  constructor({
    internalCollectionId,
    groupFetcher,
    badge,
  }: AttestationsCollectionsType) {
    this.internalCollectionId = internalCollectionId;
    this.groupFetcher = groupFetcher;
    this.badge = badge;
  }
}
