
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
  
    const degenScoreProvider = new dataProviders.DegenScoreProvider();
    
    const degenScoreProviderData0 = await degenScoreProvider.getBeaconOwnersWithScore({
      score: 300
    });

    return [
      {
        name: "qwert",
        timestamp: context.timestamp,
        description: "Data Group",
        specs: "as",
        data: degenScoreProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
