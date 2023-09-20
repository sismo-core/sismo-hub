
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
  
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    
    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "63400" ]
    });
    
    const poapSubgraphProviderData1 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "57318" ]
    });
    
    const dataUnion = dataOperators.Union([
      poapSubgraphProviderData0,
      poapSubgraphProviderData1 
    ]);

    return [
      {
        name: "poap-of-testing",
        timestamp: context.timestamp,
        description: "Data group to test ",
        specs: "Both are poap data.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
