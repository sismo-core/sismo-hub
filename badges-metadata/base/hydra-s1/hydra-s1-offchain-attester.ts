import { SNARK_FIELD } from "@sismo-core/crypto";
import { BigNumber, ethers } from "ethers";
import { GroupSnapshotWithProperties, HydraS1RegistryTreeBuilder } from ".";
import { Network } from "topics/attester/networks";
import { Group, GroupStore } from "topics/group";

export type AttestationsCollection = {
  internalCollectionId: number;
  groupFetcher: (groupStore: GroupStore) => Promise<Group[]>;
  networks: Network[];
  additionalGroupProperties?: any;
};

export class HydraS1OffchainRegistryTreeBuilder extends HydraS1RegistryTreeBuilder {
  protected async *fetchGroups(): AsyncGenerator<GroupSnapshotWithProperties> {
    const groups = await this._groupStore.all();
    for (const group of Object.values(groups)) {
      // taking only latest for now -> to be changed
      const groupSnapshot = await this._groupSnapshotStore.latestById(group.id);
      const timestamp = "latest";

      const encodedTimestamp =
        timestamp === "latest"
          ? BigNumber.from(ethers.utils.formatBytes32String("latest")).shr(128)
          : BigNumber.from(timestamp);

      const groupSnapshotId = ethers.utils.solidityPack(
        ["uint128", "uint128"],
        [group.id, encodedTimestamp]
      );

      const accountsTreeValue = BigNumber.from(groupSnapshotId)
        .mod(SNARK_FIELD)
        .toHexString();

      yield {
        groupSnapshot,
        properties: {
          groupId: groupSnapshot.groupId,
          timestamp,
        },
        accountsTreeValue,
      };
    }
  }
}
