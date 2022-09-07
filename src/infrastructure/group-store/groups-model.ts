import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";
import { GroupMetadata, Tags, ValueType } from "topics/group";

class GroupModelSchema {
  @Attribute()
  name: string;

  @Attribute()
  timestamp: number;

  @Attribute()
  valueType: string;

  @Attribute()
  tags: string[];

  toGroupMetadata(): GroupMetadata {
    return {
      name: this.name,
      tags: this.tags.map((tag) => tag as Tags),
      valueType: this.valueType as ValueType,
      timestamp: this.timestamp,
    };
  }
}

@Entity({
  name: "groups",
  primaryKey: {
    partitionKey: "GROUP#{{name}}",
    sortKey: "TS#{{timestamp}}",
  },
})
export class GroupModel extends GroupModelSchema {
  static fromGroupMetadata(groupMetadata: GroupMetadata): GroupModel {
    const group = new GroupModel();
    group.name = groupMetadata.name;
    group.timestamp = groupMetadata.timestamp;
    group.valueType = groupMetadata.valueType;
    group.tags = groupMetadata.tags.map((tag) => tag.toString());
    return group;
  }
}

@Entity({
  name: "groupsLatest",
  primaryKey: {
    partitionKey: "GROUP_LATEST#{{name}}",
    sortKey: "GROUP_LATEST#{{name}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GROUP_LATEST",
      sortKey: "GROUP_LATEST",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class GroupModelLatest extends GroupModelSchema {
  static fromGroupMetadata(groupMetadata: GroupMetadata): GroupModelLatest {
    const group = new GroupModelLatest();
    group.name = groupMetadata.name;
    group.timestamp = groupMetadata.timestamp;
    group.valueType = groupMetadata.valueType;
    group.tags = groupMetadata.tags.map((tag) => tag.toString());
    return group;
  }
}
