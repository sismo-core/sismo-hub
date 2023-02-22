import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
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
    type POHat = { user: string };

    const validatedBounties = await subgraphHostedServiceProvider.query<{
      alertSents: POHat[];
    }>(
      gql`
        query getAcceptedBounties {
          alertSents(where: { isAccepted: true, quality: 2 }) {
            user
          }
        }
      `
    );

    const fetchedData: { [address: string]: number } = {};

    for (const domain of validatedBounties.alertSents) {
      fetchedData[domain.user] = (fetchedData[domain.user] ?? 0) + 1;
    }

    return [
      {
        name: "proof-of-hat-bronze",
        timestamp: context.timestamp,
        description: "Proof of Hat Bronze",
        specs: "",
        data: fetchedData,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
