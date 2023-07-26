
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
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const ankrProvider = new dataProviders.AnkrProvider();
    const alchemyProvider = new dataProviders.AlchemyProvider();
    
    const ankrProviderData0 = await ankrProvider.getNftHolders({
      address: "0x65f0eFc3AB80CBe23EDD22c9Ba6cec0bb85440a2",
      network: "polygon_mumbai"
    });
    
    const alchemyProviderData1 = await alchemyProvider.getOwnersForCollection({
      contractAddress: "0x65f0eFc3AB80CBe23EDD22c9Ba6cec0bb85440a2",
      chain: "polygon-mumbai"
    });
    
    const dataUnion = dataOperators.Union([
      ankrProviderData0,
      alchemyProviderData1 
    ]);

    return [
      {
        name: "worldcoin-verified-human",
        timestamp: context.timestamp,
        description: "Claim that you are Worldcoin Verified",
        specs: "Only Token Holders of the Worldcoin Soulbound Token can verify this claim",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
