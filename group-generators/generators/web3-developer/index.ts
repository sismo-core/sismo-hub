
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
  dependsOn: ["relay-badge"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "github:alexsheks": "1",
    };
    
    const relayBadgeGroupLatest = await groupStore.latest(
      "relay-badge"
    );
    
    const relayBadgeData1 = dataOperators.Map(
      await relayBadgeGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      relayBadgeData1 
    ]);

    return [
      {
        name: "web3-developer",
        timestamp: context.timestamp,
        description: "have a Web3 project on GitHub",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
