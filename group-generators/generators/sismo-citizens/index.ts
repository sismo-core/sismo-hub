import { Group, Tags, ValueType } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { GenerationContext } from "../../../src/topics/generation-context";
import { dataOperators } from "../../helpers/data-operators";

export default new GroupGenerator({
  generate: async (context: GenerationContext): Promise<Group[]> => {
    const latestSismoDiggersGroup = await Group.store.latest("sismo-diggers");
    const latestSismoDomainsGroup = await Group.store.latest("sismo-domains");

    const sismoCitizensData = dataOperators.Join(
      await latestSismoDiggersGroup.data(),
      await latestSismoDomainsGroup.data()
    );

    return [
      new Group({
        name: "sismo-citizens",
        timestamp: context.timestamp,
        data: sismoCitizensData,
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User],
      }),
    ];
  },
  generationFrequency: GenerationFrequency.Daily,
});
