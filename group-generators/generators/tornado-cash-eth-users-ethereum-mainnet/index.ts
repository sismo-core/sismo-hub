import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, AccountSource, GroupStore, FetchedData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["tornado-cash-eth-depositors-ethereum-mainnet", "tornado-cash-eth-withdrawers-ethereum-mainnet"],

  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {

    const ethDepositors = await (await groupStore.latest("tornado-cash-eth-depositors-ethereum-mainnet")).data();
    const ethWithdrawers = await (await groupStore.latest("tornado-cash-eth-withdrawers-ethereum-mainnet")).data();

    const ethUsers: FetchedData = dataOperators.Union([ethDepositors, ethWithdrawers]);

    return [
      {
        name: "tornado-cash-eth-users-ethereum-mainnet",
        timestamp: context.timestamp,
        description: "All ETH Tornado Cash users on Ethereum mainnet",
        specs: "Deposit or withdraw 0.1 or 1 or 10 or 100 ETH on Tornado Cash on Ethereum mainnet",
        data: ethUsers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Privacy, Tags.User],
      },
    ];
  },
};

export default generator;
