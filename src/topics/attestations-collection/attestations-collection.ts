import { Badge } from "../badge";
import { Group } from "../group";

export type AttestationsCollectionsType = {
  groups: Group[];
  badge: Badge;
};

export class AttestationsCollection {
  public groups: Group[];
  public badge: Badge;

  constructor({ groups, badge }: AttestationsCollectionsType) {
    this.groups = groups;
    this.badge = badge;
  }
}
