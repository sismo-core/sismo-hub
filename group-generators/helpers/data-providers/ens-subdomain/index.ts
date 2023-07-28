import { BigNumber } from "ethers";
import { gql } from "graphql-request";
import { EnsSubdomainResponse, EnsDomainParams, IEnsSubdomainProvider } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";

import { FetchedData } from "topics/group";

export class EnsSubdomainProvider extends GraphQLProvider implements IEnsSubdomainProvider {
  constructor() {
    super({
      url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
    });
  }

  public async getEnsSubdomains({ domain }: EnsDomainParams): Promise<FetchedData> {
    domain.endsWith(".eth") ? domain : (domain += ".eth");
    const domainLowerCase = domain.toLowerCase();
    try {
      const pageSize = 1000;
      let skip = 0;
      let continuePaging = true;
      const subdomainHolders: FetchedData = {};

      while (continuePaging) {
        const res: EnsSubdomainResponse = await this.fetchPage(domainLowerCase, skip, pageSize);

        if (res.domains[0].subdomains.length > 0) {
          res.domains[0].subdomains.forEach((subdomain) => {
            subdomainHolders[subdomain.owner.id] = BigNumber.from(
              subdomainHolders[subdomain.owner.id] ?? 0
            )
              .add(1)
              .toString();
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

  public async getEnsSubdomainsCount({ domain }: EnsDomainParams): Promise<number> {
    const domainLowerCase = domain.toLowerCase();
    const holders = await this.getEnsSubdomains({
      domain: domainLowerCase,
    });
    return Object.keys(holders).length;
  }
}
