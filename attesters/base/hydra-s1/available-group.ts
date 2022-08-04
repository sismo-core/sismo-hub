import { SNARK_FIELD } from "@sismo-core/crypto";
import { BigNumber, ethers } from "ethers";
import { MerkleTreeHandler } from "./helpers";
import { AccountTree, HydraS1AvailableGroupProperties } from ".";
import FileStore from "file-store";
import { ChunkedData } from "helpers";
import { GroupWithInternalCollectionIdType } from "topics/attester";
import { Group, ValueType } from "topics/group";

const MAX_CHUNK_SIZE = 50000;

export class HydraS1AvailableGroup {
  public readonly id: string;
  public readonly properties: HydraS1AvailableGroupProperties;

  protected group: Group;
  protected fileStore: FileStore;

  constructor(
    fileStore: FileStore,
    groupWithId: GroupWithInternalCollectionIdType
  ) {
    this.fileStore = fileStore;
    this.group = groupWithId.group;
    this.properties = {
      internalCollectionId: groupWithId.internalCollectionId,
      generationTimestamp: this.group.timestamp,
      isScore: this.group.valueType == ValueType.Score,
    };
    this.id = this.getId();
  }

  public async compute(chunkSize?: number): Promise<AccountTree[]> {
    const accountTrees: AccountTree[] = [];
    const chunkedData = new ChunkedData(
      await this.group.data(),
      chunkSize ?? MAX_CHUNK_SIZE
    );
    for (const chunk of chunkedData.iterate()) {
      const merkleTree = new MerkleTreeHandler(this.fileStore, chunk.data);
      const root = await merkleTree.compute();
      accountTrees.push({
        root: root,
        id: this.id,
        chunk: chunk.metadata,
        group: this.properties,
        metadata: merkleTree.metadata,
        dataUrl: this.fileStore.url(merkleTree.dataFilename),
        treeUrl: this.fileStore.url(merkleTree.treeFilename),
      });
    }
    return accountTrees;
  }

  protected getId(): string {
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
}
