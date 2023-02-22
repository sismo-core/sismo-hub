import { dataOperators } from "@group-generators/helpers/data-operators";
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
    const contributors = await githubProvider.getRepositoriesContributors(
      {
        repositories: ["996icu/996.ICU"],
      },
      { getOrganizationMembers: false }
    );

    const icu996Contributors = dataOperators.Union([contributors]);

    return [
      {
        name: "996-icu",
        timestamp: context.timestamp,
        description: "Be an fighter against 996(capitalism).",
        specs:
          "You should have previously heroically pointed out the evil behavior of these capitalists in the 996icu/996.ICU repository(a PR merged).",
        data: icu996Contributors,
        accountSources: [AccountSource.ETHEREUM, AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
