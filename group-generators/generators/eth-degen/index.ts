
import { dataOperators } from "@group-generators/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  dependsOn: ["xnova-lens-follower"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const xnovaLensFollowerGroupLatest = await groupStore.latest(
      "xnova-lens-follower"
    );
    
    const xnovaLensFollowerData0 = dataOperators.Map(
      await xnovaLensFollowerGroupLatest.data(),
      1
    );

    return [
      {
        name: "eth-degen",
        timestamp: context.timestamp,
        description: "Be part of the crypto degens",
        specs: "",
        data: xnovaLensFollowerData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
