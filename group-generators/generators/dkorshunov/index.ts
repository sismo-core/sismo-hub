
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
  dependsOn: ["swapper-armyfox"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const swapperArmyfoxGroupLatest = await groupStore.latest(
      "swapper-armyfox"
    );
    
    const swapperArmyfoxData0 = dataOperators.Map(
      await swapperArmyfoxGroupLatest.data(),
      1
    );

    return [
      {
        name: "dkorshunov",
        timestamp: context.timestamp,
        description: "be verified on GitCoin, donated to DropsTab",
        specs: "",
        data: swapperArmyfoxData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
