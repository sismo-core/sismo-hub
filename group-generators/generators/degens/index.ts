
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
  
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    
    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "2435941", "28101", "19094", "23333", "48890", "197537", "3136", "37847", "100504" ],
    });

    return [
      {
        name: "degens",
        timestamp: context.timestamp,
        description: "hold",
        specs: "Hold POAP 2435941, 28101, 19094, 23333, 48890, 197537, 3136, 37847, 100504",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
