import { InfrastructureServices } from "./";
import MemoryGroupStore from "./group-store/memory-group-store";
import MemoryFileStore from "./file-store/memory-file-store";

const memoryInfrastructureServices: InfrastructureServices = {
  groupDataStore: new MemoryFileStore(),
  groupStore: new MemoryGroupStore(),
};

export default memoryInfrastructureServices;
