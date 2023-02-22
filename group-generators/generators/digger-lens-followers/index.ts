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

// This group is constituted by all addresses that follows 0xdigger.lens
// the value is 1
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();
    // 0xDigger.lens followers
    // https://lenster.xyz/u/0xdigger.lens
    // 0xdigger.lens profileId: 0x1d53

    const dataProfiles = await lensProvider.getFollowers({
      profileId: "0x1d53",
    });

    return [
      {
        name: "digger-lens-followers",
        timestamp: context.timestamp,
        description: "Be an early follower of 0xDigger on Lens",
        specs: "You must have followed 0xDigger on lens prior to snapshot.",
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
