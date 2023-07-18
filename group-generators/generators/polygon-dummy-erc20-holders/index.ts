
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
    
    const ankrProviderData0 = await ankrProvider.getTokenHolders({
      network: "polygon_mumbai",
      address: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"
    });

    return [
      {
        name: "polygon-dummy-erc20-holders",
        timestamp: context.timestamp,
        description: "Polygon Dummy ERC20 Token Holders",
        specs: "A collection of Polygon Dummy ERC20 Token Holders. Primarily used for testing and building apps.",
        data: ankrProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
