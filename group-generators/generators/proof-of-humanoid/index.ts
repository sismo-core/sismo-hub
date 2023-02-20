
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
  dependsOn: ["degens"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const degensGroupLatest = await groupStore.latest(
      "degens"
    );
    
    const degensData0 = dataOperators.Map(
      await degensGroupLatest.data(),
      1
    );

    return [
      {
        name: "proof-of-humanoid",
        timestamp: context.timestamp,
        description: "Hold Degens ZK Badge",
        specs: "",
        data: degensData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
