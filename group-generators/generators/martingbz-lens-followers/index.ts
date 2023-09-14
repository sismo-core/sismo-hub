
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
  
    const lensBigQueryProvider = new dataProviders.LensBigQueryProvider();
    
    const lensBigQueryProviderData0 = await lensBigQueryProvider.getFollowers({
      profileId: "martingbz.lens"
    });

    return [
      {
        name: "martingbz-lens-followers",
        timestamp: context.timestamp,
        description: "Data Group of all Martingbz followers on Lens",
        specs: "Created by the Lens Data Provider. Contains of all martingbz.lens followers on Lens. Value for each group member corresponds to their chronological order of following.",
        data: lensBigQueryProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
