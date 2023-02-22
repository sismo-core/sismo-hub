
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
  dependsOn: ["coin-center-donators"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const coinCenterDonatorsGroupLatest = await groupStore.latest(
      "coin-center-donators"
    );
    
    const coinCenterDonatorsData0 = dataOperators.Map(
      await coinCenterDonatorsGroupLatest.data(),
      1
    );

    return [
      {
        name: "ukswap",
        timestamp: context.timestamp,
        description: " Participate in the first event",
        specs: "Participate in the first event",
        data: coinCenterDonatorsData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
