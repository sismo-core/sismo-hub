// sismo-hub/group-generators/generators/snapshot-gitcoindao-voters/index.ts

import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Here you are hacker 😈

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once, // you generate the group only once 
  generate: async (
    context: GenerationContext,
  ): Promise<GroupWithData[]> => {
    // Instantiate your snapshot provider
    const snapshotProvider = new dataProviders.SnapshotProvider();
    // Query all voters from the space named "gitcoindao.eth"
    const voters = await snapshotProvider.queryAllVoters({
      space: "gitcoindao.eth",
    });

    return [
      {
        name: "snapshot-gitcoindao-voters", // give a name to your group
        timestamp: context.timestamp,
        data: voters, // we reference the queried data
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;