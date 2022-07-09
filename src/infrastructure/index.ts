import FileStore from "../file-store";
import GroupStore from "../group/group.store";

export type InfrastructureServices = {
  fileStore: FileStore,
  groupStore: GroupStore
}

const infrastructurePath = process.env.INFRASTRUCTURE_IMPORT_PATH || "./local";
export let infrastructureServices: InfrastructureServices;
import(infrastructurePath).then(
  (config) =>  { infrastructureServices = config.default }
)
