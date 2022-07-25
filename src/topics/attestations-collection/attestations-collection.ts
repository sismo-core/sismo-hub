import { Badge } from "../badge";
import { Group } from "../group";

export type AttestationsCollectionsType = {
  groupFetcher: () => Promise<Group[]>;
  badge: Badge;
};

export class AttestationsCollection {
  public groupFetcher: () => Promise<Group[]>;
  public badge: Badge;

  constructor({ groupFetcher, badge }: AttestationsCollectionsType) {
    this.groupFetcher = groupFetcher;
    this.badge = badge;
  }
}
