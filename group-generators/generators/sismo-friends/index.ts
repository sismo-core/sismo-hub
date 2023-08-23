
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
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const lensBigQueryProvider = new dataProviders.LensBigQueryProvider();
    
    const jsonListData0 = {
      "0x32108e5f09f0df35aefc2ef4c520bbd06a57dae5": "1",
      "0x1c494f1919c1512ebe74a5dcc17dac9a64069023": "1",
      "dhadrien.sismo.eth": "1",
      "github:leosayous21": "1",
      "telegram:dhadrien": "1",
      "twitter:dhadrien_": "1",
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
        name: "sismo-friends",
        timestamp: context.timestamp,
        description: "A Data Group for friends of Sismo.",
        specs: "A Data Group for core members of the Sismo team and followers of Sismo on Lens.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
