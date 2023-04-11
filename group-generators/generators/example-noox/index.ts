import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  //using tokenId for My Beebop Magical Size is Size
  //https://etherscan.io/nft/0xF1c121A563A84D62a5F11152d064Dd0D554024F9/104577845207406739233498577831854075688817521750848206372017175842561722417306
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const tokenProvider = new dataProviders.TokenProvider();
    const input = {
      contractAddress: "0xF1c121A563A84D62a5F11152d064Dd0D554024F9",
      tokenId:
        "104577845207406739233498577831854075688817521750848206372017175842561722417306",
      network: "mainnet",
    };

    const nooxData = await tokenProvider.getERC1155Holders(input);

    return [
      {
        name: "example-noox",
        timestamp: context.timestamp,
        description:
          "get noox badge holders for My Beebop Magical Size is Size",
        specs:
          "tokenid is 104577845207406739233498577831854075688817521750848206372017175842561722417306",
        data: nooxData,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
