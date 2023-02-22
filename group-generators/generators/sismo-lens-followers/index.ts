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

// This group is constituted by all addresses that follows sismo.lens
// the value is 1
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();

    // Sismo.lens followers
    // https://lenster.xyz/u/sismo.lens
    // sismo.lens profileId: 0x26e5
    const dataProfiles = await lensProvider.getFollowers({
      profileId: "0x26e5",
    });

    return [
      {
        name: "sismo-lens-followers",
        timestamp: context.timestamp,
        description: "followers of sismo.lens",
        specs: "Link of the profile : https://lenster.xyz/u/sismo.lens",
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
