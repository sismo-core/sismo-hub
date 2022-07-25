import { InfrastructureServices } from "./infrastructure.types";
import { LocalGroupStore } from "./group-store";

export const localInfrastructure: InfrastructureServices = {
  groupStore: new LocalGroupStore(),
};

export * from "./infrastructure.types";
export * from "./container";
