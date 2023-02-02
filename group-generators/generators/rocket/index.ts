
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
  dependsOn: ["mice-derp-early","commitdao"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const miceDerpEarlyGroupLatest = await groupStore.latest(
      "mice-derp-early"
    );
    
    const miceDerpEarlyData0 = dataOperators.Map(
      await miceDerpEarlyGroupLatest.data(),
      1
    );
    
    const commitdaoGroupLatest = await groupStore.latest(
      "commitdao"
    );
    
    const commitdaoData1 = dataOperators.Map(
      await commitdaoGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      miceDerpEarlyData0,
      commitdaoData1 
    ]);

    return [
      {
        name: "rocket",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
