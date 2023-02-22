
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
    
    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "78654.lens"
    });
    
    const jsonListData1 = {
      "0x5B0526638dadBf7BD75FF7e21475Bf1104704b09": "1",
    };
    
    const jsonListData2 = {
      "0x376110452c2fdAEF842DBD1F64234a2045D2E40C": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      lensProviderData0,
      jsonListData1,
      jsonListData2 
    ]);

    return [
      {
        name: "taya-fans",
        timestamp: context.timestamp,
        description: "play game",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
