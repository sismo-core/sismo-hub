
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
  dependsOn: ["commitdao"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const commitdaoGroupLatest = await groupStore.latest(
      "commitdao"
    );
    
    const commitdaoData0 = dataOperators.Map(
      await commitdaoGroupLatest.data(),
      1
    );

    return [
      {
        name: "space",
        timestamp: context.timestamp,
        description: "be part of space",
        specs: "",
        data: commitdaoData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
