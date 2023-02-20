
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
      eventIds: [ "39067" ],
    });

    return [
      {
        name: "offscript-attendee",
        timestamp: context.timestamp,
        description: "Holds a POAP that could be minted by attendees, following Offscript 2022",
        specs: "",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
