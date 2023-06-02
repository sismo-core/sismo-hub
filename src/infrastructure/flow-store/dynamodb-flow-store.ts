import { EntityManager } from "@typedorm/core";
import { FlowModel } from "./flow.entity";
import { Flow } from "topics/flow";
import { FlowStore } from "topics/flow/flow.store";


export class DynamoDBFlowStore extends FlowStore {
  entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    super();
    this.entityManager = entityManager;
  }

  public async all(): Promise<Flow[]> {
    const flowModels = await this.entityManager.find(FlowModel, {});
    return flowModels.items.map((flowModel) =>
        flowModel.toFlow()
    );
  }

  async reset(): Promise<void> {
    const flowModels = await this.entityManager.find(FlowModel, {});
    for(const flowModel of flowModels.items){
      await this.entityManager.delete(FlowModel, { path: flowModel.path });
    }
  }

  async updateAll(flows: Flow[]): Promise<void> {
    await this.reset();
    for (const flow of flows) {
        const flowModel = FlowModel.fromFlow(flow);
        await this.entityManager.create(flowModel, {
          overwriteIfExists: true,
        });
    }
  }
}
