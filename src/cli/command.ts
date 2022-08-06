import path from "path";
import { Command, Option } from "commander";
import { groupGeneratorLibrary } from "@group-generators/generators";
import { ClassLibrary } from "helpers";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { GroupStore } from "topics/group";
import { GroupGenerator } from "topics/group-generator";

export enum StorageType {
  Local = "local",
  Memory = "memory",
}

export type GlobalOptions = {
  groupStore: GroupStore;
  groupGeneratorLibrary: ClassLibrary<GroupGenerator>;
};

type RawOptions = {
  diskPath?: string;
  storageType: StorageType;
  groupGeneratorsPath: string;
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
      new Option(
        "--group-generators-path <directory>",
        "Group generator library. The path will be imported and must export a group generator library." +
          "It is mainly for tests."
      )
    );
    this.hook(
      "preAction",
      async (thisCommand: Command, actionCommand: Command) => {
        DataSourcesCmd.addGroupStoreOption(actionCommand);
        await DataSourcesCmd.addGroupGeneratorLibrary(actionCommand);
      }
    );
  }

  protected static addGroupStoreOption(command: Command): void {
    const options = command.opts<RawOptions>();
    const groupStore =
      options.storageType == StorageType.Local
        ? new LocalGroupStore(options.diskPath)
        : new MemoryGroupStore();
    command.setOptionValue("groupStore", groupStore);
  }

  protected static async addGroupGeneratorLibrary(
    command: Command
  ): Promise<void> {
    const options = command.opts<RawOptions>();
    const groupGenerators: ClassLibrary<GroupGenerator> =
      options.groupGeneratorsPath
        ? (await import(path.resolve(options.groupGeneratorsPath)))
            .groupGeneratorLibrary
        : groupGeneratorLibrary;

    command.setOptionValue("groupGeneratorLibrary", groupGenerators);
  }
}
