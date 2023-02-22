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

// This group is constituted by all addresses that follows masquerade.lens
// the value is 1
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();
    // Masquerade.lens followers
    // https://lenster.xyz/u/masquerade.lens
    // masquerade.lens profileId: 0x328e

    const dataProfiles = await lensProvider.getFollowers({
      profileId: "0x328e",
    });

    return [
      {
        name: "masquerade-lens-followers",
        timestamp: context.timestamp,
        description: "followers of masquerade.lens",
        specs: "followers of masquerade.lens",
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
