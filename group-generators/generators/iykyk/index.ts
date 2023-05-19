
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
  
    const restProvider = new dataProviders.RestProvider();
    
    const restProviderData0 = await restProvider.getAccountsFromAPI({
      url: "https://iykyk-api.vercel.app/api/handler"
    });

    return [
      {
        name: "iykyk",
        timestamp: context.timestamp,
        description: "IYKYK",
        specs: "IYKYK",
        data: restProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
