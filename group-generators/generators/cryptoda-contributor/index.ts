
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
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const snapshotProvider = new dataProviders.SnapshotProvider();
    
    const snapshotProviderData0 = await snapshotProvider.querySpaceVoters({
      space: "stgdao.eth"
    });
    
    const snapshotProviderData1 = await snapshotProvider.querySpaceVoters({
      space: "aave.eth"
    });
    
    const dataUnion = dataOperators.Union([ 
      snapshotProviderData0,
      snapshotProviderData1 
    ]);

    return [
      {
        name: "cryptoda-contributor",
        timestamp: context.timestamp,
        description: "You must have the power of a voice in the project Aave or Stargare",
        specs: "Subscribe to https://snapshot.org/#/stgdao.eth or https://snapshot.org/#/aave.eth
start voting",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
