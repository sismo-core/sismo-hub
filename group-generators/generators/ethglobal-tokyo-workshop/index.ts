
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
    
    const jsonListData0 = {
      "leo21.eth": "1",
    };
    
    const lensProviderData1 = await lensProvider.getFollowers({
      profileId: "leo21.eth"
    });
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      lensProviderData1 
    ]);

    return [
      {
        name: "ethglobal-tokyo-workshop",
        timestamp: context.timestamp,
        description: "Group for ethglobal tokyo workshop",
        specs: "Having been added manually by leo or following leo21.lens on lens",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
