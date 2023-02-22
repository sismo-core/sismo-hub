
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
  dependsOn: ["helper","sismo-meme","cryptomonkeys"],
  
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
    
    const cryptomonkeysGroupLatest = await groupStore.latest(
      "cryptomonkeys"
    );
    
    const cryptomonkeysData2 = dataOperators.Map(
      await cryptomonkeysGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      helperData0,
      sismoMemeData1,
      cryptomonkeysData2 
    ]);

    return [
      {
        name: "marianmarius",
        timestamp: context.timestamp,
        description: "marianmarius zk badge",
        specs: "MARIANMARIUS ZK Badge",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
