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
    // for now we use only latest
    const timestamp = "latest";
    const groupSnapshots = await this._groupSnapshotStore.all();
    for (const groupSnapshot of Object.values(groupSnapshots)) {
      const groupId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(groupSnapshot.groupId));
      const encodedTimestamp =
        timestamp === "latest"
          ? BigNumber.from(ethers.utils.formatBytes32String("latest")).shr(128)
          : BigNumber.from(timestamp);

      const groupSnapshotId = ethers.utils.solidityPack(
        ["uint128", "uint128"],
        [groupId, encodedTimestamp]
      );

      const accountsTreeValue = BigNumber.from(groupSnapshotId).mod(SNARK_FIELD).toHexString();

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
