import { dataOperators } from "@group-generators/helpers/data-operators";
import { GroupStore, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const latestSismoDiggersGroup = await groupStore.latest("sismo-diggers");
    const latestSismoDomainsGroup = await groupStore.latest("sismo-domains");

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
  },
};

export default generator;
