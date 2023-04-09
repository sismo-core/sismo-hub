
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
  
    const alchemyProvider = new dataProviders.AlchemyProvider();
    
    const alchemyProviderData0 = await alchemyProvider.queryCollectionOwners({
      contractAddress: "0xE42caD6fC883877A76A26A16ed92444ab177E306"
    });

    return [
      {
        name: "sismo-contributor",
        timestamp: context.timestamp,
        description: "Data Group of users holding Regenesis NFT celebrating the Ethereum Merge.",
        specs: "Hold a Regenesis NFT.",
        data: alchemyProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
