import { gql } from "graphql-request";
import { ValueType, Tags, FetchedData } from "../../../src/list";
import {
  GenerationFrequency,
  GeneratorContext,
  ListGenerator,
} from "../../../src/list-generator";
import { List } from "../../../src/list/list";
import { dataProviders } from "../../helpers/providers";
import { GraphQLProvider } from "../../helpers/providers/graphql";

// This list is constituted by all addresses that have a lens profile
// the value is 1
export default new ListGenerator({
  id: 6,
  name: "lens-profiles",
  generate: async (context: GeneratorContext): Promise<List> => {
    const lensApi = new dataProviders.GraphQLProvider({
      url: "https://api.lens.dev",
    });

    const dataProfiles: FetchedData = {};
    let cursor = JSON.stringify({ offset: 0 });

    // iterate over the graphql api using the cursor
    while (true) {
      const lensProfiles = await exploreProfilesQuery(lensApi, {
        cursor: cursor,
      });

      // move the cursor for the next page
      cursor = lensProfiles.exploreProfiles.pageInfo.next;

      // break when all profiles are retrieve
      if (lensProfiles.exploreProfiles.items.length === 0) {
        break;
      }
      // Format data for the List
      // [address]: 1
      for (const item of lensProfiles.exploreProfiles.items) {
        dataProfiles[item.ownerBy] = 1;
      }
    }

    return new List({
      generationDate: new Date(context.timestamp),
      data: dataProfiles,
      valueType: ValueType.Info,
      tags: [Tags.User, Tags.Lens, Tags.Web3Social],
    });
  },

  // refresh this list every day
  generationFrequency: GenerationFrequency.Daily,
});

type ExploreProfileType = {
  exploreProfiles: {
    items: {
      handle: string;
      ownerBy: string;
    }[];
    pageInfo: {
      prev: string;
      next: string;
      totalCount: number;
    };
  };
};

const exploreProfilesQuery = async (
  graphQLProvider: GraphQLProvider,
  options?: {
    cursor: string;
  }
): Promise<ExploreProfileType> => {
  return await graphQLProvider.query<ExploreProfileType>(
    gql`
      query ExploreProfiles($cursor: Cursor) {
        exploreProfiles(
          request: { sortCriteria: LATEST_CREATED, limit: 50, cursor: $cursor }
        ) {
          items {
            handle
            ownedBy
          }
          pageInfo {
            prev
            next
            totalCount
          }
        }
      }
    `,
    {
      cursor: options?.cursor,
    }
  );
};
