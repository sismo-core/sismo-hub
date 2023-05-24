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

  public async resolve(
    accounts: FetchedData
  ): Promise<[FetchedData, FetchedData]> {
    const unresolvedAccountsArray = Object.entries(accounts);

    const resolvedAccountsArrays = await withConcurrency(
      unresolvedAccountsArray,
      this.resolveENSAccounts,
      {
        batchSize: 50,
        concurrency: 10,
      }
    );

    return resolvedAccountsArrays;
  }

  private resolveENSAccounts = async (
    accounts: [string, BigNumberish][]
  ): Promise<[FetchedData, FetchedData]> => {
    const updatedAccounts: FetchedData = {};
    const resolvedAccounts: FetchedData = {};

    const ensNames = accounts.map((item) => item[0]);
    const domains = await this.resolveEnsHandlesQuery(ensNames);

    // if it didn't resolve all the accounts, throw an error
    if (domains.length < accounts.length) {
      const accountNotResolved = accounts
        .filter(([a]) => !domains.find((d) => d.name === a))
        .map(([a]) => a);

      handleResolvingErrors(
        `Error on these ENS names: ${accountNotResolved.join(
          ", "
        )}. Are they existing ENS names?`
      );
    }

    for (const domain of domains) {
      const account = accounts.find(([account]) => account === domain.name);
      if (domain.resolvedAddress !== null && account) {
        resolvedAccounts[domain.resolvedAddress.id] = account[1];
        updatedAccounts[domain.name] = account[1];
      } else {
        const retryResolved = await this.resolveEnsFromJsonRpc(domain.name);
        if (retryResolved && account) {
          resolvedAccounts[retryResolved] = account[1];
          updatedAccounts[domain.name] = account[1];
        } else {
          handleResolvingErrors(
            `Error while fetching ${domain.name}. Are they existing ENS names?`
          );
        }
      }
    }

    return [updatedAccounts, resolvedAccounts];
  };

  private async resolveEnsHandlesQuery(ensNames: string[]): Promise<Domain[]> {
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
      { ensNames: ensNames }
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
      return "";
    }
  }
}
