import { AccountsIndexStore } from "accounts-index-store/accounts-index-store";
import { LoggerService } from "logger";
import { GroupSnapshotStore } from "topics/group-snapshot";
import { GroupStore } from "topics/group/group.store";

export type AccountMap = {
  [accountIdentifier: string]: Set<string>;
};

export type GroupIndexerServiceConstructorArgs = {
  accountsIndexStore: AccountsIndexStore;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  logger: LoggerService;
};