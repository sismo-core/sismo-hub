/* istanbul ignore file */
import { BigNumberish } from "ethers";
import { gql } from "graphql-request";
import { IResolver } from "./resolver";
import { handleResolvingErrors, withConcurrency } from "./utils";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { ProfileType, GetProfilesType } from "@group-generators/helpers/data-providers/lens/types";
import { AccountSource, FetchedData } from "topics/group";

export class LensResolver extends GraphQLProvider implements IResolver {
  constructor() {
    super({
      url: "https://api.lens.dev",
    });
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
      this.resolveLensHandles,
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

  private resolveLensHandles = async (
    accounts: [string, BigNumberish][]
  ): Promise<[FetchedData, FetchedData]> => {
    const updatedAccounts: FetchedData = {};
    const resolvedAccounts: FetchedData = {};

    const lensHandles = accounts.map((item) => item[0]);
    const resolvedProfiles = await this.resolveLensHandlesQuery(lensHandles);

    // exit early if there are no profiles
    if (!resolvedProfiles.profiles.items.length) {
      return [updatedAccounts, resolvedAccounts];
    }

    // if it didn't resolve all the accounts, throw an error
    if (resolvedProfiles.profiles.items.length < accounts.length) {
      const accountNotResolved = accounts
        .filter(
          ([account]) =>
            !resolvedProfiles.profiles.items.find((profile) => profile.handle === account)
        )
        .map(([account]) => account);

      handleResolvingErrors(
        `Error on these Lens handles: ${accountNotResolved.join(
          ", "
        )}. Are they existing Lens handles?`
      );
    }

    resolvedProfiles.profiles.items.forEach((profile: ProfileType) => {
      const account = accounts.find(([account]) => account === profile.handle);
      if (account) {
        resolvedAccounts[profile.ownedBy] = account[1];
        updatedAccounts[profile.handle] = account[1];
      }
    });

    return [updatedAccounts, resolvedAccounts];
  };

  private async resolveLensHandlesQuery(lensHandles: string[]): Promise<GetProfilesType> {
    try {
      const resolvedAccounts = await this.query<GetProfilesType>(
        gql`
          query GetProfiles($lensHandles: [Handle!]) {
            profiles(request: { handles: $lensHandles, limit: 50 }) {
              items {
                handle
                ownedBy
                id
              }
            }
          }
        `,
        { lensHandles: lensHandles }
      );
      return resolvedAccounts;
    } catch (e: any) {
      const regex = /\S+\.lens/g;
      if (e.response.errors) {
        if (e.response.errors[0].message.match(regex)) {
          handleResolvingErrors(
            `Error on these Lens handles: ${e.response.errors
              .map((error: any) => error.message.match(regex)[0])
              .join(", ")}. Are they existing Lens handles?`
          );
        } else {
          handleResolvingErrors(
            `Error while fetching ${lensHandles}. Are they existing Lens handles?` +
              " Lens API error detail " +
              e.response.errors
          );
        }
      } else {
        handleResolvingErrors(
          `Error while fetching ${lensHandles}. Are they existing Lens handles?`
        );
      }
      return { profiles: { items: [] } };
    }
  }
}
