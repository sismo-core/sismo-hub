import PoapSubgraphBaseProvider from "./base-provider";
import { QueryEventsTokensOwnersInput } from "./types";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { UnionOption } from "@group-generators/helpers/data-operators/union";
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
    getPower = false,
  }: QueryEventsTokensOwnersInput): Promise<FetchedData> {
    const subgraphsData: FetchedData[] = [];

    for (const poapSubgraphProvider of this.poapSubgraphProviders) {
      const res = await poapSubgraphProvider.queryEventsTokenOwners({
        eventIds,
        getPower,
      });
      subgraphsData.push(res);
    }

    const aggregatedPoapHolders = dataOperators.Union(subgraphsData, UnionOption.Sum);

    return aggregatedPoapHolders;
  }

  public async queryEventsTokenOwnersCount({
    eventIds,
    getPower = false,
  }: QueryEventsTokensOwnersInput): Promise<number> {
    const holders = await this.queryEventsTokenOwners({ eventIds, getPower });
    return Object.keys(holders).length;
  }
}
