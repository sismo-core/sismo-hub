import { dataOperators } from "@group-generators/helpers/data-operators";
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

// This group is constituted by all addresses that follows masquerade.lens
// the value is 1
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();
    // Masquerade.lens followers
    // https://lenster.xyz/u/masquerade.lens
    // masquerade.lens profileId: 0x328e

    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.getFollowers({
      profileId: "0x328e",
    })) {
      dataProfiles[item.wallet.address] = 1;
    }
    // Sismo.lens followers
    // https://lenster.xyz/u/sismo.lens
    // sismo.lens profileId: 0x26e5
    const dataProfiles2: FetchedData = {};
    for await (const item of lensProvider.getFollowers({
      profileId: "0x26e5",
    })) {
      dataProfiles2[item.wallet.address] = 1;
    }

    const data = dataOperators.Union([dataProfiles, dataProfiles2]);

    return [
      {
        name: "sismo-masquerade-lens-followers",
        timestamp: context.timestamp,
        data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
