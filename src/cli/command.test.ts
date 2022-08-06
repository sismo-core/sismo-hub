import { Command } from "commander";
import { DataSourcesCmd, GlobalOptions } from "./command";
import { groupGeneratorLibrary } from "@group-generators/generators";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { groupGeneratorLibrary as testGroupGeneratorLibrary } from "topics/group-generator/test-group-generator";

const createEmptyCommand = (): Command =>
  new DataSourcesCmd("test-cmd").action(() => Promise.resolve());

describe("Test cli command", () => {
  it("should have default to local group store", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync(["node", "./data-sources"]);
    expect(testProgram.opts<GlobalOptions>().groupStore).toBeInstanceOf(
      LocalGroupStore
    );
  });

  it("should have memory group store", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync([
      "node",
      "./data-sources",
      "--storage-type",
      "memory",
    ]);
    expect(testProgram.opts<GlobalOptions>().groupStore).toBeInstanceOf(
      MemoryGroupStore
    );
  });

  it("should have default group generator library", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync(["node", "./data-sources"]);
    expect(testProgram.opts<GlobalOptions>().groupGeneratorLibrary).toBe(
      groupGeneratorLibrary
    );
  });

  it("should have custom group generator library", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync([
      "node",
      "./data-sources",
      "--group-generators-path",
      `${__dirname}/../topics/group-generator/test-group-generator`,
    ]);
    expect(testProgram.opts<GlobalOptions>().groupGeneratorLibrary).toBe(
      testGroupGeneratorLibrary
    );
  });
});
