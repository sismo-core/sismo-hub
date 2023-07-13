import { dataProviders } from "@group-generators/helpers/data-providers";
import { ValueType, Tags, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GroupGenerator,
  GenerationFrequency,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const snapshot = new dataProviders.SnapshotProvider();

    const voters = await snapshot.queryAllVoters({
      space: "ens.eth",
    });

    return [
      {
        name: "ens-voters",
        timestamp: context.timestamp,
        description: "Data Group of all ENS snapshot voters",
        specs: "Created by the Snapshot Data Provider. Contains all voters of ENS proposals on snapshot. The value of each group member corresponds to the number of proposals voted.",
        data: voters,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.Vote, Tags.User, Tags.Maintained],
      },
    ];
  },
};

export default generator;
