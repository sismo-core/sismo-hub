
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

    const restProvider = new dataProviders.RestProvider();

    const restProviderData0 = await restProvider.getAccountsFromAPI({
      url: "https://front-git-feature-sismo-way2pay.vercel.app/api/sismo/recurring"
    });

    return [
      {
        name: "recurring-users",
        timestamp: context.timestamp,
        description: "People who have used the platform before",
        specs: "Any Transaction with them as the buyer and transaction as executed",
        data: restProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
