
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
  
    const lensProvider = new dataProviders.LensProvider();
    
    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "0x3Fba71369E5E2E947AE2320274b1677de7D28120"
    });

    return [
      {
        name: "kyubi-supporter",
        timestamp: context.timestamp,
        description: "Group of Kyubi supporter",
        specs: "Follow Kyubi on Lens",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
