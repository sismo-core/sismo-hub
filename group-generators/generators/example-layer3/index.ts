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
    const layer3Provider = new dataProviders.AlchemyProvider();

    //layer3 contract address https://polygonscan.com/address/0x200fb6e28edf0fbc9b5fabf7d39ae583981f5038
    const input = {
      contractAddress: "0x200FB6e28EdF0FBC9B5fabf7d39Ae583981f5038",
      chain: "polygon-mainnet",
      tokenId: "50",
    };

    const layer3GroupData = await layer3Provider.getOwnersForOneTokenId(input);

    return [
      {
        name: "example-layer3",
        timestamp: context.timestamp,
        description: "e.g. get layer3 holders for all levels",
        specs: "0x200FB6e28EdF0FBC9B5fabf7d39Ae583981f5038",
        data: layer3GroupData,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};

export default generator;
