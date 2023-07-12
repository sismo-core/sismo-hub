
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const tokenProvider = new dataProviders.TokenProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC20Holders({
      network: "mainnet",
      tokenDecimals: 18,
      contractAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
    });

    const tokenProviderData1 = await tokenProvider.getERC20Holders({
      network: "polygon",
      tokenDecimals: 18,
      contractAddress: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B"
    });

    const aaveHolders = dataOperators.Union([tokenProviderData0, tokenProviderData1]);

    return [
      {
        name: "aave-holders",
        timestamp: context.timestamp,
        description: "Datagroup of all aave holders",
        specs: "Created By the Token Provider. Contains of all aave holders on Ethereum mainnet, an Polygon POS. Value for each group member is the number of Token held.",
        data: aaveHolders,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
