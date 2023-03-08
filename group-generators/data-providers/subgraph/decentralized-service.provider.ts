import { ISubgraphProvider, SubgraphProviderOptions } from "./types";
import { GraphQLProvider } from "@group-generators/data-providers/graphql";

export type SubgraphDecentralizedServiceProviderOptions = {
  subgraphId: string;
};

export default class SubgraphDecentralizedServiceProvider
  extends GraphQLProvider
  implements ISubgraphProvider
{
  constructor(options: SubgraphDecentralizedServiceProviderOptions) {
    const subgraphProviderOptions: SubgraphProviderOptions = {
      url: `https://gateway.thegraph.com/api/${SubgraphDecentralizedServiceProvider.getAPIKey()}/subgraphs/id/${
        options.subgraphId
      }`,
    };
    super(subgraphProviderOptions);
  }

  public static getAPIKey() {
    if (!process.env.DECENTRALIZED_SUBGRAPH_API_KEY) {
      throw new Error(
        "DECENTRALIZED_SUBGRAPH_API_KEY env vars must be set to use the SubgraphDecentralizedService provider"
      );
    }
    return process.env.DECENTRALIZED_SUBGRAPH_API_KEY;
  }
}
