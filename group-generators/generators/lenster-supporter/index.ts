
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
  
    const lensProvider = new dataProviders.LensProvider();
    
    const lensProviderData0 = await lensProvider.getWhoCollectedPublication({
      publicationId: "0x0d-0x02b6"
    });
    
    const lensProviderData1 = await lensProvider.getWhoCollectedPublication({
      publicationId: "0x0d-0x0252"
    });
    
    const dataUnion = dataOperators.Union([ 
      lensProviderData0,
      lensProviderData1 
    ]);

    return [
      {
        name: "lenster-supporter",
        timestamp: context.timestamp,
        description: "collectors of the lens post 0x0d-0x02b6 or 0x0d-0x0252 ",
        specs: "collectors of the lens post 0x0d-0x02b6 or 0x0d-0x0252 on lens / 1st post  -  https://lenster.xyz/posts/0x0d-0x02b6 / 2nd post - https://lenster.xyz/posts/0x0d-0x0252",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
