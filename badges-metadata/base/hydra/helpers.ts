import crypto from "crypto";
import { buildPoseidon } from "@sismo-core/crypto";
import { KVMerkleTree } from "@sismo-core/kv-merkle-tree";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { AccountTree, TreesMetadata } from "@badges-metadata/base/hydra";
import { FileStore } from "file-store";

export const hashJson = (data: any) =>
  crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");

export type MerkleTreeMetadata = {
  leavesCount: number;
};

export type MerkleTreeData = { [key: string]: BigNumberish };

export class MerkleTreeHandler {
  protected fileStore: FileStore;
  protected data: { [key: string]: BigNumberish };
  public readonly dataFilename: string;
  public readonly treeFilename: string;
  public readonly treeCompressedV1Filename: string;
  public readonly metadata: MerkleTreeMetadata;

  constructor(fileStore: FileStore, data: MerkleTreeData) {
    this.fileStore = fileStore;
    this.data = data;
    this.dataFilename = MerkleTreeHandler.getDataFilename(data);
    this.treeFilename = MerkleTreeHandler.getTreeFilename(data);
    this.treeCompressedV1Filename = MerkleTreeHandler.getTreeCompressedV1Filename(data);
    this.metadata = {
      leavesCount: Object.keys(this.data).length,
    };
  }

  public async compute(): Promise<string> {
    if (!(await this.fileStore.exists(this.dataFilename))) {
      await this.fileStore.write(this.dataFilename, this.data);
    }
    const tree = await this.createMerkleTreeIfNotExists();
    return tree;
  }

  protected async createMerkleTreeIfNotExists(): Promise<string> {
    if (await this.fileStore.exists(this.treeFilename)) {
      const root = (await this.fileStore.read(this.treeFilename)).root;
      return root;
    }
    const poseidon = await buildPoseidon();
    const tree = new KVMerkleTree(this.data, poseidon, 20);
    const jsonTree = tree.toJson();
    const compressTreeV1 = tree.toCompressedTreeV1();
    await this.fileStore.write(this.treeFilename, jsonTree);
    await this.fileStore.write(this.treeCompressedV1Filename, compressTreeV1, { json: false });
    return jsonTree.root;
  }

  static getTreeFilename(data: any) {
    const hash = hashJson({
      data: data,
      hashFunction: "poseidon",
      height: 20,
      format: "json",
      version: "v4",
    });
    return `${hash}.tree.json`;
  }

  static getTreeCompressedV1Filename(data: any) {
    const hash = hashJson({
      data: data,
      hashFunction: "poseidon",
      format: "compressedV1",
      height: 20,
      version: "v4",
    });
    return `${hash}.treeCompressedV1.zz`;
  }

  static getDataFilename(data: any) {
    return `${hashJson(data)}.data.json`;
  }
}

export const accountTreesAggregatedData = (
  trees: TreesMetadata
): {
  [key: string]: {
    groupName: string;
    groupId: string;
    groupGenerationTimestamp: number;
    leaves: number;
  };
} =>
  trees.accountTrees.reduce(
    (
      acc: {
        [internalCollectionId: string]: {
          groupName: string;
          groupGenerationTimestamp: number;
          groupId: string;
          leaves: number;
        };
      },
      tree: AccountTree
    ) => {
      const key =
        tree.groupProperties.internalCollectionId !== undefined
          ? tree.groupProperties.internalCollectionId.toString()
          : tree.accountsTreeValue;
      return {
        ...acc,
        [key]: {
          groupName: tree.metadata.groupName,
          groupGenerationTimestamp: tree.metadata.groupGenerationTimestamp,
          groupId: tree.groupId,
          leaves:
            tree.metadata.leavesCount +
            (acc[tree.groupProperties.internalCollectionId]
              ? acc[tree.groupProperties.internalCollectionId].leaves
              : 0),
        },
      };
    },
    {}
  );

export const keccak256ToAddress = (content: string) => {
  return BigNumber.from(ethers.utils.keccak256(ethers.utils.formatBytes32String(content)))
    .mod(BigNumber.from(2).pow(160).sub(1))
    .toHexString();
};
