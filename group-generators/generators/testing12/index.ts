
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
      url: "https://front-git-feature-sismo-way2pay.vercel.app/api/sismo/recurring"
    });

    return [
      {
        name: "testing12",
        timestamp: context.timestamp,
        description: "Testing",
        specs: "Testing if this will",
        data: restProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
