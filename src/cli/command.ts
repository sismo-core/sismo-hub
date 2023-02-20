import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DocumentClientV3 } from "@typedorm/document-client";
import { Command, Option } from "commander";
import { FlowType } from "@flows/index";
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
import {
  createGroupGeneratorStoreEntityManager,
  DynamoDBGroupGeneratorStore,
  LocalGroupGeneratorStore,
  MemoryGroupGeneratorStore,
} from "infrastructure/group-generator-store";
import { DynamoDBGroupSnapshotStore } from "infrastructure/group-snapshot/dynamodb-group-snapshot-store";
import { MemoryGroupSnapshotStore } from "infrastructure/group-snapshot/group-snapshot-memory";
import { createGroupSnapshotsEntityManager } from "infrastructure/group-snapshot/group-snapshot.entity";
import { LocalGroupSnapshotStore } from "infrastructure/group-snapshot/local-group-snapshot-store";
import { LocalGroupStore, MemoryGroupStore } from "infrastructure/group-store";
import { DynamoDBGroupStore } from "infrastructure/group-store/dynamodb-group-store";
import { createGroupsV2EntityManager } from "infrastructure/group-store/groups-v2.entity";
import { LocalFileLogger } from "infrastructure/logger/local-file-logger";
import { MemoryLogger } from "infrastructure/logger/memory-logger";
import { StdoutLogger } from "infrastructure/logger/stdout-logger";
import { getLocalDocumentClient } from "infrastructure/utils";
import { CommonConfiguration, ConfigurationDefaultEnv } from "service-factory";

export enum StorageType {
  Local = "local",
  LocalDynamoDB = "local-dynamodb",
  Memory = "memory",
  AWS = "aws",
}

export enum LoggerType {
  Memory = "memory",
  Stdout = "stdout",
  LocalFile = "local-file",
}

export type GlobalOptions = Pick<
  CommonConfiguration,
  | "availableDataStore"
  | "availableGroupStore"
  | "groupStore"
  | "groupSnapshotStore"
  | "groupGeneratorStore"
  | "attesters"
  | "logger"
> & {
  env: ConfigurationDefaultEnv;
};

type RawOptions = {
  attestersPath?: string;
  diskPath?: string;
  s3DataBucketName?: string;
  s3DataEndpoint?: string;
  dynamoGlobalTableName?: string;
  flowsType: FlowType;
  groupGeneratorsPath?: string;
  storageType: StorageType;
  loggerType: LoggerType;
  env: ConfigurationDefaultEnv;
};

const dynamoDBClient = getLocalDocumentClient();

export class DataSourcesCmd extends Command {
  constructor(name?: string) {
    super(name);
    this.addOption(
      new Option("--storage-type <storage-type>", "Storage type.")
        .choices(Object.values(StorageType))
        .default(StorageType.Local)
        .env("SH_STORAGE_TYPE")
    );
    this.addOption(
      new Option("--logger-type <logger-type>", "Logger type.")
        .choices(Object.values(LoggerType))
        .default(LoggerType.Stdout)
        .env("SH_LOGGER_TYPE")
    );
    this.addOption(
      new Option(
        "--env <configuration-default-env>",
        "Env to take default configuration values."
      )
        .choices(Object.values(ConfigurationDefaultEnv))
        .default(ConfigurationDefaultEnv.Local)
        .env("SH_DEFAULT_CONFIGURATION_ENV")
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
    this.hook(
      "preAction",
      async (thisCommand: Command, actionCommand: Command) => {
        const options = actionCommand.opts<RawOptions>();
        DataSourcesCmd.addStores(actionCommand, options);
        DataSourcesCmd.addLogger(actionCommand, options);
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
      command.setOptionValue(
        "groupSnapshotStore",
        new LocalGroupSnapshotStore(options.diskPath)
      );
      command.setOptionValue(
        "groupGeneratorStore",
        new LocalGroupGeneratorStore(options.diskPath)
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
      command.setOptionValue(
        "groupSnapshotStore",
        new MemoryGroupSnapshotStore()
      );
      command.setOptionValue(
        "groupGeneratorStore",
        new MemoryGroupGeneratorStore()
      );
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
        new DynamoDBGroupStore(
          new S3FileStore("group-store", {
            bucketName: options.s3DataBucketName,
            endpoint: options.s3DataEndpoint,
          }),
          createGroupsV2EntityManager({
            documentClient: new DocumentClientV3(new DynamoDBClient({})),
            globalTableName: options.dynamoGlobalTableName,
          })
        )
      );
      command.setOptionValue(
        "groupSnapshotStore",
        new DynamoDBGroupSnapshotStore(
          new S3FileStore("group-snapshot-store", {
            bucketName: options.s3DataBucketName,
            endpoint: options.s3DataEndpoint,
          }),
          createGroupSnapshotsEntityManager({
            documentClient: new DocumentClientV3(new DynamoDBClient({})),
            globalTableName: options.dynamoGlobalTableName,
          })
        )
      );
      command.setOptionValue(
        "groupGeneratorStore",
        new DynamoDBGroupGeneratorStore(
          createGroupGeneratorStoreEntityManager({
            documentClient: new DocumentClientV3(new DynamoDBClient({})),
            globalTableName: options.dynamoGlobalTableName,
          })
        )
      );
    } else if (options.storageType == StorageType.LocalDynamoDB) {
      command.setOptionValue(
        "availableDataStore",
        new DynamoDBAvailableDataStore(
          createAvailableDataEntityManager({
            documentClient: dynamoDBClient,
            globalTableName: options.dynamoGlobalTableName,
          })
        )
      );
      command.setOptionValue(
        "availableGroupStore",
        new S3FileStore("available-group-store", {
          bucketName: options.s3DataBucketName,
          endpoint: options.s3DataEndpoint ?? "http://127.0.0.1:9002/local",
          s3Options: {
            endpoint: options.s3DataEndpoint ?? "http://127.0.0.1:9002",
            s3ForcePathStyle: true,
          },
        })
      );
      command.setOptionValue(
        "groupStore",
        new DynamoDBGroupStore(
          new S3FileStore("group-store", {
            bucketName: options.s3DataBucketName,
            endpoint: options.s3DataEndpoint ?? "http://127.0.0.1:9002/local",
            s3Options: {
              endpoint: options.s3DataEndpoint ?? "http://127.0.0.1:9002",
              s3ForcePathStyle: true,
            },
          }),
          createGroupsV2EntityManager({
            documentClient: dynamoDBClient,
            globalTableName: options.dynamoGlobalTableName,
          })
        )
      );
      command.setOptionValue(
        "groupSnapshotStore",
        new DynamoDBGroupSnapshotStore(
          new S3FileStore("group-snapshot-store", {
            bucketName: options.s3DataBucketName,
            endpoint: options.s3DataEndpoint ?? "http://127.0.0.1:9002/local",
            s3Options: {
              endpoint: options.s3DataEndpoint ?? "http://127.0.0.1:9002",
              s3ForcePathStyle: true,
            },
          }),
          createGroupSnapshotsEntityManager({
            documentClient: dynamoDBClient,
            globalTableName: options.dynamoGlobalTableName,
          })
        )
      );
      command.setOptionValue(
        "groupGeneratorStore",
        new DynamoDBGroupGeneratorStore(
          createGroupGeneratorStoreEntityManager({
            documentClient: dynamoDBClient,
            globalTableName: options.dynamoGlobalTableName,
          })
        )
      );
    }
  }

  protected static addLogger(command: Command, options: RawOptions): void {
    if (options.loggerType == LoggerType.Memory) {
      command.setOptionValue("logger", new MemoryLogger());
    } else if (options.loggerType == LoggerType.Stdout) {
      command.setOptionValue("logger", new StdoutLogger());
    } else if (options.loggerType === LoggerType.LocalFile) {
      command.setOptionValue("logger", new LocalFileLogger("log"));
    }
  }
}
