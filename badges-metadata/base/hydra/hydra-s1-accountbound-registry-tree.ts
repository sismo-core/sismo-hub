import { SNARK_FIELD } from "@sismo-core/crypto";
import { BigNumber, ethers } from "ethers";
import { GroupSnapshotWithProperties, HydraRegistryTreeBuilder } from ".";
import { chunkArray } from "helpers/chunk-array";
import { ValueType } from "topics/group";
import {
  RegistryTreeComputeContext,
  RegistryTreeNetworkConfiguration,
  AttestationsCollection
} from "topics/registry-tree";


const ATTESTATIONS_COLLECTIONS_CHUNK_SIZE = 200;

export class HydraS1AccountboundRegistryTreeBuilder extends HydraRegistryTreeBuilder {
  private _attestationsCollections: AttestationsCollection[];

  constructor(
    computeContext: RegistryTreeComputeContext,
    networkConfiguration: RegistryTreeNetworkConfiguration,
    attestationsCollections: AttestationsCollection[]
  ) {
    super(computeContext, networkConfiguration);
    this._attestationsCollections = attestationsCollections;
  }

  protected async fetchGroups(): Promise<GroupSnapshotWithProperties[]> {
    const attestationsCollections = this._attestationsCollections.filter((attestationCollection) =>
      attestationCollection.networks.includes(this.network)
    );
    const groupSnapshots: GroupSnapshotWithProperties[] = [];
    const resolveGroupSnapshot = async (attestationsCollection: AttestationsCollection) => {
      const groups = await attestationsCollection.groupFetcher(this._groupStore);
      for (const group of groups) {
        // TODO currently resolving using the latest groupSnapshot
        const groupSnapshot = await this._groupSnapshotStore.latestById(group.id);
        const generationTimestamp = groupSnapshot.timestamp;
        const isScore = group.valueType === ValueType.Score;
        const internalCollectionId = attestationsCollection.internalCollectionId;
        groupSnapshots.push( {
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
        });
      }
    };

    for (const chunkedAttestationsCollections of chunkArray(attestationsCollections, ATTESTATIONS_COLLECTIONS_CHUNK_SIZE)) {
      await Promise.all(chunkedAttestationsCollections.map(resolveGroupSnapshot));
    }

    return groupSnapshots;
  }

}


