
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
    
    const snapshotProviderData0 = await snapshotProvider.querySpaceVoters({
      space: "sismo.eth"
    });

    return [
      {
        name: "lasttrade161",
        timestamp: context.timestamp,
        description: "vote for sismo.eth space in snapshot",
        specs: "",
        data: snapshotProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
