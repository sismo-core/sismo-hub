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

    //3 functions
    //1. get owners of an nft collection
    //2. get owners of nfts given their tokenId
    //3. get owners of nfts given a trait type and value

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

    const tester = await alchemyProvider.getOwnersOfNftsMatchingTrait({
      chain: "eth-mainnet",
      contractAddress: "0x8da6ce566baa99c9c746f7969f231bb24df1416c",
      traitType: "foreground",
      traitValue: "selfie",
    });

    //opensea.io/collection/confessions-from-the-hart-genesis-collection
    //foreground | selfie
    // 0x8da6ce566baa99c9c746f7969f231bb24df1416c;

    console.log(tester);

    // const alchemyData = await alchemyProvider.getOwnersForCollection(input);
    const alchemyData = {};

    return [
      {
        name: "example-alchemy",
        timestamp: context.timestamp,
        description: "get NFT holders for WOW collection",
        specs: "contract 0xe785e82358879f061bc3dcac6f0444462d4b5330",
        data: tester,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};
export default generator;
