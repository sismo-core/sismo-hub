
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
  
    const restProvider = new dataProviders.RestProvider();
    
    const restProviderData0 = await restProvider.getAccountsFromAPI({
      url: "https://af7x4g47jecs3kea.anvil.app/7O2MJQF4V4A3Q5CKLTOZ5GKD/_/api/users/"
    });

    return [
      {
        name: "anvil-demo",
        timestamp: context.timestamp,
        description: "Registered Users of the Anvil Demo Aoo",
        specs: "Listed as a user of the anvil.works app created to test/demo the use of sismo and anvil together.",
        data: restProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
