
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const degenScoreProvider = new dataProviders.DegenScoreProvider();
    const lensBigQueryProvider = new dataProviders.LensBigQueryProvider();
    
    const degenScoreProviderData0 = await degenScoreProvider.getBeaconOwnersWithScore({
      score: 100
    });
    
    const lensBigQueryProviderData1 = await lensBigQueryProvider.getFollowers({
      profileId: "sismo.lens"
    });
    
    const dataUnion = dataOperators.Union([
      degenScoreProviderData0,
      lensBigQueryProviderData1 
    ]);

    return [
      {
        name: "testing",
        timestamp: context.timestamp,
        description: "testing",
        specs: "test this",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
