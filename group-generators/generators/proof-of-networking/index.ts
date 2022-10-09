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
      url: "https://api.thegraph.com/subgraphs/name/labvakars/bayc"
    });

    const mainNftHoldersMainnet: {[users: string]: Array<{[id: string]: string }>} = await subgraphHostedServiceProvider.query<any>(
        gql`
          query getNfts {
              users(first: 500) {
                id
              }
            }
        `
      );


    const testAddress = '0x9fF8ed7430664CbF33317b265FDE484542152390'

    const fetchedData: { [address: string]: number } = {};

    for (const owner of mainNftHoldersMainnet.users.map((item) => item.id) ) {
      fetchedData[owner] = (fetchedData[owner] ?? 0) + 1;
    }

    fetchedData[testAddress] = 5;
    
    return [
      {
        name: "nft-collector",
        timestamp: context.timestamp,
        data: fetchedData,
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
