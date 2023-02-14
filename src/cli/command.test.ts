import { Command } from "commander";
import { DataSourcesCmd, GlobalOptions } from "./command";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { DynamoDBAvailableDataStore } from "infrastructure/available-data/dynamodb-available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import { S3FileStore } from "infrastructure/file-store/s3-file-store";
import {
  DynamoDBGroupGeneratorStore,
  LocalGroupGeneratorStore,
  MemoryGroupGeneratorStore,
} from "infrastructure/group-generator-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { DynamoDBGroupStore } from "infrastructure/group-store/dynamodb-group-store";
import { LocalFileLogger } from "infrastructure/logger/local-file-logger";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import { StdoutLogger } from "infrastructure/logger/stdout-logger";

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
    expect(
      testProgram.opts<GlobalOptions>().groupGeneratorStore
    ).toBeInstanceOf(LocalGroupGeneratorStore);
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
    expect(
      testProgram.opts<GlobalOptions>().groupGeneratorStore
    ).toBeInstanceOf(MemoryGroupGeneratorStore);
  });

  it("should have aws group store", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync([
      "node",
      "./data-sources",
      "--storage-type",
      "aws",
    ]);
    expect(testProgram.opts<GlobalOptions>().availableDataStore).toBeInstanceOf(
      DynamoDBAvailableDataStore
    );
    expect(
      testProgram.opts<GlobalOptions>().availableGroupStore
    ).toBeInstanceOf(S3FileStore);
    expect(testProgram.opts<GlobalOptions>().groupStore).toBeInstanceOf(
      DynamoDBGroupStore
    );
    expect(
      testProgram.opts<GlobalOptions>().groupGeneratorStore
    ).toBeInstanceOf(DynamoDBGroupGeneratorStore);
  });

  it("should have stdout logger service", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync([
      "node",
      "./data-sources",
      "--logger-type",
      "stdout",
    ]);
    expect(testProgram.opts<GlobalOptions>().logger).toBeInstanceOf(
      StdoutLogger
    );
  });

  it("should have memory logger service", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync([
      "node",
      "./data-sources",
      "--logger-type",
      "memory",
    ]);
    expect(testProgram.opts<GlobalOptions>().logger).toBeInstanceOf(
      MemoryLogger
    );
  });

  it("should have local file logger service", async () => {
    const testProgram: Command = createEmptyCommand();
    await testProgram.parseAsync([
      "node",
      "./data-sources",
      "--logger-type",
      "local-file",
    ]);
    expect(testProgram.opts<GlobalOptions>().logger).toBeInstanceOf(
      LocalFileLogger
    );
  });
});
