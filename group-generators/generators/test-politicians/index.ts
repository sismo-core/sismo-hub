
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
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    
    const githubProviderData0 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "Bluegales/swipe-to-bribe" ]
    });
    
    const githubProviderData1 = await githubProvider.getRepositoriesContributors({
      repositories: [ "Bluegales/swipe-to-bribe" ]
    });
    
    const dataUnion = dataOperators.Union([
      githubProviderData0,
      githubProviderData1 
    ]);

    return [
      {
        name: "test-politicians",
        timestamp: context.timestamp,
        description: "Test Politicians",
        specs: "Data Group of Test Politicians, they are stargazers of swipe-to-bribe and contributers",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
