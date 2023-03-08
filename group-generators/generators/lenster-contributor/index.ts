
import { dataProviders } from "@group-generators/data-providers";
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
      eventIds: [ "61566" ],
    });

    return [
      {
        name: "lenster-contributor",
        timestamp: context.timestamp,
        description: "a contribution POAP &quot;GitPOAP: 2022 Lenster Contributor&quot;",
        specs: "Hold a a contribution POAP &quot;GitPOAP: 2022 Lenster Contributor&quot; (https://poap.gallery/event/61566)",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
