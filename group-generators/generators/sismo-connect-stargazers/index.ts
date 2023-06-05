
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
      repositories: [ "sismo-core/sismo-connect-packages" ]
    });

    return [
      {
        name: "sismo-connect-stargazers",
        timestamp: context.timestamp,
        description: "The data group consists of GitHub users who have starred the 'sismo-connect-packages' repository.",
        specs: "Star the repo sismo-core/sismo-connect-packages",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
