import { AttestationsCollection } from "topics/attester/attester.types";
import { Group } from "topics/group";

export type GroupPropertiesEncoderFn = (
  attestationsCollection: AttestationsCollection,
  group: Group
) => GroupPropertiesEncoder;

export type GroupProperties = {
  internalCollectionId: number;
};

export abstract class GroupPropertiesEncoder {
  public attestationsCollection: Omit<AttestationsCollection, "groupFetcher">;
  public group: Group;

  constructor(
    attestationsCollection: Omit<AttestationsCollection, "groupFetcher">,
    group: Group
  ) {
    this.attestationsCollection = attestationsCollection;
    this.group = group;
  }

  public abstract getProperties(): GroupProperties;

  public abstract getGroupId(): string;
}
