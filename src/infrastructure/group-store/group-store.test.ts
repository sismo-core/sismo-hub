import { BigNumber } from "ethers/lib/ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { LocalGroupStore, MemoryGroupStore } from ".";
import { AccountSource, GroupStore } from "topics/group";
import { testGroups, exampleData, exampleResolvedIdentifierData } from "topics/group/test-groups";

describe("test groups stores", () => {
  const localGroupStore = new LocalGroupStore(`${__dirname}/../../../test-disk-store/unit`);

  const memoryGroupStore = new MemoryGroupStore();
  const testCases: [GroupStore[], GroupStore[]] = [[localGroupStore], [memoryGroupStore]];

  beforeEach(() => {
    localGroupStore.reset();
    memoryGroupStore.reset();
  });

  it.each(testCases)("Should generate a group and retrieve from store", async (groupStore) => {
    await groupStore.save(testGroups.group1_0);
    const groups = await groupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    expect(Object.values(groups)[0]).toBeSameGroup(testGroups.group1_0);
  });

  it.each(testCases)("should store group with correct ids", async (groupStore) => {
    const savedGroup = await groupStore.save(testGroups.group1_0);
    const UINT128_MAX = BigNumber.from(2).pow(128).sub(1);
    const nameHash = keccak256(toUtf8Bytes(savedGroup.name));
    const savedId = BigNumber.from(nameHash).mod(UINT128_MAX).toHexString();
    expect(savedGroup.id).toBe(savedId);
    await groupStore.update({
      ...savedGroup,
      name: "other-name",
      data: await savedGroup.data(),
      resolvedIdentifierData: await savedGroup.resolvedIdentifierData(),
    });
    await groupStore.delete(savedGroup);

    const savedGroup2 = await groupStore.save(testGroups.group1_0);
    const nameHash2 = keccak256(toUtf8Bytes(savedGroup2.name + "/" + "1"));
    const savedId2 = BigNumber.from(nameHash2).mod(UINT128_MAX).toHexString();
    expect(savedGroup2.id).toBe(savedId2);
    await groupStore.update({
      ...savedGroup2,
      name: "other-name-2",
      data: await savedGroup2.data(),
      resolvedIdentifierData: await savedGroup2.resolvedIdentifierData(),
    });
    await groupStore.delete(savedGroup);

    const savedGroup3 = await groupStore.save(testGroups.group1_0);
    const nameHash3 = keccak256(toUtf8Bytes(savedGroup3.name + "/" + "2"));
    const savedId3 = BigNumber.from(nameHash3).mod(UINT128_MAX).toHexString();
    expect(savedGroup3.id).toBe(savedId3);

    const savedGroup4 = await groupStore.save(testGroups.group1_2);
    const nameHash4 = keccak256(toUtf8Bytes(savedGroup4.name + "/" + "3"));
    const savedId4 = BigNumber.from(nameHash4).mod(UINT128_MAX).toHexString();
    expect(savedGroup4.id).toBe(savedId4);
    const updatedGroup4 = await groupStore.update({
      ...savedGroup4,
      name: "other-name-4",
      displayName: "Other Name 4",
      data: await savedGroup4.data(),
      resolvedIdentifierData: await savedGroup4.resolvedIdentifierData(),
    });
    expect(updatedGroup4.name).toBe("other-name-4");
    expect(updatedGroup4.displayName).toBe("Other Name 4");
  });

  it.each(testCases)("should delete group", async (groupStore) => {
    const savedGroup = await groupStore.save(testGroups.group1_0);
    const groups = await groupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    await groupStore.delete(savedGroup);
    const groupsAfterDelete = await groupStore.all();
    expect(Object.keys(groupsAfterDelete)).toHaveLength(0);
  });

  it.each(testCases)("Should generate multiple groups and search by name", async (groupStore) => {
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    await groupStore.save(testGroups.group2_0);

    const groups = await groupStore.search({
      groupName: testGroups.group1_0.name,
    });

    expect(groups).toHaveLength(1);
    expect(groups).toContainGroup(testGroups.group1_1);
  });

  it.each(testCases)("Should generate multiple groups and search by id", async (groupStore) => {
    await groupStore.save(testGroups.group1_0);
    const secondGroup = await groupStore.save(testGroups.group1_1);
    await groupStore.save(testGroups.group2_0);

    const groups = await groupStore.search({
      groupId: secondGroup.id,
    });

    expect(groups).toHaveLength(1);
    expect(groups).toContainGroup(testGroups.group1_1);
  });

  it.each(testCases)(
    "Should generate multiple groups and search by name and latest",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      await groupStore.save(testGroups.group1_1);
      await groupStore.save(testGroups.group2_0);

      const latest1 = await groupStore.search({
        groupName: testGroups.group1_0.name,
        latest: true,
      });
      expect(latest1[0]).toBeSameGroup(testGroups.group1_1);

      const latest2 = await groupStore.search({
        groupName: testGroups.group2_0.name,
        latest: true,
      });
      expect(latest2[0]).toBeSameGroup(testGroups.group2_0);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and search by id and latest",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      await groupStore.save(testGroups.group1_1);
      await groupStore.save(testGroups.group2_0);

      const latest1 = await groupStore.search({
        groupName: testGroups.group1_0.name,
        latest: true,
      });
      expect(latest1[0]).toBeSameGroup(testGroups.group1_1);

      const latest2 = await groupStore.search({
        groupName: testGroups.group2_0.name,
        latest: true,
      });
      expect(latest2[0]).toBeSameGroup(testGroups.group2_0);
    }
  );

  it.each(testCases)(
    "Should generate multiple groups and search by name and timestamp",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      await groupStore.save(testGroups.group1_1);
      await groupStore.save(testGroups.group2_0);

      const latest1 = await groupStore.search({
        groupName: testGroups.group1_0.name,
        timestamp: testGroups.group1_1.timestamp,
      });
      expect(latest1[0]).toBeSameGroup(testGroups.group1_1);
    }
  );

  it.each(testCases)(
    "Should throw an error if latest and timestamp are both used",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      await groupStore.save(testGroups.group1_1);
      await groupStore.save(testGroups.group2_0);

      expect(async () => {
        await groupStore.search({
          groupName: testGroups.group1_0.name,
          latest: true,
          timestamp: testGroups.group1_0.timestamp,
        });
      }).rejects.toThrowError("You should not reference timestamp and latest at the same time");
    }
  );

  it.each(testCases)("Should generate multiple groups and get latests", async (groupStore) => {
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    await groupStore.save(testGroups.group2_0);

    const latests = await groupStore.all();
    expect(Object.keys(latests)).toHaveLength(2);
    expect(latests[testGroups.group1_0.name]).toBeSameGroup(testGroups.group1_1);
    expect(latests[testGroups.group2_0.name]).toBeSameGroup(testGroups.group2_0);
  });

  it.each(testCases)("Should generate a group and retrieve data from store", async (groupStore) => {
    await groupStore.save(testGroups.group1_0);
    const group = await groupStore.all();
    expect(await group[testGroups.group1_0.name].data()).toEqual(exampleData);
  });

  it.each(testCases)(
    "Should throw when trying to retrieve latest with empty store",
    async (groupStore) => {
      expect(async () => {
        await groupStore.latest("test");
      }).rejects.toThrowError('"test" group not yet generated');
    }
  );

  it.each(testCases)("Should update a group without changing the id", async (groupStore) => {
    await groupStore.save(testGroups.group1_0);
    const groups = await groupStore.all();
    const group = groups[testGroups.group1_0.name];

    await groupStore.update({
      ...group,
      data: await group.data(),
      resolvedIdentifierData: await group.resolvedIdentifierData(),
      accountSources: [AccountSource.TEST],
    });

    if (groupStore instanceof LocalGroupStore) {
      expect(
        (await groupStore.localFileStore.read(`${group.name}/${group.timestamp}.json`)).data
      ).toBeUndefined();
    }

    const updatedGroups = await groupStore.all();
    const updatedGroup = updatedGroups[testGroups.group1_0.name];
    expect(updatedGroup.id).toEqual(group.id);
    expect(updatedGroup.accountSources).not.toEqual(group.accountSources);
  });

  it.each(testCases)(
    "Should generate a group and retrieve resolvedIdentifierData from store",
    async (groupStore) => {
      await groupStore.save(testGroups.group1_0);
      const group = await groupStore.all();
      expect(await group[testGroups.group1_0.name].resolvedIdentifierData()).toEqual(
        exampleResolvedIdentifierData
      );
    }
  );

  it.each(testCases)("Should get not empty dataUrl from group", async (groupStore) => {
    await groupStore.save(testGroups.group1_0);
    expect(groupStore.dataUrl(testGroups.group1_0)).toBeTruthy();
  });
});
