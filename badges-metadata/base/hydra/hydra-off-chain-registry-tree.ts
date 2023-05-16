import { SNARK_FIELD } from "@sismo-core/crypto";
import { BigNumber, ethers } from "ethers";
import { GroupSnapshotWithProperties, HydraRegistryTreeBuilder } from ".";
import { chunkArray } from "helpers/chunk-array";
import { Group, GroupStore } from "topics/group";
import { Network } from "topics/registry-tree/networks";

export type AttestationsCollection = {
  internalCollectionId: number;
  groupFetcher: (groupStore: GroupStore) => Promise<Group[]>;
  networks: Network[];
  additionalGroupProperties?: any;
};

const GROUPS_CHUNK_SIZE = 200;

export class HydraS1OffchainRegistryTreeBuilder extends HydraRegistryTreeBuilder {
  async fetchGroups(): Promise<GroupSnapshotWithProperties[]> {
    const groups = Object.values(await this._groupStore.all());
    const groupSnapshots = [];

    for(const chunk of chunkArray(groups, GROUPS_CHUNK_SIZE)) {
      const resolvedChunks = await Promise.all(chunk.map((group) => this._groupSnapshotStore.latestById(group.id)));
      for (const groupSnapshot of resolvedChunks) {
        // taking only latest for now -> to be changed
        const timestamp = "latest";
  
        const encodedTimestamp =
          timestamp === "latest"
            ? BigNumber.from(ethers.utils.formatBytes32String("latest")).shr(128)
            : BigNumber.from(timestamp);
  
        const groupSnapshotId = ethers.utils.solidityPack(
          ["uint128", "uint128"],
          [groupSnapshot.groupId, encodedTimestamp]
        );
  
        const accountsTreeValue = BigNumber.from(groupSnapshotId)
          .mod(SNARK_FIELD)
          .toHexString();
        
        groupSnapshots.push({
          groupSnapshot,
          properties: {
            groupId: groupSnapshot.groupId,
            timestamp,
          },
          accountsTreeValue,
        });
      }
    }
    return groupSnapshots;
  }
}
