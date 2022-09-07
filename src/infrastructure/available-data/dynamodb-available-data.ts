import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QUERY_ORDER } from "@typedorm/common";
import {
  createConnection,
  EntityManager,
  getEntityManager,
} from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { AvailableDataModel } from "infrastructure/available-data/available-data-model";
import { globalTable } from "infrastructure/dynamodb-global/dynamo-global-table";
import {
  AvailableDataStore,
  AvailableData,
  AvailableDataSearch,
} from "topics/available-data";

const documentClient = new DocumentClientV3(
  new DynamoDBClient({
    endpoint: "http://localhost:9000",
    region: "eu-west-1",
  })
);

export class DynamoDBAvailableDataStore extends AvailableDataStore {
  entityManager: EntityManager;

  constructor() {
    super();
    createConnection({
      table: globalTable,
      entities: [AvailableDataModel],
      documentClient,
    });
    this.entityManager = getEntityManager();
  }

  public async search({
    attesterName,
    network,
    latest,
    isOnChain,
  }: AvailableDataSearch): Promise<AvailableData[]> {
    const availableDataItems = await this.entityManager.find(
      AvailableDataModel,
      {
        attesterName,
        network,
        isOnChain,
      },
      {
        ...(isOnChain !== undefined ? { queryIndex: "GSI1" } : {}),
        ...(latest ? { limit: 1, orderBy: QUERY_ORDER.DESC } : {}),
      }
    );
    return availableDataItems.items.map((availableData) =>
      availableData.toAvailableData()
    );
  }

  async save(availableData: AvailableData): Promise<void> {
    const availableDataModel =
      AvailableDataModel.fromAvailableData(availableData);
    await this.entityManager.create(availableDataModel, {
      overwriteIfExists: true,
    });
  }

  public async reset(): Promise<void> {
    const all = await documentClient.scan({
      TableName: globalTable.name,
    });
    /* istanbul ignore if */
    if (!all.Items) {
      return;
    }
    for (const item of all.Items) {
      await documentClient.delete({
        TableName: globalTable.name,
        Key: {
          PK: item.PK,
          SK: item.SK,
        },
      });
    }
  }

  /* istanbul ignore next */
  async all(): Promise<AvailableData[]> {
    throw new Error("All not implement on dynamoDB");
  }
}
