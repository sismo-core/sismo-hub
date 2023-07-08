import { QUERY_ORDER } from "@typedorm/common";
import { EntityManager } from "@typedorm/core";
import { GroupGeneratorModel } from "./group-generator.entity";
import {
  GroupGeneratorGeneration,
  GroupGeneratorSearch,
  GroupGeneratorStore,
} from "topics/group-generator";

export class DynamoDBGroupGeneratorStore extends GroupGeneratorStore {
  entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    super();
    this.entityManager = entityManager;
  }

  public async search({
    generatorName,
    latest,
  }: GroupGeneratorSearch): Promise<GroupGeneratorGeneration[]> {
    const generationItems = await this.entityManager.find(
      GroupGeneratorModel,
      {
        name: generatorName,
      },
      {
        ...(latest ? { limit: 1, orderBy: QUERY_ORDER.DESC } : {}),
      }
    );
    return generationItems.items.map((generation) => generation.toGroupGeneratorGeneration());
  }

  async save(groupGeneratorGeneration: GroupGeneratorGeneration): Promise<void> {
    const groupGeneratorModel =
      GroupGeneratorModel.fromGroupGeneratorGeneration(groupGeneratorGeneration);
    await this.entityManager.create(groupGeneratorModel, {
      overwriteIfExists: true,
    });
  }

  /* istanbul ignore next */
  public async reset(): Promise<void> {
    throw new Error("Not implemented in dynamodb store");
  }

  /* istanbul ignore next */
  async all(): Promise<GroupGeneratorGeneration[]> {
    throw new Error("Not implemented in dynamodb store");
  }
}
