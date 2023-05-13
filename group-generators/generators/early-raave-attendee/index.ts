
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
      eventIds: [ "3532", "8507", "14048", "32225", "47553", "63182" ]
    });

    return [
      {
        name: "early-raave-attendee",
        timestamp: context.timestamp,
        description: "Data group of rAAVE POAP holders (2021/2022)",
        specs: "Early rAAVE attendee holding a POAP of rAAVE from Paris (July 2021), Lisbon (October 2021), Helsinki (December 2021), Amsterdam (April 2022),  Paris (July 2022) and Bogota (October 2022) ",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
