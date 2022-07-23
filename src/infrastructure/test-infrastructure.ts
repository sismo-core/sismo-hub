import Infrastructure, { InfrastructureServices } from "./index";
import { MemoryGroupStore } from "./group-store";

const resetTestInfrastructure = async (): Promise<InfrastructureServices> => {
  return await Infrastructure.init({
    groupStore: new MemoryGroupStore(),
  });
};

export default resetTestInfrastructure;
