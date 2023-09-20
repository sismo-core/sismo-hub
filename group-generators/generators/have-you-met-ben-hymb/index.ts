
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
      eventIds: [ "144134" ]
    });
    
    const jsonListData1 = {
      "ben.anoufa.eth": "100",
    };
    
    const dataUnion = dataOperators.Union([
      poapSubgraphProviderData0,
      jsonListData1 
    ]);

    return [
      {
        name: "have-you-met-ben-hymb",
        timestamp: context.timestamp,
        description: "Data Group of people who met ben.anoufa.eth IRL.",
        specs: "Data Group of minter of POAP #144134. This POAP proves that the bearer met ben.anoufa.eth at EthCC 2023 and scanned their ENS Card.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
