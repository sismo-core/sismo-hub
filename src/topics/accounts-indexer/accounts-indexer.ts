import { AccountMap as AccountsMap, GroupIndexerServiceConstructorArgs } from "./accounts-indexer.types";
import { AccountsIndexStore } from "accounts-index-store/accounts-index-store";
import { chunkArray } from "helpers/chunk-array";
import { LoggerService } from "logger";
import { GroupSnapshotStore } from "topics/group-snapshot";
import { GroupStore } from "topics/group/group.store";

const GROUPS_CHUNK_SIZE = 100;

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

    // TODO: Pick the one in registry-tree
    const groups = await this.groupStore.all();

    console.time('start group resolving');
    for(const chunk of chunkArray(Object.keys(groups), GROUPS_CHUNK_SIZE)) {
      const resolvedGroups = await Promise.all(chunk.map(async (groupName) => {
        console.log('groupName', groupName);
        const group = groups[groupName];
        const groupId = group.id;
  
        const snapshot = await this.groupSnapshotStore.latestById(groupId);
        return {
          groupId: group.id,
          resolvedData: await snapshot.resolvedIdentifierData()
        }
      }))

      for(const resolvedGroup of resolvedGroups) {
        for (const accountIdentifier in resolvedGroup.resolvedData){
          if (!map[accountIdentifier]) {
            map[accountIdentifier] = new Set();
          }
          map[accountIdentifier].add(resolvedGroup.groupId);
        }
      }
    }
    console.timeEnd('start group resolving');

    console.log("accounts number", Object.keys(map).length);
    await this._indexAccounts(map);
  }

  private async _indexAccounts(map: AccountsMap) {
    const accounts = [];
    for (const accountIdentifier in map) {
      accounts.push({
        accountIdentifier: accountIdentifier,
        groupIds: Array.from(map[accountIdentifier]),
      });
    }
    const result = await this.accountsIndexStore.index(accounts);
    console.log(JSON.stringify(result));
  }
}