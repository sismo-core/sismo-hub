
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
      proposal: "0x53d9351e52048c74b701ee540ee966c661459a29d41b79deacdc5c404b046eef"
    });
    
    const snapshotProviderData1 = await snapshotProvider.queryProposalVoters({
      proposal: "0x89c49753bf91a6cf246751fd819d272aad48e15793618278416eb4726b6c4ca1"
    });
    
    const snapshotProviderData2 = await snapshotProvider.queryProposalVoters({
      proposal: "0xd5e569d7c66e1ac7209c6870688f0ed2b53098d3c334685f62f24583adad4c67"
    });
    
    const snapshotProviderData3 = await snapshotProvider.queryProposalVoters({
      proposal: "0x724e6fa1185f3a44d21f52fe80d1971702456d76dbb1f813a2c6d96aa6a26ad3"
    });
    
    const dataUnion = dataOperators.Union([ 
      snapshotProviderData0,
      snapshotProviderData1,
      snapshotProviderData2,
      snapshotProviderData3 
    ]);

    return [
      {
        name: "treasure",
        timestamp: context.timestamp,
        description: "Badge available for voting in Treasure Dao on Snapshot",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
