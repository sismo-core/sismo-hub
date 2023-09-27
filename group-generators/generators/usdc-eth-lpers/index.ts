
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
  
    const tokenProvider = new dataProviders.TokenProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC20Holders({
      contractAddress: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
      network: "mainnet"
    });
    
    const jsonListData1 = {
      "0x78a74b5D1A86704c573163C3aafB6e7234c9Da1e": "1",
      "0xE3c382A8B72643CC3756D532e967Eb44e885c619": "1",
    };
    
    const dataUnion = dataOperators.Union([
      tokenProviderData0,
      jsonListData1 
    ]);

    return [
      {
        name: "usdc-eth-lpers",
        timestamp: context.timestamp,
        description: "Data Group of UniSwap V2 USDC/ETH LPers",
        specs: "Hold 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc ERC-20",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
