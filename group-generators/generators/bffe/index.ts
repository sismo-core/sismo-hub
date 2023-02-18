
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
  dependsOn: ["space-inspirers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const spaceInspirersGroupLatest = await groupStore.latest(
      "space-inspirers"
    );
    
    const spaceInspirersData0 = dataOperators.Map(
      await spaceInspirersGroupLatest.data(),
      1
    );

    return [
      {
        name: "bffe",
        timestamp: context.timestamp,
        data: spaceInspirersData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
