import { MerkleTreeData } from "@sismo-core/kv-merkle-tree";
import { HydraS1AvailableGroup } from "./available-group";
import { accountTreesAggregatedData, MerkleTreeHandler } from "./helpers";
import {
  AccountTree,
  HydraS1NetworkConfiguration,
  TreesMetadata,
} from "./hydra-s1.types";
import { OnChainRootsRegistry } from "./infrastructure";
import { IRootsRegistry } from ".";
import {
  Attester,
  AttesterComputeContext,
  GroupWithProperties,
} from "topics/attester";

export type RootsRegistryFactory = (
  computeContext: AttesterComputeContext,
  networkConfiguration: HydraS1NetworkConfiguration
) => IRootsRegistry;

export const generateHydraS1Attester = (
  networkConfiguration: HydraS1NetworkConfiguration,
  config: Omit<
    Attester,
    | "sendOnChain"
    | "makeGroupsAvailable"
    | "removeOnChain"
    | "getGroupsAvailableDiff"
  >,
  /* istanbul ignore next  */
  rootsRegistryFactory: RootsRegistryFactory = getRootsRegistry
): Attester =>
  ({
    ...config,

    makeGroupsAvailable: async (groups, computeContext) => {
      const trees = await computeTrees(groups, computeContext);
      await computeContext.availableGroupStore.write(
        trees.registryTree.root,
        trees
      );
      return trees.registryTree.root;
    },

    sendOnChain: async (
      identifier,
      computeContext: AttesterComputeContext
    ): Promise<string> => {
      const rootsRegistry = rootsRegistryFactory(
        computeContext,
        networkConfiguration
      );

      computeContext.logger.info(`Registering root ${identifier}...`);
      const hash = await rootsRegistry.register(identifier);
      computeContext.logger.info(`Root ${identifier} registered.`);
      computeContext.logger.info(`-> TransactionHash ${hash}.`);
      return hash;
    },

    removeOnChain: async (
      identifierToKeep,
      computeContext: AttesterComputeContext
    ): Promise<void> => {
      const rootsRegistry = rootsRegistryFactory(
        computeContext,
        networkConfiguration
      );
      const availableData = await computeContext.availableDataStore.search({
        attesterName: computeContext.name,
        network: computeContext.network,
        isOnChain: true,
      });
      for (const data of availableData) {
        // Do not unregister on chain if root has not changed
        if (identifierToKeep != data.identifier) {
          computeContext.logger.info(
            `Unregister previous root ${data.identifier}...`
          );

          const transactionHash = await rootsRegistry.unregister(
            data.identifier
          );
          computeContext.logger.info(`Unregistered ${data.identifier}.`);
          computeContext.logger.info(`-> TransactionHash ${transactionHash}.`);
          data.isOnChain = false;
          await computeContext.availableDataStore.save(data);
        }
      }
    },

    getGroupsAvailableDiff: async (
      oldIdentifier: string,
      newIdentifier: string,
      computeContext: AttesterComputeContext
    ) => {
      const oldAggregatedData = oldIdentifier
        ? accountTreesAggregatedData(
            await computeContext.availableGroupStore.read(oldIdentifier)
          )
        : {};
      const newAggregatedData = accountTreesAggregatedData(
        await computeContext.availableGroupStore.read(newIdentifier)
      );

      let diff = "";
      for (const internalCollectionId in newAggregatedData) {
        if (!oldAggregatedData[internalCollectionId]) {
          const group = newAggregatedData[internalCollectionId];
          diff += `+ New Group (${group.groupName}) for internalCollectionId ${internalCollectionId}\n`;
          diff += `  GroupId: ${group.groupId}\n`;
          diff += `  Timestamp: ${new Date(
            group.groupGenerationTimestamp * 1000
          ).toISOString()}\n`;
          diff += `  Accounts: ${group.leaves}\n`;
        } else {
          const oldGroup = oldAggregatedData[internalCollectionId];
          const newGroup = newAggregatedData[internalCollectionId];
          if (oldGroup.groupId != newGroup.groupId) {
            diff += `~ Modified Group (${oldGroup.groupName}) for internalCollectionId ${internalCollectionId}\n`;
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
      for (const internalCollectionId in oldAggregatedData) {
        if (!newAggregatedData[internalCollectionId]) {
          const group = oldAggregatedData[internalCollectionId];
          diff += `- Delete Group (${group.groupName}) for internalCollectionId ${internalCollectionId}\n`;
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
    },
  } as Attester);

const computeTrees = async (
  groupsWithProperties: AsyncGenerator<GroupWithProperties>,
  computeContext: AttesterComputeContext
): Promise<TreesMetadata> => {
  const registryTreeData: MerkleTreeData = {};
  const accountTrees: AccountTree[] = [];

  for await (const groupWithProperties of groupsWithProperties) {
    const availableGroup = new HydraS1AvailableGroup(
      computeContext.availableGroupStore,
      computeContext.logger,
      groupWithProperties.group,
      groupWithProperties.groupPropertiesEncoder
    );
    for (const accountTree of await availableGroup.compute()) {
      accountTrees.push(accountTree);
      registryTreeData[accountTree.root] = accountTree.groupId;
    }
  }
  const merkleTree = new MerkleTreeHandler(
    computeContext.availableGroupStore,
    registryTreeData
  );
  const registryTreeRoot = await merkleTree.compute();

  computeContext.logger.info(
    `Registry tree root: ${registryTreeRoot}\ncontains ${
      Object.keys(registryTreeData).length
    } accounts trees`
  );

  return {
    registryTree: {
      root: registryTreeRoot,
      metadata: merkleTree.metadata,
      dataUrl: computeContext.availableGroupStore.url(merkleTree.dataFilename),
      treeUrl: computeContext.availableGroupStore.url(merkleTree.treeFilename),
    },
    accountTrees: accountTrees,
  };
};

/* istanbul ignore next  */
const getRootsRegistry: RootsRegistryFactory = (
  computeContext: AttesterComputeContext,
  networkConfiguration: HydraS1NetworkConfiguration
) =>
  new OnChainRootsRegistry(
    computeContext.network,
    networkConfiguration.attesterAddress,
    networkConfiguration.rootsRegistryAddress
  );
