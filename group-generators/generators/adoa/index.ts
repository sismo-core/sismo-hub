
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
  dependsOn: ["sismo-early-users","coin-center-donators","zk-hack"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoEarlyUsersGroupLatest = await groupStore.latest(
      "sismo-early-users"
    );
    
    const sismoEarlyUsersData0 = dataOperators.Map(
      await sismoEarlyUsersGroupLatest.data(),
      1
    );
    
    const coinCenterDonatorsGroupLatest = await groupStore.latest(
      "coin-center-donators"
    );
    
    const coinCenterDonatorsData1 = dataOperators.Map(
      await coinCenterDonatorsGroupLatest.data(),
      1
    );
    
    const zkHackGroupLatest = await groupStore.latest(
      "zk-hack"
    );
    
    const zkHackData2 = dataOperators.Map(
      await zkHackGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      sismoEarlyUsersData0,
      coinCenterDonatorsData1,
      zkHackData2 
    ]);

    return [
      {
        name: "adoa",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
