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

export class DynamoDBAvailableDataStore extends AvailableDataStore {
  entityManager: EntityManager;

  constructor(documentClient: DocumentClientV3) {
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

  /* istanbul ignore next */
  public async reset(): Promise<void> {
    throw new Error("Not implemented in dynamodb store");
  }

  /* istanbul ignore next */
  async all(): Promise<AvailableData[]> {
    throw new Error("Not implemented in dynamodb store");
  }
}
