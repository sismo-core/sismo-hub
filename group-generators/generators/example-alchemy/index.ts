import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

//0xec3a9c7d612e0e0326e70d97c9310a5f57f9af9e - not WOW, 200K holders
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const alchemyProvider = new dataProviders.AlchemyProvider();
    // const input = {
    //   chain: "eth-mainnet",
    //   contractAddress: "0xe785e82358879f061bc3dcac6f0444462d4b5330",
    // };
    // const input = {
    //   chain: "opt-mainnet",
    //   contractAddress: "0xec3a9c7d612e0e0326e70d97c9310a5f57f9af9e",
    // };

    const input = {
      chain: "opt-mainnet",
      contractAddress: "0xec3a9c7d612e0e0326e70d97c9310a5f57f9af9e",
      tokenIds: [
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000000003",
        "0x0000000000000000000000000000000000000000000000000000000000000010",
        "0x0000000000000000000000000000000000000000000000000000000000000040",
        "0x0000000000000000000000000000000000000000000000000000000000000046",
      ],
    };

    // const alchemyData = await alchemyProvider.getOwnersForCollectionSimple(
    //   input
    // );

    const alchemyData = await alchemyProvider.getOwnersForCollection(input);

    return [
      {
        name: "example-alchemy",
        timestamp: context.timestamp,
        description: "get NFT holders for WOW collection",
        specs: "contract 0xe785e82358879f061bc3dcac6f0444462d4b5330",
        data: alchemyData,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};
export default generator;
