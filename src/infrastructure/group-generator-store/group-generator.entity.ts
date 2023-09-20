import { Attribute, Entity, INDEX_TYPE, Table } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { GenerationFrequency, GroupGeneratorGeneration } from "topics/group-generator";

class GroupGeneratorSchema {
  @Attribute()
  name: string;

  @Attribute()
  timestamp: number;

  @Attribute()
  lastGenerationDuration: number | undefined;

  @Attribute()
  generationFrequency: GenerationFrequency | undefined;

  toGroupGeneratorGeneration(): GroupGeneratorGeneration {
    return {
      name: this.name,
      timestamp: this.timestamp,
      generationFrequency: this.generationFrequency,
      lastGenerationDuration: this.lastGenerationDuration,
    };
  }
}

@Entity({
  name: "groupGeneratorGeneration",
  primaryKey: {
    partitionKey: "GROUP_GENERATOR_GENERATION#{{name}}",
    sortKey: "TS#{{timestamp}}",
  },
})
export class GroupGeneratorModel extends GroupGeneratorSchema {
  static fromGroupGeneratorGeneration(
    groupGeneratorGeneration: GroupGeneratorGeneration
  ): GroupGeneratorModel {
    const groupGeneratorGenerationModel = new GroupGeneratorModel();
    groupGeneratorGenerationModel.name = groupGeneratorGeneration.name;
    groupGeneratorGenerationModel.timestamp = groupGeneratorGeneration.timestamp;
    if (groupGeneratorGeneration.generationFrequency) {
      groupGeneratorGenerationModel.generationFrequency =
        groupGeneratorGeneration.generationFrequency;
    }
    if (groupGeneratorGeneration.lastGenerationDuration) {
      groupGeneratorGenerationModel.lastGenerationDuration =
        groupGeneratorGeneration.lastGenerationDuration;
    }
    return groupGeneratorGenerationModel;
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

export const createGroupGeneratorStoreEntityManager = ({
  globalTableName,
  documentClient,
}: {
  globalTableName?: string;
  documentClient: DocumentClientV3;
}) => {
  const table = getDynamoGlobalTable(globalTableName ?? "global-table");
  return createConnection({
    table,
    name: "groupGeneratorStore",
    entities: [GroupGeneratorModel],
    documentClient,
  }).entityManager;
};
