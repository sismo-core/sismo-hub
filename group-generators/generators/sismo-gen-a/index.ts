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
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const subgraphHostedServiceProvider =
      new dataProviders.SubgraphHostedServiceProvider({
        url: "https://api.thegraph.com/subgraphs/name/sismo-core/sismo-dao",
      });

    type GenAHolder = { id: string; generation: string };

    // in the subgraph, the gen A is nominated as "ONE"
    const sismoGenAHolders = await subgraphHostedServiceProvider.query<{
      zikis: GenAHolder[];
    }>(
      gql`
        query getAllGenAHolders {
          zikis(first: 1000, where: { generation: ONE }) {
            id
            generation
          }
        }
      `
    );

    const data: FetchedData = {};

    for (const ziki of sismoGenAHolders.zikis.map((d) => d.id)) {
      data[ziki] = 1;
    }

    return [
      {
        name: "sismo-gen-a",
        timestamp: context.timestamp,
        description: "sismo.eth gen A holders",
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
