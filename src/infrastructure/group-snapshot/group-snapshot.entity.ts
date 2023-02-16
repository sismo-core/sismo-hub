import { Attribute, Entity, INDEX_TYPE, Table } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { Properties } from "topics/group";
import { GroupSnapshotMetadata } from "topics/group-snapshot/group-snapshot.types";

class GroupSnapshotModelSchema {
  @Attribute()
  groupId: string;

  @Attribute()
  name: string;

  @Attribute()
  timestamp: number;

  @Attribute()
  properties: Properties;

  @Attribute()
  dataIntegrity: string | undefined;

  @Attribute()
  resolvedIdentifierDataIntegrity: string | undefined;

  toGroupSnapshotMetadata(): GroupSnapshotMetadata {
    return {
      groupId: this.groupId,
      name: this.name,
      timestamp: this.timestamp,
      properties: this.properties,
      dataIntegrity: this.dataIntegrity,
      resolvedIdentifierDataIntegrity: this.resolvedIdentifierDataIntegrity,
    };
  }
}

@Entity({
  name: "groupSnapshots",
  primaryKey: {
    partitionKey: "GROUP_SNAPSHOT#GROUP_ID#{{groupId}}",
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
    groupSnapshotModel.groupId = groupSnapshot.groupId;
    groupSnapshotModel.name = groupSnapshot.name;
    groupSnapshotModel.timestamp = groupSnapshot.timestamp;
    groupSnapshotModel.properties = groupSnapshot.properties;
    if (groupSnapshot.dataIntegrity) {
      groupSnapshotModel.dataIntegrity = groupSnapshot.dataIntegrity;
    }
    if (groupSnapshot.resolvedIdentifierDataIntegrity) {
      groupSnapshotModel.resolvedIdentifierDataIntegrity =
        groupSnapshot.resolvedIdentifierDataIntegrity;
    }

    return groupSnapshotModel;
  }
}

@Entity({
  name: "groupSnapshotsLatest",
  primaryKey: {
    partitionKey: "GROUP_SNAPSHOT_LATEST#GROUP_ID#{{groupId}}",
    sortKey: "GROUP_SNAPSHOT_LATEST#GROUP_ID#{{groupId}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GROUP_SNAPSHOT_LATEST#NAME#{{name}}",
      sortKey: "GROUP_SNAPSHOT_LATEST#NAME#{{name}}",
      type: INDEX_TYPE.GSI,
    },
    GSI2: {
      partitionKey: "GROUP_SNAPSHOT_LATEST#GROUP_ID",
      sortKey: "GROUP_SNAPSHOT_LATEST#GROUP_ID",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class GroupSnapshotModelLatest extends GroupSnapshotModelSchema {
  static fromGroupSnapshotMetadata(
    groupSnapshot: GroupSnapshotMetadata
  ): GroupSnapshotModelLatest {
    const groupSnapshotModel = new GroupSnapshotModelLatest();
    groupSnapshotModel.groupId = groupSnapshot.groupId;
    groupSnapshotModel.name = groupSnapshot.name;
    groupSnapshotModel.timestamp = groupSnapshot.timestamp;
    groupSnapshotModel.properties = groupSnapshot.properties;
    if (groupSnapshot.dataIntegrity) {
      groupSnapshotModel.dataIntegrity = groupSnapshot.dataIntegrity;
    }
    if (groupSnapshot.resolvedIdentifierDataIntegrity) {
      groupSnapshotModel.resolvedIdentifierDataIntegrity =
        groupSnapshot.resolvedIdentifierDataIntegrity;
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
