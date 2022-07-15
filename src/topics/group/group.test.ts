import { GenerationContext, createContext } from "../generation-context";
import { FetchedData, Group, Tags, ValueType } from "../group";
import resetTestInfrastructure from "../../infrastructure/test-infrastructure";

describe("test groups", () => {
  let generationContext: GenerationContext;
  let exampleData: FetchedData;
  let group1_0: Group;
  let group1_1: Group;
  let group2_0: Group;

  beforeEach(async () => {
    await resetTestInfrastructure();
  });

  beforeAll(async () => {
    generationContext = await createContext({ blockNumber: 123456789 });
    exampleData = {
      "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
      "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
    };
    group1_0 = new Group({
      name: "test-group1",
      timestamp: generationContext.timestamp,
      data: exampleData,
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
    group1_1 = new Group({
      name: "test-group1",
      timestamp: generationContext.timestamp + 60,
      data: exampleData,
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
    group2_0 = new Group({
      name: "test-group2",
      timestamp: generationContext.timestamp + 120,
      data: exampleData,
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
  });

  test("Should generate a group and retrieve from store", async () => {
    await group1_0.save();
    const groups = await Group.store.all();
    expect(groups).toHaveLength(1);
    expect(groups[0].toJson()).toEqual(group1_0.toJson());
  });

  test("Should generate multiple groups and retrieve them from store", async () => {
    await group1_0.save();
    await group1_1.save();
    const groups = (await Group.store.all()).map((group) => group.toJson());
    expect(groups).toHaveLength(2);
    expect(groups).toContainEqual(group1_0.toJson());
    expect(groups).toContainEqual(group1_1.toJson());
  });

  test("Should generate multiple groups and retrieve latest", async () => {
    await group1_1.save();
    await group1_0.save();
    const latest = await Group.store.latest(group1_0.name);
    expect(latest.toJson()).toEqual(group1_1.toJson());
  });

  test("Should generate multiple groups and search", async () => {
    await group1_0.save();
    await group1_1.save();
    await group2_0.save();

    const groups1 = (
      await Group.store.search({ groupName: group1_0.name })
    ).map((group) => group.toJson());
    expect(groups1).toHaveLength(2);
    expect(groups1).toContainEqual(group1_0.toJson());
    expect(groups1).toContainEqual(group1_1.toJson());

    const groups2 = (
      await Group.store.search({ groupName: group2_0.name })
    ).map((group) => group.toJson());
    expect(groups2).toHaveLength(1);
    expect(groups2).toContainEqual(group2_0.toJson());

    const latest1 = await Group.store.search({
      groupName: group1_0.name,
      latest: true,
    });
    expect(latest1[0].toJson()).toEqual(group1_1.toJson());

    const latest2 = await Group.store.search({
      groupName: group2_0.name,
      latest: true,
    });
    expect(latest2[0].toJson()).toEqual(group2_0.toJson());
  });

  test("Should throw error when retrieving latest from empty store", async () => {
    await expect(async () => {
      await Group.store.latest(group1_0.name);
    }).rejects.toThrow();
  });

  test("Should return empty list when search latest from empty store", async () => {
    expect(await Group.store.search({ latest: true })).toHaveLength(0);
  });

  test("Should generate a group and retrieve data locally", async () => {
    expect(await group1_0.data()).toEqual(exampleData);
  });

  test("Should generate a group and retrieve data from store", async () => {
    await group1_0.save();
    const group = await Group.store.latest(group1_0.name);
    expect(await group.data()).toEqual(exampleData);
  });
});
