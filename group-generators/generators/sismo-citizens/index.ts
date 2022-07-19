import { Group, GroupType, Tags, ValueType } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { dataOperators } from "../../helpers/data-operators";
import { GenerationContext } from "../../../src/topics/generation-context";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Daily;

  async generate(context: GenerationContext): Promise<GroupType[]> {
    const latestSismoDiggersGroup = await Group.store.latest("sismo-diggers");
    const latestSismoDomainsGroup = await Group.store.latest("sismo-domains");

    const sismoCitizensData = dataOperators.Join(
      await latestSismoDiggersGroup.data(),
      await latestSismoDomainsGroup.data()
    );

    return [
      {
        name: "sismo-citizens",
        timestamp: context.timestamp,
        data: sismoCitizensData,
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User],
      },
    ];
  }
}
