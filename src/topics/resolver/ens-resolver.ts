/* istanbul ignore file */
import { BigNumberish, ethers } from "ethers";
import { gql } from "graphql-request";
import { IResolver } from "./resolver";
import { handleResolvingErrors, withConcurrency } from "./utils";
import { Domain } from "@group-generators/helpers/data-providers/ens/types";
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

  public async resolve(accounts: FetchedData): Promise<FetchedData> {
    let resolvedAccounts: FetchedData = {};

    const accountsArray = Object.entries(accounts);

    const resolvedAccountsArray = await withConcurrency(
      accountsArray,
      this.resolveENSAccounts,
      {
        batchSize: 50,
        concurrency: 10,
      }
    );

    resolvedAccounts = resolvedAccountsArray.reduce(
      (accumulator, currentObject) => {
        return { ...accumulator, ...currentObject };
      },
      {}
    );

    return resolvedAccounts;
  }

  private resolveENSAccounts = async (
    accounts: [string, BigNumberish][]
  ): Promise<FetchedData> => {
    const accountsWithoutValues = accounts.map((item) => item[0]);
    const domains = await this.resolveEnsHandlesQuery(accountsWithoutValues);

    if (domains.length < accounts.length) {
      handleResolvingErrors(
        `Error while fetching ${domains
          .map((domain) => domain.name)
          .join(", ")}. Are they existing ENS handles?`
      );
    }

    const resolvedAccounts = {} as FetchedData;

    for (const domain of domains) {
      if (domain.resolvedAddress !== null) {
        const account = accounts.find(([account]) => account === domain.name);
        if (account) {
          resolvedAccounts[domain.resolvedAddress.id] = account[1];
        }
      } else {
        const retryResolved = await this.resolveEnsFromJsonRpc(domain.name);
        if (retryResolved) {
          resolvedAccounts[retryResolved] = domain.name;
        } else {
          handleResolvingErrors(
            `Error while fetching ${domain.name}. Are they existing ENS names?`
          );
        }
      }
    }

    return resolvedAccounts;
  };

  private async resolveEnsHandlesQuery(accounts: string[]): Promise<Domain[]> {
    const domains = await this.query<{
      domains: Domain[];
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
      { ensNames: accounts }
    );
    return domains.domains;
  }

  public async resolveEnsFromJsonRpc(ens: string): Promise<string> {
    // another try to prevent this type of invalid address https://etherscan.io/enslookup-search?search=karl.floersch.eth
    try {
      const resolvedAddress: string | null = await this.provider.resolveName(
        ens
      );
      console.log(resolvedAddress);
      if (resolvedAddress === null) {
        return "";
      }
      return resolvedAddress;
    } catch (error) {
      return "";
    }
  }
}
