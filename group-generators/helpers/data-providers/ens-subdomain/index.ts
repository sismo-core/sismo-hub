import { gql } from "graphql-request";
import { EnsSubdomainsResponse, EnsDomainParams } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

import { FetchedData } from "topics/group";

export class EnsSubdomainProvider extends GraphQLProvider {
  constructor() {
    super({
      url: `https://gateway.thegraph.com/api/${EnsSubdomainProvider.getAPIKey()}/subgraphs/id/EjtE3sBkYYAwr45BASiFp8cSZEvd1VHTzzYFvJwQUuJx`,
    });
  }

  public async getEnsSubdomains({
    subdomain,
  }: EnsDomainParams): Promise<FetchedData> {
    subdomain.endsWith(".eth") ? subdomain : (subdomain += ".eth");
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
          domains(where: {name: "${subdomain}"}) {
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

  public async getEnsSubdomainsCount({
    subdomain,
  }: EnsDomainParams): Promise<number> {
    const holders = await this.getEnsSubdomains({
      subdomain,
    });
    return Object.keys(holders).length;
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
