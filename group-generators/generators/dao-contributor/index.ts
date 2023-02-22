
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
    
    const snapshotProviderData0 = await snapshotProvider.queryProposalVoters({
      proposal: "0x15031b68121659b87a3f5e33c303cd517bcbc003d3f60fc82f1299620475bcab"
    });

    return [
      {
        name: "dao-contributor",
        timestamp: context.timestamp,
        description: "People voting in leading dex decentralized governance",
        specs: "Regardless of whether the vote is for, against, or abstain",
        data: snapshotProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
