
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
  
    const lensProvider = new dataProviders.LensProvider();
    
    const lensProviderData0 = await lensProvider.getWhoCollectedPublication({
      publicationId: "0x8f02-0x0131"
    });
    
    const lensProviderData1 = await lensProvider.getWhoMirroredPublication({
      publicationId: "0x8f02-0x0131"
    });
    
    const dataUnion = dataOperators.Union([ 
      lensProviderData0,
      lensProviderData1 
    ]);

    return [
      {
        name: "lens-meme-collector-mirror",
        timestamp: context.timestamp,
        description: "collector,mirrors lens meme post from rahulkr.lens",
        specs: "collectors,mirrors of lens meme post from rahulkr.lens. link - https://lenster.xyz/posts/0x8f02-0x0131",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
