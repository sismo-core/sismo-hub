
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
  dependsOn: ["lens-followers","helper","sismo-meme"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const lensFollowersGroupLatest = await groupStore.latest(
      "lens-followers"
    );
    
    const lensFollowersData0 = dataOperators.Map(
      await lensFollowersGroupLatest.data(),
      1
    );
    
    const helperGroupLatest = await groupStore.latest(
      "helper"
    );
    
    const helperData1 = dataOperators.Map(
      await helperGroupLatest.data(),
      1
    );
    
    const sismoMemeGroupLatest = await groupStore.latest(
      "sismo-meme"
    );
    
    const sismoMemeData2 = dataOperators.Map(
      await sismoMemeGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      lensFollowersData0,
      helperData1,
      sismoMemeData2 
    ]);

    return [
      {
        name: "cyber",
        timestamp: context.timestamp,
        description: "Sisimo contributor",
        specs: "Twitter account  connected to the Sismo",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
