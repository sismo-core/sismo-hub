
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
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "anoma/namada" ]
    });
    
    const githubProviderData1 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "anoma/namada" ]
    });
    
    const dataUnion = dataOperators.Union([
      githubProviderData0,
      githubProviderData1 
    ]);

    return [
      {
        name: "contributors-and-stargazer",
        timestamp: context.timestamp,
        description: "all Contributors and Stargazer ",
        specs: "all Contributors and Stargazer ",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
