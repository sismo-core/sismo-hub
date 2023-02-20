
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
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const snapshotProvider = new dataProviders.SnapshotProvider();
    
    const snapshotProviderData0 = await snapshotProvider.queryProposalVoters({
      proposal: "0xbae4b03256b501173cf6dd0e9d277fed5e5a133b7267623350c57a76b74ae09b"
    });
    
    const snapshotProviderData1 = await snapshotProvider.queryProposalVoters({
      proposal: "0x25925551755a381ed9e8045c38adeba58a5e4d29a9c28859a3ce7fc31291301d"
    });
    
    const dataUnion = dataOperators.Union([ 
      snapshotProviderData0,
      snapshotProviderData1 
    ]);

    return [
      {
        name: "arbitrum-supporter",
        timestamp: context.timestamp,
        description: "For users who support voting in the Arbitrum network, we have developed our own badge",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
