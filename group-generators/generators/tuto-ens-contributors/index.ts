import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    // 1. Instantiate snapshot provider
    const snapshotProvider = new dataProviders.SnapshotProvider();
    // Query all voters from the space named "ens.eth"
    const voters = await snapshotProvider.queryAllVoters({
      space: "ens.eth",
    });

    // 2. Instantiate Github Provider
    const githubProvider = new dataProviders.GithubProvider();
    // Query all contributors of ens and ens-contracts repositories
    const contributors = await githubProvider.getRepositoriesContributors({
      repositories: ["ensdomains/ens", "ensdomains/ens-contracts"],
    });

    // 3. Make a union of the two queried data
    const tutorialEnsContributors = dataOperators.Union([voters, contributors]);

    return [
      {
        name: "tuto-ens-contributors",
        timestamp: context.timestamp,
        data: tutorialEnsContributors,
        accountSources: [AccountSource.ETHEREUM, AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
