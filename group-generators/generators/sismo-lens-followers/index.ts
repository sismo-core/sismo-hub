import { ValueType, Tags } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group/group";
import { dataProviders } from "../../helpers/providers";

// This group is constituted by all addresses that follows sismo.lens
// the value is 1
export default new GroupGenerator({
  name: "sismo-lens-followers",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const lensProvider = new dataProviders.LensProvider();
    // Sismo.lens followers
    // https://lenster.xyz/u/sismo.lens
    const masqueradeFollowers = await lensProvider.getFollowers("0x26e5");

    return new Group({
      generationDate: new Date(context.timestamp),
      data: masqueradeFollowers,
      valueType: ValueType.Info,
      tags: [Tags.User, Tags.Lens, Tags.Web3Social],
    });
  },

  // refresh this group every Week
  generationFrequency: GenerationFrequency.Weekly,
});
