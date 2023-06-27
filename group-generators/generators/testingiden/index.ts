
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
  dependsOn: ["b1y3-og-voters"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const b1y3OgVotersGroupLatest = await groupStore.latest(
      "b1y3-og-voters"
    );
    
    const b1y3OgVotersData0 = dataOperators.Map(
      await b1y3OgVotersGroupLatest.data(),
      1
    );

    return [
      {
        name: "testingiden",
        timestamp: context.timestamp,
        description: "just testing data group functionality",
        specs: "I want to test if i can use it with identity things i need",
        data: b1y3OgVotersData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
