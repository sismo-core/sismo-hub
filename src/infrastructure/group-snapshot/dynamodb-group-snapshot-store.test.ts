import { LocalFileStore } from "infrastructure/file-store";
import { DynamoDBGroupSnapshotStore } from "infrastructure/group-snapshot/dynamodb-group-snapshot-store";
import { createGroupSnapshotsEntityManager } from "infrastructure/group-snapshot/group-snapshot.entity";
import { resetDB, getLocalDocumentClient } from "infrastructure/utils";
import {
  exampleData,
  exampleResolvedIdentifierData,
  testGroupSnapshots,
} from "topics/group-snapshot/test-group-snapshots";

const testPath = `${__dirname}/../../../test-disk-store/unit`;
const dynamodbClient = getLocalDocumentClient();

describe("test group snapshots dynamo db store", () => {
  const dynamodbGroupSnapshotStore = new DynamoDBGroupSnapshotStore(
    new LocalFileStore("group-snapshots-data", testPath),
    createGroupSnapshotsEntityManager({
      documentClient: dynamodbClient,
    })
  );

  beforeEach(async () => {
    await resetDB(dynamodbClient);
  });

  it("Should generate a group snapshot and retrieve it from store with ID", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    const groupSnapshots = await dynamodbGroupSnapshotStore.allById(
      testGroupSnapshots.groupSnapshot1_0.id
    );
    expect(groupSnapshots).toHaveLength(1);
    expect(groupSnapshots[0]).toBeSameGroupSnapshot(
      testGroupSnapshots.groupSnapshot1_0
    );
  });

  it("Should generate a group snapshot and retrieve it from store with name", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    const groupSnapshots = await dynamodbGroupSnapshotStore.allByName(
      testGroupSnapshots.groupSnapshot1_0.name
    );
    expect(groupSnapshots).toHaveLength(1);
    expect(groupSnapshots[0]).toBeSameGroupSnapshot(
      testGroupSnapshots.groupSnapshot1_0
    );
  });

  it("Should save multiple group snapshots and search by id", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);
    const groups = await dynamodbGroupSnapshotStore.allById(
      testGroupSnapshots.groupSnapshot1_0.id
    );
    expect(groups).toHaveLength(2);
    expect(groups).toContainGroupSnapshot(testGroupSnapshots.groupSnapshot1_0);
    expect(groups).toContainGroupSnapshot(testGroupSnapshots.groupSnapshot1_0);
  });

  it("Should save multiple group snapshots and search by name", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);
    const groups = await dynamodbGroupSnapshotStore.allByName(
      testGroupSnapshots.groupSnapshot1_0.name
    );
    expect(groups).toHaveLength(2);
    expect(groups).toContainGroupSnapshot(testGroupSnapshots.groupSnapshot1_0);
    expect(groups).toContainGroupSnapshot(testGroupSnapshots.groupSnapshot1_0);
  });

  it("Should save multiple group snapshots and search by timestamp", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);

    const groups = await dynamodbGroupSnapshotStore.search({
      groupSnapshotName: testGroupSnapshots.groupSnapshot1_0.name,
      timestamp: testGroupSnapshots.groupSnapshot1_1.timestamp,
    });

    expect(groups).toHaveLength(1);
    expect(groups[0]).toBeSameGroupSnapshot(
      testGroupSnapshots.groupSnapshot1_1
    );
  });

  it("Should generate multiple group snapshots and search by id and latest", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);

    const latest1 = await dynamodbGroupSnapshotStore.search({
      groupSnapshotId: testGroupSnapshots.groupSnapshot1_0.id,
      timestamp: "latest",
    });
    expect(latest1[0]).toBeSameGroupSnapshot(
      testGroupSnapshots.groupSnapshot1_1
    );

    const latest2 = await dynamodbGroupSnapshotStore.search({
      groupSnapshotId: testGroupSnapshots.groupSnapshot2_0.id,
      timestamp: "latest",
    });
    expect(latest2[0]).toBeSameGroupSnapshot(
      testGroupSnapshots.groupSnapshot2_0
    );
  });

  it("Should generate multiple group snapshots and search by name and latest", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);

    const latest1 = await dynamodbGroupSnapshotStore.search({
      groupSnapshotName: testGroupSnapshots.groupSnapshot1_0.name,
      timestamp: "latest",
    });
    expect(latest1[0]).toBeSameGroupSnapshot(
      testGroupSnapshots.groupSnapshot1_1
    );

    const latest2 = await dynamodbGroupSnapshotStore.search({
      groupSnapshotName: testGroupSnapshots.groupSnapshot2_0.name,
      timestamp: "latest",
    });
    expect(latest2[0]).toBeSameGroupSnapshot(
      testGroupSnapshots.groupSnapshot2_0
    );
  });

  it("Should generate multiple group snapshots and get latests", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);

    const latests = await dynamodbGroupSnapshotStore.latests();
    expect(Object.keys(latests)).toHaveLength(2);
    expect(
      latests[testGroupSnapshots.groupSnapshot1_0.id]
    ).toBeSameGroupSnapshot(testGroupSnapshots.groupSnapshot1_1);
    expect(
      latests[testGroupSnapshots.groupSnapshot2_0.id]
    ).toBeSameGroupSnapshot(testGroupSnapshots.groupSnapshot2_0);
    expect(
      await latests[testGroupSnapshots.groupSnapshot1_0.id].data()
    ).toEqual(exampleData);
    expect(
      await latests[
        testGroupSnapshots.groupSnapshot1_0.id
      ].resolvedIdentifierData()
    ).toEqual(exampleResolvedIdentifierData);
  });

  it("Should throw error when retrieving latest from empty store", async () => {
    await expect(async () => {
      await dynamodbGroupSnapshotStore.latestById(
        testGroupSnapshots.groupSnapshot1_0.id
      );
    }).rejects.toThrow();

    await expect(async () => {
      await dynamodbGroupSnapshotStore.latestByName(
        testGroupSnapshots.groupSnapshot1_0.name
      );
    }).rejects.toThrow();
  });

  it("Should generate a group snapshot and retrieve data from store", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    const groupSnapshot = await dynamodbGroupSnapshotStore.latestById(
      testGroupSnapshots.groupSnapshot1_0.id
    );
    expect(await groupSnapshot.data()).toEqual(exampleData);
  });

  it("Should generate a group snapshot and retrieve resolvedIdentifierData from store", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    const group = await dynamodbGroupSnapshotStore.latestByName(
      testGroupSnapshots.groupSnapshot1_0.name
    );
    expect(await group.resolvedIdentifierData()).toEqual(
      exampleResolvedIdentifierData
    );
  });

  it("Should generate a group snapshot and retrieve properties from store", async () => {
    await dynamodbGroupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    const group = await dynamodbGroupSnapshotStore.latestByName(
      testGroupSnapshots.groupSnapshot1_0.name
    );
    expect(group.properties).toEqual({
      accountsNumber: 0,
      valueDistribution: { "1": 0 },
    });
  });

  it("Should throw an error if properties are missing from store", async () => {
    expect(
      async () =>
        await dynamodbGroupSnapshotStore.save(
          testGroupSnapshots.groupSnapshot4_0
        )
    ).rejects.toThrowError("Group properties should not be undefined");
  });

  it("Should throw an error if account types are missing from store", async () => {
    expect(
      async () =>
        await dynamodbGroupSnapshotStore.save(
          testGroupSnapshots.groupSnapshot6_0
        )
    ).rejects.toThrowError("Account types should not be undefined");
  });

  it("Should throw an error if group-generator is missing from store", async () => {
    expect(
      async () =>
        await dynamodbGroupSnapshotStore.save(
          testGroupSnapshots.groupSnapshot5_0
        )
    ).rejects.toThrowError("Group generator should not be undefined");
  });
});
