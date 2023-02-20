
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
  dependsOn: ["first-rug-on-lens"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const firstRugOnLensGroupLatest = await groupStore.latest(
      "first-rug-on-lens"
    );
    
    const firstRugOnLensData0 = dataOperators.Map(
      await firstRugOnLensGroupLatest.data(),
      1
    );

    return [
      {
        name: "kriskey",
        timestamp: context.timestamp,
        description: "be verified on",
        specs: "tester",
        data: firstRugOnLensData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
