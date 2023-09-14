
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
      repositories: [ "p2p-org/p2p-wallet-web", "p2p-org/key-app-android", "p2p-org/p2p-wallet-ios" ]
    });

    return [
      {
        name: "stargazers-of-keyapp-s-apps",
        timestamp: context.timestamp,
        description: "Data group of stargazers of Keyapp's apps",
        specs: "Data group of stargazers of Keyapp's apps",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
