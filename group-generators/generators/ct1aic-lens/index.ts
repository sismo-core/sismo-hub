
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
      profileId: "ct1aic.lens"
    });

    return [
      {
        name: "ct1aic-lens",
        timestamp: context.timestamp,
        description: "CT1AIC Lens Frens Follower",
        specs: "This ZK Badge proves that it's owner is following Rui Costa, @ct1aic.lens profile: https://www.lensfrens.xyz/ct1aic.lens",
        data: lensBigQueryProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
