import { Command } from "commander";
import { DataSourcesCmd, GlobalOptions } from "./command";
import { attesterLibrary } from "@attesters/index";
import { groupGeneratorLibrary } from "@group-generators/generators";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { attesterLibrary as testAttesterLibrary } from "topics/attester/test-attester";
import { groupGeneratorLibrary as testGroupGeneratorLibrary } from "topics/group-generator/test-group-generator";

const createEmptyCommand = (): Command =>
  new DataSourcesCmd("test-cmd").action(() => Promise.resolve());

describe("Test cli command", () => {
  it("should have default to local stores", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync(["node", "./data-sources"]);
    expect(testProgram.opts<GlobalOptions>().availableDataStore).toBeInstanceOf(
      LocalAvailableDataStore
    );
    expect(
      testProgram.opts<GlobalOptions>().availableGroupStore
    ).toBeInstanceOf(LocalFileStore);
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
    expect(testProgram.opts<GlobalOptions>().availableDataStore).toBeInstanceOf(
      MemoryAvailableDataStore
    );
    expect(
      testProgram.opts<GlobalOptions>().availableGroupStore
    ).toBeInstanceOf(MemoryFileStore);
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

  it("should have default attester library", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync(["node", "./data-sources"]);
    expect(testProgram.opts<GlobalOptions>().attesterLibrary).toBe(
      attesterLibrary
    );
  });

  it("should have custom attester library", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync([
      "node",
      "./data-sources",
      "--attesters-path",
      `${__dirname}/../topics/attester/test-attester`,
    ]);
    expect(testProgram.opts<GlobalOptions>().attesterLibrary).toBe(
      testAttesterLibrary
    );
  });
});
