import { SNARK_FIELD } from "@sismo-core/crypto";
import { BigNumber, ethers } from "ethers";
import { GroupSnapshotWithProperties, HydraS1RegistryTreeBuilder } from ".";
import {
  AttestationsCollection,
  AttesterComputeContext,
  RegistryTreeNetworkConfiguration,
} from "topics/attester";
import { ValueType } from "topics/group";

export class HydraS1AccountboundRegistryTreeBuilder extends HydraS1RegistryTreeBuilder {
  private _attestationsCollections: AttestationsCollection[];

  constructor(
    computeContext: AttesterComputeContext,
    networkConfiguration: RegistryTreeNetworkConfiguration,
    attestationsCollections: AttestationsCollection[]
  ) {
    super(computeContext, networkConfiguration);
    this._attestationsCollections = attestationsCollections;
  }

  protected async *fetchGroups(): AsyncGenerator<GroupSnapshotWithProperties> {
    console.log("Inside accountbound attester");
    const attestationsCollections = this._attestationsCollections.filter(
      (attestationCollection) =>
        attestationCollection.networks.includes(this.network)
    );
    for (const attestationsCollection of attestationsCollections) {
      console.log("attestationsCollection", attestationsCollection);
      for (const group of await attestationsCollection.groupFetcher(
        this._groupStore
      )) {
        // TODO resolve group to groupSnapshot
        const generationTimestamp = group.timestamp;
        const isScore = group.valueType === ValueType.Score;
        const internalCollectionId =
          attestationsCollection.internalCollectionId;
        yield {
          groupSnapshot: { groupId: group.id, ...group },
          properties: {
            internalCollectionId,
            generationTimestamp,
            isScore,
          },
          encodedProperties: BigNumber.from(
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
