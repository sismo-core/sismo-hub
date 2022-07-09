import { ValueType, Tags } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import { dataOperators } from "../../helpers/data-operators";
import masqueradeLensFollowers from "../masquerade-lens-followers";
import sismoLensFollowers from "../sismo-lens-followers";

// This group is constituted by all addresses that follows sismo.lens and masquerade.lens
// the value is 1
export default new GroupGenerator({
  name: "sismo-and-masquerade-lens-followers",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const sismoFollowers = await sismoLensFollowers.getLatestGroup();
    const masqueradeFollowers = await masqueradeLensFollowers.getLatestGroup();

    const sismoAndMasqueradeFollowers = dataOperators.Intersection(
      await sismoFollowers.data(),
      await masqueradeFollowers.data()
    );

    return new Group({
      name: "sismo-and-masquerade-lens-followers",
      generationDate: new Date(context.timestamp),
      data: sismoAndMasqueradeFollowers,
      valueType: ValueType.Info,
      tags: [Tags.User, Tags.Lens, Tags.Web3Social],
    });
  },
  generationFrequency: GenerationFrequency.Weekly,
});
