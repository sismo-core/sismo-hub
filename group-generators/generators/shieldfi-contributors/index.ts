
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
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "ShieldFi/ShieldFi_superhack" ]
    });

    return [
      {
        name: "shieldfi-contributors",
        timestamp: context.timestamp,
        description: "Data Group of contributors of ShieldFi repo",
        specs: "Value is no of contributions",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
