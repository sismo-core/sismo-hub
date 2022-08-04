import { ISubgraphProvider, SubgraphProviderOptions } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/providers/graphql";

export type SubgraphHostedServiceProviderOptions = SubgraphProviderOptions;

export default class SubgraphHostedServiceProvider
  extends GraphQLProvider
  implements ISubgraphProvider
{
  constructor(options: SubgraphHostedServiceProviderOptions) {
    super(options);
  }
}
