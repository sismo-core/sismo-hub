
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
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
        name: "missionzk",
        timestamp: context.timestamp,
        description: "Data group of people who starred sismo",
        specs: "Starred Sismo repo on Github",
        data: sismoStargazersData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
