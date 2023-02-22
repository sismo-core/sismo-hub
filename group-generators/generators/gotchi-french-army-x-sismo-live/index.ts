
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
    
    const lensProviderData0 = await lensProvider.getWhoCollectedPublication({
      publicationId: "0x5d7a-0x1d"
    });

    return [
      {
        name: "gotchi-french-army-x-sismo-live",
        timestamp: context.timestamp,
        description: "Collect the TheGotchiFArmy's Lens post about the Twitch live with Sismo",
        specs: "Collect the following lens post from thegotchifarmy.lens https://lenster.xyz/posts/0x5d7a-0x1d (limited to 50)",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
