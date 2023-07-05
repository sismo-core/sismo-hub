import { GroupIndexerServiceConstructorArgs } from "./group-indexer.types";
import { LoggerService } from "logger";
import { GroupSnapshotStore } from "topics/group-snapshot";
import { GroupStore } from "topics/group/group.store";

type AccountMap = {
  [accountIdentifier: string]: Set<string>;
};

export class GroupIndexerService {
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  logger: LoggerService;

  constructor({
    groupStore,
    groupSnapshotStore,
    logger,
  }: GroupIndexerServiceConstructorArgs) {
    this.groupStore = groupStore;
    this.groupSnapshotStore = groupSnapshotStore;
    this.logger = logger;
  }

  public async indexGroups(): Promise<void> {
    const map: AccountMap = {};

    const groups = await this.groupStore.all();
    
    for (const groupName in groups) {
      const group = groups[groupName];
      const groupId = group.id;

      // TODO: Pick the latest snapshot in registry-tree
      const snapshot = await group.resolvedIdentifierData();

      for (const accountIdentifier in snapshot){
        if (!map[accountIdentifier]) {
          map[accountIdentifier] = new Set();
        }
        map[accountIdentifier].add(groupId);
      }
    }

    console.log(map);
    await this._addToElasticSearch(map);
  }

  private async _addToElasticSearch(map: AccountMap) {
    for (const accountIdentifier in map) {
      // TODO: add to elastic search
    }
  }
}