
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
      repositories: [ "mmatteo23/zkhack-lisbon-frontend" ]
    });
    
    const githubProviderData1 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "0xCaso/zkhack-lisbon-discord-bot" ]
    });
    
    const dataUnion = dataOperators.Union([
      githubProviderData0,
      githubProviderData1 
    ]);

    return [
      {
        name: "discord-chads",
        timestamp: context.timestamp,
        description: "This group is only for real Discord chads",
        specs: "You will be eligible if you star one of the following GitHub repositories: 0xCaso/zkhack-lisbon-discord-bot, mmatteo23/zkhack-lisbon-frontend",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
