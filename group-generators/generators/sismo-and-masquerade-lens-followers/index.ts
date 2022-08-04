import { dataOperators } from "@group-generators/helpers/data-operators";
import { GenerationContext } from "topics/generation-context";
import { ValueType, Tags, GroupWithData } from "topics/group";
import { GenerationFrequency, GroupGenerator } from "topics/group-generator";

// This group is constituted by all addresses that follows sismo.lens and masquerade.lens
// the value is 1
export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Weekly;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    const sismoFollowers = await this.groupStore.latest("sismo-lens-followers");
    const masqueradeFollowers = await this.groupStore.latest(
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
