
import { dataProviders } from "@group-generators/helpers/data-providers";
import { ValueType, GroupWithData, Tags } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const gitHubProvider = new dataProviders.GithubProvider();
    
    const contributors = await gitHubProvider.getRepositoriesContributors({
      repositories: ["sismo-core/sismo-hub", "sismo-core/sismo-docs"],
    });

    return [
      {
        name: "sismo-github-contributors",
        timestamp: context.timestamp,
        description: "Sismo Github Contributors",
        specs: "This Group consist of the Sismo Hub and Sismo Docs Github repos contributors",
        data: contributors,
        valueType: ValueType.Score,
        tags: [Tags.Builders],
      },
    ];
  },
};

export default generator;
