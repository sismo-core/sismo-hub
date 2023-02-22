import { GET_ALL_VOTERS } from "./queries";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

type EligibleVotersType = {
  wallet: string;
  totalVotes: number;
};
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const graphqlProvider = new dataProviders.GraphQLProvider({
      url: "https://lil-noun-api.fly.dev/graphql",
    });

    const { getAllUsers: voters }: any = await graphqlProvider.query(
      GET_ALL_VOTERS
    );

    const filteredVoters = voters
      .filter((data: any) => data.userStats.totalVotes >= 15)
      .map(({ wallet, userStats: { totalVotes } }: any) => ({
        wallet,
        totalVotes,
      }));

    const eligibleVoters = filteredVoters.reduce(
      (acc: EligibleVotersType, cur: EligibleVotersType) => ({
        ...acc,
        // [cur.wallet]: cur.totalVotes,
        [cur.wallet]: 1,
        // frontend was only issuing badges with value 1
        // value should be thought as "tier" from now on
        // and suit a particular usecase
      }),
      {}
    );

    return [
      {
        name: "lilnouns-proplot-voters",
        timestamp: context.timestamp,
        description: "Members voted on atleast 15 ideas",
        specs: "You should have voted more than or equal to 15 ideas on PropLot",
        data: eligibleVoters,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
