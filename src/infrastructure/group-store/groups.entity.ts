import { Attribute, Entity, INDEX_TYPE, Table } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import {
  AccountSource,
  GroupMetadata,
  Properties,
  Tags,
  ValueType,
} from "topics/group";

class GroupModelSchema {
  @Attribute()
  name: string;

  @Attribute()
  timestamp: number;

  @Attribute()
  generatedBy: string;

  @Attribute()
  accountSources: AccountSource[];

  @Attribute()
  valueType: string;

  @Attribute()
  tags: string[];

  @Attribute()
  properties: Properties;

  toGroupMetadata(): GroupMetadata {
    const accountSources: AccountSource[] = this.accountSources;
    return {
      name: this.name,
      tags: this.tags.map((tag) => tag as Tags),
      accountSources,
      valueType: this.valueType as ValueType,
      timestamp: this.timestamp,
      generatedBy: this.generatedBy,
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
    if (!groupMetadata.accountSources) {
      throw new Error("Account types should not be undefined");
    }
    group.accountSources = groupMetadata.accountSources;
    group.valueType = groupMetadata.valueType;
    group.tags = groupMetadata.tags.map((tag) => tag.toString());
    if (!groupMetadata.generatedBy) {
      throw new Error("Group generator should not be undefined");
    }
    group.generatedBy = groupMetadata.generatedBy;
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
    /* istanbul ignore if */
    if (!groupMetadata.accountSources) {
      throw new Error("Account types should not be undefined");
    }
    group.accountSources = groupMetadata.accountSources;
    group.valueType = groupMetadata.valueType;
    /* istanbul ignore if */
    if (!groupMetadata.generatedBy) {
      throw new Error("Group generator should not be undefined");
    }
    group.generatedBy = groupMetadata.generatedBy;
    group.tags = groupMetadata.tags.map((tag) => tag.toString());
    return group;
  }
}

const getDynamoGlobalTable = (name: string) =>
  new Table({
    name,
    partitionKey: "PK",
    sortKey: "SK",
    indexes: {
      GSI1: {
        type: INDEX_TYPE.GSI,
        partitionKey: "GSI1PK",
        sortKey: "GSI1SK",
      },
    },
  });

export const createGroupsEntityManager = ({
  globalTableName,
  documentClient,
  prefix,
}: {
  globalTableName?: string;
  documentClient: DocumentClientV3;
  prefix?: string;
}) => {
  const table = getDynamoGlobalTable(globalTableName ?? "global-table");
  return createConnection({
    table,
    name: `${prefix}groups`,
    entities: [GroupModel, GroupModelLatest],
    documentClient,
  }).entityManager;
};
