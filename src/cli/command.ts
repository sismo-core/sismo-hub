import { Command, Option } from "commander";
import { CommonConfiguration } from "configuration";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";

export enum StorageType {
  Local = "local",
  Memory = "memory",
}

export type GlobalOptions = Pick<
  CommonConfiguration,
  "availableDataStore" | "availableGroupStore" | "groupStore"
>;

type RawOptions = {
  attestersPath?: string;
  diskPath?: string;
  groupGeneratorsPath?: string;
  storageType: StorageType;
};

export class DataSourcesCmd extends Command {
  constructor(name?: string) {
    super(name);
    this.addOption(
      new Option("--storage-type <storage-type>", "Storage type.")
        .choices(Object.values(StorageType))
        .default(StorageType.Local)
    );

    this.addOption(
      new Option(
        "--disk-path <storage-type>",
        "Disk directory for local storage. If not set, use 'disk-store', at the root of this project."
      )
    );
    this.hook(
      "preAction",
      async (thisCommand: Command, actionCommand: Command) => {
        DataSourcesCmd.addStores(actionCommand);
      }
    );
  }

  protected static addStores(command: Command): void {
    const options = command.opts<RawOptions>();
    if (options.storageType == StorageType.Local) {
      command.setOptionValue(
        "availableDataStore",
        new LocalAvailableDataStore(options.diskPath)
      );
      command.setOptionValue(
        "availableGroupStore",
        new LocalFileStore("available-groups", options.diskPath)
      );
      command.setOptionValue(
        "groupStore",
        new LocalGroupStore(options.diskPath)
      );
    } else if (options.storageType == StorageType.Memory) {
      command.setOptionValue(
        "availableDataStore",
        new MemoryAvailableDataStore()
      );
      command.setOptionValue(
        "availableGroupStore",
        new MemoryFileStore("available-groups")
      );
      command.setOptionValue("groupStore", new MemoryGroupStore());
    }
  }
}
