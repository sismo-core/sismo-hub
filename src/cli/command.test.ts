import { Command } from "commander";
import { DataSourcesCmd, GlobalOptions } from "./command";
import { localFlows } from "@flows/local-flows";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";

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

  it("should have default local flows", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync([
      "node",
      "./data-sources",
      "--storage-type",
      "memory",
    ]);
    expect(testProgram.opts<GlobalOptions>().flows).toBe(localFlows);
  });
});
