import { Attribute, Entity, Table } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { BadgesCollection } from "topics/badge";
import { Flow } from "topics/flow";
import { Network } from "topics/registry-tree";

class GroupGeneratorSchema {
  @Attribute()
  path: string;

  @Attribute()
  registryTree: string;

  @Attribute()
  networks: Network[];

  @Attribute()
  registryTreeType: string;

  @Attribute()
  badgesCollection: BadgesCollection;

  @Attribute()
  badgesInternalCollectionsIds: number[];

  @Attribute()
  title: string;

  @Attribute()
  logoUrl: string | null;

  @Attribute()
  subtitle: string;

  @Attribute()
  onboardingDescription?: string;

  @Attribute()
  ctaLabel: string;

  @Attribute()
  ctaUrl: string;

  @Attribute()
  congratulationTexts: string[];

  toFlow(): Flow {
    return {
      path: this.path,
      registryTree: this.registryTree,
      networks: this.networks,
      registryTreeType: this.registryTreeType,
      badgesCollection: this.badgesCollection,
      badgesInternalCollectionsIds: this.badgesInternalCollectionsIds,
      title: this.title,
      logoUrl: this.logoUrl,
      subtitle: this.subtitle,
      onboardingDescription: this.onboardingDescription,
      ctaLabel: this.ctaLabel,
      ctaUrl: this.ctaUrl,
      congratulationTexts: this.congratulationTexts
    };
  }
}

@Entity({
  name: "flow",
  primaryKey: {
    partitionKey: "FLOW#{{path}}",
    sortKey: "TS#{{path}}"
  },
})
export class FlowModel extends GroupGeneratorSchema {
  static fromFlow(
    flow: Flow
  ): FlowModel {
    const flowModel = new FlowModel();
    flowModel.path = flow.path;
    flowModel.registryTree = flow.registryTree;
    flowModel.networks = flow.networks;
    flowModel.registryTreeType = flow.registryTreeType;
    flowModel.badgesCollection = flow.badgesCollection;
    flowModel.badgesInternalCollectionsIds = flow.badgesInternalCollectionsIds;
    flowModel.title = flow.title;
    flowModel.logoUrl = flow.logoUrl;
    flowModel.subtitle = flow.subtitle;
    flowModel.onboardingDescription = flow.onboardingDescription;
    flowModel.ctaLabel = flow.ctaLabel;
    flowModel.ctaUrl = flow.ctaUrl;
    flowModel.congratulationTexts = flow.congratulationTexts;
    return flowModel;
  }
}

const getDynamoGlobalTable = (name: string) =>
  new Table({
    name,
    partitionKey: "PK",
    sortKey: "SK"
  });

export const createFlowEntityManager = ({
  globalTableName,
  documentClient,
}: {
  globalTableName?: string;
  documentClient: DocumentClientV3;
}) => {
  const table = getDynamoGlobalTable(globalTableName ?? "global-table");
  return createConnection({
    table,
    name: "flow",
    entities: [FlowModel],
    documentClient,
  }).entityManager;
};
