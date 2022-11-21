import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { AccountSource, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const githubProvider = new dataProviders.GithubProvider();

    const sismoHubContributors =
      await githubProvider.getRepositoriesContributors(
        { repositories: ["sismo-core/sismo-hub"] },
        {
          getOrganizationMembers: true,
        },
        2
      );

    const sismoHubStargazers = await githubProvider.getRepositoriesStargazers({
      repositories: ["sismo-core/sismo-hub"],
    });

    const sismoHubData = dataOperators.Union([
      sismoHubStargazers,
      sismoHubContributors,
    ]);

    return [
      {
        name: "sismo-hub-contributors-github",
        timestamp: context.timestamp,
        data: sismoHubData,
        accountSources: [AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
