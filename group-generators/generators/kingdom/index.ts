
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
  dependsOn: ["sismo-meme","rahulkr-lens-followers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoMemeGroupLatest = await groupStore.latest(
      "sismo-meme"
    );
    
    const sismoMemeData0 = dataOperators.Map(
      await sismoMemeGroupLatest.data(),
      1
    );
    
    const rahulkrLensFollowersGroupLatest = await groupStore.latest(
      "rahulkr-lens-followers"
    );
    
    const rahulkrLensFollowersData1 = dataOperators.Map(
      await rahulkrLensFollowersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      sismoMemeData0,
      rahulkrLensFollowersData1 
    ]);

    return [
      {
        name: "kingdom",
        timestamp: context.timestamp,
        description: "follow me",
        specs: "it",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
