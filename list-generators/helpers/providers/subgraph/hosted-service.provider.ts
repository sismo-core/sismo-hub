import { GraphQLProvider } from "../graphql";
import { ISubgraphProvider, SubgraphProviderOptions } from "./types";

export type SubgraphHostedServiceProviderOptions = SubgraphProviderOptions;

export default class SubgraphHostedServiceProvider
  extends GraphQLProvider
  implements ISubgraphProvider
{
  constructor(options: SubgraphHostedServiceProviderOptions) {
    super(options);
  }
}
