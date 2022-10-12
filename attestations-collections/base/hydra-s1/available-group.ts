import { SNARK_FIELD } from "@sismo-core/crypto";
import { BigNumber, ethers } from "ethers";
import { hashJson, MerkleTreeHandler } from "./helpers";
import { AccountTree, HydraS1AvailableGroupProperties } from ".";
import { FileStore } from "file-store";
import { ChunkedData } from "helpers";
import { LoggerService } from "logger/logger";
import { GroupWithInternalCollectionId } from "topics/attester";
import { Group, ValueType } from "topics/group";

const MAX_CHUNK_SIZE = 50000;

export class HydraS1AvailableGroup {
  public readonly groupId: string;
  public readonly properties: HydraS1AvailableGroupProperties;

  protected _group: Group;
  protected _fileStore: FileStore;
  protected _logger: LoggerService;

  constructor(
    fileStore: FileStore,
    groupWithId: GroupWithInternalCollectionId,
    logger: LoggerService
  ) {
    this._fileStore = fileStore;
    this._group = groupWithId.group;
    this.properties = {
      internalCollectionId: groupWithId.internalCollectionId,
      generationTimestamp: this._group.timestamp,
      isScore: this._group.valueType == ValueType.Score,
    };
    this.groupId = this._getGroupId();
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
    const groupData = await this._group.data();
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
        chunk: chunk.metadata,
        groupProperties: this.properties,
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

  protected _getGroupId(): string {
    return BigNumber.from(
      ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ["uint128", "uint32", "bool"],
          [
            this.properties.internalCollectionId,
            this.properties.generationTimestamp,
            this.properties.isScore,
          ]
        )
      )
    )
      .mod(SNARK_FIELD)
      .toHexString();
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
