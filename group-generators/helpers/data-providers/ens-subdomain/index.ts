import { gql } from "graphql-request";
import { EnsSubdomainResponse, EnsDomainParams } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

import { FetchedData } from "topics/group";

export class EnsSubdomainProvider extends GraphQLProvider {
  constructor() {
    super({
      url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
    });
  }

  public async getEnsSubdomains({
    domain,
  }: EnsDomainParams): Promise<FetchedData> {
    domain.endsWith(".eth") ? domain : (domain += ".eth");
    try {
      const pageSize = 1000;
      let skip = 0;
      let continuePaging = true;
      const subdomainHolders: FetchedData = {};

      while (continuePaging) {
        const res: EnsSubdomainResponse = await this.fetchPage(
          domain,
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
    domain: string,
    skip: number,
    first: number
  ): Promise<EnsSubdomainResponse> {
    const query = gql`
      query Domains{
          domains(where: {name: "${domain}"}) {
            name
            subdomains(first: ${first} skip: ${skip}) {
              owner {
                id
            }
        }
    }
}
`;
    return this.query<EnsSubdomainResponse>(query, {
      variables: {
        domain: domain,
        skip,
        first,
      },
    });
  }

  public async getEnsSubdomainsCount({
    domain,
  }: EnsDomainParams): Promise<number> {
    const holders = await this.getEnsSubdomains({
      domain,
    });
    return Object.keys(holders).length;
  }
}
