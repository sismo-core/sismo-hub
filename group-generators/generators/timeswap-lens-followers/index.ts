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

// This group is constituted by all addresses that follows timeswap_labs.lens
// the value is 1
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();

    // timeswap_labs.lens followers
    // https://lenster.xyz/u/timeswap_labs.lens
    // timeswap_labs.lens profileId: 0x016038
    const dataProfiles = await lensProvider.getFollowers({
      profileId: "0x016038",
    });

    return [
      {
        name: "timeswap-lens-followers",
        timestamp: context.timestamp,
        description: "Be an early follower of TimeswapLabs on Lens",
        specs: "You must have followed Timeswap on lens prior to snapshot",
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
