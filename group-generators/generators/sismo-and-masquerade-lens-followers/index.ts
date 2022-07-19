import { ValueType, Tags } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { Group, GroupType } from "../../../src/topics/group";
import { dataOperators } from "../../helpers/data-operators";
import { GenerationContext } from "../../../src/topics/generation-context";

// This group is constituted by all addresses that follows sismo.lens and masquerade.lens
// the value is 1
export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Weekly;

  async generate(context: GenerationContext): Promise<GroupType[]> {
    const sismoFollowers = await Group.store.latest("sismo-lens-followers");
    const masqueradeFollowers = await Group.store.latest(
      "masquerade-lens-followers"
    );

    const sismoAndMasqueradeFollowers = dataOperators.Intersection(
      await sismoFollowers.data(),
      await masqueradeFollowers.data()
    );

    return [
      {
        name: "sismo-and-masquerade-lens-followers",
        timestamp: context.timestamp,
        data: sismoAndMasqueradeFollowers,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  }
}
