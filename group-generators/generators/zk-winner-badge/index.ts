
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
  dependsOn: ["tally-ho-github-stargazers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const tallyHoGithubStargazersGroupLatest = await groupStore.latest(
      "tally-ho-github-stargazers"
    );
    
    const tallyHoGithubStargazersData0 = dataOperators.Map(
      await tallyHoGithubStargazersGroupLatest.data(),
      1
    );

    return [
      {
        name: "zk-winner-badge",
        timestamp: context.timestamp,
        data: tallyHoGithubStargazersData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
