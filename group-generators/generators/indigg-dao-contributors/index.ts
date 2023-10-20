
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const alchemyProvider = new dataProviders.AlchemyProvider();
    
    const alchemyProviderData0 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0xcc5275bded318a2f0c809071be52d78c9d08db74",
      chain: "polygon-mainnet"
    });
    
    const alchemyProviderData1 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0xa939ebe03c1c01e081b4feb0ec75673457c18368",
      chain: "polygon-mainnet"
    });
    
    const alchemyProviderData2 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0xbB65629f9E9033aACD1285cA5D489C6467a7922C",
      chain: "polygon-mainnet"
    });
    
    const dataUnion = dataOperators.Union([
      alchemyProviderData0,
      alchemyProviderData1,
      alchemyProviderData2 
    ]);

    return [
      {
        name: "indigg-dao-contributors",
        timestamp: context.timestamp,
        description: "Data group of contributors of IndiGG DAO",
        specs: "Data group of contributors of IndiGG DAO. The accounts have the badges, NFTs that were airdropped to participants who have either attended an offline IndiGG event or have been contributed in some shape or form online. The value is the no. of participation/contribution done by the account.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
