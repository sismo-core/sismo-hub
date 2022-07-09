import { ValueType, Tags, FetchedData } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import { dataProviders } from "../../helpers/providers";

// This group is constituted by all addresses that follows sismo.lens
// the value is 1
export default new GroupGenerator({
  name: "sismo-lens-followers",
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    const lensProvider = new dataProviders.LensProvider();

    // Sismo.lens followers
    // https://lenster.xyz/u/sismo.lens
    // sismo.lens profileId: 0x26e5
    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.getFollowers("0x328e")) {
      dataProfiles[item.wallet.address] = 1;
    }

    return [new Group({
      name: "sismo-lens-followers",
      generationDate: new Date(context.timestamp),
      data: dataProfiles,
      valueType: ValueType.Info,
      tags: [Tags.User, Tags.Lens, Tags.Web3Social],
    })];
  },
  generationFrequency: GenerationFrequency.Weekly,
});
