import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  //kycdao badges are deployed crosschain. We support Polygon, don't support CELO, NEAR, or SOLANA
  //  https://polygonscan.com/address/0x205E10d3c4C87E26eB66B1B270b71b7708494dB9
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const tokenProvider = new dataProviders.TokenProvider();

    const kycDaoBadgeHolders = await tokenProvider.getNftHolders({
      contractAddress: "0x205E10d3c4C87E26eB66B1B270b71b7708494dB9",
      network: "polygon",
    });

    return [
      {
        name: "example-kycdao",
        description: "Get all kycdao badge holders",
        specs: "",
        timestamp: context.timestamp,
        data: kycDaoBadgeHolders,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
