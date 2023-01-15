
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["lenster-gas-supporter"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const lensterGasSupporterGroupLatest = await groupStore.latest(
      "lenster-gas-supporter"
    );
    
    const lensterGasSupporterData0 = dataOperators.Map(
      await lensterGasSupporterGroupLatest.data(),
      1
    );

    return [
      {
        name: "lens",
        timestamp: context.timestamp,
        data: lensterGasSupporterData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
