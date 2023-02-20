import { dataProviders } from "@group-generators/helpers/data-providers";
import { AccountSource, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const githubProvider = new dataProviders.GithubProvider();

    const sismoStargazers = await githubProvider.getRepositoriesStargazers({repositories : [
      "sismo-core/sismo-protocol",
    ]});

    return [
      {
        name: "sismo-stargazers",
        timestamp: context.timestamp,
        description: "Starred the Sismo Protocol on GitHub",
        specs: "",
        data: sismoStargazers,
        accountSources: [AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
