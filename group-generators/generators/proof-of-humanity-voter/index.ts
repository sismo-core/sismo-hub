
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
      proposal: "0xfd0eadb09a418c608883a0b26c5b48f209a66b0c665e2091cd2789baca0bc86f"
    });
    
    const snapshotProviderData1 = await snapshotProvider.queryProposalVoters({
      proposal: "0xff5fcb477b936d29f40a5a7cf93a4725bb04fa001e0c8269a3585c2df056c044"
    });
    
    const snapshotProviderData2 = await snapshotProvider.queryProposalVoters({
      proposal: "0x5dfb8a5a31cc297557c80a8e560be18c20a9ba41cea2bbd399e7d5ef499e8d6e"
    });
    
    const snapshotProviderData3 = await snapshotProvider.queryProposalVoters({
      proposal: "0xf9d2210cb379c3cb419eb4fe5262630f43a02f6132477a3511a7c87011279e94"
    });
    
    const snapshotProviderData4 = await snapshotProvider.queryProposalVoters({
      proposal: "0xfaa62dbbc08f7634ab5e1356016be5575ac017acfa9d73511da912e05b22d287"
    });
    
    const snapshotProviderData5 = await snapshotProvider.queryProposalVoters({
      proposal: "0x4a8d448dc030e6417eb357d7e265335ee895eff7360d011493820d654357cefb"
    });
    
    const dataUnion = dataOperators.Union([ 
      snapshotProviderData0,
      snapshotProviderData1,
      snapshotProviderData2,
      snapshotProviderData3,
      snapshotProviderData4,
      snapshotProviderData5 
    ]);

    return [
      {
        name: "proof-of-humanity-voter",
        timestamp: context.timestamp,
        description: "Badge for voters who vote in Proof of humanity proposals on Snapshot",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
