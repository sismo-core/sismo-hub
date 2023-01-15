
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
  dependsOn: ["lens-meme-collector-mirror"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const lensMemeCollectorMirrorGroupLatest = await groupStore.latest(
      "lens-meme-collector-mirror"
    );
    
    const lensMemeCollectorMirrorData0 = dataOperators.Map(
      await lensMemeCollectorMirrorGroupLatest.data(),
      1
    );

    return [
      {
        name: "koute",
        timestamp: context.timestamp,
        data: lensMemeCollectorMirrorData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
