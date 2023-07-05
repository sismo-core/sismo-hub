
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
  
    const ankrProvider = new dataProviders.AnkrProvider();
    
    const ankrProviderData0 = await ankrProvider.getNftHolders({
      network: "eth",
      address: "0xc5F572B705cAE1893CdcEB5161ce40e2fC5bB6cD"
    });
    
    const jsonListData1 = {
      "leosayous21.sismo.eth": "3",
      "dhadrien.sismo.eth": "3",
      "zkentin.eth": "3",
      "dimsome.eth": "2",
      "martingbz.eth": "1",
    };
    
    const dataUnion = dataOperators.Union([
      ankrProviderData0,
      jsonListData1 
    ]);

    return [
      {
        name: "demo-group-cow-traders-holders",
        timestamp: context.timestamp,
        description: "Demo Data Group of Cow traders and holders.",
        specs: "Demo Data Group of Cow traders and holders. ONLY FOR DEMO PURPOSE.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
