
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
  dependsOn: ["pvnz"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const pvnzGroupLatest = await groupStore.latest(
      "pvnz"
    );
    
    const pvnzData0 = dataOperators.Map(
      await pvnzGroupLatest.data(),
      1
    );

    return [
      {
        name: "jerrod00",
        timestamp: context.timestamp,
        description: "You must be following me on twitter https://twitter.com/BidaSkul",
        specs: "",
        data: pvnzData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
