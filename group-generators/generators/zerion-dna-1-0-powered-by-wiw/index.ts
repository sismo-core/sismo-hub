
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
  
    const wiwBadgeProvider = new dataProviders.WiwBadgeProvider();
    
    const wiwBadgeProviderData0 = await wiwBadgeProvider.queryBadgeHolders({
      tagId: "313ec0971ca4809a4af5d124efd47ee3793762f3f5fd12a89e52d77c60390d79"
    });
    
    const wiwBadgeProviderData1 = await wiwBadgeProvider.queryBadgeHolders({
      tagId: "5c9fd9b804c20d8f34a3916d1fee56895fa0edbe08afb75a32ad2d511cf02387"
    });
    
    const dataUnion = dataOperators.Union([
      wiwBadgeProviderData0,
      wiwBadgeProviderData1 
    ]);

    return [
      {
        name: "zerion-dna-1-0-powered-by-wiw",
        timestamp: context.timestamp,
        description: "Zerion DNA 1.0,  Holder & Minter",
        specs: "Holder of Zerion DNA 1.0 ,
Minter of Zerion DNA 1.0",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
