
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
  
    const unlockSubgraphProvider = new dataProviders.UnlockSubgraphProvider();
    
    const unlockSubgraphProviderData0 = await unlockSubgraphProvider.getKeysInLock({
      lockAddress: "0x5c92f51e7f84ec3ef0f2494ba281f74805f7e6d5",
      chain: "goerli"
    });

    return [
      {
        name: "consensys-demo-lock",
        timestamp: context.timestamp,
        description: "Data group of ConsenSys demo lock members",
        specs: "Built with the unlock Data Provider. lock: 0x5c92f51e7f84ec3ef0f2494ba281f74805f7e6d5 on goerli.",
        data: unlockSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
