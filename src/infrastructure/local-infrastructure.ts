import { InfrastructureServices } from "."
import DiskDataStore from "./data-store/disk-data-store"


const localInfrastructure: InfrastructureServices = {
  groupDataStore: new DiskDataStore("groups")
}

export default localInfrastructure;
