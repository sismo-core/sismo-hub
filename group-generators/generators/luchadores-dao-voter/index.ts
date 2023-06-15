
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
  
    const tokenProvider = new dataProviders.TokenProvider();
    const snapshotProvider = new dataProviders.SnapshotProvider();
    
    const tokenProviderData0 = await tokenProvider.getERC721Holders({
      contractAddress: "0x8b4616926705Fb61E9C4eeAc07cd946a5D4b0760"
    });
    
    const snapshotProviderData1 = await snapshotProvider.querySpaceVoters({
      space: "luchadores.eth"
    });
    
    const dataUnion = dataOperators.Union([
      tokenProviderData0,
      snapshotProviderData1 
    ]);

    return [
      {
        name: "luchadores-dao-voter",
        timestamp: context.timestamp,
        description: "Data group of Luchadores DAO users",
        specs: "Hold a Luchadores NFT on mainnet and have voted on the luchadores.eth snapshot space ",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
