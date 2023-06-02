import { Flow } from "./flow";

export abstract class FlowStore {
  public abstract all(): Promise<Flow[]>;
  public abstract reset(): Promise<void>;
  public abstract updateAll(flows: Flow[]): Promise<void>;
}