
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
      repositories: [ "TalentLayer/talentlayer-id-contracts", "TalentLayer-Labs/indie-frontend", "TalentLayer/talentlayer-id-subgraph" ],
    });

    return [
      {
        name: "talentlayer",
        timestamp: context.timestamp,
        description: "TalentLayer OpenSource Contributors",
        specs: "Help us building TalentLayer protocol ",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
