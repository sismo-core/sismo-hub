import { LoggerService } from "logger";
import { GroupSnapshotStore } from "topics/group-snapshot";
import { GroupStore } from "topics/group/group.store";

export type GroupIndexerServiceConstructorArgs = {
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  logger: LoggerService;
};