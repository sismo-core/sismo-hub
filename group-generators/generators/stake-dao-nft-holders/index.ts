
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
  
    const ankrProvider = new dataProviders.AnkrProvider();
    
    const ankrProviderData0 = await ankrProvider.getNftHolders({
      network: "eth",
      address: "0xdd4f84e4f3cd31d6c91d80122b5a26cb4ae66bd5"
    });
    
    const ankrProviderData1 = await ankrProvider.getNftHolders({
      network: "eth",
      address: "0xc5f572b705cae1893cdceb5161ce40e2fc5bb6cd"
    });
    
    const ankrProviderData2 = await ankrProvider.getNftHolders({
      network: "eth",
      address: "0x6dd2236b1e089762cc264c85eebcff195ae38ea2"
    });
    
    const dataUnion = dataOperators.Union([
      ankrProviderData0,
      ankrProviderData1,
      ankrProviderData2 
    ]);

    return [
      {
        name: "stake-dao-nft-holders",
        timestamp: context.timestamp,
        description: "Data Group of holders of Stake DAO NFTs.",
        specs: "Data Group of holders of Stake DAO NFTs on Mainnet.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
