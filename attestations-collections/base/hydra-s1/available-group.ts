import { hashJson, MerkleTreeHandler } from "./helpers";
import { AccountTree } from ".";
import { HydraS1GroupProperties } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder/hydra-s1-properties";
import { FileStore } from "file-store";
import { ChunkedData } from "helpers";
import { LoggerService } from "logger/logger";
import { Group } from "topics/group";
import { GroupPropertiesEncoder } from "topics/group-properties-encoder";

const MAX_CHUNK_SIZE = 50000;

export class HydraS1AvailableGroup {
  public readonly groupId: string;
  public readonly properties: HydraS1GroupProperties;

  protected _group: Group;
  protected _fileStore: FileStore;
  protected _logger: LoggerService;

  constructor(
    fileStore: FileStore,
    logger: LoggerService,
    group: Group,
    propertiesEncoder: GroupPropertiesEncoder
  ) {
    this._fileStore = fileStore;
    this.properties =
      propertiesEncoder.getProperties() as HydraS1GroupProperties;
    this.groupId = propertiesEncoder.getGroupId();
    this._group = group;
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
      `Computing merkle trees for internalCollectionId ${this.properties.internalCollectionId}`
    );
    const groupData = await this._group.resolvedIdentifierData();
    const chunkedData = new ChunkedData(groupData, chunkSize);
    const groupDataFilename = `${this.groupId}.group.json`;
    if (!(await this._fileStore.exists(groupDataFilename))) {
      await this._fileStore.write(groupDataFilename, groupData);
    }
    for (const chunk of chunkedData.iterate()) {
      // add groupId: 0 in the group to allow the creation of different account trees root
      // for same generated groups but different group Ids
      chunk.data[this.groupId] = "0";
      const merkleTree = new MerkleTreeHandler(this._fileStore, chunk.data);
      const root = await merkleTree.compute();
      accountTrees.push({
        root: root,
        groupId: this.groupId,
        groupProperties: this.properties,
        chunk: chunk.metadata,
        metadata: {
          ...merkleTree.metadata,
          groupName: this._group.name,
          groupGenerationTimestamp: this._group.timestamp,
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
      groupId: this.groupId,
      properties: this.properties,
      group: {
        name: this._group.name,
        timestamp: this._group.timestamp,
      },
    })}.cache.json`;
  }
}
