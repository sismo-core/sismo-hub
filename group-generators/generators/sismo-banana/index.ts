import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const githubProvider = new dataProviders.GithubProvider();

    let githubProviderData0;
    try {
      githubProviderData0 = await githubProvider.getRepositoriesContributors({
        repositories: ["penpetr4/banana"],
      });
    } catch {
      console.log("Error fetching data for repository 'penpetr4/banana'");
      githubProviderData0 = {};
    }

    return [
      {
        name: "sismo-banana",
        timestamp: context.timestamp,
        description: "Star 'https://github.com/penpetr4/banana' Github repo",
        specs: "",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
