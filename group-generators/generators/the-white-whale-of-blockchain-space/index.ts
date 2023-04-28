
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
  
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    const galxeProvider = new dataProviders.GalxeProvider();
    
    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "66906" ]
    });
    
    const poapSubgraphProviderData1 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "31168" ]
    });
    
    const galxeProviderData2 = await galxeProvider.getCampaignHolders({
      id: "GCyruUtEW4"
    });
    
    const dataUnion = dataOperators.Union([
      poapSubgraphProviderData0,
      poapSubgraphProviderData1,
      galxeProviderData2 
    ]);

    return [
      {
        name: "the-white-whale-of-blockchain-space",
        timestamp: context.timestamp,
        description: "Hold Ethereum Mainnet Merge Protocol Supporter Whale POAP, participate in the "ETH Merge Day!" camp",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
