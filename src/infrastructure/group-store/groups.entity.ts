import { Attribute, Entity, INDEX_TYPE, Table } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { NonEmptyArray } from "helpers";
import { AccountSource, GroupMetadata, Tags, ValueType } from "topics/group";

class GroupModelSchema {
  @Attribute()
  name: string;

  @Attribute()
  timestamp: number;

  @Attribute()
  accountSources: NonEmptyArray<AccountSource>;

  @Attribute()
  valueType: string;

  @Attribute()
  tags: string[];

  toGroupMetadata(): GroupMetadata {
    const accountSources: NonEmptyArray<AccountSource> = this.accountSources;
    return {
      name: this.name,
      tags: this.tags.map((tag) => tag as Tags),
      accountSources,
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
    group.accountSources = groupMetadata.accountSources;
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
    group.accountSources = groupMetadata.accountSources;
    group.valueType = groupMetadata.valueType;
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
}: {
  globalTableName?: string;
  documentClient: DocumentClientV3;
}) => {
  const table = getDynamoGlobalTable(globalTableName ?? "global-table");
  return createConnection({
    table,
    name: "groups",
    entities: [GroupModel, GroupModelLatest],
    documentClient,
  }).entityManager;
};
