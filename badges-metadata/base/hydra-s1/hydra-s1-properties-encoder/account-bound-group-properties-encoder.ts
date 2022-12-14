import { SNARK_FIELD } from "@sismo-core/crypto";
import { BigNumber, ethers } from "ethers";
import { ValueType } from "topics/group";
import {
  GroupPropertiesEncoder,
  GroupProperties,
} from "topics/group-properties-encoder/group-properties-encoder";

export interface HydraS1AccountboundGroupProperties extends GroupProperties {
  generationTimestamp: number;
  isScore: boolean;
  cooldownDuration: number;
}

export class AccountBoundGroupPropertiesEncoder extends GroupPropertiesEncoder {
  public getProperties(): HydraS1AccountboundGroupProperties {
    return {
      internalCollectionId: this.attestationsCollection.internalCollectionId,
      generationTimestamp: this.group.timestamp,
      cooldownDuration:
        this.attestationsCollection.additionalGroupProperties.cooldownDuration,
      isScore: this.group.valueType === ValueType.Score,
    };
  }

  public getGroupId() {
    const properties = this.getProperties();
    return BigNumber.from(
      ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ["uint128", "uint32", "uint32", "bool"],
          [
            properties.internalCollectionId,
            properties.generationTimestamp,
            properties.cooldownDuration,
            properties.isScore,
          ]
        )
      )
    )
      .mod(SNARK_FIELD)
      .toHexString();
  }
}
