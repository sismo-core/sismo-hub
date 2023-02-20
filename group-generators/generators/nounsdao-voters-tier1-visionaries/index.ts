import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  FetchedData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const subgraphHostedServiceProvider =
      new dataProviders.SubgraphHostedServiceProvider({
        url: "https://api.thegraph.com/subgraphs/name/curelycue/nouns-dao",
      });

    type Visionary = { id: string; totalVotesCount: number };

    const nounsdaoVisionaries = await subgraphHostedServiceProvider.query<{
      voters: Visionary[];
    }>(
      gql`
        query getAllVisionaryVoters {
          voters(where: { totalVotesCount_gte: 3 }) {
            id
            totalVotesCount
          }
        }
      `
    );

    const data: FetchedData = {};

    for (const visionary of nounsdaoVisionaries.voters.map((d) => d.id)) {
      data[visionary] = 1;
    }

    return [
      {
        name: "nounsdao-voters-tier1-visionaries",
        timestamp: context.timestamp,
        description: "You must have voted 3 times in Nouns DAO",
        specs: "",
        data: data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.ENS, Tags.User],
      },
    ];
  },
};

export default generator;