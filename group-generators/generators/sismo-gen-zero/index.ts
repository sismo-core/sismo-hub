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

    type GenZeroHolder = { id: string; generation: string };

    const sismoGenZeroHolders = await subgraphHostedServiceProvider.query<{
      zikis: GenZeroHolder[];
    }>(
      gql`
        query getAllGenZeroHolders {
          zikis(first: 1000, where: { generation: ZERO }) {
            id
            generation
          }
        }
      `
    );

    const data: FetchedData = {};

    for (const ziki of sismoGenZeroHolders.zikis.map((d) => d.id)) {
      data[ziki] = 1;
    }

    return [
      {
        name: "sismo-gen-zero",
        timestamp: context.timestamp,
        description: "sismo.eth gen ZERO holders",
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
