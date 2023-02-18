import crypto from "crypto";
import { buildPoseidon } from "@sismo-core/crypto";
import { KVMerkleTree } from "@sismo-core/kv-merkle-tree";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { AccountTree, TreesMetadata } from "@badges-metadata/base/hydra-s1";
import { FileStore } from "file-store";

export const hashJson = (data: any) =>
  crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");

export type MerkleTreeMetadata = {
  leavesCount: number;
};

export class MerkleTreeHandler {
  protected fileStore: FileStore;
  protected data: { [key: string]: BigNumberish };
  public readonly dataFilename: string;
  public readonly treeFilename: string;
  public readonly metadata: MerkleTreeMetadata;

  constructor(fileStore: FileStore, data: { [key: string]: BigNumberish }) {
    this.fileStore = fileStore;
    this.data = data;
    this.dataFilename = MerkleTreeHandler.getDataFilename(data);
    this.treeFilename = MerkleTreeHandler.getTreeFilename(data);
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
    const tree = new KVMerkleTree(
      this.data,
      await buildPoseidon(),
      20
    ).toJson();
    await this.fileStore.write(this.treeFilename, tree);
    return tree.root;
  }

  static getTreeFilename(data: any) {
    const hash = hashJson({
      data: data,
      hashFunction: "poseidon",
      height: 20,
    });
    return `${hash}.tree.json`;
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
  return BigNumber.from(
    ethers.utils.keccak256(ethers.utils.formatBytes32String(content))
  )
    .mod(BigNumber.from(2).pow(160).sub(1))
    .toHexString();
};
