import { ethers } from "ethers";
import { gql } from "graphql-request";
import { domain } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { JsonRpcProvider } from "@group-generators/helpers/data-providers/json-rpc";
import { FetchedData } from "topics/group";

export class EnsProvider extends GraphQLProvider {

  provider: JsonRpcProvider | ethers.providers.BaseProvider;

  constructor() {
    super({
      url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
    });
    if (process.env.JSON_RPC_URL) {
      this.provider = new JsonRpcProvider(process.env.JSON_RPC_URL)
    } else {
      this.provider = ethers.getDefaultProvider()
    }
    
  }

  public async getAddresses(ensData: string[]): Promise<string[]> {
    const domains = await this.query<{
      domains: domain[];
    }>(
      gql`
        query getDomain($ensNames: [String]) {
          domains(where: { name_in: $ensNames }) {
            name
            resolvedAddress {
              id
            }
          }
        }
      `,
      { ensNames: ensData }
    );

    const ensAddresses = Promise.all(
      domains.domains.map(async (ensUser: domain) => {
        try {
          return ensUser.resolvedAddress.id;
        } catch (error) {
          // ens user address is not in the subgraph, calling ENS Registry with ethers
          // another try to prevent this type of invalid address https://etherscan.io/enslookup-search?search=karl.floersch.eth
          try {
            const resolvedAddress: string | null = await this.provider.resolveName(
              ensUser.name
            );
            if (resolvedAddress === null) {
              return "0x0000000000000000000000000000000000000000";
            } else {
              return resolvedAddress;
            }
          } catch (error) {
            // invalid address for ensUser.name
            return "0x0000000000000000000000000000000000000000";
          }
        }
      })
    );

    return ensAddresses;
  }

  public async getAllAddresses(ensNames: string[], data: FetchedData = {}) : Promise<FetchedData> {
    for (let i = 0; i < (ensNames.length / 100); i++) {
      // we query addresses by batches of 100
      const addresses = await this.getAddresses(
        ensNames.slice(i * 100, (i + 1) * 100)
      );
      // create the group
      for (const address of addresses) {
        data[address] = 1;
      }
    }
    return data
  }
}
