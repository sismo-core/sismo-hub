import { Group } from "../group";
import testGroups, { exampleData } from "./test-groups";
import resetTestInfrastructure from "../../infrastructure/test-infrastructure";

describe("test groups", () => {
  beforeEach(async () => {
    await resetTestInfrastructure();
  });

  test("Should generate a group and retrieve from store", async () => {
    await testGroups.group1_0.save();
    const groups = await Group.store.all();
    expect(groups).toHaveLength(1);
    expect(groups[0].toJson()).toEqual(testGroups.group1_0.toJson());
  });

  test("Should generate multiple groups and retrieve them from store", async () => {
    await testGroups.group1_0.save();
    await testGroups.group1_1.save();
    const groups = (await Group.store.all()).map((group) => group.toJson());
    expect(groups).toHaveLength(2);
    expect(groups).toContainEqual(testGroups.group1_0.toJson());
    expect(groups).toContainEqual(testGroups.group1_1.toJson());
  });

  test("Should generate multiple groups and retrieve latest", async () => {
    await testGroups.group1_1.save();
    await testGroups.group1_0.save();
    const latest = await Group.store.latest(testGroups.group1_0.name);
    expect(latest.toJson()).toEqual(testGroups.group1_1.toJson());
  });

  test("Should generate multiple groups and search", async () => {
    await testGroups.group1_0.save();
    await testGroups.group1_1.save();
    await testGroups.group2_0.save();

    const groups1 = (
      await Group.store.search({ groupName: testGroups.group1_0.name })
    ).map((group) => group.toJson());
    expect(groups1).toHaveLength(2);
    expect(groups1).toContainEqual(testGroups.group1_0.toJson());
    expect(groups1).toContainEqual(testGroups.group1_1.toJson());

    const groups2 = (
      await Group.store.search({ groupName: testGroups.group2_0.name })
    ).map((group) => group.toJson());
    expect(groups2).toHaveLength(1);
    expect(groups2).toContainEqual(testGroups.group2_0.toJson());

    const latest1 = await Group.store.search({
      groupName: testGroups.group1_0.name,
      latest: true,
    });
    expect(latest1[0].toJson()).toEqual(testGroups.group1_1.toJson());

    const latest2 = await Group.store.search({
      groupName: testGroups.group2_0.name,
      latest: true,
    });
    expect(latest2[0].toJson()).toEqual(testGroups.group2_0.toJson());
  });

  test("Should generate multiple groups and get latests", async () => {
    await testGroups.group1_0.save();
    await testGroups.group1_1.save();
    await testGroups.group2_0.save();

    const latests = await Group.store.latests();
    expect(Object.keys(latests)).toHaveLength(2);
    expect(latests[testGroups.group1_0.name].toJson()).toEqual(
      testGroups.group1_1.toJson()
    );
    expect(latests[testGroups.group2_0.name].toJson()).toEqual(
      testGroups.group2_0.toJson()
    );
  });

  test("Should throw error when retrieving latest from empty store", async () => {
    await expect(async () => {
      await Group.store.latest(testGroups.group1_0.name);
    }).rejects.toThrow();
  });

  test("Should generate a group and retrieve data locally", async () => {
    expect(await testGroups.group1_0.data()).toEqual(exampleData);
  });

  test("Should generate a group and retrieve data from store", async () => {
    await testGroups.group1_0.save();
    const group = await Group.store.latest(testGroups.group1_0.name);
    expect(await group.data()).toEqual(exampleData);
  });
});
