
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
  
    const lensProvider = new dataProviders.LensProvider();
    
    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "semantic.lens"
    });

    return [
      {
        name: "suke",
        timestamp: context.timestamp,
        description: "follow @semantic on Lens protocol.",
        specs: "follow @semantic on Lens protocol.",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
