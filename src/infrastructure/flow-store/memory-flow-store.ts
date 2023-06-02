import { Flow } from "topics/flow";
import { FlowStore } from "topics/flow/flow.store";

export class MemoryFlowStore extends FlowStore {
  protected _store: Flow[];

  async all(): Promise<Flow[]> {
    return this._store;
  }

  async reset(): Promise<void> {
    this._store = [];
  }

  async updateAll(flows: Flow[]): Promise<void> {
    this._store = flows;
  }
}