
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const snapshotProvider = new dataProviders.SnapshotProvider();
    
    const snapshotProviderData0 = await snapshotProvider.queryProposalVoters({
      proposal: "0x5e82c6ef374db3e472717d3e79b05f246f9a29de3435adb457ae34afa192b5be"
    });

    return [
      {
        name: "mantle-believer",
        timestamp: context.timestamp,
        description: "Vote at BIP-19, BitDAO vote at Snapshot.",
        specs: "During the Mantle testnet to get the role, you need to vote at Snapshot, this badge is the proof of participation.",
        data: snapshotProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
