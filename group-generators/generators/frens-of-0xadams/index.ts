
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
      "0xadams.eth": "1",
    };
    
    const lensProviderData1 = await lensProvider.getFollowers({
      profileId: "0xadams.lens"
    });
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      lensProviderData1 
    ]);

    return [
      {
        name: "frens-of-0xadams",
        timestamp: context.timestamp,
        description: "Follow 0xadams.lens",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
