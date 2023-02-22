import { dataOperators } from "@group-generators/helpers/data-operators";
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

    // Sismo.lens followers
    // https://lenster.xyz/u/sismo.lens
    // sismo.lens profileId: 0x26e5
    const dataProfiles2 = await lensProvider.getFollowers({
      profileId: "0x26e5",
    });

    const data = dataOperators.Union([dataProfiles, dataProfiles2]);

    return [
      {
        name: "sismo-masquerade-lens-followers",
        timestamp: context.timestamp,
        description: "Follow @sismo.lens and @masquerade.lens before July 6 2022",
        specs: "Follow @sismo.lens and @masquerade.lens before July 6 2022 on apps powered by Lens Protocol (Lenster, Orb, ..).",
        data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
