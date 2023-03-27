
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    
    const githubProviderData0 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "kariy/starkmint" ]
    });
    
    const githubProviderData1 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "kariy/starkmint" ]
    });
    
    const dataUnion = dataOperators.Union([
      githubProviderData0,
      githubProviderData1 
    ]);

    return [
      {
        name: "kari-is-star",
        timestamp: context.timestamp,
        description: "Data group for who is stargazer of starkmint",
        specs: "Data group for who is stargazer of starkmint",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
