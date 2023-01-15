
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
  dependsOn: ["helper","tally-ho-github-stargazers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const helperGroupLatest = await groupStore.latest(
      "helper"
    );
    
    const helperData0 = dataOperators.Map(
      await helperGroupLatest.data(),
      1
    );
    
    const tallyHoGithubStargazersGroupLatest = await groupStore.latest(
      "tally-ho-github-stargazers"
    );
    
    const tallyHoGithubStargazersData1 = dataOperators.Map(
      await tallyHoGithubStargazersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      helperData0,
      tallyHoGithubStargazersData1 
    ]);

    return [
      {
        name: "og",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
