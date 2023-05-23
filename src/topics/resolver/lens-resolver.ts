/* istanbul ignore file */
import { BigNumberish } from "ethers";
import { gql } from "graphql-request";
import { IResolver } from "./resolver";
import { handleResolvingErrors, withConcurrency } from "./utils";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import {
  ProfileType,
  GetProfilesType,
} from "@group-generators/helpers/data-providers/lens/types";
import { FetchedData } from "topics/group";

export class LensResolver extends GraphQLProvider implements IResolver {
  constructor() {
    super({
      url: "https://api.lens.dev",
    });
  }

  public async resolve(accounts: FetchedData): Promise<FetchedData> {
    const accountsArray = Object.entries(accounts);

    const resolvedAccountsArray = await withConcurrency(
      accountsArray,
      this.resolveLensHandles,
      {
        batchSize: 50,
        concurrency: 10,
      }
    );

    const resolvedAccounts = resolvedAccountsArray.reduce(
      (accumulator, currentObject) => {
        return { ...accumulator, ...currentObject };
      },
      {}
    );

    return resolvedAccounts;
  }

  private resolveLensHandles = async (
    accounts: [string, BigNumberish][]
  ): Promise<FetchedData> => {
    const lensHandles = accounts.map((item) => item[0]);
    const resolvedProfiles = await this.resolveLensHandlesQuery(lensHandles);

    // exit early if there are no profiles
    if (!resolvedProfiles.profiles.items.length) {
      return {};
    }

    // if it didn't resolve all the accounts, throw an error
    if (resolvedProfiles.profiles.items.length < accounts.length) {
      handleResolvingErrors(
        `Error while fetching ${lensHandles}. Are they existing Lens handles?`
      );
    }

    const resolvedAccounts: FetchedData = {};
    resolvedProfiles.profiles.items.forEach((profile: ProfileType) => {
      const account = accounts.find(([account]) => account === profile.handle);
      if (account) {
        resolvedAccounts[profile.ownedBy] = account[1];
      }
      return resolvedAccounts;
    });

    return resolvedAccounts;
  };

  private async resolveLensHandlesQuery(
    lensHandles: string[]
  ): Promise<GetProfilesType> {
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
