
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
    
    const snapshotProviderData0 = await snapshotProvider.queryProposalVoters({
      proposal: "0x1568deb7f61440b48a56e1c44e3d023852002e693fb3e58a085b5fb6f3134e98"
    });
    
    const snapshotProviderData1 = await snapshotProvider.queryProposalVoters({
      proposal: "0xae1ebaebd42f44483c06cb0e8e7cdbc1f5aca52843b27017132ab8dbd8ef9158"
    });
    
    const snapshotProviderData2 = await snapshotProvider.queryProposalVoters({
      proposal: "0x82586192cf58f438cfee7101afde68df11ab3be071a6f7c05d1a3e8506836ee2"
    });
    
    const snapshotProviderData3 = await snapshotProvider.queryProposalVoters({
      proposal: "0x82586192cf58f438cfee7101afde68df11ab3be071a6f7c05d1a3e8506836ee2"
    });
    
    const dataUnion = dataOperators.Union([ 
      snapshotProviderData0,
      snapshotProviderData1,
      snapshotProviderData2,
      snapshotProviderData3 
    ]);

    return [
      {
        name: "layer-zero-user",
        timestamp: context.timestamp,
        description: "To get the badge, you had to participate in Stargate's voting on Snapshot",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
