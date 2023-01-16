
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
  dependsOn: ["helper","sismo-meme","gen-0-dagorians","zklend-poap-contributor"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const helperGroupLatest = await groupStore.latest(
      "helper"
    );
    
    const helperData0 = dataOperators.Map(
      await helperGroupLatest.data(),
      1
    );
    
    const sismoMemeGroupLatest = await groupStore.latest(
      "sismo-meme"
    );
    
    const sismoMemeData1 = dataOperators.Map(
      await sismoMemeGroupLatest.data(),
      1
    );
    
    const gen0DagoriansGroupLatest = await groupStore.latest(
      "gen-0-dagorians"
    );
    
    const gen0DagoriansData2 = dataOperators.Map(
      await gen0DagoriansGroupLatest.data(),
      1
    );
    
    const zklendPoapContributorGroupLatest = await groupStore.latest(
      "zklend-poap-contributor"
    );
    
    const zklendPoapContributorData3 = dataOperators.Map(
      await zklendPoapContributorGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      helperData0,
      sismoMemeData1,
      gen0DagoriansData2,
      zklendPoapContributorData3 
    ]);

    return [
      {
        name: "joymaker",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
