
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
  dependsOn: ["commitdao","space-inspirers","pvnz","lenster-early-bloomer"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const commitdaoGroupLatest = await groupStore.latest(
      "commitdao"
    );
    
    const commitdaoData0 = dataOperators.Map(
      await commitdaoGroupLatest.data(),
      1
    );
    
    const spaceInspirersGroupLatest = await groupStore.latest(
      "space-inspirers"
    );
    
    const spaceInspirersData1 = dataOperators.Map(
      await spaceInspirersGroupLatest.data(),
      1
    );
    
    const pvnzGroupLatest = await groupStore.latest(
      "pvnz"
    );
    
    const pvnzData2 = dataOperators.Map(
      await pvnzGroupLatest.data(),
      1
    );
    
    const lensterEarlyBloomerGroupLatest = await groupStore.latest(
      "lenster-early-bloomer"
    );
    
    const lensterEarlyBloomerData3 = dataOperators.Map(
      await lensterEarlyBloomerGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      commitdaoData0,
      spaceInspirersData1,
      pvnzData2,
      lensterEarlyBloomerData3 
    ]);

    return [
      {
        name: "rabbithk",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
