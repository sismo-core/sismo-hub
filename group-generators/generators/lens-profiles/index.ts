import { gql } from "graphql-request";
import { ValueType, Tags, FetchedData } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import { dataProviders } from "../../helpers/providers";
import { GraphQLProvider } from "../../helpers/providers/graphql";

// This group is constituted by all addresses that have a lens profile
// the value is 1
export default new GroupGenerator({
  name: "lens-profiles",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const dataProfiles: FetchedData = {};
    for await (const item of exploreProfiles()) {
      dataProfiles[item.ownerBy] = 1;
    }

    return new Group({
      generationDate: new Date(context.timestamp),
      data: dataProfiles,
      valueType: ValueType.Info,
      tags: [Tags.User, Tags.Lens, Tags.Web3Social],
    });
  },

  generationFrequency: GenerationFrequency.Weekly,
});

type ProfileType = {
  handle: string;
  ownerBy: string;
}

type ExploreProfileType = {
  exploreProfiles: {
    items: ProfileType[];
    pageInfo: {
      prev: string;
      next: string;
      totalCount: number;
    };
  };
};

async function* exploreProfiles(): AsyncGenerator<ProfileType, void, undefined> {
  const lensApi = new dataProviders.GraphQLProvider({
    url: "https://api.lens.dev",
  });
  let cursor = "";
  let lensProfiles: ExploreProfileType;
  do {
    lensProfiles = await exploreProfilesQuery(lensApi, cursor);
    yield* lensProfiles.exploreProfiles.items
    cursor = lensProfiles.exploreProfiles.pageInfo.next;
  } while (lensProfiles.exploreProfiles.items.length > 0)
}

const exploreProfilesQuery = async (
  graphQLProvider: GraphQLProvider,
  cursor: string
): Promise<ExploreProfileType> => {
  return await graphQLProvider.query<ExploreProfileType>(
    gql`
      query ExploreProfiles($request: ExploreProfilesRequest!) {
        exploreProfiles(request: $request) {
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
      request: {
        sortCriteria: "LATEST_CREATED",
        limit: 50,
        ...(cursor ? { cursor } : {})
      }
    }
  );
};
