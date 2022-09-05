import { GroupGeneratorService } from "./group-generator";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
  GroupGeneratorsLibrary,
} from "./group-generator.types";
import { groupGenerators, testGroup } from "./test-group-generator";
import { MemoryGroupStore } from "infrastructure/group-store";
import { GroupStore, GroupWithData, Tags, ValueType } from "topics/group";

export const testGroupWithUpperCase: GroupWithData = {
  name: "test-group",
  timestamp: 1,
  data: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
  },
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const testGroupGeneratorWithUpperCase: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [testGroupWithUpperCase],
};

export const groupGeneratorsWithUpperCase: GroupGeneratorsLibrary = {
  "test-generator-with-upper-case": testGroupGeneratorWithUpperCase,
};

describe("test group generator", () => {
  const groupStore = new MemoryGroupStore();
  const service = new GroupGeneratorService({ groupGenerators, groupStore });

  beforeEach(async () => {
    await groupStore.reset();
  });

  it("should generate context with fix block number and timestamp should be in second", async () => {
    const context = await service.createContext({ blockNumber: 2 });
    expect(context.timestamp).toBeLessThan(10000000000000); // < year 2286
    expect(context.blockNumber).toEqual(2);
  });

  it("should generate context with fixed timestamp and block number", async () => {
    const context = await service.createContext({
      timestamp: 1,
      blockNumber: 2,
    });
    expect(context.timestamp).toEqual(1);
    expect(context.blockNumber).toEqual(2);
  });

  it("Should generate a context with current block number", async () => {
    const context = await service.createContext({});
    expect(context.blockNumber).toBeGreaterThan(15211120);
  });

  test("Should generate a group with the generator", async () => {
    await service.generateGroups("test-generator", {
      blockNumber: 123456789,
      timestamp: 1,
    });
    const groups = await groupStore.all();
    expect(groups).toHaveLength(1);
    expect(groups[0]).toBeSameGroup(testGroup);
  });

  test("Should generate a group with only lower case addresses", async () => {
    const groupStore = new MemoryGroupStore();
    const service = new GroupGeneratorService({
      groupGenerators: groupGeneratorsWithUpperCase,
      groupStore,
    });
    await service.generateGroups("test-generator-with-upper-case", {
      blockNumber: 123456789,
      timestamp: 1,
    });
    const groups = await groupStore.all();
    expect(groups).toHaveLength(1);
    expect(Object.keys(await groups[0].data())).toEqual([
      "0x411c16b4688093c81db91e192aeb5945dca6b785",
      "0xfd247ff5380d7da60e9018d1d29d529664839af2",
    ]);
  });

  it("should throw error if generator name does not exist", async () => {
    await expect(async () => {
      await service.generateGroups("not-exists", {
        blockNumber: 123456789,
        timestamp: 1,
      });
    }).rejects.toThrow();
  });

  test("Should generate a group with additional data", async () => {
    await service.generateGroups("test-generator", {
      blockNumber: 123456789,
      timestamp: 1,
      additionalData: { "0x30": 1, "0x31": 2 },
    });
    const groups = await groupStore.all();
    const data = await groups[0].data();
    expect(data["0x30"]).toBe(1);
    expect(data["0x31"]).toBe(2);
  });

  test("Should correctly parse additional data", async () => {
    expect(GroupGeneratorService.parseAdditionalData("")).toEqual({});
    expect(
      GroupGeneratorService.parseAdditionalData(
        "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01"
      )
    ).toEqual({
      "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01": 1,
    });
    expect(
      GroupGeneratorService.parseAdditionalData(
        "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01,"
      )
    ).toEqual({
      "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01": 1,
    });
    expect(
      GroupGeneratorService.parseAdditionalData(
        "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01,0xa1b073d5503a27DFBA337cFdb8458b71B3359c02"
      )
    ).toEqual({
      "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01": 1,
      "0xa1b073d5503a27DFBA337cFdb8458b71B3359c02": 1,
    });
    expect(
      GroupGeneratorService.parseAdditionalData(
        "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01,0xa1b073d5503a27DFBA337cFdb8458b71B3359c02=2"
      )
    ).toEqual({
      "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01": 1,
      "0xa1b073d5503a27DFBA337cFdb8458b71B3359c02": 2,
    });
    expect(() => GroupGeneratorService.parseAdditionalData("0x25=a")).toThrow();
    expect(() => GroupGeneratorService.parseAdditionalData("0x25")).toThrow();
    expect(() =>
      GroupGeneratorService.parseAdditionalData(
        "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01=a"
      )
    ).toThrow();
    expect(() =>
      GroupGeneratorService.parseAdditionalData(
        "0xa1b073d5503a27DFBA337cFdb8458...B3359c01=1"
      )
    ).toThrow();
  });
});
