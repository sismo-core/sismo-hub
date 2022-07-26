import { Badge } from "../badge";
import { Group } from "../group";

export type GroupsFetcherFn = () => Promise<Group[]>;

export type AttestationsCollectionsConstructor = {
  groupsFetcher: GroupsFetcherFn;
  badge: Badge;
};

export class AttestationsCollection {
  public groupsFetcher: GroupsFetcherFn;
  public badge: Badge;

  constructor({ groupsFetcher, badge }: AttestationsCollectionsConstructor) {
    this.groupsFetcher = groupsFetcher;
    this.badge = badge;
  }
}
