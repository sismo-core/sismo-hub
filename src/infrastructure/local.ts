import { InfrastructureServices } from "./"
import LocalFileStore from "./local-file-store";
import LocalGroupStore from "./local-group-store";


const localInfrastructureServices: InfrastructureServices = {
  groupDataStore: new LocalFileStore("groups-data"),
  groupStore: new LocalGroupStore()
}

export default localInfrastructureServices;
