
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
  
    const talentLayerProvider = new dataProviders.TalentLayerProvider();
    
    const talentLayerProviderData0 = await talentLayerProvider.getUsersWithTalentLayerId({
      
    });

    return [
      {
        name: "talentlayer-reputation",
        timestamp: context.timestamp,
        description: "People that have built a reputation within talent layer",
        specs: "Members of talent layer",
        data: talentLayerProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
