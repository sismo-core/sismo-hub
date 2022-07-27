import { Badge } from "../badge";
import { Group } from "../group";

export type AttestationsCollectionsConstructor = {
  groupFetcher: () => Promise<Group[]>;
  badge: Badge;
};

/**
 * @description The representation of an AttestationsCollection that belongs to a specific Attester.
 */
export class AttestationsCollection {
  public groupFetcher: () => Promise<Group[]>;
  public badge: Badge;

  constructor({ groupFetcher, badge }: AttestationsCollectionsConstructor) {
    this.groupFetcher = groupFetcher;
    this.badge = badge;
  }
}
