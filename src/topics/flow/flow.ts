import { BadgesCollection } from "topics/badge";
import { Network, networkChainIds } from "topics/registry-tree";

export type Flow = {
  path: string;
  registryTree: string;
  networks: Network[];
  registryTreeType: string;
  badgesCollection: BadgesCollection;
  badgesInternalCollectionsIds: number[];
  title: string;
  logoUrl: string | null;
  subtitle: string;
  onboardingDescription?: string;
  ctaLabel: string;
  ctaUrl: string;
  congratulationTexts: string[];
};

export type GeneratedFlow = Omit<
  Flow,
  "networks" | "badgesCollection" | "badgesInternalCollectionsIds"
> & {
  chainId: number;
  badgeIds: number[];
  attester: string;
  attesterType: string;
};

export class FlowService {
  flows: Flow[];
  configuredNetworks: Network[];

  constructor(flows: Flow[], networks: Network[]) {
    this.flows = flows;
    this.configuredNetworks = networks;
  }

  public getFlows(): GeneratedFlow[] {
    const computeBadgeId = (flow: Flow) => {
      const badgeIds = [];
      for (const internalId of flow.badgesInternalCollectionsIds) {
        const badge = flow.badgesCollection.badges.find(
          (badge) => badge.internalCollectionId === internalId
        );
        if (!badge) {
          throw new Error(`Badge not found for internalId ${internalId}`);
        }
        for (const network of flow.networks) {
          if (!badge.networks.includes(network)) {
            throw new Error(`Badge "${badge.name}" is not available for the network ${network}`);
          }
        }
        badgeIds.push(flow.badgesCollection.collectionIdFirst + internalId);
      }
      return badgeIds;
    };
    const filteredFlows = this.flows.filter((flow) => {
      let hasNetwork = false;
      for (const network of flow.networks) {
        hasNetwork = this.configuredNetworks.includes(network);
        if (hasNetwork) {
          return hasNetwork;
        }
      }
      return false;
    });

    const flows: GeneratedFlow[] = [];
    for (const flow of filteredFlows) {
      for (const network of flow.networks) {
        if (this.configuredNetworks.includes(network)) {
          flows.push({
            path: flow.path,
            attester: flow.registryTree,
            registryTree: flow.registryTree,
            attesterType: flow.registryTreeType,
            registryTreeType: flow.registryTreeType,
            chainId: networkChainIds[network],
            badgeIds: computeBadgeId(flow),
            title: flow.title,
            logoUrl: flow.logoUrl,
            subtitle: flow.subtitle,
            onboardingDescription: flow.onboardingDescription,
            ctaLabel: flow.ctaLabel,
            ctaUrl: flow.ctaUrl,
            congratulationTexts: flow.congratulationTexts,
          });
        }
      }
    }
    return flows;
  }
}
