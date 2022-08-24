import { GroupGeneratorService } from "./group-generator";
import { groupGenerators, testGroup } from "./test-group-generator";
import { MemoryGroupStore } from "infrastructure/group-store";

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

  it("should throw error if generator name does not exist", async () => {
    await expect(async () => {
      await service.generateGroups("not-exists", {
        blockNumber: 123456789,
        timestamp: 1,
      });
    }).rejects.toThrow();
  });
});
