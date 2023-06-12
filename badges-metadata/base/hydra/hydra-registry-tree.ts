import { MerkleTreeData } from "@sismo-core/kv-merkle-tree";
import { HydraS1AvailableGroup } from "./available-group";
import { rootsRegistryInit } from "./infrastructure/roots-registry-init";
import { AccountTree, TreesMetadata, IRootsRegistry } from ".";
import {
  accountTreesAggregatedData,
  MerkleTreeHandler,
} from "@badges-metadata/base/hydra/helpers";
import { AttestationsCollection } from "@badges-metadata/base/hydra/hydra-off-chain-registry-tree";
import { FileStore } from "file-store";
import { chunkArray } from "helpers/chunk-array";
import { LoggerService } from "logger";
import { AvailableDataStore } from "topics/available-data";
import { GroupStore } from "topics/group";
import { GroupSnapshot, GroupSnapshotStore } from "topics/group-snapshot";
import {
  RegistryTreeBuilder,
  RegistryTreeComputeContext,
  RegistryTreeConfiguration,
  RegistryTreeNetworkConfiguration,
  RegistryTreeNetworksConfiguration,
} from "topics/registry-tree";
import { Network } from "topics/registry-tree/networks";

export type GroupSnapshotWithProperties = {
  groupSnapshot: GroupSnapshot;
  properties: any;
  accountsTreeValue: string;
};

const AVAILABLE_GROUPS_CHUNK_SIZE = 200;

export abstract class HydraRegistryTreeBuilder
  implements RegistryTreeBuilder
{
  public name: string;
  public network: Network;

  protected _rootsRegistry: IRootsRegistry;
  protected _logger: LoggerService;
  protected _availableDataStore: AvailableDataStore;
  protected _availableGroupStore: FileStore;
  protected _groupStore: GroupStore;
  protected _groupSnapshotStore: GroupSnapshotStore;

  constructor(
    computeContext: RegistryTreeComputeContext,
    networkConfiguration: RegistryTreeNetworkConfiguration
  ) {
    if (!networkConfiguration) {
      throw new Error(
        "Registry tree configuration not setup for this network!"
      );
    }
    this.name = computeContext.name;
    this.network = computeContext.network;
    this._rootsRegistry = rootsRegistryInit({
      network: computeContext.network,
      attesterAddress: networkConfiguration.attesterAddress ?? "",
      rootsRegistryAddress: networkConfiguration.rootsRegistryAddress,
    });
    this._logger = computeContext.logger;
    this._availableDataStore = computeContext.availableDataStore;
    this._availableGroupStore = computeContext.availableGroupStore;
    this._groupStore = computeContext.groupStore;
    this._groupSnapshotStore = computeContext.groupSnapshotStore;
  }

  async makeGroupsAvailable() {
    const groups = await this.fetchGroups();

    const trees = await this.computeTrees(groups);
    await this._availableGroupStore.write(trees.registryTree.root, trees);
    return trees.registryTree.root;
  }

  public async sendOnChain(identifier: string): Promise<string> {
    this._logger.info(`Registering root ${identifier}...`);
    const hash = await this._rootsRegistry.register(identifier);
    this._logger.info(`Root ${identifier} registered.`);
    this._logger.info(`-> TransactionHash ${hash}.`);
    return hash;
  }

  public async removeOnChain(identifierToKeep: string): Promise<void> {
    const availableData = await this._availableDataStore.search({
      registryTreeName: this.name,
      network: this.network,
      isOnChain: true,
    });
    // Do not delete roots that are less than 24h old
    const limitTimestamp = Math.floor(Date.now() / 1000) - 3600 * 24;
    for (const data of availableData) {
      // Do not unregister on chain if root has not changed
      if (
        identifierToKeep != data.identifier &&
        data.timestamp < limitTimestamp
      ) {
        this._logger.info(`Unregister previous root ${data.identifier}...`);

        const transactionHash = await this._rootsRegistry.unregister(
          data.identifier
        );
        this._logger.info(`Unregistered ${data.identifier}.`);
        this._logger.info(`-> TransactionHash ${transactionHash}.`);
        data.isOnChain = false;
        await this._availableDataStore.save(data);
      }
    }
  }

  async getGroupsAvailableDiff(oldIdentifier: string, newIdentifier: string) {
    const oldAggregatedData = oldIdentifier
      ? accountTreesAggregatedData(
          await this._availableGroupStore.read(oldIdentifier)
        )
      : {};
    const newAggregatedData = accountTreesAggregatedData(
      await this._availableGroupStore.read(newIdentifier)
    );

    let diff = "";
    for (const key in newAggregatedData) {
      if (!oldAggregatedData[key]) {
        const group = newAggregatedData[key];
        diff += `+ New Group (${group.groupName}) for key ${key}\n`;
        diff += `  GroupId: ${group.groupId}\n`;
        diff += `  Timestamp: ${new Date(
          group.groupGenerationTimestamp * 1000
        ).toISOString()}\n`;
        diff += `  Accounts: ${group.leaves}\n`;
      } else {
        const oldGroup = oldAggregatedData[key];
        const newGroup = newAggregatedData[key];
        if (oldGroup.groupId != newGroup.groupId) {
          diff += `~ Modified Group (${oldGroup.groupName}) for key ${key}\n`;
          diff += `  GroupId: ${oldGroup.groupId} -> ${newGroup.groupId}\n`;
          diff += `  Timestamp: ${new Date(
            oldGroup.groupGenerationTimestamp * 1000
          ).toISOString()} -> ${new Date(
            newGroup.groupGenerationTimestamp * 1000
          ).toISOString()}\n`;
          diff += `  Accounts: ${oldGroup.leaves} -> ${newGroup.leaves}\n`;
        }
      }
    }
    for (const key in oldAggregatedData) {
      if (!newAggregatedData[key]) {
        const group = oldAggregatedData[key];
        diff += `- Delete Group (${group.groupName}) for key ${key}\n`;
        diff += `  GroupId: ${group.groupId}\n`;
        diff += `  Timestamp: ${new Date(
          group.groupGenerationTimestamp * 1000
        ).toISOString()}\n`;
        diff += `  Accounts: ${group.leaves}\n`;
      }
    }
    if (!diff) {
      diff += "No changes";
    }
    return diff;
  }

  protected abstract fetchGroups(): Promise<GroupSnapshotWithProperties[]>;

  private async computeTrees(
    groupsWithProperties: GroupSnapshotWithProperties[]
  ): Promise<TreesMetadata> {
    const registryTreeData: MerkleTreeData = {};
    const accountTrees: AccountTree[] = [];

    this._logger.info("Resolving cached data...");
    const availableGroups: HydraS1AvailableGroup[] = [];
    for await (const groupWithProperties of groupsWithProperties) {
      availableGroups.push(
        new HydraS1AvailableGroup(
          this._availableGroupStore,
          this._logger,
          groupWithProperties
        )
      );
    }
    this._logger.info("Cached resolved");

    // First resolve all the cache in parallel
    for(const chunk of chunkArray(availableGroups, AVAILABLE_GROUPS_CHUNK_SIZE)) {
      await Promise.all(chunk.map((availableGroup) => availableGroup.resolveCache()))
    }

    for (const availableGroup of availableGroups) {
      try {
        for (const accountTree of await availableGroup.compute()) {
          accountTrees.push(accountTree);
          registryTreeData[accountTree.root] = accountTree.groupId;
        }
      } catch (e) {
        this._logger.error(
          `Error computing merkle tree for group ${availableGroup.groupWithProperties.groupSnapshot.name}"`,
          e
        );
      }
    }
    const merkleTree = new MerkleTreeHandler(
      this._availableGroupStore,
      registryTreeData
    );
    const registryTreeRoot = await merkleTree.compute();

    this._logger.info(
      `Registry tree root: ${registryTreeRoot}\ncontains ${
        Object.keys(registryTreeData).length
      } accounts trees`
    );

    return {
      registryTree: {
        root: registryTreeRoot,
        metadata: merkleTree.metadata,
        dataUrl: this._availableGroupStore.url(merkleTree.dataFilename),
        treeUrl: this._availableGroupStore.url(merkleTree.treeFilename),
      },
      accountTrees: accountTrees,
    };
  }
}

export const generateHydraS1RegistryTreeConfig = (
  networksConfiguration: RegistryTreeNetworksConfiguration,
  {
    name,
    attestationsCollections,
  }: { name: string; attestationsCollections?: AttestationsCollection[] }
): RegistryTreeConfiguration => {
  return {
    networksConfiguration,
    name,
    attestationsCollections,
  };
};


export const generateHydraS2RegistryTreeConfig = (
  networksConfiguration: RegistryTreeNetworksConfiguration,
  {
    name,
    attestationsCollections,
  }: { name: string; attestationsCollections?: AttestationsCollection[] }
): RegistryTreeConfiguration => { 
  return {
    networksConfiguration,
    name,
    attestationsCollections,
  };
};
