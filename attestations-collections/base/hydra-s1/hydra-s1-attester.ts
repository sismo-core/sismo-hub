import { MerkleTreeData } from "@sismo-core/kv-merkle-tree";
import { HydraS1AvailableGroup } from "./available-group";
import { MerkleTreeHandler } from "./helpers";
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
  GroupWithInternalCollectionId,
  Network,
} from "topics/attester";

export type RootsRegistryFactory = (
  computeContext: AttesterComputeContext,
  networkConfiguration: HydraS1NetworkConfiguration
) => IRootsRegistry;

export const generateHydraS1Attester = (
  networksConfiguration: { [network in Network]?: HydraS1NetworkConfiguration },
  config: Omit<Attester, "sendOnChain" | "makeGroupsAvailable" | "isOnChain">,
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

    isOnChain: async (
      identifier,
      computeContext: AttesterComputeContext
    ): Promise<boolean> => {
      const rootsRegistry = rootsRegistryFactory(
        computeContext,
        getNetworkConfiguration(networksConfiguration, computeContext.network)
      );
      return rootsRegistry.isAvailable(identifier);
    },

    sendOnChain: async (
      identifier,
      computeContext: AttesterComputeContext
    ): Promise<string> => {
      const rootsRegistry = rootsRegistryFactory(
        computeContext,
        getNetworkConfiguration(networksConfiguration, computeContext.network)
      );
      computeContext.logger.info(`Registering root ${identifier}...`);
      const hash = await rootsRegistry.register(identifier);
      computeContext.logger.info(`Root ${identifier} registered.`);
      computeContext.logger.info(`-> TransactionHash ${hash}.`);
      await removeOldOnChain(computeContext, rootsRegistry, identifier);
      return hash;
    },
  } as Attester);

const computeTrees = async (
  groups: AsyncGenerator<GroupWithInternalCollectionId>,
  computeContext: AttesterComputeContext
): Promise<TreesMetadata> => {
  const registryTreeData: MerkleTreeData = {};
  const accountTrees: AccountTree[] = [];

  for await (const group of groups) {
    const availableGroup = new HydraS1AvailableGroup(
      computeContext.availableGroupStore,
      group
    );
    computeContext.logger.info(
      `Computing merkle trees for internalCollectionId ${group.internalCollectionId}`
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
    `Registry tree contains ${
      Object.keys(registryTreeData).length
    } accounts trees`
  );
  computeContext.logger.info(`Registry tree root: ${registryTreeRoot}`);

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

const removeOldOnChain = async (
  computeContext: AttesterComputeContext,
  rootRegistry: IRootsRegistry,
  currentRoot: string
) => {
  const availableData = await computeContext.availableDataStore.search({
    attesterName: computeContext.name,
    network: computeContext.network,
    isOnChain: true,
  });
  for (const data of availableData) {
    // Do not unregister on chain if root has not changed
    if (currentRoot != data.identifier) {
      computeContext.logger.info(
        `Unregister previous root ${data.identifier}...`
      );

      const transactionHash = await rootRegistry.unregister(data.identifier);
      computeContext.logger.info(`Unregistered ${data.identifier}.`);
      computeContext.logger.info(`-> TransactionHash ${transactionHash}.`);
    }
    data.isOnChain = false;
    await computeContext.availableDataStore.save(data);
  }
};

const getNetworkConfiguration = (
  networksConfiguration: { [network in Network]?: HydraS1NetworkConfiguration },
  network: Network
) => {
  const networkConfiguration = networksConfiguration[network];
  if (!networkConfiguration) {
    throw new Error(
      `Network configuration is not configured for network ${network}`
    );
  }
  return networkConfiguration;
};
