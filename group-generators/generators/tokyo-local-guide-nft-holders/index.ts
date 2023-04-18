
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
  
    const unlockSubgraphProvider = new dataProviders.UnlockSubgraphProvider();
    
    const unlockSubgraphProviderData0 = await unlockSubgraphProvider.getKeysInLock({
      lockAddress: "0xa38480d80bdc8c0d5ea061283b952cbd48b029b9",
      chain: "polygon"
    });

    return [
      {
        name: "tokyo-local-guide-nft-holders",
        timestamp: context.timestamp,
        description: "Data Group of Tokyo local guide NFT Holders ",
        specs: "Hold an NFT of Tokyo local guide",
        data: unlockSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
