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
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const subgraphHostedServiceProvider =
      new dataProviders.SubgraphDecentralizedServiceProvider({
        // Proof of Humanity Subgraph
        // https://thegraph.com/explorer/subgraph?id=CvzNejNZR2UTQ66wL7miGgfWh9dmiwgTtTfgQCBvMQRE&view=Overview
        subgraphId: "CvzNejNZR2UTQ66wL7miGgfWh9dmiwgTtTfgQCBvMQRE",
      });

    const pohData: FetchedData = {};

    type PoHSubmissions = { submissions: { id: string }[] };

    const step = 1000;
    let counter = 0;
    let pohSubmissions: PoHSubmissions;
    do {
      pohSubmissions =
        await subgraphHostedServiceProvider.query<PoHSubmissions>(
          gql`
        query getValidPoHSubmissions {
          submissions(where:{registered:true, disputed:false}, first: ${step}, skip:${counter}) {
            id
          }
        }
      `
        );
      for (const submission of pohSubmissions.submissions) {
        pohData[submission.id] = 1;
      }
      counter += step;
    } while (pohSubmissions.submissions.length > 0);

    return [
      {
        name: "proof-of-humanity",
        timestamp: context.timestamp,
        description: "Prove you are a human with PoH",
        specs: "Appear as a verified Proof of Humanity submission on the Proof of Humanity subgraph",
        data: pohData,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.SybilResistance, Tags.User],
      },
    ];
  },
};

export default generator;
