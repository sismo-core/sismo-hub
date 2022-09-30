import { GET_ALL_VOTERS } from "./queries";
import { dataProviders } from "@group-generators/helpers/providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

type EligibleVotersType = {
  wallet: string;
  totalVotes: number;
}
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
 
    const graphqlProvider =
      new dataProviders.GraphQLProvider({
        url: "https://lil-noun-api.fly.dev/graphql",
      });

    const { getAllUsers: voters } : any = await graphqlProvider.query(GET_ALL_VOTERS);

    const filteredVoters = voters
      .filter((data: any) => data.userStats.totalVotes >= 15)
      .map(({ wallet, userStats: { totalVotes} }: any) => ({
        wallet,
        totalVotes,
      }));

    const eligibleVoters = filteredVoters.reduce(
      (acc: EligibleVotersType, cur: EligibleVotersType) => ({
        ...acc,
        [cur.wallet]: cur.totalVotes,
      }),
      {}
    );

    return [
      {
        name: "lilnouns-proplot-voters",
        timestamp: context.timestamp,
        data: eligibleVoters,
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;