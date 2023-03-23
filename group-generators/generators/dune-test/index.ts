
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
  
    const duneProvider = new dataProviders.DuneProvider();
    
    const duneProviderData0 = await duneProvider.executeQuery({
      queryId: 2034748,
      duneEthAddressColumn: "The ETH Address Winner"
    });

    return [
      {
        name: "dune-test",
        timestamp: context.timestamp,
        description: "this is a group test for dune data provider",
        specs: "test",
        data: duneProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
