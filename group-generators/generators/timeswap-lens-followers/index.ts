import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  ValueType,
  Tags,
  FetchedData,
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
    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.getFollowers("0x016038")) {
      dataProfiles[item.wallet.address] = 1;
    }

    return [
      {
        name: "timeswap-lens-followers",
        timestamp: context.timestamp,
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
