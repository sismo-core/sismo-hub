import { AccountMap as AccountsMap, GroupIndexerServiceConstructorArgs } from "./accounts-indexer.types";
import { AccountsIndexStore } from "accounts-index-store/accounts-index-store";
import { LoggerService } from "logger";
import { GroupSnapshotStore } from "topics/group-snapshot";
import { GroupStore } from "topics/group/group.store";

export class AccountsIndexerService {
  accountsIndexStore: AccountsIndexStore;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  logger: LoggerService;

  constructor({
    accountsIndexStore,
    groupStore,
    groupSnapshotStore,
    logger,
  }: GroupIndexerServiceConstructorArgs) {
    this.accountsIndexStore = accountsIndexStore;
    this.groupStore = groupStore;
    this.groupSnapshotStore = groupSnapshotStore;
    this.logger = logger;
  }

  public async indexGroups(): Promise<void> {
    const map: AccountsMap = {};

    const groups = await this.groupStore.all();
    for (const groupName in groups) {
      const group = groups[groupName];
      const groupId = group.id;

      // TODO: Pick the one in registry-tree
      const snapshot = await this.groupSnapshotStore.latestById(groupId);
      const identifierData = await snapshot.resolvedIdentifierData();
      
      for (const accountIdentifier in identifierData){
        if (!map[accountIdentifier]) {
          map[accountIdentifier] = new Set();
        }
        map[accountIdentifier].add(groupId);
      }
    }
    await this._indexAccounts(map);
  }

  private async _indexAccounts(map: AccountsMap) {
    const accounts = [];
    for (const accountIdentifier in map) {
      accounts.push({
        accountIdentifier: accountIdentifier,
        groupIds: Array.from(map[accountIdentifier]),
      });
      await this.accountsIndexStore.index(accounts);
    }
  }
}