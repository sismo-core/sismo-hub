
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const lensBigQueryProvider = new dataProviders.LensBigQueryProvider();
    
    const lensBigQueryProviderData0 = await lensBigQueryProvider.getFollowers({
      profileId: "vkpatva.lens"
    });

    return [
      {
        name: "follower-of-vkpatva-lens",
        timestamp: context.timestamp,
        description: "get follower of vkpatva.lens",
        specs: "Get Follower of vkpatva.lens",
        data: lensBigQueryProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
