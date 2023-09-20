
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
  
    const lensProvider = new dataProviders.LensBigQueryProvider();
    
    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "stani.lens"
    });

    return [
      {
        name: "stani-lens-followers",
        timestamp: context.timestamp,
        description: "Data Group of all Stani followers on Lens",
        specs: "Created by the Lens Data Provider. Contains of all stani.lens followers on Lens. Value for each group member corresponds to their chronological order of following.",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
