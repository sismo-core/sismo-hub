
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
  
    const degenScoreProvider = new dataProviders.DegenScoreProvider();
    
    const degenScoreProviderData0 = await degenScoreProvider.getBeaconOwnersWithScore({
      score: 750
    });

    return [
      {
        name: "backtomiami",
        timestamp: context.timestamp,
        description: "Hold DegenScore with over 750 points.",
        specs: "",
        data: degenScoreProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
