
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  dependsOn: ["helper"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const helperGroupLatest = await groupStore.latest(
      "helper"
    );
    
    const helperData0 = dataOperators.Map(
      await helperGroupLatest.data(),
      1
    );

    return [
      {
        name: "gutr0",
        timestamp: context.timestamp,
        description: "for donations to various sites, gitcoin and dex",
        specs: "use for large transfers, large exactly for funds that I would like to hide, so that they were not available to the public , also, for snapshot voting",
        data: helperData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
