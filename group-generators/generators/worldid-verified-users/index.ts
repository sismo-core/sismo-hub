
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
      url: "https://worldcoin-app-backend.vercel.app/api/proof-of-personhood/group"
    });

    return [
      {
        name: "worldid-verified-users",
        timestamp: context.timestamp,
        description: "Group of all users that have completed a personhood check on WorldId",
        specs: "Group of vaultIds of all users that used the “Import WorldId Personhood to Sismo” Sismo Connect App to generate a ZK Proof of personhood through WorldId.",
        data: restProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
