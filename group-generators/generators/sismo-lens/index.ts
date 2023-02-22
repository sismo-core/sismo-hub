
import { dataOperators } from "@group-generators/helpers/data-operators";
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
      profileId: "0xD984378eB2350B9deA3ABAcf6F3e924573E6ff9d"
    });
    
    const lensProviderData1 = await lensProvider.getFollowers({
      profileId: "0x442aD41D5e3Bd31A5Fa38F95ac626BAD5461bdE8"
    });
    
    const dataUnion = dataOperators.Union([ 
      lensProviderData0,
      lensProviderData1 
    ]);

    return [
      {
        name: "sismo-lens",
        timestamp: context.timestamp,
        description: "follow on lenster",
        specs: "airdrop",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
