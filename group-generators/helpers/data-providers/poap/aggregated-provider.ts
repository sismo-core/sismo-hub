import PoapSubgraphProvider from "./provider";
import { QueryEventsTokensOwnersInput } from "./types";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { FetchedData } from "topics/group";

export class AggregatedPoapSubgraphProvider {
  poapSubgraphProviders: PoapSubgraphProvider[];

  constructor(
    urls = [
      "https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai",
      "https://api.thegraph.com/subgraphs/name/poap-xyz/poap",
    ]
  ) {
    this.poapSubgraphProviders = [];
    for (const url of urls) {
      this.poapSubgraphProviders.push(new PoapSubgraphProvider(url));
    }
  }

  public async queryEventsTokenOwners({
    eventIds,
  }: QueryEventsTokensOwnersInput): Promise<FetchedData> {
    const subgraphsData: FetchedData[] = [];

    for (const poapSubgraphProvider of this.poapSubgraphProviders) {
      const res = await poapSubgraphProvider.queryEventsTokenOwners({
        eventIds,
      });
      subgraphsData.push(res);
    }

    let aggregatedPoapHolders = dataOperators.Union(subgraphsData);
    aggregatedPoapHolders = dataOperators.Map(aggregatedPoapHolders, 1);

    return aggregatedPoapHolders;
  }
}
