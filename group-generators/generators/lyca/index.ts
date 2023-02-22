
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
  dependsOn: ["ethereum-adopter"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const ethereumAdopterGroupLatest = await groupStore.latest(
      "ethereum-adopter"
    );
    
    const ethereumAdopterData0 = dataOperators.Map(
      await ethereumAdopterGroupLatest.data(),
      1
    );

    return [
      {
        name: "lyca",
        timestamp: context.timestamp,
        description: "Ethereum Adopter required",
        specs: "You must have an Ethereum Adopter.",
        data: ethereumAdopterData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
