
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
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
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "sismo-core/sismo-hub" ]
    });

    return [
      {
        name: "sismo-hub-github-contributors",
        timestamp: context.timestamp,
        description: "Data Group of all Sismo Hub GitHub repository contributors",
        specs: "Created by the GitHub Data Provider. Contains all sismo-core/sismo-hub GitHub repository contributors. The value of each group member corresponds to the number of contributions to the repository.",
        data: githubProviderData0,
        valueType: ValueType.Score,
        accountSources: [AccountSource.GITHUB],
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
