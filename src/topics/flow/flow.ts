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
  onboardingDescription: string;
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

  constructor(flows: Flow[]) {
    this.flows = flows;
  }

  public getFlows() {
    return this.flows.map((flow) => ({
      path: flow.path,
      attester: flow.attester,
      attesterType: flow.attesterType,
      chainId: networkChainIds[flow.network],
      badgeIds: flow.badgesInternalCollectionsIds.map(
        (internalId) =>
          this._getFirstId(flow.badgesCollection, flow.network) + internalId
      ),
      title: flow.title,
      logoUrl: flow.logoUrl,
      subtitle: flow.subtitle,
      onboardingDescription: flow.onboardingDescription,
      ctaLabel: flow.ctaLabel,
      ctaUrl: flow.ctaUrl,
      congratulationTexts: flow.congratulationTexts,
    }));
  }

  private _getFirstId(
    badgeCollection: BadgesCollection,
    network: Network
  ): number {
    const firstCollectionId = badgeCollection.collectionIdFirsts[network];
    if (!firstCollectionId) {
      throw new Error(
        `Invalid flow configuration. Badge collection does not have ${network} network configuration`
      );
    }
    return firstCollectionId;
  }
}
