import { dataProviders } from "@group-generators/helpers/data-providers";
import { ValueType, Tags, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GroupGenerator,
  GenerationFrequency,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const snapshot = new dataProviders.SnapshotProvider();

    const voters = await snapshot.queryAllVoters({
      space: "ens.eth",
    });

    return [
      {
        name: "ens-voters",
        timestamp: context.timestamp,
        description: "Voters of ENS space on Snapshot",
        specs: "",
        data: voters,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.Vote, Tags.User],
      },
    ];
  },
};

export default generator;
