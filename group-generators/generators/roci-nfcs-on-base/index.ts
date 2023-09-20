
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
  
    const ankrProvider = new dataProviders.AnkrProvider();
    
    const ankrProviderData0 = await ankrProvider.getNftHolders({
      address: "0x5CaceDF7850CCD6aa4FB133268e8531588aFE603",
      network: "base"
    });

    return [
      {
        name: "roci-nfcs-on-base",
        timestamp: context.timestamp,
        description: "Roci NFCS Holders on Base",
        specs: "Data Group of NFCS holders on Base (https://roci.fi/nfcs)",
        data: ankrProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
