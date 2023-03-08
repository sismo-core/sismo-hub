
import { dataOperators } from "@group-generators/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["sismo-stargazers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoStargazersGroupLatest = await groupStore.latest(
      "sismo-stargazers"
    );
    
    const sismoStargazersData0 = dataOperators.Map(
      await sismoStargazersGroupLatest.data(),
      1
    );

    return [
      {
        name: "roboplex",
        timestamp: context.timestamp,
        description: "be part of Sismo entusiast",
        specs: "",
        data: sismoStargazersData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
