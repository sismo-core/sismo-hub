/* istanbul ignore file */
import { gql } from "graphql-request";
import { IResolver } from "./resolver";
import { handleResolvingErrors, withConcurrency } from "./utils";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export type LensProfile = {
  handle: string;
  ownedBy: string;
};

export type LensProfileData = {
  profiles: {
    items: LensProfile[];
  };
};

export class LensResolver extends GraphQLProvider implements IResolver {
  constructor() {
    super({
      url: "https://api.lens.dev",
    });
  }

  resolvedAccounts: FetchedData = {};

  public async resolve(lensHandleArray: FetchedData): Promise<FetchedData> {
    const lensHandles = Object.keys(lensHandleArray);

    const resolveLensHandles = async (lensHandles: string[]): Promise<void> => {
      const userData = await this.resolveLensHandlesQuery(lensHandles);

      if (userData.profiles.items.length < lensHandles.length) {
        handleResolvingErrors(
          `Error while fetching ${lensHandles}. Are they existing Lens handles?`
        );
      }

      const resolvedAccounts = userData.profiles.items.reduce(
        (acc: any, profile: any) => {
          acc[profile.ownedBy] = lensHandleArray[profile.handle];
          return acc;
        },
        {} as FetchedData
      );
      Object.assign(this.resolvedAccounts, resolvedAccounts);
    };

    await withConcurrency(lensHandles, resolveLensHandles, {
      batchSize: 50,
      concurrency: 10,
    });

    return this.resolvedAccounts;
  }

  public async resolveLensHandlesQuery(lensHandles: any): Promise<any> {
    const userData = await this.query<{
      profiles: {
        items: LensProfile[];
      };
    }>(
      gql`
        query ExploreProfiles($lensHandles: [Handle!]) {
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
    return userData;
  }
}
