
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
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "settlemint/buidl-asset-tokenisation" ],
    });

    return [
      {
        name: "settlemint-asset-tokenisation",
        timestamp: context.timestamp,
        description: "Data group of users who have successfully completed a SettleMint BUIDL asset tokenisation workshop",
        specs: "Complete SettleMint&#39;s BUIDL asset tokenisation workshop by submitting a pull request",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
