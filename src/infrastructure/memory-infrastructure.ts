import { InfrastructureServices } from "./";
import { MemoryGroupStore } from "./group-store";

const memoryInfrastructureServices: InfrastructureServices = {
  groupStore: new MemoryGroupStore(),
};

export default memoryInfrastructureServices;
