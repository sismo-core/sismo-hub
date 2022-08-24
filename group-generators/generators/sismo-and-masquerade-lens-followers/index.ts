import { dataOperators } from "@group-generators/helpers/data-operators";
import { ValueType, Tags, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// This group is constituted by all addresses that follows sismo.lens and masquerade.lens
// the value is 1
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const sismoFollowers = await groupStore.latest("sismo-lens-followers");
    const masqueradeFollowers = await groupStore.latest(
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
  },
};

export default generator;
