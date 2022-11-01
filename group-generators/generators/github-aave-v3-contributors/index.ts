import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const gitHubProvider = new dataProviders.GithubProvider();

    const dataProfiles: FetchedData = {};
    // for await (const item of await gitHubProvider.getRepositoriesContributors(["aave/aave-v3-core"], {getOrganizationMembers: true})) {
    //     console.log(item)
    //   dataProfiles[item] = 1;
    //     count++;
    // }
    const data: FetchedData = await gitHubProvider.getRepositoriesContributors(["ethereum/solidity", "ethereum/go-ethereum"], {getOrganizationMembers: true});

    console.log(data)

    return [
      {
        name: "github-aave-v3-contributors",
        timestamp: context.timestamp,
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
