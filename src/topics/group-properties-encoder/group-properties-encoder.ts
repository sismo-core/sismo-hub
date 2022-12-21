import { AttestationsCollection } from "topics/attester/attester.types";
import { Group } from "topics/group";

export type GroupPropertiesEncoderFn = (
  attestationsCollection: AttestationsCollection,
  group: Group
) => GroupPropertiesEncoder;

export type GroupProperties = {
  internalCollectionId: number;
};

export type attestationsCollectionsEncoder = Omit<
  AttestationsCollection,
  "groupFetcher" | "networks"
>;

export abstract class GroupPropertiesEncoder {
  public attestationsCollection: attestationsCollectionsEncoder;
  public group: Group;

  constructor(
    attestationsCollection: attestationsCollectionsEncoder,
    group: Group
  ) {
    this.attestationsCollection = attestationsCollection;
    this.group = group;
  }

  public abstract getProperties(): GroupProperties;

  public abstract getGroupId(): string;
}
