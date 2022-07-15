import Infrastructure, { InfrastructureServices } from "./index";
import { MemoryFileStore } from "./file-store";
import { MemoryGroupStore } from "./group-store";

const resetTestInfrastructure = async (): Promise<InfrastructureServices> => {
  return await Infrastructure.init({
    groupDataStore: new MemoryFileStore(),
    groupStore: new MemoryGroupStore(),
  });
};

export default resetTestInfrastructure;
