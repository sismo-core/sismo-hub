import { SNARK_FIELD } from "@sismo-core/crypto";
import { BigNumber, ethers } from "ethers";
import { GroupSnapshotWithProperties, HydraS1RegistryTreeBuilder } from ".";
import { ValueType } from "topics/group";
import {
  AttestationsCollection,
  RegistryTreeComputeContext,
  RegistryTreeNetworkConfiguration,
} from "topics/registry-tree";

export class HydraS1AccountboundRegistryTreeBuilder extends HydraS1RegistryTreeBuilder {
  private _attestationsCollections: AttestationsCollection[];

  constructor(
    computeContext: RegistryTreeComputeContext,
    networkConfiguration: RegistryTreeNetworkConfiguration,
    attestationsCollections: AttestationsCollection[]
  ) {
    super(computeContext, networkConfiguration);
    this._attestationsCollections = attestationsCollections;
  }

  protected async *fetchGroups(): AsyncGenerator<GroupSnapshotWithProperties> {
    const attestationsCollections = this._attestationsCollections.filter((attestationCollection) =>
      attestationCollection.networks.includes(this.network)
    );
    for (const attestationsCollection of attestationsCollections) {
      const groups = await attestationsCollection.groupFetcher(this._groupStore);
      for (const group of groups) {
        // TODO currently resolving using the latest groupSnapshot
        const groupSnapshot = await this._groupSnapshotStore.latestById(group.id);
        const generationTimestamp = groupSnapshot.timestamp;
        const isScore = group.valueType === ValueType.Score;
        const internalCollectionId = attestationsCollection.internalCollectionId;
        yield {
          groupSnapshot,
          properties: {
            internalCollectionId,
            generationTimestamp,
            isScore,
          },
          accountsTreeValue: BigNumber.from(
            ethers.utils.keccak256(
              ethers.utils.defaultAbiCoder.encode(
                ["uint128", "uint32", "bool"],
                [internalCollectionId, generationTimestamp, isScore]
              )
            )
          )
            .mod(SNARK_FIELD)
            .toHexString(),
        };
      }
    }
  }
}
