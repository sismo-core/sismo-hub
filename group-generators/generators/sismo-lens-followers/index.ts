import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
} from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { dataProviders } from "../../helpers/providers";
import { GenerationContext } from "../../../src/topics/generation-context";

// This group is constituted by all addresses that follows sismo.lens
// the value is 1
export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Weekly;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    const lensProvider = new dataProviders.LensProvider();

    // Sismo.lens followers
    // https://lenster.xyz/u/sismo.lens
    // sismo.lens profileId: 0x26e5
    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.getFollowers("0x328e")) {
      dataProfiles[item.wallet.address] = 1;
    }

    return [
      {
        name: "sismo-lens-followers",
        timestamp: context.timestamp,
        data: dataProfiles,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  }
}
