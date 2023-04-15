
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

    const jsonListData1 = {
      "0xf14AfaEaEc55B1D2718dF7Fb831816b1E58241D6": "1",
      "0xd1c805676244085838262806ffb92b21421e5b8d": "1",
      "0x49574d30abe0c17c23c5d2af46e768fbfa76a65d": "1",
      "0x63a93a907328f98c7e7bf8f3b8c8c719ccece763": "1",
      "0xd6e3df580ebef6c6fe979fe2e2a9c6edbd5445df": "1",
      "0xfb2b138534b58034a07b2c0da8258dc645b28122": "1"
    };

    
    const dataUnion = dataOperators.Union([ 
      snapshotProviderData0,
      snapshotProviderData1,
      jsonListData1
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
