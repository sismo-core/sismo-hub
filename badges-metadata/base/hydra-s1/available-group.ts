import { hashJson, MerkleTreeHandler } from "./helpers";
import { AccountTree, GroupSnapshotWithProperties } from ".";
import { FileStore } from "file-store";
import { ChunkedData } from "helpers";
import { LoggerService } from "logger";

const MAX_CHUNK_SIZE = 50000;

export class HydraS1AvailableGroup {
  public groupWithProperties: GroupSnapshotWithProperties;
  private _fileStore: FileStore;
  private _logger: LoggerService;
  private _accountsTree: AccountTree[];

  constructor(
    fileStore: FileStore,
    logger: LoggerService,
    groupWithProperties: GroupSnapshotWithProperties
  ) {
    this._fileStore = fileStore;
    this.groupWithProperties = groupWithProperties;
    this._logger = logger;
    this._accountsTree = [];
  }

  public async resolveCache(chunkSize: number = MAX_CHUNK_SIZE): Promise<void> {
    if (await this._fileStore.exists(this._getCacheFilename(chunkSize))) {
      this._accountsTree = await this._fileStore.read(
        this._getCacheFilename(chunkSize)
      );
    } else {
      this._logger.info(
        `Merkle tree for group ${this.groupWithProperties.groupSnapshot.name} needs to be recomputed!`
      );
    }
  }

  public async compute(
    chunkSize: number = MAX_CHUNK_SIZE
  ): Promise<AccountTree[]> {
    if (this._accountsTree.length > 0) {
      return this._accountsTree;
    }

    const accountTrees: AccountTree[] = [];
    const accountsTreeValue = this.groupWithProperties.accountsTreeValue;
    const groupSnapshot = this.groupWithProperties.groupSnapshot;

    this._logger.info(
      `Computing merkle trees for accountsTreeValue ${accountsTreeValue}`
    );
    const groupData =
      await this.groupWithProperties.groupSnapshot.resolvedIdentifierData();
    const chunkedData = new ChunkedData(groupData, chunkSize);
    const groupDataFilename = `${accountsTreeValue}.group.json`;
    if (!(await this._fileStore.exists(groupDataFilename))) {
      const groupDataNotResolved = await groupSnapshot.data();
      await this._fileStore.write(groupDataFilename, groupDataNotResolved);
    }
    for (const chunk of chunkedData.iterate()) {
      // add accountsTreeValue: 0 in the group to allow the creation of different account trees root
      // for same generated groups but different group Ids
      chunk.data[accountsTreeValue] = "0";
      const merkleTree = new MerkleTreeHandler(this._fileStore, chunk.data);
      const root = await merkleTree.compute();
      accountTrees.push({
        root: root,
        groupId: accountsTreeValue,
        groupProperties: this.groupWithProperties.properties,
        accountsTreeValue: accountsTreeValue,
        chunk: chunk.metadata,
        metadata: {
          ...merkleTree.metadata,
          groupId: groupSnapshot.groupId,
          groupName: groupSnapshot.name,
          groupGenerationTimestamp: groupSnapshot.timestamp,
          groupDataUrl: this._fileStore.url(groupDataFilename),
        },
        dataUrl: this._fileStore.url(merkleTree.dataFilename),
        treeUrl: this._fileStore.url(merkleTree.treeFilename),
      });
    }
    await this._fileStore.write(
      this._getCacheFilename(chunkSize),
      accountTrees
    );
    return accountTrees;
  }

  private _getCacheFilename(chunkSize: number) {
    const groupSnapshot = this.groupWithProperties.groupSnapshot;
    return `${hashJson({
      // account tree version schema. Change to invalidate cache and recompute account trees schema
      version: "v3",
      type: "hydraS1AvailableGroup",
      chunkSize,
      accountsTreeValue: this.groupWithProperties.accountsTreeValue,
      properties: this.groupWithProperties.properties,
      resolvedDataIntegrity: groupSnapshot.resolvedIdentifierDataIntegrity,
      group: {
        name: groupSnapshot.name,
        timestamp: groupSnapshot.timestamp,
      },
    })}.cache.json`;
  }
}
