import { dataProviders } from "@group-generators/helpers/data-providers";
import { AccountSource, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";
import { FetchedData } from "topics/group/group.types";

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
    const data: FetchedData = {};
    for (const githubUser of sismoHubContributors) {
      data[githubUser] = 1;
    }

    return [
      {
        name: "sismo-hub-contributors-github",
        timestamp: context.timestamp,
        data: data,
        accountSources: [AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
