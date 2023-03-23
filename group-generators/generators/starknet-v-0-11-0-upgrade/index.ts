import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const snapshotProvider = new dataProviders.SnapshotProvider();

    const snapshotProviderData0 = await snapshotProvider.queryProposalVoters({
      proposal:
        "0x00889bc468509610e516e8602f00b21ca8c32466dd4f0140eca38becb7f40bef",
    });

    return [
      {
        name: "starknet-v-0-11-0-upgrade",
        timestamp: context.timestamp,
        description:
          "Data group of users who vote for The first official vote for @Starknet  v.0.11.0 upgrade",
        specs:
          "Data group of users who vote for The first official vote for @Starknet  v.0.11.0 upgrade https://snapshot.org/#/starknet.eth/proposal/0x00889bc468509610e516e8602f00b21ca8c32466dd4f0140eca38becb7f40bef",
        data: snapshotProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
