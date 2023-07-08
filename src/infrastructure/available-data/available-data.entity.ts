import { Attribute, Entity, INDEX_TYPE, Table } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { AvailableData } from "topics/available-data";
import { Network } from "topics/registry-tree";

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
      registryTreeName: this.attesterName,
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
      partitionKey: "AVAILABLE_DATA#{{attesterName}}#{{network}}#IS_ON_CHAIN#{{isOnChain}}",
      sortKey: "TS#{{timestamp}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class AvailableDataModel extends AvailableDataModelSchema {
  static fromAvailableData(availableData: AvailableData): AvailableDataModel {
    const availableDataModel = new AvailableDataModel();
    availableDataModel.attesterName = availableData.registryTreeName;
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

const getDynamoGlobalTable = (name: string) =>
  new Table({
    name,
    partitionKey: "PK",
    sortKey: "SK",
    indexes: {
      GSI1: {
        type: INDEX_TYPE.GSI,
        partitionKey: "GSI1PK",
        sortKey: "GSI1SK",
      },
    },
  });

export const createAvailableDataEntityManager = ({
  globalTableName,
  documentClient,
}: {
  globalTableName?: string;
  documentClient: DocumentClientV3;
}) => {
  const table = getDynamoGlobalTable(globalTableName ?? "global-table");
  return createConnection({
    table,
    name: "availableData",
    entities: [AvailableDataModel],
    documentClient,
  }).entityManager;
};
