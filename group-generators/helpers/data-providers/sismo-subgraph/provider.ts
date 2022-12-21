import { QueryBadgesOptions } from "./types";
import { dataOperators } from "@group-generators/helpers/data-operators";
import SismoSubgraphBaseProvider from "@group-generators/helpers/data-providers/sismo-subgraph/base-provider";
import { FetchedData } from "topics/group";

export default class SismoSubgraphProvider {
  sismoSubgraphProviders: SismoSubgraphBaseProvider[];

  constructor(
    urls = [
      "https://subgraphs-sismo-polygon.sismo.io/subgraphs/name/sismo-core/sismo-polygon",
      "https://subgraphs-sismo-gnosis.sismo.io/subgraphs/name/sismo-core/sismo-gnosis",
    ]
  ) {
    this.sismoSubgraphProviders = [];
    for (const url of urls) {
      this.sismoSubgraphProviders.push(new SismoSubgraphBaseProvider(url));
    }
  }

  public async queryBadgesHolders(
    { tokenIds, removedIds, defaultValue }: QueryBadgesOptions = {
      tokenIds: [],
      removedIds: [],
    }
  ): Promise<FetchedData> {
    const subgraphsData: FetchedData[] = [];

    for (const sismoSubgraphProvider of this.sismoSubgraphProviders) {
      const res = await sismoSubgraphProvider.queryBadgesHolders({
        tokenIds,
        removedIds,
        defaultValue,
      });
      subgraphsData.push(res);
    }

    let aggregatedBadgesHolders = dataOperators.Union(subgraphsData);
    aggregatedBadgesHolders = dataOperators.Map(aggregatedBadgesHolders, 1);

    return aggregatedBadgesHolders;
  }

  public async queryBadgeHolders(tokenId: number): Promise<FetchedData> {
    const subgraphsData: FetchedData[] = [];

    for (const sismoSubgraphProvider of this.sismoSubgraphProviders) {
      const res = await sismoSubgraphProvider.queryBadgeHolders(tokenId);
      subgraphsData.push(res);
    }

    let aggregatedBadgeHolders = dataOperators.Union(subgraphsData);
    aggregatedBadgeHolders = dataOperators.Map(aggregatedBadgeHolders, 1);

    return aggregatedBadgeHolders;
  }
}
