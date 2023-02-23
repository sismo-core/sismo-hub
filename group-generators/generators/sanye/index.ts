
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["zk-hack"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const zkHackGroupLatest = await groupStore.latest(
      "zk-hack"
    );
    
    const zkHackData0 = dataOperators.Map(
      await zkHackGroupLatest.data(),
      1
    );

    return [
      {
        name: "sanye",
        timestamp: context.timestamp,
        description: "Created for Web3.0 contributors",
        specs: "",
        data: zkHackData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
