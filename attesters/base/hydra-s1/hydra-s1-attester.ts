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
import { Attester, Network } from "topics/attester";

export abstract class HydraS1Attester extends Attester<HydraS1NetworkConfiguration> {
  protected async makeGroupsAvailable(): Promise<string> {
    const trees = await this._computeTrees();
    await this.availableGroupStore.write(trees.registryTree.root, trees);
    return trees.registryTree.root;
  }

  /* istanbul ignore next  */
  protected async getRootsRegistry(
    network: Network,
    networkConfiguration: HydraS1NetworkConfiguration
  ): Promise<IRootsRegistry> {
    return new OnChainRootsRegistry(
      network,
      networkConfiguration.attesterAddress,
      networkConfiguration.rootsRegistryAddress
    );
  }

  protected async sendOnChain(
    network: Network,
    networkConfiguration: HydraS1NetworkConfiguration,
    identifier: string
  ): Promise<string> {
    const rootsRegistry = await this.getRootsRegistry(
      network,
      networkConfiguration
    );
    const hash = await rootsRegistry.register(identifier);
    await this._removeOldOnChain(rootsRegistry, network);
    return hash;
  }

  private async _computeTrees(): Promise<TreesMetadata> {
    const registryTreeData: MerkleTreeData = {};
    const accountTrees: AccountTree[] = [];

    for await (const group of this.fetchGroups()) {
      const availableGroup = new HydraS1AvailableGroup(
        this.availableGroupStore,
        group
      );
      for (const accountTree of await availableGroup.compute()) {
        accountTrees.push(accountTree);
        registryTreeData[accountTree.root] = accountTree.id;
      }
    }
    const merkleTree = new MerkleTreeHandler(
      this.availableGroupStore,
      registryTreeData
    );

    return {
      registryTree: {
        root: await merkleTree.compute(),
        metadata: merkleTree.metadata,
        dataUrl: this.availableGroupStore.url(merkleTree.dataFilename),
        treeUrl: this.availableGroupStore.url(merkleTree.treeFilename),
      },
      accountTrees: accountTrees,
    };
  }

  private async _removeOldOnChain(
    rootRegistry: IRootsRegistry,
    network: Network
  ) {
    const availableData = await this.availableDataStore.search({
      attesterName: this.name,
      network,
      isOnChain: true,
    });
    for (const data of availableData) {
      await rootRegistry.unregister(data.identifier);
      data.isOnChain = false;
      await this.availableDataStore.save(data);
    }
  }
}
