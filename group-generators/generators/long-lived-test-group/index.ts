
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
      repositories: [ "ZinchenkoDima/ETHPorto2023", "jhonnynetworker/ETHPorto2023" ],
    });

    return [
      {
        name: "long-lived-test-group",
        timestamp: context.timestamp,
        description: "Data group of users contributors of Long-Lived project",
        specs: "ETH Porto hackathon project contributors of sismo implementation on Long-Lived",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
