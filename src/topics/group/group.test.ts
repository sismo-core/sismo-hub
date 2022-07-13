import { GenerationContext, createContext } from "../generation-context";
import { FetchedData, Group, Tags, ValueType } from "../group";
import resetTestInfrastructure from "../../infrastructure/test-infrastructure";

describe("test groups", () => {
  let generationContext: GenerationContext;
  let exampleData: FetchedData;
  let group1: Group;
  let group2: Group;
  let group3: Group;
  let group4: Group;

  beforeEach(async () => {
    await resetTestInfrastructure();
  });

  beforeAll(async () => {
    generationContext = await createContext({ blockNumber: 123456789 });
    exampleData = {
      "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
      "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
    };
    group1 = new Group({
      name: "test-group1",
      generationDate: new Date(generationContext.timestamp),
      data: exampleData,
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
    group2 = new Group({
      name: "test-group1",
      generationDate: new Date(generationContext.timestamp + 60 * 1000),
      data: exampleData,
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
    group3 = new Group({
      name: "test-group2",
      generationDate: new Date(generationContext.timestamp + 120 * 1000),
      data: exampleData,
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
    group4 = new Group({
      name: "test-group2",
      generationDate: new Date(generationContext.timestamp + 180 * 1000),
      data: exampleData,
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
  });

  test("Should generate a group and retrieve from store", async () => {
    const group = new Group({
      name: "test-group",
      generationDate: new Date(generationContext.timestamp),
      data: exampleData,
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
    await group.save();
    const groups = await Group.store.all();
    expect(groups).toHaveLength(1);
    expect(groups[0]).toBe(group);
  });

  test("Should generate multiple groups and retrieve them from store", async () => {
    await group1.save();
    await group2.save();
    const groups = await Group.store.all();
    expect(groups).toHaveLength(2);
    expect(groups).toContain(group1);
    expect(groups).toContain(group2);
  });

  test("Should generate multiple groups and retrieve latest", async () => {
    await group1.save();
    await group2.save();
    const latest = await Group.store.latest(group1.name);
    expect(latest).toBe(group2);
  });

  test("Should generate multiple groups and search", async () => {
    await group1.save();
    await group2.save();
    await group3.save();
    await group4.save();

    const groups1 = await Group.store.search({ groupName: group1.name });
    expect(groups1).toHaveLength(2);
    expect(groups1).toContain(group1);
    expect(groups1).toContain(group2);

    const groups2 = await Group.store.search({ groupName: group3.name });
    expect(groups2).toHaveLength(2);
    expect(groups2).toContain(group3);
    expect(groups2).toContain(group4);

    const latest1 = await Group.store.search({
      groupName: group1.name,
      latest: true,
    });
    expect(latest1[0]).toBe(group2);

    const latest2 = await Group.store.search({
      groupName: group3.name,
      latest: true,
    });
    expect(latest2[0]).toBe(group4);
  });
});
