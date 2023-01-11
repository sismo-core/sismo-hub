
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
      proposal: "0x22d4c3ab56832de58c1774d1a0aeb61ba6dde8b16c0f8382f85d8935f3ee1f11"
    });

    return [
      {
        name: "badgeholder-nomination",
        timestamp: context.timestamp,
        data: snapshotProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
