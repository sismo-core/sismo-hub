import { AttestationsCollection } from "topics/attester";
import { Group } from "topics/group";
import {
  GroupProperties,
  GroupPropertiesEncoder,
} from "topics/group-properties-encoder/group-properties-encoder";

export interface testGroupProperties extends GroupProperties {
  generationTimestamp: number;
}

export class TestGroupPropertiesEncoder extends GroupPropertiesEncoder {
  public getProperties(): testGroupProperties {
    const properties = {
      internalCollectionId: this.attestationsCollection.internalCollectionId,
      generationTimestamp: this.group.timestamp,
    };
    return properties;
  }

  public getGroupId() {
    const properties = this.getProperties();
    return `sismo_${properties.internalCollectionId}_${properties.generationTimestamp}`;
  }
}

export const testGroupPropertiesEncoder = (
  attestationsCollection: Omit<AttestationsCollection, "groupFetcher">,
  group: Group
) => new TestGroupPropertiesEncoder(attestationsCollection, group);
