import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const tokenProvider = new dataProviders.TokenProvider();

    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
    });

    const tokenProviderData1 = await tokenProvider.getERC721Holders({
      contractAddress: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
    });

    const dataUnion = dataOperators.Union([tokenProviderData0, tokenProviderData1]);

    return [
      {
        name: "noun-owner",
        displayName: "Noun NFT Owners",
        timestamp: context.timestamp,
        description: "Hold a Noun NFT or ENS domain NFT (testnet)",
        specs:
          "Hold a Noun NFT to get the credit score increased for Crypto Bureau. For the test net usage, you can also be eligible by holding ENS as NFT",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
