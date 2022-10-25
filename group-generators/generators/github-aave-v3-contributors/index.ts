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

    let count = 0
    const dataProfiles: FetchedData = {};
    for await (const item of await gitHubProvider.getRepositoryCommiters("ethereum","solidity")) {
        console.log(item)
      dataProfiles[item.login] = 1;
        count++;
    }

    console.log(dataProfiles)

  //   for await (const item of await gitHubProvider.getRepositoryContributors({},"solidity")) {
  //     console.log(item)
  // //   dataProfiles[item.ownedBy] = 1;
  //     count++;
  // }

    //go-ethereum

    console.log(count)

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
