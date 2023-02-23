
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
  dependsOn: ["butterfly-effect-user"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const butterflyEffectUserGroupLatest = await groupStore.latest(
      "butterfly-effect-user"
    );
    
    const butterflyEffectUserData0 = dataOperators.Map(
      await butterflyEffectUserGroupLatest.data(),
      1
    );

    return [
      {
        name: "hodlini",
        timestamp: context.timestamp,
        description: "Being a part of the Sismo Factory",
        specs: "",
        data: butterflyEffectUserData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
