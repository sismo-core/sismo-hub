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

// This group is constituted by all addresses that follows 0xdigger.lens
// the value is 1
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();
    // 0xDigger.lens followers
    // https://lenster.xyz/u/0xdigger.lens
    // 0xdigger.lens profileId: 0x1d53

    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.getFollowers("0x1d53")) {
      dataProfiles[item.wallet.address] = 1;
    }

    return [
      {
        name: "digger-lens-followers",
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
