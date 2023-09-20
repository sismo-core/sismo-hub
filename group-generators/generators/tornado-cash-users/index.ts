import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, AccountSource, GroupStore, FetchedData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["tornado-cash-eth-users-ethereum-mainnet", "privacy-pool-users-optimism"],

  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {

    const ethereumMainnetETHTornadoUsers = await (await groupStore.latest("tornado-cash-eth-users-ethereum-mainnet")).data();
    const optimismPrivacyPoolUsers = await (await groupStore.latest("privacy-pool-users-optimism")).data();

    // For now, only users of the ETH Pools on Ethereum Mainnet as well as users of Privacy Pool on Optimism are considered
    // Other pools will be added later
    const tornadoUsers: FetchedData = dataOperators.Union([ethereumMainnetETHTornadoUsers, optimismPrivacyPoolUsers]);

    // All addresses have a score of 1
    for (const address of Object.keys(tornadoUsers)) {
      tornadoUsers[address] = "1";
    }

    return [
      {
        name: "tornado-cash-users",
        timestamp: context.timestamp,
        description: "Data Group of all Tornado Cash users",
        specs: "Contains all Tornado Cash users: • tornado-cash-eth-users-ethereum-mainnet • privacy-pool-users-optimism",
        data: tornadoUsers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Privacy, Tags.User, Tags.Maintained],
      },
    ];
  },
};

export default generator;
