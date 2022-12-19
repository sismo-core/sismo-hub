import { Network, networkChainIds } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export type Flow = {
  path: string;
  attester: string;
  network: Network;
  attesterType: string;
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

export type GeneratedFlow = Pick<
  Flow,
  | "path"
  | "title"
  | "logoUrl"
  | "subtitle"
  | "onboardingDescription"
  | "ctaLabel"
  | "ctaUrl"
  | "congratulationTexts"
> & {
  attester: string;
  chainId: number;
  badgeIds: number[];
};

export class FlowService {
  flows: Flow[];
  configuredNetworks: Network[];

  constructor(flows: Flow[], networks: Network[]) {
    this.flows = flows;
    this.configuredNetworks = networks;
  }

  public getFlows() {
    const computeBadgeId = (flow: Flow) => {
      const badgeIds = [];
      for (const internalId of flow.badgesInternalCollectionsIds) {
        const badge = flow.badgesCollection.badges.find(
          (badge) => badge.internalCollectionId === internalId
        );
        if (!badge) {
          throw new Error(`Badge not found for internalId ${internalId}`);
        }
        if (!badge.networks.includes(flow.network)) {
          throw new Error(
            `Badge "${badge.name}" is not available for the network ${flow.network}`
          );
        }
        badgeIds.push(flow.badgesCollection.collectionIdFirst + internalId);
      }
      return badgeIds;
    };
    return this.flows
      .filter((flow) => this.configuredNetworks.includes(flow.network))
      .map((flow) => ({
        path: flow.path,
        attester: flow.attester,
        attesterType: flow.attesterType,
        chainId: networkChainIds[flow.network],
        badgeIds: computeBadgeId(flow),
        title: flow.title,
        logoUrl: flow.logoUrl,
        subtitle: flow.subtitle,
        onboardingDescription: flow.onboardingDescription,
        ctaLabel: flow.ctaLabel,
        ctaUrl: flow.ctaUrl,
        congratulationTexts: flow.congratulationTexts,
      }));
  }
}
