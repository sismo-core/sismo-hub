import { ValueType, Tags } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { Group } from "../../../src/topics/group";
import { dataOperators } from "../../helpers/data-operators";

// This group is constituted by all addresses that follows sismo.lens and masquerade.lens
// the value is 1
export default new GroupGenerator({
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    const sismoFollowers = await Group.store.latest("sismo-lens-followers");
    const masqueradeFollowers = await Group.store.latest(
      "masquerade-lens-followers"
    );

    const sismoAndMasqueradeFollowers = dataOperators.Intersection(
      await sismoFollowers.data(),
      await masqueradeFollowers.data()
    );

    return [
      new Group({
        name: "sismo-and-masquerade-lens-followers",
        generationDate: new Date(context.timestamp),
        data: sismoAndMasqueradeFollowers,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      }),
    ];
  },
  generationFrequency: GenerationFrequency.Weekly,
});
