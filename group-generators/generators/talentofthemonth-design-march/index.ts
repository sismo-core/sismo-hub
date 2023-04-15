
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
  
    const talentLayerProvider = new dataProviders.TalentLayerProvider();
    
    const talentLayerProviderData0 = await talentLayerProvider.getTalentOfTheMonth({
      topic: "design"
    });

    return [
      {
        name: "talentofthemonth-design-march",
        timestamp: context.timestamp,
        description: "Generate a leaderboard of the 1 most talented on design of march",
        specs: "Complete jobs around design on TalentLayer and be the first on the leaderboard for the month of march",
        data: talentLayerProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
