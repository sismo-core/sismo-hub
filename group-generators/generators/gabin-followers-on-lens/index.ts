
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
      profileId: "gabin.lens"
    });

    return [
      {
        name: "gabin-followers-on-lens",
        timestamp: context.timestamp,
        description: "Data Group of followers of @gabin on Lens",
        specs: "Data Group of followers of @gabin on Lens",
        data: lensBigQueryProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
