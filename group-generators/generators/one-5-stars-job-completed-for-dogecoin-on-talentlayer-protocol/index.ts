
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
      userHandle: "miguel"
    });

    return [
      {
        name: "one-5-stars-job-completed-for-dogecoin-on-talentlayer-protocol",
        timestamp: context.timestamp,
        description: "Complete work with minimum 5 as rating for DogeCoin",
        specs: "Collect all users that completed work at least 1 time for DogeCoin with a 5 rating on TalentLayer protocol",
        data: talentLayerProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
