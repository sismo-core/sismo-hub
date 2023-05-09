/* istanbul ignore file */
import { ethers } from "ethers";
import { gql } from "graphql-request";
import { IResolver } from "./resolver";
import { withConcurrency } from "./utils";
import { domain } from "@group-generators/helpers/data-providers/ens/types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { JsonRpcProvider } from "@group-generators/helpers/data-providers/json-rpc";
import { FetchedData } from "topics/group";

export class EnsResolver extends GraphQLProvider implements IResolver {
  _jsonRpcUrl: string | undefined;
  provider: JsonRpcProvider | ethers.providers.BaseProvider;

  constructor(jsonRpcUrl = process.env.JSON_RPC_URL) {
    super({
      url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
    });
    this._jsonRpcUrl = jsonRpcUrl;
    this._jsonRpcUrl
      ? (this.provider = new JsonRpcProvider(this._jsonRpcUrl))
      : (this.provider = ethers.getDefaultProvider());
  }

  resolvedAccounts: FetchedData = {};

  public async resolve(ensDataArray: FetchedData): Promise<FetchedData> {
    const ensData = Object.keys(ensDataArray);

    const resolveENSData = async (ensData: string[]): Promise<void> => {
      const userData = await this.resolveLensHandlesQuery(ensData);

      const resolvedAccounts = {} as FetchedData;

      for (const user of userData) {
        if (user.resolvedAddress !== null) {
          resolvedAccounts[user.resolvedAddress.id] = ensDataArray[user.name];
        } else {
          const retryResolved = await this.resolveEnsFromJsonRpc(user.name);
          if (retryResolved) {
            resolvedAccounts[retryResolved] = ensDataArray[user.name];
          }
        }
      }

      Object.assign(this.resolvedAccounts, resolvedAccounts);
    };

    await withConcurrency(ensData, resolveENSData, {
      batchSize: 5,
      concurrency: 10,
    });

    return this.resolvedAccounts;
  }

  public async resolveLensHandlesQuery(ensData: string[]): Promise<domain[]> {
    const domains = await this.query<{
      domains: domain[];
    }>(
      gql`
        query getDomain($ensNames: [String!]) {
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
    return domains.domains;
  }

  public async resolveEnsFromJsonRpc(ens: string): Promise<string> {
    // another try to prevent this type of invalid address https://etherscan.io/enslookup-search?search=karl.floersch.eth
    try {
      const resolvedAddress: string | null = await this.provider.resolveName(
        ens
      );
      if (resolvedAddress === null) {
        return "";
      }
      return resolvedAddress;
    } catch (error) {
      console.log(`invalid address for ${ens}`);
      // invalid address for ensUser.name
      return "";
    }
  }
}
