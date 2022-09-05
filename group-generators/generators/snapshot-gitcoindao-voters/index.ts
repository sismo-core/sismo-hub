import { dataProviders } from "@group-generators/helpers/providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    // Instantiate your snapshot provider
    const snapshotProvider = new dataProviders.SnapshotProvider();
    // Query all voters from the space named "gitcoindao.eth"
    const voters = await snapshotProvider.queryAllVoters({
      space: "gitcoindao.eth",
    });

    return [
      {
        name: "snapshot-gitcoindao-voters",
        timestamp: context.timestamp,
        data: voters,
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
