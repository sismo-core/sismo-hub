
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
      eventIds: [ "126711" ]
    });

    return [
      {
        name: "finbob-ethdam",
        timestamp: context.timestamp,
        description: "Data Group of people who met Finbob at ETHDam 2023",
        specs: "Holds POAP event https://poap.gallery/event/126711",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
