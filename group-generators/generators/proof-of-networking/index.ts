import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const subgraphHostedServiceProvider = new dataProviders.SubgraphHostedServiceProvider({
      url: "https://api.thegraph.com/subgraphs/name/milesthedisch/soulboundencounters"
    });

    const mainNftHoldersMainnet: {[users: string]: Array<{[id: string]: string }>} = await subgraphHostedServiceProvider.query<any>(
        gql`
          query getEnteties {
            exampleEntities {
              newAdmin
            }
          }
        `
      );

    const testAddress = '0x9fF8ed7430664CbF33317b265FDE484542152390'
    const testAddress1 = '0x18070D824952Fb5d46F529659BdB497ebB1C5985'
    const testAddress2 = '0xF66c41aF3Fe98725d3Ad2E63a3363332439aA2D1'
    const testAddress3 = '0xE73d88e147e12Ca4CDdE9062Db67f06fFD43C5e8'

    const fetchedData: { [address: string]: number } = {};

    for (const owner of mainNftHoldersMainnet.exampleEntities.map((item) => item.id) ) {
      fetchedData[owner] = (fetchedData[owner] ?? 0) + 1;
    }

    fetchedData[testAddress] = 5;
    fetchedData[testAddress1] = 2;
    fetchedData[testAddress2] = 1;
    fetchedData[testAddress3] = 5;

    return [
      {
        name: "proof-of-networking",
        timestamp: context.timestamp,
        data: fetchedData,
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
