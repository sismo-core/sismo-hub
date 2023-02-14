import { Attribute, Entity, INDEX_TYPE, Table } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { AccountSource, Properties, Tags, ValueType } from "topics/group";
import { GroupSnapshotMetadata } from "topics/group-snapshot/group-snapshot.types";

class GroupSnapshotModelSchema {
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

  @Attribute()
  dataMD5: string | undefined;

  @Attribute()
  resolvedIdentifierDataMD5: string | undefined;

  toGroupSnapshotMetadata(): GroupSnapshotMetadata {
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
      dataMD5: this.dataMD5,
      resolvedIdentifierDataMD5: this.resolvedIdentifierDataMD5,
    };
  }
}

@Entity({
  name: "groupSnapshots",
  primaryKey: {
    partitionKey: "GROUP_SNAPSHOT#{{id}}",
    sortKey: "TS#{{timestamp}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GROUP_SNAPSHOT#NAME#{{name}}",
      sortKey: "TS#{{timestamp}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class GroupSnapshotModel extends GroupSnapshotModelSchema {
  static fromGroupSnapshotMetadata(
    groupSnapshot: GroupSnapshotMetadata
  ): GroupSnapshotModel {
    const groupSnapshotModel = new GroupSnapshotModel();
    groupSnapshotModel.id = groupSnapshot.id;
    groupSnapshotModel.name = groupSnapshot.name;
    groupSnapshotModel.timestamp = groupSnapshot.timestamp;
    if (!groupSnapshot.accountSources) {
      throw new Error("Account types should not be undefined");
    }
    groupSnapshotModel.accountSources = groupSnapshot.accountSources;
    groupSnapshotModel.valueType = groupSnapshot.valueType;
    groupSnapshotModel.tags = groupSnapshot.tags.map((tag) => tag.toString());
    if (!groupSnapshot.properties) {
      throw new Error("Group properties should not be undefined");
    }
    groupSnapshotModel.properties = groupSnapshot.properties;
    if (!groupSnapshot.generatedBy) {
      throw new Error("Group generator should not be undefined");
    }
    groupSnapshotModel.generatedBy = groupSnapshot.generatedBy;
    if (groupSnapshot.dataMD5) {
      groupSnapshotModel.dataMD5 = groupSnapshot.dataMD5;
    }
    if (groupSnapshot.resolvedIdentifierDataMD5) {
      groupSnapshotModel.resolvedIdentifierDataMD5 =
        groupSnapshot.resolvedIdentifierDataMD5;
    }

    return groupSnapshotModel;
  }
}

@Entity({
  name: "groupSnapshotsLatest",
  primaryKey: {
    partitionKey: "GROUP_SNAPSHOT_LATEST#{{id}}",
    sortKey: "GROUP_SNAPSHOT_LATEST#{{id}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GROUP_SNAPSHOT_LATEST#NAME#{{name}}",
      sortKey: "GROUP_SNAPSHOT_LATEST#NAME#{{name}}",
      type: INDEX_TYPE.GSI,
    },
    GSI2: {
      partitionKey: "GROUP_SNAPSHOT_LATEST",
      sortKey: "GROUP_SNAPSHOT_LATEST",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class GroupSnapshotModelLatest extends GroupSnapshotModelSchema {
  static fromGroupSnapshotMetadata(
    groupSnapshot: GroupSnapshotMetadata
  ): GroupSnapshotModelLatest {
    const groupSnapshotModel = new GroupSnapshotModelLatest();
    groupSnapshotModel.id = groupSnapshot.id;
    groupSnapshotModel.name = groupSnapshot.name;
    groupSnapshotModel.timestamp = groupSnapshot.timestamp;
    /* istanbul ignore if */
    if (!groupSnapshot.accountSources) {
      throw new Error("Account types should not be undefined");
    }
    groupSnapshotModel.accountSources = groupSnapshot.accountSources;
    groupSnapshotModel.valueType = groupSnapshot.valueType;
    /* istanbul ignore if */
    if (!groupSnapshot.properties) {
      throw new Error("Group properties should not be undefined");
    }
    groupSnapshotModel.properties = groupSnapshot.properties;
    /* istanbul ignore if */
    if (!groupSnapshot.generatedBy) {
      throw new Error("Group generator should not be undefined");
    }
    groupSnapshotModel.generatedBy = groupSnapshot.generatedBy;
    groupSnapshotModel.tags = groupSnapshot.tags.map((tag) => tag.toString());
    if (groupSnapshot.dataMD5) {
      groupSnapshotModel.dataMD5 = groupSnapshot.dataMD5;
    }
    if (groupSnapshot.resolvedIdentifierDataMD5) {
      groupSnapshotModel.resolvedIdentifierDataMD5 =
        groupSnapshot.resolvedIdentifierDataMD5;
    }
    return groupSnapshotModel;
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

export const createGroupSnapshotsEntityManager = ({
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
    name: `${prefix}groupSnapshots`,
    entities: [GroupSnapshotModel, GroupSnapshotModelLatest],
    documentClient,
  }).entityManager;
};
