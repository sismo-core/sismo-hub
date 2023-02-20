
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
  
    const lensProvider = new dataProviders.LensProvider();
    
    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "yourairdrop.lens"
    });

    return [
      {
        name: "y-s--frens",
        timestamp: context.timestamp,
        description: "follow yourairdrop.lens",
        specs: "snapshot happens everyday. if you've just followed yourairdrop.lens, please wait for 24 hours.",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
