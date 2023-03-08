import PoapSubgraphBaseProvider from "./base-provider";
import { QueryEventsTokensOwnersInput } from "./types";
import { dataOperators } from "@group-generators/data-operators";
import { FetchedData } from "topics/group";

export class PoapSubgraphProvider {
  poapSubgraphProviders: PoapSubgraphBaseProvider[];

  constructor(
    urls = [
      "https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai",
      "https://api.thegraph.com/subgraphs/name/poap-xyz/poap",
    ]
  ) {
    this.poapSubgraphProviders = [];
    for (const url of urls) {
      this.poapSubgraphProviders.push(new PoapSubgraphBaseProvider(url));
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

  public async queryEventsTokenOwnersCount({
    eventIds,
  }: QueryEventsTokensOwnersInput): Promise<number> {
    const holders = await this.queryEventsTokenOwners({ eventIds });
    return Object.keys(holders).length;
  }
}
