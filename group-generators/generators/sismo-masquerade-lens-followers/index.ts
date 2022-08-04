import { ValueType, Tags, FetchedData, GroupWithData } from "topics/group";
import { GenerationFrequency, GroupGenerator } from "topics/group-generator";
import { dataProviders } from "@group-generators/helpers/providers";
import { GenerationContext } from "topics/generation-context";

// This group is constituted by all addresses that follows masquerade.lens
// the value is 1
export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Weekly;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    const lensProvider = new dataProviders.LensProvider();
    // Masquerade.lens followers
    // https://lenster.xyz/u/masquerade.lens
    // masquerade.lens profileId: 0x328e

    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.getFollowers("0x328e")) {
      dataProfiles[item.wallet.address] = 1;
    }

    return [
      {
        name: "sismo-masquerade-lens-followers",
        timestamp: context.timestamp,
        data: dataProfiles,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  }
}
