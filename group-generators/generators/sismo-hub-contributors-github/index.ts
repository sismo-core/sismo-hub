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
        ["sismo-core/sismo-hub"],
        {
          getOrganizationMembers: true,
        }
      );

    return [
      {
        name: "sismo-hub-contributors-github",
        timestamp: context.timestamp,
        data: sismoHubContributors,
        accountSources: [AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
