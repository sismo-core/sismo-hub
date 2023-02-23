
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
  dependsOn: ["sismo-meme"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoMemeGroupLatest = await groupStore.latest(
      "sismo-meme"
    );
    
    const sismoMemeData0 = dataOperators.Map(
      await sismoMemeGroupLatest.data(),
      1
    );

    return [
      {
        name: "siope",
        timestamp: context.timestamp,
        description: "ENS",
        specs: "All you need is ens",
        data: sismoMemeData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
