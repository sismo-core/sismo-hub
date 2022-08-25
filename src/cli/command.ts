import { Command, Option } from "commander";
import { flows, FlowType } from "@flows/index";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { CommonConfiguration } from "service-factory";

export enum StorageType {
  Local = "local",
  Memory = "memory",
}

export type GlobalOptions = Pick<
  CommonConfiguration,
  "availableDataStore" | "availableGroupStore" | "flows" | "groupStore"
>;

type RawOptions = {
  attestersPath?: string;
  diskPath?: string;
  flowsType: FlowType;
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
    this.addOption(
      new Option("--flows-type <flow-type>", "Flow type.")
        .choices(Object.values(FlowType))
        .default(FlowType.Local)
    );
    this.hook(
      "preAction",
      async (thisCommand: Command, actionCommand: Command) => {
        const options = actionCommand.opts<RawOptions>();
        DataSourcesCmd.addStores(actionCommand, options);
        actionCommand.setOptionValue("flows", flows[options.flowsType]);
      }
    );
  }

  protected static addStores(command: Command, options: RawOptions): void {
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
