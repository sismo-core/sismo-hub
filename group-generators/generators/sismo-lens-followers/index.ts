import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  ValueType,
  Tags,
  GroupWithData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    
    const lensProvider = new dataProviders.LensBigQueryProvider();

    const followers = await lensProvider.getFollowers({
      profileId: "sismo.lens",
    });

    return [
      {
        name: "sismo-lens-followers",
        timestamp: context.timestamp,
        description: "Data Group of all Sismo followers on Lens",
        specs: "Created by the Lens Data Provider. Contains all sismo.lens followers on Lens. The value of each group member corresponds to their chronological order of following.",
        data: followers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social, Tags.Community, Tags.Maintained],
      },
    ];
  },
};

export default generator;
