/* istanbul ignore file */
import { BigNumberish, ethers } from "ethers";
import { gql } from "graphql-request";
import { IResolver } from "./resolver";
import { handleResolvingErrors, withConcurrency } from "./utils";
import { Domain } from "@group-generators/helpers/data-providers/ens/types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { JsonRpcProvider } from "@group-generators/helpers/data-providers/json-rpc";
import { AccountSource, FetchedData } from "topics/group";

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

  public async resolve(accounts: FetchedData): Promise<{
    accountSources: string[];
    resolvedAccountsRaw: FetchedData;
    resolvedAccounts: FetchedData;
  }> {
    const unresolvedAccountsArray = Object.entries(accounts).map(
      ([account, value]) => [account.toLowerCase(), value] as [string, BigNumberish]
    );

    const resolvedAccountsArrays = await withConcurrency(
      unresolvedAccountsArray,
      this.resolveENSAccounts,
      {
        concurrency: 10,
        batchSize: 50,
      }
    );

    return {
      accountSources: [AccountSource.ETHEREUM],
      resolvedAccountsRaw: resolvedAccountsArrays[0],
      resolvedAccounts: resolvedAccountsArrays[1],
    };
  }

  private resolveENSAccounts = async (
    accounts: [string, BigNumberish][]
  ): Promise<[FetchedData, FetchedData]> => {
    const updatedAccounts: FetchedData = {};
    const resolvedAccounts: FetchedData = {};

    const ensNames = accounts.map((item) => item[0]);
    const domains = await this.resolveEnsHandlesQuery(ensNames);

    // if all the accounts haven't been resolved
    if (domains.length < ensNames.length) {
      const accountsNotResolved = ensNames.filter(
        (name) => !domains.find((domain) => domain.name === name)
      );
      const accountsNotResolvedAfterRetry = [...accountsNotResolved];

      for (const accountNotResolved of accountsNotResolved) {
        const account = accounts.find(([acc]) => acc === accountNotResolved);
        const retryResolved = await this.resolveEnsFromJsonRpc(accountNotResolved);

        if (retryResolved && account) {
          // remove resolved element from array
          const index = accountsNotResolvedAfterRetry.indexOf(accountNotResolved);
          if (index > -1) {
            accountsNotResolvedAfterRetry.splice(index, 1);
          }

          // update accounts
          resolvedAccounts[retryResolved] = account[1];
          updatedAccounts[accountNotResolved] = account[1];
        }
      }

      if (accountsNotResolvedAfterRetry.length > 0) {
        handleResolvingErrors(
          `Error on these ENS names: ${accountsNotResolvedAfterRetry.join(
            ", "
          )}. Are they existing ENS names?`
        );
      }
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
      const resolvedAddress: string | null = await this.provider.resolveName(ens);
      if (resolvedAddress === null) {
        return "";
      }
      return resolvedAddress;
    } catch (error) {
      return "";
    }
  }
}
