import { hashJson, MerkleTreeHandler } from "./helpers";
import { AccountTree } from ".";
import { FileStore } from "file-store";
import { ChunkedData } from "helpers";
import { LoggerService } from "logger";
import { GroupSnapshot } from "topics/group-snapshot";

const MAX_CHUNK_SIZE = 50000;

export class HydraS1AvailableGroup {
  public readonly encodedGroupProperties: string;
  public readonly properties: any;

  protected _groupSnapshot: GroupSnapshot;
  protected _fileStore: FileStore;
  protected _logger: LoggerService;

  constructor(
    fileStore: FileStore,
    logger: LoggerService,
    groupSnapshot: GroupSnapshot,
    encodedGroupProperties: string,
    properties: any
  ) {
    this._fileStore = fileStore;
    this.properties = properties;
    this.encodedGroupProperties = encodedGroupProperties;
    this._groupSnapshot = groupSnapshot;
    this._logger = logger;
  }

  public async compute(
    chunkSize: number = MAX_CHUNK_SIZE
  ): Promise<AccountTree[]> {
    const accountTrees: AccountTree[] = [];

    // use cache if already computed
    if (await this._fileStore.exists(this._getCacheFilename(chunkSize))) {
      return this._fileStore.read(this._getCacheFilename(chunkSize));
    }

    this._logger.info(
      `Computing merkle trees for groupId ${this.properties.encodedGroupProperties}`
    );
    const groupData = await this._groupSnapshot.resolvedIdentifierData();
    const chunkedData = new ChunkedData(groupData, chunkSize);
    const groupDataFilename = `${this.encodedGroupProperties}.group.json`;
    if (!(await this._fileStore.exists(groupDataFilename))) {
      const groupDataNotResolved = await this._groupSnapshot.data();
      await this._fileStore.write(groupDataFilename, groupDataNotResolved);
    }
    for (const chunk of chunkedData.iterate()) {
      // add groupId: 0 in the group to allow the creation of different account trees root
      // for same generated groups but different group Ids
      chunk.data[this.encodedGroupProperties] = "0";
      const merkleTree = new MerkleTreeHandler(this._fileStore, chunk.data);
      const root = await merkleTree.compute();
      accountTrees.push({
        root: root,
        groupId: this.encodedGroupProperties,
        groupProperties: this.properties,
        encodedGroupProperties: this.encodedGroupProperties,
        chunk: chunk.metadata,
        metadata: {
          ...merkleTree.metadata,
          groupName: this._groupSnapshot.name,
          groupGenerationTimestamp: this._groupSnapshot.timestamp,
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
    return `${hashJson({
      // account tree version schema. Change to invalidate cache and recompute account trees schema
      version: "v1",
      type: "hydraS1AvailableGroup",
      chunkSize,
      encodedGroupProperties: this.encodedGroupProperties,
      properties: this.properties,
      group: {
        name: this._groupSnapshot.name,
        timestamp: this._groupSnapshot.timestamp,
      },
    })}.cache.json`;
  }
}
