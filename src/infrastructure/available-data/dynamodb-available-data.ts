import { QUERY_ORDER } from "@typedorm/common";
import { EntityManager } from "@typedorm/core";
import { AvailableDataModel } from "infrastructure/available-data/available-data.entity";
import { AvailableDataStore, AvailableData, AvailableDataSearch } from "topics/available-data";

export class DynamoDBAvailableDataStore extends AvailableDataStore {
  entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    super();
    this.entityManager = entityManager;
  }

  public async search({
    registryTreeName: attesterName,
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
    return availableDataItems.items.map((availableData) => availableData.toAvailableData());
  }

  async save(availableData: AvailableData): Promise<void> {
    const availableDataModel = AvailableDataModel.fromAvailableData(availableData);
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
