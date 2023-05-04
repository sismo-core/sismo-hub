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

    //first function, gets a list of NFT owners for a specified collection

    /*
    const simpleCollectionParams = {
      chain: "eth-mainnet",
      contractAddress: "0xe785e82358879f061bc3dcac6f0444462d4b5330",
    };

    const owners = await alchemyProvider.getOwnersForCollectionSimple(
      simpleCollectionParams
    );
    */

    //second function, gets a list of NFT owners who hold a specific NFT by tokenId
    //0xf12494e3545d49616d9dfb78e5907e9078618a34 sismo contract on polygon
    const collectionParams = {
      chain: "polygon-mainnet",
      contractAddress: "0xf12494e3545d49616d9dfb78e5907e9078618a34",
      tokenIds: ["12193564", "12869882"], //hex value is 0xb9a817, 0xc460fa
    };

    const ownersOfNfts = await alchemyProvider.getOwnersByTokenIds(
      collectionParams
    );
    // 0x000000000000000000000000000000000000000000000012167191;

    //third function, gets a list of NFT owners who hold a specific NFT by trait
    /*
    const nftTraitParams = {
      chain: "eth-mainnet",
      contractAddress: "0x8da6ce566baa99c9c746f7969f231bb24df1416c",
      traitType: "foreground",
      traitValue: "selfie",
    };

    const ownersOfNftsByTrait =
      await alchemyProvider.getOwnersOfNftsMatchingTrait(nftTraitParams);
      */

    return [
      {
        name: "example-alchemy",
        timestamp: context.timestamp,
        description: "get NFT holders for WOW collection",
        specs: "contract 0xe785e82358879f061bc3dcac6f0444462d4b5330",
        data: ownersOfNfts,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};
export default generator;
