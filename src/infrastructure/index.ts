import FileStore from "../file-store";
import GroupStore from "../group/group.store";

import LocalFileStore from "./local-file-store";
import LocalGroupStore from "./local-group-store";

type InfrastructureServices = {
  fileStore: FileStore,
  groupStore: GroupStore
}

export const infrastructureServices: InfrastructureServices = {
  fileStore: new LocalFileStore(),
  groupStore: new LocalGroupStore()
}
