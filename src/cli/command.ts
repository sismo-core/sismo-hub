import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DocumentClientV3 } from "@typedorm/document-client";
import { Command, Option } from "commander";
import { FlowType, flows } from "@flows/index";
import {
  createAvailableDataEntityManager,
  LocalAvailableDataStore,
  MemoryAvailableDataStore,
} from "infrastructure/available-data";
import { DynamoDBAvailableDataStore } from "infrastructure/available-data/dynamodb-available-data";
import {
  LocalFileStore,
  MemoryFileStore,
  S3FileStore,
} from "infrastructure/file-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { DyanmoDBGroupStore } from "infrastructure/group-store/dynamodb-group-store";
import { createGroupsEntityManager } from "infrastructure/group-store/groups.entity";
import { CommonConfiguration } from "service-factory";

export enum StorageType {
  Local = "local",
  Memory = "memory",
  AWS = "aws",
}

export type GlobalOptions = Pick<
  CommonConfiguration,
  "availableDataStore" | "availableGroupStore" | "flows" | "groupStore"
>;

type RawOptions = {
  attestersPath?: string;
  diskPath?: string;
  s3DataBucketName?: string;
  s3DataEndpoint?: string;
  dynamoGlobalTableName?: string;
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
        "--disk-path <string>",
        "Disk directory for local storage. If not set, use 'disk-store', at the root of this project."
      )
    );
    this.addOption(
      new Option(
        "--s3-data-bucket-name <string>",
        "Bucket name for data file storage."
      ).env("SH_S3_DATA_BUCKET_NAME")
    );
    this.addOption(
      new Option(
        "--dynamo-global-table-name <string>",
        "Dynamodb global table name used for storage."
      ).env("SH_DYNAMO_GLOBAL_TABLE_NAME")
    );
    this.addOption(
      new Option(
        "--s3-data-endpoint <string>",
        "S3 Endpoint to access the storage."
      ).env("SH_S3_DATA_ENDPOINT")
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
    } else if (options.storageType == StorageType.AWS) {
      command.setOptionValue(
        "availableDataStore",
        new DynamoDBAvailableDataStore(
          createAvailableDataEntityManager({
            documentClient: new DocumentClientV3(new DynamoDBClient({})),
            globalTableName: options.dynamoGlobalTableName,
          })
        )
      );
      command.setOptionValue(
        "availableGroupStore",
        new S3FileStore("available-group-store", {
          bucketName: options.s3DataBucketName,
          endpoint: options.s3DataEndpoint,
        })
      );
      command.setOptionValue(
        "groupStore",
        new DyanmoDBGroupStore(
          new S3FileStore("group-store", {
            bucketName: options.s3DataBucketName,
            endpoint: options.s3DataEndpoint,
          }),
          createGroupsEntityManager({
            documentClient: new DocumentClientV3(new DynamoDBClient({})),
            globalTableName: options.dynamoGlobalTableName,
          })
        )
      );
    }
  }
}
