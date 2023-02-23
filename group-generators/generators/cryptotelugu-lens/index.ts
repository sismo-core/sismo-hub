
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
      profileId: "holdbtc.lens"
    });
    
    const lensProviderData1 = await lensProvider.getFollowers({
      profileId: "0xc5C408EC4C61a905Ce45d41162b83eF2E06fCca0"
    });
    
    const dataUnion = dataOperators.Union([ 
      lensProviderData0,
      lensProviderData1 
    ]);

    return [
      {
        name: "cryptotelugu-lens",
        timestamp: context.timestamp,
        description: "Follow CryptoTelugu Lens Profile @holdbtc.lens ",
        specs: "Follow @holdbtc.lens on apps powered by Lens Protocol (Lenster, Phaver, Orb, ..).",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
