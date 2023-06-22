/* eslint-disable no-restricted-imports */
import { createHash } from "crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DocumentClientV3 } from "@typedorm/document-client";
import { BigNumber, BigNumberish } from "ethers";
import { v4 as uuid } from "uuid";
import { testGroupsMigrationWithData } from "../migration-test-groups";
import { S3FileStore } from "infrastructure/file-store";
import { DynamoDBGroupSnapshotStore } from "infrastructure/group-snapshot/dynamodb-group-snapshot-store";
import {
  createGroupSnapshotsEntityManager,
  GroupSnapshotModel,
  GroupSnapshotModelLatest,
} from "infrastructure/group-snapshot/group-snapshot.entity";
import { DynamoDBGroupStore } from "infrastructure/group-store";
import {
  createGroupsV2EntityManager,
  GroupV2Model,
} from "infrastructure/group-store/groups-v2.entity";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import { getLocalDocumentClient, resetDB } from "infrastructure/utils";
import { changeGroupIdFromUUIDtoUint128 } from "migration/02172023/migrate-groups-dynamodb-02172023";
import {
  FetchedData,
  Group,
  groupMetadata,
  Properties,
  ResolvedGroupWithData,
} from "topics/group";
import {
  groupSnapshotMetadata,
  ResolvedGroupSnapshotWithData,
} from "topics/group-snapshot";

describe("Test migration", () => {
  const dynamodbClient = getLocalDocumentClient();
  const entityManagerV2 = createGroupsV2EntityManager({
    documentClient: new DocumentClientV3(
      new DynamoDBClient({
        endpoint: "http://localhost:9000",
        region: "eu-west-1",
      })
    ),
    prefix: "script-",
  });
  const entityManagerSnapshot = createGroupSnapshotsEntityManager({
    documentClient: new DocumentClientV3(
      new DynamoDBClient({
        endpoint: "http://localhost:9000",
        region: "eu-west-1",
      })
    ),
    prefix: "script-",
  });
  const dataFileStore = new S3FileStore("group-store", {
    bucketName: "local",
    endpoint: "http://127.0.0.1:9002/local",
    s3Options: {
      endpoint: "http://127.0.0.1:9002",
      s3ForcePathStyle: true,
    },
  });
  const dataFileStoreSnapshot = new S3FileStore("group-snapshot-store", {
    bucketName: "local",
    endpoint: "http://127.0.0.1:9002/local",
    s3Options: {
      endpoint: "http://127.0.0.1:9002",
      s3ForcePathStyle: true,
    },
  });

  const groupStore = new DynamoDBGroupStore(dataFileStore, entityManagerV2);
  const groupSnapshotStore = new DynamoDBGroupSnapshotStore(
    dataFileStoreSnapshot,
    entityManagerSnapshot
  );

  const _handleMD5Checksum = async (
    groupSnapshot: ResolvedGroupSnapshotWithData
  ): Promise<ResolvedGroupSnapshotWithData> => {
    const integrityFormat = async (filename: string) => {
      return (
        "md5-" +
        createHash("md5")
          .update(
            JSON.stringify(
              await dataFileStoreSnapshot.read(filename)
            ).toString()
          )
          .digest("hex")
      );
    };

    return {
      ...groupSnapshot,
      dataIntegrity: await integrityFormat(
        `${groupSnapshot.groupId}/${groupSnapshot.timestamp}.json`
      ),
      resolvedIdentifierDataIntegrity: await integrityFormat(
        `${groupSnapshot.groupId}/${groupSnapshot.timestamp}.resolved.json`
      ),
    };
  };

  const _fromGroupModelToGroup = (group: GroupV2Model) => {
    const groupMetadataWithId = group.toGroupMetadataWithId();
    return {
      ...groupMetadataWithId,
      data: () => dataFileStore.read(`${group.name}/${group.timestamp}.json`),
      resolvedIdentifierData: async () => {
        if (
          await dataFileStore.exists(
            `${group.name}/${group.timestamp}.resolved.json`
          )
        ) {
          return dataFileStore.read(
            `${group.name}/${group.timestamp}.resolved.json`
          );
        }
        return dataFileStore.read(`${group.name}/${group.timestamp}.json`);
      },
    };
  };

  const saveGroup = async (group: ResolvedGroupWithData) => {
    const groupMetadataAndId = { ...groupMetadata(group), id: uuid() };
    const groupMain = GroupV2Model.fromGroupMetadataAndId(groupMetadataAndId);
    await dataFileStore.write(
      `${group.name}/${group.timestamp}.json`,
      group.data
    );
    await dataFileStore.write(
      `${group.name}/${group.timestamp}.resolved.json`,
      group.resolvedIdentifierData
    );
    await entityManagerV2.create(groupMain, {
      overwriteIfExists: true,
    });

    return _fromGroupModelToGroup(groupMain);
  };

  const saveGroupSnapshot = async (group: Group): Promise<void> => {
    const groupSnapshot: ResolvedGroupSnapshotWithData = {
      groupId: group.id,
      timestamp: group.timestamp,
      name: group.name,
      properties: computeProperties(await group.data()) as Properties,
      data: await group.data(),
      resolvedIdentifierData: await group.resolvedIdentifierData(),
    };

    await dataFileStoreSnapshot.write(
      `${groupSnapshot.groupId}/${groupSnapshot.timestamp}.json`,
      groupSnapshot.data
    );
    await dataFileStoreSnapshot.write(
      `${groupSnapshot.groupId}/${groupSnapshot.timestamp}.resolved.json`,
      groupSnapshot.resolvedIdentifierData
    );

    const updatedGroupSnapshotWithMD5 = await _handleMD5Checksum(groupSnapshot);

    const groupSnapshotMain = GroupSnapshotModel.fromGroupSnapshotMetadata(
      groupSnapshotMetadata(updatedGroupSnapshotWithMD5)
    );

    await entityManagerSnapshot.create(groupSnapshotMain);
    const groupSnapshotLatest =
      GroupSnapshotModelLatest.fromGroupSnapshotMetadata(
        groupSnapshotMetadata(updatedGroupSnapshotWithMD5)
      );
    await entityManagerSnapshot.create(groupSnapshotLatest, {
      overwriteIfExists: true,
    });
  };

  beforeEach(async () => {
    await resetDB(dynamodbClient);
    dataFileStore.reset();
    const group1 = await saveGroup(testGroupsMigrationWithData.group1_0);
    const group2 = await saveGroup(testGroupsMigrationWithData.group2_0);

    await saveGroupSnapshot(group1);
    await saveGroupSnapshot({ ...group1, timestamp: group1.timestamp + 60 });
    await saveGroupSnapshot(group2);
  });

  it("should migrate groups id into uint128", async () => {
    const ids = await changeGroupIdFromUUIDtoUint128({
      entityManagerV2,
      entityManagerSnapshot,
      dataFileStoreV2: dataFileStore,
      dataFileStoreSnapshot,
      loggerService: new MemoryLogger(),
    });
    const groups = await groupStore.all();
    expect(Object.keys(groups).length).toEqual(2);
    expect(groups[testGroupsMigrationWithData.group1_0.name].id).toEqual(
      ids[testGroupsMigrationWithData.group1_0.name].newId
    );
    expect(groups[testGroupsMigrationWithData.group2_0.name].id).toEqual(
      ids[testGroupsMigrationWithData.group2_0.name].newId
    );
    const groupSnapshots1_0 = await groupSnapshotStore.allByGroupId(
      groups[testGroupsMigrationWithData.group1_0.name].id
    );
    expect(groupSnapshots1_0.length).toEqual(2);
    groupSnapshots1_0.forEach((groupSnapshot) => {
      expect(groupSnapshot.groupId).toEqual(
        ids[testGroupsMigrationWithData.group1_0.name].newId
      );
    });
    const groupSnapshots2_0 = await groupSnapshotStore.allByGroupId(
      groups[testGroupsMigrationWithData.group2_0.name].id
    );
    expect(groupSnapshots2_0.length).toEqual(1);
    groupSnapshots2_0.forEach((groupSnapshot) => {
      expect(groupSnapshot.groupId).toEqual(
        ids[testGroupsMigrationWithData.group2_0.name].newId
      );
    });
  });
});

const computeProperties = (data: FetchedData): Properties => {
  const valueDistribution: { [tier: number]: number } = {};
  let accountsNumber = 0;
  let minValue: BigNumberish | null = null;
  let maxValue: BigNumberish | null = null;

  Object.values(data).map((tier: any) => {
    valueDistribution[tier]
      ? (valueDistribution[tier] += 1)
      : (valueDistribution[tier] = 1);
    accountsNumber++;
    if (minValue === null || BigNumber.from(tier).lt(minValue)) {
      minValue = BigNumber.from(tier).toString();
    }
    if (maxValue === null || BigNumber.from(tier).gt(maxValue)) {
      maxValue = BigNumber.from(tier).toString();
    }
  });

  return {
    accountsNumber,
    valueDistribution,
    minValue,
    maxValue,
  };
};
