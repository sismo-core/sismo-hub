
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
      proposal: "0xd512345eb6c9b7bbf57b28a8b4f7dc46d31ab6c19ac8ad5de4605fa52fcb9e98"
    });

    return [
      {
        name: "cultivatordao-voters",
        timestamp: context.timestamp,
        description: "voters of cultivator dao proposal 0xd512345eb6c9b7bbf57b28a8b4f7dc46d31ab6c19ac8ad5de4605fa52fcb9e98",
        specs: "",
        data: snapshotProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
