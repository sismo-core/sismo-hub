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
        description: "followers of sismo.lens",
        specs: "This Group consists of all Sismo Lens Followers",
        data: followers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social, Tags.Community, Tags.Mainnet],
      },
    ];
  },
};

export default generator;
