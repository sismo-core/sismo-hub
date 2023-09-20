import { BigNumber } from "ethers/lib/ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { LocalFileStore } from "infrastructure/file-store";
import { DynamoDBGroupStore } from "infrastructure/group-store/dynamodb-group-store";
import { createGroupsV2EntityManager } from "infrastructure/group-store/groups-v2.entity";
import { resetDB, getLocalDocumentClient } from "infrastructure/utils";
import { AccountSource } from "topics/group";
import { exampleData, exampleResolvedIdentifierData, testGroups } from "topics/group/test-groups";

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

  it("should store group with correct ids", async () => {
    const savedGroup = await dynamodbGroupStore.save(testGroups.group1_0);
    const UINT128_MAX = BigNumber.from(2).pow(128).sub(1);
    const nameHash = keccak256(toUtf8Bytes(savedGroup.name));
    const savedId = BigNumber.from(nameHash).mod(UINT128_MAX).toHexString();
    expect(savedGroup.id).toBe(savedId);
    await dynamodbGroupStore.update({
      ...savedGroup,
      name: "other-name",
      data: await savedGroup.data(),
      resolvedIdentifierData: await savedGroup.resolvedIdentifierData(),
    });

    const savedGroup2 = await dynamodbGroupStore.save(testGroups.group1_0);
    const nameHash2 = keccak256(toUtf8Bytes(savedGroup2.name + "/" + "1"));
    const savedId2 = BigNumber.from(nameHash2).mod(UINT128_MAX).toHexString();
    expect(savedGroup2.id).toBe(savedId2);
    await dynamodbGroupStore.update({
      ...savedGroup2,
      name: "other-name-2",
      data: await savedGroup2.data(),
      resolvedIdentifierData: await savedGroup2.resolvedIdentifierData(),
    });

    const savedGroup3 = await dynamodbGroupStore.save(testGroups.group1_0);
    const nameHash3 = keccak256(toUtf8Bytes(savedGroup3.name + "/" + "2"));
    const savedId3 = BigNumber.from(nameHash3).mod(UINT128_MAX).toHexString();
    expect(savedGroup3.id).toBe(savedId3);

    const savedGroup4 = await dynamodbGroupStore.save(testGroups.group1_2);
    const nameHash4 = keccak256(toUtf8Bytes(savedGroup4.name + "/" + "3"));
    const savedId4 = BigNumber.from(nameHash4).mod(UINT128_MAX).toHexString();
    expect(savedGroup4.id).toBe(savedId4);
    const updatedGroup4 = await dynamodbGroupStore.update({
      ...savedGroup4,
      name: "other-name-4",
      displayName: "Other Name 4",
      data: await savedGroup4.data(),
      resolvedIdentifierData: await savedGroup4.resolvedIdentifierData(),
    });
    expect(updatedGroup4.name).toBe("other-name-4");
    expect(updatedGroup4.displayName).toBe("Other Name 4");
  });

  it("should delete group", async () => {
    const savedGroup = await dynamodbGroupStore.save(testGroups.group1_0);
    const groups = await dynamodbGroupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    await dynamodbGroupStore.delete(savedGroup);
    const groupsAfterDelete = await dynamodbGroupStore.all();
    expect(Object.keys(groupsAfterDelete)).toHaveLength(0);
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

  it("Should generate multiple groups and search by id", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    const secondGroup = await dynamodbGroupStore.save(testGroups.group1_1);
    await dynamodbGroupStore.save(testGroups.group2_0);

    const groups = await dynamodbGroupStore.search({
      groupId: secondGroup.id,
    });

    expect(groups).toHaveLength(1);
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
    }).rejects.toThrowError("You should not reference timestamp and latest at the same time");
  });

  it("Should generate multiple groups and get latests", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    await dynamodbGroupStore.save(testGroups.group1_1);
    await dynamodbGroupStore.save(testGroups.group2_0);

    const latests = await dynamodbGroupStore.all();
    expect(Object.keys(latests)).toHaveLength(2);
    expect(latests[testGroups.group1_0.name]).toBeSameGroup(testGroups.group1_1);
    expect(latests[testGroups.group2_0.name]).toBeSameGroup(testGroups.group2_0);
    expect(await latests[testGroups.group1_0.name].data()).toEqual(exampleData);
    expect(await latests[testGroups.group1_0.name].resolvedIdentifierData()).toEqual(
      exampleResolvedIdentifierData
    );
  });

  it("Should generate a group and retrieve data from store", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    const group = await dynamodbGroupStore.all();
    expect(await group[testGroups.group1_0.name].data()).toEqual(exampleData);
  });

  it("Should update a group without changing the id", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    const groups = await dynamodbGroupStore.all();
    const group = groups[testGroups.group1_0.name];

    await dynamodbGroupStore.update({
      ...group,
      data: await group.data(),
      resolvedIdentifierData: await group.resolvedIdentifierData(),
      accountSources: [AccountSource.TEST],
    });

    const updatedGroups = await dynamodbGroupStore.all();
    const updatedGroup = updatedGroups[testGroups.group1_0.name];
    expect(updatedGroup.id).toEqual(group.id);
    expect(updatedGroup.accountSources).toEqual([AccountSource.TEST]);
  });

  it("Should throw an error if account types are missing from store", async () => {
    expect(async () => await dynamodbGroupStore.save(testGroups.group6_0)).rejects.toThrowError(
      "Account types should not be undefined"
    );
  });

  it("Should throw an error if group-generator is missing from store", async () => {
    expect(async () => await dynamodbGroupStore.save(testGroups.group5_0)).rejects.toThrowError(
      "Group generator should not be undefined"
    );
  });

  it("Should get a group with its public contacts", async () => {
    await dynamodbGroupStore.save({
      ...testGroups.group1_0,
      publicContacts: [{ type: "twitter", contact: "@Sismo_eth" }],
    });
    const groups = await dynamodbGroupStore.all();
    const group = groups[testGroups.group1_0.name];
    expect(group.publicContacts).toEqual([{ type: "twitter", contact: "@Sismo_eth" }]);
  });

  it("Should generate a group and retrieve resolvedIdentifierData from store", async () => {
    await dynamodbGroupStore.save(testGroups.group1_0);
    const group = await dynamodbGroupStore.all();
    expect(await group[testGroups.group1_0.name].resolvedIdentifierData()).toEqual(
      exampleResolvedIdentifierData
    );
  });
});
