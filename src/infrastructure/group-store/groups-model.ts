import {
  Attribute,
  Entity,
  AutoGenerateAttribute,
  INDEX_TYPE,
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
} from "@typedorm/common";
import { GroupMetadata, Tags, ValueType } from "topics/group";

class GroupModelSchema {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  name: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.ISO_DATE,
  })
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
    // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
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
