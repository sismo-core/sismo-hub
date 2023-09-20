import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const tokenProvider = new dataProviders.TokenProvider();

    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
    });

    return [
      {
        name: "ens-owners",
        timestamp: context.timestamp,
        description: "Data Group of all ENS owners",
        specs:
          "Contains all Ethereum Name Service NFT owners. The value of each group member corresponds to the number of NFTs held.",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
