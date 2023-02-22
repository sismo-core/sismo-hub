import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const githuProvider = new dataProviders.GithubProvider();
    const ensContractsStargazers =
      await githuProvider.getRepositoriesStargazers({
        repositories: ["ensdomains/ens-contracts"],
      });
    return [
      {
        name: "ens-contracts-stargazers",
        timestamp: context.timestamp,
        description:
        "Star the ensdomains/ens-contracts repository on Github",
        specs: "",
        data: ensContractsStargazers,
        accountSources: [AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
