import path from "path";
import { Command, Option } from "commander";
import { attesterLibrary } from "@attesters/index";
import { groupGeneratorLibrary } from "@group-generators/generators";
import { FileStore } from "file-store";
import { ClassLibrary } from "helpers";
import {
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { LocalFileStore, MemoryFileStore } from "infrastructure/file-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { Attester } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { GroupStore } from "topics/group";
import { GroupGenerator } from "topics/group-generator";

export enum StorageType {
  Local = "local",
  Memory = "memory",
}

export type GlobalOptions = {
  attesterLibrary: ClassLibrary<Attester>;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  groupStore: GroupStore;
  groupGeneratorLibrary: ClassLibrary<GroupGenerator>;
};

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
    this.addOption(
      new Option(
        "--group-generators-path <directory>",
        "Group generator library. The path will be imported and must export a group generator library." +
          "It is mainly for tests."
      )
    );
    this.addOption(
      new Option(
        "--attesters-path <directory>",
        "Attester library. The path will be imported and must export an attester library." +
          "It is mainly for tests."
      )
    );
    this.hook(
      "preAction",
      async (thisCommand: Command, actionCommand: Command) => {
        DataSourcesCmd.addStores(actionCommand);
        await DataSourcesCmd.addGroupGeneratorLibrary(actionCommand);
        await DataSourcesCmd.addAttesterLibrary(actionCommand);
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

  protected static async addAttesterLibrary(command: Command): Promise<void> {
    const options = command.opts<RawOptions>();
    const attesters: ClassLibrary<Attester> = options.attestersPath
      ? (await import(path.resolve(options.attestersPath))).attesterLibrary
      : attesterLibrary;
    command.setOptionValue("attesterLibrary", attesters);
  }
}
