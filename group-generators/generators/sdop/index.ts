
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
  dependsOn: ["foxfam-adorator"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const foxfamAdoratorGroupLatest = await groupStore.latest(
      "foxfam-adorator"
    );
    
    const foxfamAdoratorData0 = dataOperators.Map(
      await foxfamAdoratorGroupLatest.data(),
      1
    );

    return [
      {
        name: "sdop",
        timestamp: context.timestamp,
        data: foxfamAdoratorData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
