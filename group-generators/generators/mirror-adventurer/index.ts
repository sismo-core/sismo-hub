
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
  
    const ankrProvider = new dataProviders.AnkrProvider();
    
    const ankrProviderData0 = await ankrProvider.getNftHolders({
      network: "optimism",
      address: "0x563980BAeEd9706eA10668b615938bA981f2f0D8"
    });

    return [
      {
        name: "mirror-adventurer",
        timestamp: context.timestamp,
        description: "Hold: Airdrop Adventure Mirror Subscriber NFT",
        specs: "Hold a Airdrop Adventure Mirror Subscriber NFT",
        data: ankrProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
