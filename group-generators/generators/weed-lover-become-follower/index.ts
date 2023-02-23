
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
  dependsOn: ["cryptotelugu-lens","commitdao"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const cryptoteluguLensGroupLatest = await groupStore.latest(
      "cryptotelugu-lens"
    );
    
    const cryptoteluguLensData0 = dataOperators.Map(
      await cryptoteluguLensGroupLatest.data(),
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
      cryptoteluguLensData0,
      commitdaoData1 
    ]);

    return [
      {
        name: "weed-lover-become-follower",
        timestamp: context.timestamp,
        description: "Just be a part of lens and CommitDAO",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
