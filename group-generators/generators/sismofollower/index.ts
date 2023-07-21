
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
  
    const lensBigQueryProvider = new dataProviders.LensBigQueryProvider();
    
    const jsonListData0 = {
      "0x5170B23c13fD2B58Ee10D52D9469B832cF42224d": "1",
      "0xb5AB443DfF53F0e397a9E0778A3343Cbaf4D001a": "1",
    };
    
    const lensBigQueryProviderData1 = await lensBigQueryProvider.getFollowers({
      profileId: "sismo.lens"
    });
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      lensBigQueryProviderData1 
    ]);

    return [
      {
        name: "sismofollower",
        timestamp: context.timestamp,
        description: "Data Group of Whitelist and Follower of Sismo.eth",
        specs: "whitelist and folllower of sismolens",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
