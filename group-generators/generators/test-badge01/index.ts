
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
    
    const jsonListData0 = {
      "0x3180bcb8e6ca0e90f9584b628b6d94c35a0f359a": "1",
      "0xc04db9b4abeb9c20b76c2eaf414f048ef170426b": "1",
    };
    
    const lensProviderData1 = await lensProvider.getFollowers({
      profileId: "cs888.lens"
    });
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      lensProviderData1 
    ]);

    return [
      {
        name: "test-badge01",
        timestamp: context.timestamp,
        description: "be part of…, hold",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
