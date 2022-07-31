import { GroupWithData, Tags, ValueType } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { dataOperators } from "../../helpers/data-operators";
import { GenerationContext } from "../../../src/topics/generation-context";

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
