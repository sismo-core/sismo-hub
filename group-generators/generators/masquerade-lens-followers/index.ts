import { ValueType, Tags, FetchedData } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group/group";
import { dataProviders } from "../../helpers/providers";
import {GroupsNames} from "../groups-names"

// This group is constituted by all addresses that follows masquerade.lens
// the value is 1
export default new GroupGenerator({
  name: "masquerade-lens-followers",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const lensProvider = new dataProviders.LensProvider();
    // Masquerade.lens followers
    // https://lenster.xyz/u/masquerade.lens
    // masquerade.lens profileId: 0x328e

    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.getFollowers("0x328e")) {
      dataProfiles[item.wallet.address] = 1;
    }

    return new Group({
      name: GroupsNames.MASQUERADE_LENS_FOLLOWERS,
      generationDate: new Date(context.timestamp),
      data: dataProfiles,
      valueType: ValueType.Info,
      tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      generatorName: "masquerade-lens-followers",
    });
  },
  generationFrequency: GenerationFrequency.Weekly,
});
