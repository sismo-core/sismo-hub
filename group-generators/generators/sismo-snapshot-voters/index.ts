
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const snapshotProvider = new dataProviders.SnapshotProvider();
    
    const snapshotProviderData0 = await snapshotProvider.querySpaceVoters({
      space: "sismo.eth"
    });

    return [
      {
        name: "sismo-snapshot-voters",
        timestamp: context.timestamp,
        description: "Data Group of all Sismo Snapshot voters",
        specs: "Created by Snapshot Data Provider. Contains all voters of Sismo proposals on snapshot. The value for each group member corresponds to the number of proposals voted.",
        data: snapshotProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
