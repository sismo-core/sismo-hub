import { InfrastructureServices } from "./"
import LocalFileStore from "./local-file-store";
import LocalGroupStore from "./local-group-store";


const localInfrastructureServices: InfrastructureServices = {
  fileStore: new LocalFileStore(),
  groupStore: new LocalGroupStore()
}

export default localInfrastructureServices;
