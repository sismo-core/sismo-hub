
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
  
    const lensBigQueryProvider = new dataProviders.LensBigQueryProvider();
    
    const lensBigQueryProviderData0 = await lensBigQueryProvider.getFollowers({
      profileId: "harshilanand.eth"
    });

    return [
      {
        name: "test-harshil-s-lens-follower",
        timestamp: context.timestamp,
        description: "test",
        specs: "test",
        data: lensBigQueryProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
