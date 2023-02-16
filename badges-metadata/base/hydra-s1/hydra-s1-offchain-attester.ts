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
    console.log("Inside offchain attester");
    const groups = await this._groupStore.latests();
    console.log("groups", groups);
    const groupSnapshots = await this._groupSnapshotStore.latests();
    for (const groupSnapshot of Object.values(groupSnapshots)) {
      const groupId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(groupSnapshot.groupId)
      );
      // const timestamp = groupSnapshot.timestamp;
      const timestamp = ethers.utils.formatBytes32String("latest");
      console.log("timestamp", timestamp);
      const accountsTreeValue = BigNumber.from(
        ethers.utils.keccak256(
          ethers.utils.defaultAbiCoder.encode(
            ["bytes32", "bytes32"],
            [groupId, timestamp]
          )
        )
      )
        .mod(SNARK_FIELD)
        .toHexString();
      yield {
        groupSnapshot,
        properties: {
          groupId: groupSnapshot.groupId,
          timestamp: "latest",
        },
        accountsTreeValue,
      };
    }
  }
}
