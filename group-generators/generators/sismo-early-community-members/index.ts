import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["sismo-zk-badges-holders", "sismo-contributors"],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {

    const sismoZkBadgesHolders = await groupStore.latest("sismo-zk-badges-holders");
    const sismoZkBadgesHoldersData = dataOperators.Map(await sismoZkBadgesHolders.data(), 1);

    const sismoContributors = await groupStore.latest("sismo-contributors");
    const sismoContributorsData = dataOperators.Map(await sismoContributors.data(), 1);

    const builders = dataOperators.Union([sismoZkBadgesHoldersData, sismoContributorsData]);

    return [
      {
        name: "sismo-early-community-members",
        timestamp: context.timestamp,
        description: "Sismo early community members",
        specs: "This Group consists of all ZK Badge holders (minted before: DD-MM-YYY) and former Sismo Contributors Group (all levels)",
        data: builders,
        valueType: ValueType.Score,
        tags: [Tags.Builders, Tags.Maintained],
      },
    ];
  },
};

export default generator;
