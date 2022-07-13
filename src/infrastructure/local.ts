import { InfrastructureServices } from "./";
import LocalFileStore from "./file-store/local-file-store";
import LocalGroupStore from "./group-store/local-group-store";

const localInfrastructureServices: InfrastructureServices = {
  groupDataStore: new LocalFileStore("groups-data"),
  groupStore: new LocalGroupStore(),
};

export default localInfrastructureServices;
