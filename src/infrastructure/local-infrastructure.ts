import { InfrastructureServices } from "./";
import { LocalGroupStore } from "./group-store";

const localInfrastructureServices: InfrastructureServices = {
  groupStore: new LocalGroupStore(),
};

export default localInfrastructureServices;
