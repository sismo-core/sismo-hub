
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
  
    const talentLayerProvider = new dataProviders.TalentLayerProvider();
    
    const talentLayerProviderData0 = await talentLayerProvider.didSellerServiceBuyer({
      buyerHandle: "alice"
    });

    return [
      {
        name: "one-5-stars-job-completed-for-aave-on-talentlayer-protocol",
        timestamp: context.timestamp,
        description: "Complete work for AAVE with minimum 5 as rating",
        specs: "Collect all users that completed work at least 1 times with a 5 rating on TalentLayer protocol",
        data: talentLayerProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
