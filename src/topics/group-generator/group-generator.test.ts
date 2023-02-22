import { GroupGeneratorService } from "./group-generator";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
  GroupGeneratorsLibrary,
} from "./group-generator.types";
import {
  dependentGroup,
  dependentGroupTwo,
  groupGenerators,
  testGroup,
} from "./test-group-generator";
import { MemoryGroupGeneratorStore } from "infrastructure/group-generator-store";
import { MemoryGroupSnapshotStore } from "infrastructure/group-snapshot/group-snapshot-memory";
import { MemoryGroupStore } from "infrastructure/group-store";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import {
  AccountSource,
  GroupStore,
  GroupWithData,
  Tags,
  ValueType,
} from "topics/group";
import { GlobalResolver } from "topics/resolver/global-resolver";
import { testGlobalResolver } from "topics/resolver/test-resolvers";

export const testGroupWithUpperCase: GroupWithData = {
  name: "test-group",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
    "test:sismo": 15,
  },
  accountSources: [AccountSource.ETHEREUM, AccountSource.TEST],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const testGroupWithWrongData: GroupWithData = {
  name: "test-group-with-wrong-data",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
    "test:sismo": 15,
    "fake:sismo": 9,
    "test:incorrect": 3,
  },
  accountSources: [AccountSource.ETHEREUM, AccountSource.TEST],
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

export const testGroupGeneratorWithWrongData: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [testGroupWithWrongData],
};

export const testGroupGeneratorWithWrongDescription: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [
    { ...testGroupWithUpperCase, description: "" },
  ],
};

export const testGroupGenerators: GroupGeneratorsLibrary = {
  "test-generator-with-upper-case": testGroupGeneratorWithUpperCase,
  "test-generator-with-wrong-data": testGroupGeneratorWithWrongData,
  "test-generator-with-wrong-description":
    testGroupGeneratorWithWrongDescription,
};

describe("test group generator", () => {
  const groupStore = new MemoryGroupStore();
  const groupSnapshotStore = new MemoryGroupSnapshotStore();
  const groupGeneratorStore = new MemoryGroupGeneratorStore();
  const logger = new MemoryLogger();
  const service = new GroupGeneratorService({
    groupGenerators,
    groupStore,
    groupSnapshotStore,
    groupGeneratorStore,
    globalResolver: testGlobalResolver,
    logger,
  });

  beforeEach(async () => {
    await groupStore.reset();
    await groupGeneratorStore.reset();
  });

  it("Should throw an error if the global resolver is initialized with an unmap regex", () => {
    expect(() => {
      new GlobalResolver(["^test:", "^0x[a-fA-F0-9]{40}$", "^fakeRegex:"]);
    }).toThrow();
  });

  it("should generate context with timestamp in second", async () => {
    const context = await service.createContext({});
    expect(context.timestamp).toBeLessThan(10000000000000); // < year 2286
  });

  it("should generate context with fixed timestamp", async () => {
    const context = await service.createContext({
      timestamp: 1,
    });
    expect(context.timestamp).toEqual(1);
  });

  test("Should generate a group with the generator", async () => {
    await service.generateGroups("test-generator", {
      timestamp: 1,
    });
    const groups = await groupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    expect(groups[testGroup.name]).toBeSameGroup(testGroup);
    const generatorGroups = await groupGeneratorStore.search({
      generatorName: "test-generator",
    });
    expect(generatorGroups).toHaveLength(1);
    expect(generatorGroups[0].timestamp).toEqual(1);
    expect(generatorGroups[0].name).toEqual("test-generator");
  });

  test("Should generate a group with only lower case addresses", async () => {
    const groupStore = new MemoryGroupStore();
    const groupGeneratorStore = new MemoryGroupGeneratorStore();
    const service = new GroupGeneratorService({
      groupGenerators: testGroupGenerators,
      groupGeneratorStore,
      groupSnapshotStore,
      groupStore,
      globalResolver: testGlobalResolver,
      logger,
    });
    await service.generateGroups("test-generator-with-upper-case", {
      timestamp: 1,
    });
    const groups = await groupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    expect(
      Object.keys(
        await groups[testGroupWithUpperCase.name].resolvedIdentifierData()
      )
    ).toEqual([
      "0x411c16b4688093c81db91e192aeb5945dca6b785",
      "0xfd247ff5380d7da60e9018d1d29d529664839af2",
      "0x5151000000000000000000000000000000000001",
    ]);
  });

  it("Should throw an error if no regex matches", async () => {
    const groupStore = new MemoryGroupStore();
    const groupSnapshotStore = new MemoryGroupSnapshotStore();
    const groupGeneratorStore = new MemoryGroupGeneratorStore();
    const service = new GroupGeneratorService({
      groupGenerators: testGroupGenerators,
      groupGeneratorStore,
      groupSnapshotStore,
      groupStore,
      globalResolver: testGlobalResolver,
      logger,
    });
    await expect(async () => {
      await service.generateGroups("test-generator-with-wrong-data", {
        timestamp: 1,
      });
    }).rejects.toThrow();
  });

  it("Should create a valid group if the resolving errors are ignored", async () => {
    const testGlobalResolver = new GlobalResolver(
      ["^test:", "^0x[a-fA-F0-9]{40}$"],
      "true"
    );
    const groupStore = new MemoryGroupStore();
    const groupGeneratorStore = new MemoryGroupGeneratorStore();
    const service = new GroupGeneratorService({
      groupGenerators: testGroupGenerators,
      groupGeneratorStore,
      groupStore,
      groupSnapshotStore,
      globalResolver: testGlobalResolver,
      logger,
    });
    await service.generateGroups("test-generator-with-wrong-data", {
      timestamp: 1,
    });
    const groups = await groupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    expect(
      Object.keys(await groups[testGroupWithWrongData.name].data())
    ).toEqual([
      "0x411c16b4688093c81db91e192aeb5945dca6b785",
      "0xfd247ff5380d7da60e9018d1d29d529664839af2",
      "test:sismo",
    ]);
    expect(
      Object.keys(
        await groups[testGroupWithWrongData.name].resolvedIdentifierData()
      )
    ).toEqual([
      "0x411c16b4688093c81db91e192aeb5945dca6b785",
      "0xfd247ff5380d7da60e9018d1d29d529664839af2",
      "0x5151000000000000000000000000000000000001",
    ]);
  });

  it("should throw error if generator name does not exist", async () => {
    await expect(async () => {
      await service.generateGroups("not-exists", {
        timestamp: 1,
      });
    }).rejects.toThrow();
  });

  it("should throw error if group description is empty", async () => {
    const testGlobalResolver = new GlobalResolver(
      ["^test:", "^0x[a-fA-F0-9]{40}$"],
      "true"
    );
    const groupStore = new MemoryGroupStore();
    const groupGeneratorStore = new MemoryGroupGeneratorStore();
    const service = new GroupGeneratorService({
      groupGenerators: testGroupGenerators,
      groupGeneratorStore,
      groupStore,
      groupSnapshotStore,
      globalResolver: testGlobalResolver,
      logger,
    });
    await expect(async () => {
      await service.generateGroups("test-generator-with-wrong-description", {
        timestamp: 10,
      });
    }).rejects.toThrow();
  });

  it("should generate all the groups", async () => {
    await service.generateAllGroups({
      timestamp: 1,
    });
    const allGroups = await groupStore.all();
    const groups = Object.values(allGroups);
    expect(groups).toHaveLength(3);
    expect(groups[0]).toBeSameGroup(testGroup);
    expect(groups[1]).toBeSameGroup(dependentGroup);
    expect(groups[2]).toBeSameGroup(dependentGroupTwo);
  });

  it("should generate only once if the first generation only option is enabled", async () => {
    await service.generateGroups("test-generator", {
      timestamp: 1,
      firstGenerationOnly: true,
    });
    await service.generateGroups("test-generator", {
      timestamp: 2,
      firstGenerationOnly: true,
    });
    const groups = await groupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    expect(groups[testGroup.name].name).toEqual("test-group");
    // only the first generate should have been triggered
    expect(groups[testGroup.name].timestamp).toEqual(1);
  });

  it("should generate only the groups with Once frequency", async () => {
    await service.generateAllGroups({
      frequency: "once",
      timestamp: 1,
    });
    const groups = await groupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    expect(Object.values(groups)[0]).toBeSameGroup(testGroup);
  });

  it("should generate only the groups with Once frequency with additional data", async () => {
    await service.generateAllGroups({
      frequency: "once",
      timestamp: 1,
      additionalData: {
        "0x0000000000000000000000000000000000000030": 1,
        "0x0000000000000000000000000000000000000031": 2,
      },
    });
    const groups = await groupStore.all();
    expect(Object.keys(groups)).toHaveLength(1);
    const data = await Object.values(groups)[0].data();
    expect(data["0x0000000000000000000000000000000000000030"]).toBe("1");
    expect(data["0x0000000000000000000000000000000000000031"]).toBe("2");
  });

  it("should generate only two groups with frequency Daily and respect dependencies", async () => {
    await service.generateAllGroups({
      frequency: "daily",
      timestamp: 1,
    });
    const allGroups = await groupStore.all();
    const groups = Object.values(allGroups);
    expect(groups).toHaveLength(2);
    expect(groups[0]).toBeSameGroup(dependentGroup);
    expect(groups[1]).toBeSameGroup(dependentGroupTwo);
  });

  test("Should generate a group with additional data", async () => {
    await service.generateGroups("test-generator", {
      timestamp: 1,
      additionalData: {
        "0x0000000000000000000000000000000000000030": 1,
        "0x0000000000000000000000000000000000000031": 2,
      },
    });
    const groups = await groupStore.all();
    const data = await groups[testGroup.name].data();
    expect(data["0x0000000000000000000000000000000000000030"]).toBe("1");
    expect(data["0x0000000000000000000000000000000000000031"]).toBe("2");
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
    expect(() =>
      GroupGeneratorService.parseAdditionalData(
        "0xa1b073d5503a27DFBA337cFdb8458b71B3359c01=a"
      )
    ).toThrow();
  });
});
