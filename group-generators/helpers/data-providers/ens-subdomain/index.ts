import { gql } from "graphql-request";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import {
  IEnsSubdomainsSubgraphProvider,
  EnsSubdomainsResponse,
  EnsDomainParams,
} from "./types";

import { FetchedData } from "topics/group";

//using thegraph gateway: https://gateway.thegraph.com/api/<apikey>/subgraphs/id/EjtE3sBkYYAwr45BASiFp8cSZEvd1VHTzzYFvJwQUuJx
export class EnsSubdomainProvider
  extends GraphQLProvider
  implements IEnsSubdomainsSubgraphProvider
{
  constructor() {
    super({
      url: `https://gateway.thegraph.com/api/${EnsSubdomainProvider.getAPIKey()}/subgraphs/id/EjtE3sBkYYAwr45BASiFp8cSZEvd1VHTzzYFvJwQUuJx`,
    });
  }

  public static getAPIKey() {
    if (!process.env.DECENTRALIZED_SUBGRAPH_API_KEY) {
      throw new Error(
        "DECENTRALIZED_SUBGRAPH_API_KEY env vars must be set to use the SubgraphDecentralizedService provider"
      );
    }
    return process.env.DECENTRALIZED_SUBGRAPH_API_KEY;
  }

  public async getEnsHolders({
    subdomain,
  }: EnsDomainParams): Promise<FetchedData> {
    subdomain = this._parseSubdomain(subdomain);

    try {
      const pageSize = 1000;
      let skip = 0;
      let continuePaging = true;
      const subdomainHolders: FetchedData = {};

      while (continuePaging) {
        const res: EnsSubdomainsResponse = await this.fetchPage(
          subdomain,
          skip,
          pageSize
        );

        if (res.domains[0].subdomains.length > 0) {
          res.domains[0].subdomains.forEach((subdomain) => {
            subdomainHolders[subdomain.owner.id] = 1;
          });
          skip += pageSize;
        } else {
          continuePaging = false;
        }
      }

      if (Object.keys(subdomainHolders).length > 0) {
        return subdomainHolders;
      } else {
        throw new Error("No subdomain found");
      }
    } catch (e) {
      throw new Error("Error fetching subdomain holders");
    }
  }

  public async fetchPage(
    subdomain: string,
    skip: number,
    first: number
  ): Promise<EnsSubdomainsResponse> {
    const query = gql`
      query Domains{
          domains(where: {labelName: "${subdomain}"}) {
            name
            subdomains(first: ${first} skip: ${skip}) {
              owner {
                id
            }
        }
    }
}
`;
    return this.query<EnsSubdomainsResponse>(query, {
      variables: {
        subdomain: subdomain,
        skip,
        first,
      },
    });
  }

  public async getPostCollectorsCount({
    subdomain,
  }: EnsDomainParams): Promise<number> {
    const posts = await this.getEnsHolders({
      subdomain,
    });
    return Object.keys(posts).length;
  }

  private _parseSubdomain(subdomain: string): string {
    if (subdomain.includes(".eth")) subdomain = subdomain.replace(".eth", "");
    return subdomain.toLowerCase();
  }
}
