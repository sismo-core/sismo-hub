import { MerkleTreeData } from "@sismo-core/kv-merkle-tree";
import { HydraS1AvailableGroup } from "./available-group";
import { MerkleTreeHandler } from "./helpers";
import { AccountTree } from "./hydra-s1.types";
import { Attester } from "topics/attester";
import { AvailableGroupsMetadata } from "topics/available-data";

export abstract class HydraS1Attester extends Attester {
  protected async makeGroupsAvailable(
    generationTimestamp: number
  ): Promise<AvailableGroupsMetadata> {
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
    const root = await merkleTree.compute();
    const filename = this.getRegistryFilename(generationTimestamp);
    await this.availableGroupStore.write(filename, {
      registryTree: {
        root: root,
        metadata: merkleTree.metadata,
        dataUrl: this.availableGroupStore.url(merkleTree.dataFilename),
        treeUrl: this.availableGroupStore.url(merkleTree.treeFilename),
      },
      accountTrees: accountTrees,
    });
    return { url: this.availableGroupStore.url(filename) };
  }

  public getRegistryFilename(generationTimestamp: number) {
    return `${this.name}.${generationTimestamp}.registry.json`;
  }
}
