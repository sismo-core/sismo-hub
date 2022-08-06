import { dataOperators } from "@group-generators/helpers/data-operators";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Daily;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    const latestSismoDiggersGroup = await this.groupStore.latest(
      "sismo-diggers"
    );
    const latestSismoDomainsGroup = await this.groupStore.latest(
      "sismo-domains"
    );

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
