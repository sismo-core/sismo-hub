import { Badge } from "topics/badge";
import { Group } from "topics/group";

export type AttestationsCollection = {
  internalCollectionId: number;
  groupFetcher: () => Promise<Group[]>;
  badge: Badge;
};
