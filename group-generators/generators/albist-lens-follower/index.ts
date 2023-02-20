
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
  
    const lensProvider = new dataProviders.LensProvider();
    
    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "0x7f1d5d069a841d104571c8143Af2ad72515D6296"
    });

    return [
      {
        name: "albist-lens-follower",
        timestamp: context.timestamp,
        description: "Follow @0xalbist on Lens.",
        specs: "Must be a follower before 15/01/2023.",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
