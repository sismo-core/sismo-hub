
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
      url: "https://deano.vercel.app/api/sismo"
    });

    return [
      {
        name: "deano-annotators",
        timestamp: context.timestamp,
        description: "Data Group of Data Annotation Community of Deano",
        specs: "Data Group of Data Annotation Community of Deano. Value for each of the account or member is a reputation score updated based on the performance and accuracy of data annotation performed on the platform.",
        data: restProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
