
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
  
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    
    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "49299" ],
    });

    return [
      {
        name: "lenster-early-bloomer",
        timestamp: context.timestamp,
        description: "Hold at least one Lenster.xyz Early Bloomer POAP as Proof of early users of Lenser.xyz",
        specs: "",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
