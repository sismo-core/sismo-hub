
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
    
    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "0xe228C34252bD874C489c2A99e03476162d74Db02"
    });
    
    const jsonListData1 = {
      "0xe228C34252bD874C489c2A99e03476162d74Db02": "1",
    };
    
    const dataUnion = dataOperators.Union([
      lensProviderData0,
      jsonListData1 
    ]);

    return [
      {
        name: "0xlink-lens-followers",
        timestamp: context.timestamp,
        description: "follow @0xlink on lens, updated daily",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
