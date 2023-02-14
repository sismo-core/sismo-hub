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

class GroupV2ModelSchema {
  @Attribute()
  id: string;

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
      id: this.id,
      name: this.name,
      tags: this.tags.map((tag) => tag as Tags),
      accountSources,
      valueType: this.valueType as ValueType,
      timestamp: this.timestamp,
      properties: this.properties,
      generatedBy: this.generatedBy,
    };
  }
}

@Entity({
  name: "groupsV2",
  primaryKey: {
    partitionKey: "GROUPV2#{{id}}",
    sortKey: "TS#{{timestamp}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GROUPV2#{{name}}",
      sortKey: "TS#{{timestamp}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class GroupV2Model extends GroupV2ModelSchema {
  static fromGroupMetadata(groupMetadata: GroupMetadata): GroupV2Model {
    const group = new GroupV2Model();
    if (groupMetadata.id) {
      group.id = groupMetadata.id;
    }
    group.name = groupMetadata.name;
    group.timestamp = groupMetadata.timestamp;
    if (!groupMetadata.accountSources) {
      throw new Error("Account types should not be undefined");
    }
    group.accountSources = groupMetadata.accountSources;
    group.valueType = groupMetadata.valueType;
    group.tags = groupMetadata.tags.map((tag) => tag.toString());
    if (!groupMetadata.properties) {
      throw new Error("Group properties should not be undefined");
    }
    group.properties = groupMetadata.properties;
    if (!groupMetadata.generatedBy) {
      throw new Error("Group generator should not be undefined");
    }
    group.generatedBy = groupMetadata.generatedBy;
    return group;
  }
}

@Entity({
  name: "groupsV2Latest",
  primaryKey: {
    partitionKey: "GROUPV2_LATEST#{{id}}",
    sortKey: "GROUPV2_LATEST#{{id}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GROUPV2_LATEST#{{name}}",
      sortKey: "GROUPV2_LATEST#{{name}}",
      type: INDEX_TYPE.GSI,
    },
    GSI2: {
      partitionKey: "GROUPV2_LATEST",
      sortKey: "GROUPV2_LATEST",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class GroupV2ModelLatest extends GroupV2ModelSchema {
  static fromGroupMetadata(groupMetadata: GroupMetadata): GroupV2ModelLatest {
    const group = new GroupV2ModelLatest();
    if (groupMetadata.id) {
      group.id = groupMetadata.id;
    }
    group.name = groupMetadata.name;
    group.timestamp = groupMetadata.timestamp;
    /* istanbul ignore if */
    if (!groupMetadata.accountSources) {
      throw new Error("Account types should not be undefined");
    }
    group.accountSources = groupMetadata.accountSources;
    group.valueType = groupMetadata.valueType;
    /* istanbul ignore if */
    if (!groupMetadata.properties) {
      throw new Error("Group properties should not be undefined");
    }
    group.properties = groupMetadata.properties;
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
    entities: [GroupV2Model, GroupV2ModelLatest],
    documentClient,
  }).entityManager;
};
