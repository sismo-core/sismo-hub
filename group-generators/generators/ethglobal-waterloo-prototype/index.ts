
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
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const degenScoreProvider = new dataProviders.DegenScoreProvider();
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    
    const degenScoreProviderData0 = await degenScoreProvider.getBeaconOwnersWithScore({
      score: 800
    });
    
    const poapSubgraphProviderData1 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "63400" ]
    });
    
    const dataUnion = dataOperators.Union([
      degenScoreProviderData0,
      poapSubgraphProviderData1 
    ]);

    return [
      {
        name: "ethglobal-waterloo-prototype",
        timestamp: context.timestamp,
        description: "Data Group of Prototype Level 4",
        specs: "Hold a Degenscore 800, POAP",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
