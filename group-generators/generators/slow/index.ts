
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
  dependsOn: ["helper","gen-0-dagorians","sismo-meme"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const helperGroupLatest = await groupStore.latest(
      "helper"
    );
    
    const helperData0 = dataOperators.Map(
      await helperGroupLatest.data(),
      1
    );
    
    const gen0DagoriansGroupLatest = await groupStore.latest(
      "gen-0-dagorians"
    );
    
    const gen0DagoriansData1 = dataOperators.Map(
      await gen0DagoriansGroupLatest.data(),
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
      helperData0,
      gen0DagoriansData1,
      sismoMemeData2 
    ]);

    return [
      {
        name: "slow",
        timestamp: context.timestamp,
        description: "hold ENS",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
