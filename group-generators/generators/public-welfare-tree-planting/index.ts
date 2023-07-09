
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
    
    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0x0151A6FB80d01138DaFB5D2A5A6aDFb9f2c81C72",
      network: "polygon"
    });

    return [
      {
        name: "public-welfare-tree-planting",
        timestamp: context.timestamp,
        description: "Users holding Adventure of Web3 Gold Hunter",
        specs: "Users holding Adventure of Web3 Gold Hunter",
        data: tokenProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
