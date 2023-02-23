
import { dataOperators } from "@group-generators/helpers/data-operators";
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
      space: "mail3.eth"
    });
    
    const snapshotProviderData1 = await snapshotProvider.querySpaceVoters({
      space: "sismo.eth"
    });
    
    const dataUnion = dataOperators.Union([ 
      snapshotProviderData0,
      snapshotProviderData1 
    ]);

    return [
      {
        name: "pvnz",
        timestamp: context.timestamp,
        description: "Vote for mail3 or sismo on snapshot",
        specs: "To vote you need sismo contributor bage or mail3 vote nft",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
