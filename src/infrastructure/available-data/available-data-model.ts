import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";
import { Network } from "topics/attester";
import { AvailableData } from "topics/available-data";

class AvailableDataModelSchema {
  @Attribute()
  attesterName: string;

  @Attribute()
  timestamp: number;

  @Attribute()
  network: string;

  @Attribute()
  identifier: string;

  @Attribute()
  transactionHash: string;

  @Attribute()
  isOnChain: boolean;

  toAvailableData(): AvailableData {
    return {
      attesterName: this.attesterName,
      timestamp: this.timestamp,
      network: this.network as Network,
      identifier: this.identifier,
      isOnChain: this.isOnChain,
      transactionHash: this.transactionHash,
    };
  }
}

@Entity({
  name: "availableData",
  primaryKey: {
    partitionKey: "AVAILABLE_DATA#{{attesterName}}#{{network}}",
    sortKey: "TS#{{timestamp}}",
  },
  indexes: {
    GSI1: {
      partitionKey:
        "AVAILABLE_DATA#{{attesterName}}#{{network}}#IS_ON_CHAIN#{{isOnChain}}",
      sortKey: "TS#{{timestamp}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class AvailableDataModel extends AvailableDataModelSchema {
  static fromAvailableData(availableData: AvailableData): AvailableDataModel {
    const availableDataModel = new AvailableDataModel();
    availableDataModel.attesterName = availableData.attesterName;
    availableDataModel.timestamp = availableData.timestamp;
    availableDataModel.identifier = availableData.identifier;
    if (availableData.transactionHash) {
      availableDataModel.transactionHash = availableData.transactionHash;
    }
    availableDataModel.isOnChain = availableData.isOnChain;
    availableDataModel.network = availableData.network;
    return availableDataModel;
  }
}
