import { createContext, generateGroup } from "./group-generator.commands";
import { groupGenerators, testGroup } from "./test-group-generator";
import { MemoryGroupStore } from "infrastructure/group-store";
import { testGroups } from "../group/test-groups";

describe("Test generate group command", () => {
  it("should generate context with fix block number and timestamp should be in second", async () => {
    const context = await createContext({ blockNumber: 2 });
    expect(context.timestamp).toBeLessThan(10000000000000); // < year 2286
    expect(context.blockNumber).toEqual(2);
  });

  it("should generate context with fixed timestamp and block number", async () => {
    const context = await createContext({ timestamp: 1, blockNumber: 2 });
    expect(context.timestamp).toEqual(1);
    expect(context.blockNumber).toEqual(2);
  });

  it("Should generate a context with current block number", async () => {
    const context = await createContext({});
    expect(context.blockNumber).toBeGreaterThan(15211120);
  });

  it("should generate groups and store them", async () => {
    const groupStore = new MemoryGroupStore();

    await generateGroup(
      "test-generator",
      {
        groupStore,
        blockNumber: 123456789,
      },
      groupGenerators
    );
    expect(await groupStore.all()).toContainGroup(testGroup);
  });

  it("should throw error if generator name does not exist", async () => {
    await expect(async () => {
      await generateGroup(
        "not-exists",
        {
          groupStore: new MemoryGroupStore(),
          blockNumber: 123456789,
        },
        groupGenerators
      );
    }).rejects.toThrow();
  });
});
