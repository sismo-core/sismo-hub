import { Attester, Network, networkChainIds } from "topics/attester";

export type Flow = {
  path: string;
  attester: Attester;
  network: Network;
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
      attester: flow.attester.name,
      chainId: networkChainIds[flow.network],
      badgeIds: flow.badgesInternalCollectionsIds.map(
        (internalId) =>
          this._getFirstId(flow.attester, flow.network) + internalId
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

  private _getFirstId(attester: Attester, network: Network): number {
    const networkConfiguration = attester.networks[network];
    if (!networkConfiguration) {
      throw new Error(
        `Invalid flow configuration. Attester ${attester.name} does not have ${network} network configuration`
      );
    }
    return networkConfiguration.collectionIdFirst;
  }
}
