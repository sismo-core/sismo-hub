import { GroupIndexerService } from "./group-indexer";
import { GlobalOptions, SismoHubCmd } from "cli/command";

type IndexGroupOptions =  Pick<
  GlobalOptions,
  "groupStore" | "groupSnapshotStore" | "logger"
>

export const indexGroup = async (
  {
    groupStore,
    groupSnapshotStore,
    logger,
  } : IndexGroupOptions
): Promise<void> => {
  const service = new GroupIndexerService({
    groupStore,
    groupSnapshotStore,
    logger,
  });

  await service.indexGroups();
};

export const indexGroupCmd = new SismoHubCmd("index-groups");
indexGroupCmd.action(indexGroup);
