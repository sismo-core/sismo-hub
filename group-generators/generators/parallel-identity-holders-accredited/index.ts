import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const alchemyProvider = new dataProviders.AlchemyProvider();

    const nftTraitParams = {
      chain: "eth-mainnet",
      contractAddress: "0x9ec6232742b6068ce733645af16ba277fa412b0a",
      traitType: "Accredited Investor",
      traitValue: "Yes",
    };

    const ownersOfNftsByTrait =
      await alchemyProvider.getOwnersOfNftsMatchingTrait(nftTraitParams);

    return [
      {
        name: "parallel-identity-holders-accredited",
        timestamp: context.timestamp,
        description: "get accredited investors from parallel identity",
        specs: "get accredited investors from parallel identity",
        data: ownersOfNftsByTrait,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};
export default generator;