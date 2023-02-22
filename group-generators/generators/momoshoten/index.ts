
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
        name: "momoshoten",
        timestamp: context.timestamp,
        description: "Retains early ZK badge",
        specs: "https://github.com/sismo-core/sismo-hub/blob/main/group-generators/generators/helper/index.ts",
        data: helperData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
