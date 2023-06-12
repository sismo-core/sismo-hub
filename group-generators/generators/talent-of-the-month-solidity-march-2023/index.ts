
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
      topic: "solidity"
    });

    return [
      {
        name: "talent-of-the-month-solidity-march-2023",
        timestamp: context.timestamp,
        description: "Earn the most rewards in the month of March 2023 for the topic Solidity",
        specs: "In order to qualify for this badge you need to earn the most rewards in the month of March 2023 for the topic Solidity.",
        data: talentLayerProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
