import { SNARK_FIELD } from "@sismo-core/crypto";
import { BigNumber, ethers } from "ethers";
import { ValueType } from "topics/group";
import {
  GroupPropertiesEncoder,
  GroupProperties,
} from "topics/group-properties-encoder/group-properties-encoder";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HydraS1SimpleGroupProperties extends GroupProperties {
  generationTimestamp: number;
  isScore: boolean;
}

export class SimpleGroupPropertiesEncoder extends GroupPropertiesEncoder {
  public getProperties(): HydraS1SimpleGroupProperties {
    return {
      internalCollectionId: this.attestationsCollection.internalCollectionId,
      generationTimestamp: this.group.timestamp,
      isScore: this.group.valueType === ValueType.Score,
    };
  }

  public getGroupId() {
    const properties = this.getProperties();
    return BigNumber.from(
      ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ["uint128", "uint32", "bool"],
          [
            properties.internalCollectionId,
            properties.generationTimestamp,
            properties.isScore,
          ]
        )
      )
    )
      .mod(SNARK_FIELD)
      .toHexString();
  }
}
