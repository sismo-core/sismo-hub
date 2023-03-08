
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
  dependsOn: ["sismo-contributors","sismo-stargazers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoContributorsGroupLatest = await groupStore.latest(
      "sismo-contributors"
    );
    
    const sismoContributorsData0 = dataOperators.Map(
      await sismoContributorsGroupLatest.data(),
      1
    );
    
    const sismoStargazersGroupLatest = await groupStore.latest(
      "sismo-stargazers"
    );
    
    const sismoStargazersData1 = dataOperators.Map(
      await sismoStargazersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      sismoContributorsData0,
      sismoStargazersData1 
    ]);

    return [
      {
        name: "krom",
        timestamp: context.timestamp,
        description: "HOLD Sismo Contributor ZK Badge and Sismo GitHub Stargazer ZK Badge",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
