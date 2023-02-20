import { Attribute, Entity, INDEX_TYPE, Table } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { AccountSource, GroupMetadata, Tags, ValueType } from "topics/group";

class GroupV2ModelSchema {
  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  timestamp: number;

  @Attribute()
  description: string;

  @Attribute()
  specs: string;

  @Attribute()
  generatedBy: string;

  @Attribute()
  accountSources: AccountSource[];

  @Attribute()
  valueType: string;

  @Attribute()
  tags: string[];

  toGroupMetadataWithId(): GroupMetadata & { id: string } {
    const accountSources: AccountSource[] = this.accountSources;
    return {
      id: this.id,
      name: this.name,
      tags: this.tags.map((tag) => tag as Tags),
      accountSources,
      valueType: this.valueType as ValueType,
      timestamp: this.timestamp,
      description: this.description,
      specs: this.specs,
      generatedBy: this.generatedBy,
    };
  }
}

@Entity({
  name: "groupsV2",
  primaryKey: {
    partitionKey: "GROUPV2#ID#{{id}}",
    sortKey: "TS#{{timestamp}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GROUPV2#NAME#{{name}}",
      sortKey: "TS#{{timestamp}}",
      type: INDEX_TYPE.GSI,
    },
    GSI2: {
      partitionKey: "GROUPV2#ID",
      sortKey: "GROUPV2#ID",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class GroupV2Model extends GroupV2ModelSchema {
  static fromGroupMetadataAndId(
    groupMetadata: GroupMetadata & { id: string }
  ): GroupV2Model {
    const group = new GroupV2Model();
    group.id = groupMetadata.id;
    group.name = groupMetadata.name;
    group.timestamp = groupMetadata.timestamp;
    group.description = groupMetadata.description;
    group.specs = groupMetadata.specs;
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
      GSI2: {
        type: INDEX_TYPE.GSI,
        partitionKey: "GSI2PK",
        sortKey: "GSI2SK",
      },
    },
  });

export const createGroupsV2EntityManager = ({
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
    name: `${prefix}groupsV2`,
    entities: [GroupV2Model],
    documentClient,
  }).entityManager;
};
