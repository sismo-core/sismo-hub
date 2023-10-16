
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
      url: "https://0e50-36-225-123-202.ngrok-free.app/api/v1/proof/accounts"
    });

    return [
      {
        name: "ptest-kyc2",
        timestamp: context.timestamp,
        description: "ptest-kyc2",
        specs: "ptest-kyc2",
        data: restProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
