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

    const input = {
      contractAddress: "0x7c4Cd5e2B9aDad53bF8d0843776E04602aCf6fB5",
      chain: "polygon-mainnet",
      tokenId: "50",
    };

    const layer3GroupData = await layer3Provider.getOwnersForOneTokenId(input);

    return [
      {
        name: "example-layer3",
        timestamp: context.timestamp,
        description: "e.g. get layer3 holders for all levels",
        specs: "0x7c4Cd5e2B9aDad53bF8d0843776E04602aCf6fB5",
        data: layer3GroupData,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};

export default generator;
