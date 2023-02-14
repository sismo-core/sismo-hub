import { LocalFileStore } from "infrastructure/file-store";
import { DynamoDBGroupStore } from "infrastructure/group-store/dynamodb-group-store";
import { createGroupsV2EntityManager } from "infrastructure/group-store/groups-v2.entity";
import { resetDB, getLocalDocumentClient } from "infrastructure/utils";
import {
  exampleData,
  exampleResolvedIdentifierData,
  testGroups,
} from "topics/group/test-groups";

const testPath = `${__dirname}/../../../test-disk-store/unit`;
const dynamodbClient = getLocalDocumentClient();

describe("test groups stores", () => {
  const dynamodbGroupStore = new DynamoDBGroupStore(
    new LocalFileStore("groups-data", testPath),
    createGroupsV2EntityManager({
      documentClient: dynamodbClient,
    })
  );

  beforeEach(async () => {
    await resetDB(dynamodbClient);
  });

  it("Should save multiple groups and search by name", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    await dynamodbGroupStore.save(testGroups.group1_1);
    await dynamodbGroupStore.save(testGroups.group2_0);
    const groups = await dynamodbGroupStore.search({
      groupName: testGroups.group1_0.name,
    });
    expect(groups).toHaveLength(2);
    expect(groups).toContainGroup(testGroups.group1_0);
    expect(groups).toContainGroup(testGroups.group1_1);
  });

  it("Should save multiple groups and search by timestamp", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    await dynamodbGroupStore.save(testGroups.group1_1);
    await dynamodbGroupStore.save(testGroups.group2_0);

    const groups = await dynamodbGroupStore.search({
      groupName: testGroups.group1_0.name,
      timestamp: testGroups.group1_1.timestamp,
    });

    expect(groups).toHaveLength(1);
    expect(groups[0]).toBeSameGroup(testGroups.group1_1);
  });

  it("Should generate multiple groups and search by name and latest", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    await dynamodbGroupStore.save(testGroups.group1_1);
    await dynamodbGroupStore.save(testGroups.group2_0);

    const latest1 = await dynamodbGroupStore.search({
      groupName: testGroups.group1_0.name,
      latest: true,
    });
    expect(latest1[0]).toBeSameGroup(testGroups.group1_1);

    const latest2 = await dynamodbGroupStore.search({
      groupName: testGroups.group2_0.name,
      latest: true,
    });
    expect(latest2[0]).toBeSameGroup(testGroups.group2_0);
  });

  it("Should throw an error if latest and timestamp are both used", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    await dynamodbGroupStore.save(testGroups.group1_1);
    await dynamodbGroupStore.save(testGroups.group2_0);

    expect(async () => {
      await dynamodbGroupStore.search({
        groupName: testGroups.group1_0.name,
        latest: true,
        timestamp: testGroups.group1_0.timestamp,
      });
    }).rejects.toThrowError(
      "You should not reference timestamp and latest at the same time"
    );
  });

  it("Should generate multiple groups and get latests", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    await dynamodbGroupStore.save(testGroups.group1_1);
    await dynamodbGroupStore.save(testGroups.group2_0);

    const latests = await dynamodbGroupStore.latests();
    expect(Object.keys(latests)).toHaveLength(2);
    expect(latests[testGroups.group1_0.name]).toBeSameGroup(
      testGroups.group1_1
    );
    expect(latests[testGroups.group2_0.name]).toBeSameGroup(
      testGroups.group2_0
    );
    expect(await latests[testGroups.group1_0.name].data()).toEqual(exampleData);
    expect(
      await latests[testGroups.group1_0.name].resolvedIdentifierData()
    ).toEqual(exampleResolvedIdentifierData);
  });

  it("Should throw error when retrieving latest from empty store", async () => {
    await expect(async () => {
      await dynamodbGroupStore.latest(testGroups.group1_0.name);
    }).rejects.toThrow();
  });

  it("Should generate a group and retrieve data from store", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    const group = await dynamodbGroupStore.latest(testGroups.group1_0.name);
    expect(await group.data()).toEqual(exampleData);
  });

  it("Should generate a group and retrieve properties from store", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    const group = await dynamodbGroupStore.latest(testGroups.group1_0.name);
    expect(group.properties).toEqual({
      accountsNumber: 0,
      valueDistribution: { "1": 0 },
    });
  });

  it("Should throw an error if properties are missing from store", async () => {
    expect(
      async () => await dynamodbGroupStore.save(testGroups.group4_0)
    ).rejects.toThrowError("Group properties should not be undefined");
  });

  it("Should throw an error if account types are missing from store", async () => {
    expect(
      async () => await dynamodbGroupStore.save(testGroups.group6_0)
    ).rejects.toThrowError("Account types should not be undefined");
  });

  it("Should throw an error if group-generator is missing from store", async () => {
    expect(
      async () => await dynamodbGroupStore.save(testGroups.group5_0)
    ).rejects.toThrowError("Group generator should not be undefined");
  });

  it("Should generate a group and retrieve resolvedIdentifierData from store", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    const group = await dynamodbGroupStore.latest(testGroups.group1_0.name);
    expect(await group.resolvedIdentifierData()).toEqual(
      exampleResolvedIdentifierData
    );
  });
});
