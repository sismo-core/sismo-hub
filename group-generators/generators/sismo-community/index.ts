import { dataOperators } from "@group-generators/helpers/data-operators";
import {
  GroupStore,
  GroupWithData,
  Tags,
  ValueType,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: [
    "sismo-contributors",
    "sismo-lens-followers",
    "sismo-zk-badges-holders",
    "sismo-builders",
    "sismo-citadel-members",
    "sismo-core-team",
  ],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {

    const sismoContributors = await groupStore.latest("sismo-contributors");
    
    const sismoLensFollowers = await groupStore.latest("sismo-lens-followers");
    const sismoZkBadgesHolders = await groupStore.latest("sismo-zk-badges-holders");

    const sismoBuilders = await groupStore.latest("sismo-builders");

    const sismoCitadelMembers = await groupStore.latest("sismo-citadel-members");
    const sismoCoreTeam = await groupStore.latest("sismo-core-team");
    
    // Level attributions
    const level1 = dataOperators.Map(dataOperators.Union([
      await sismoLensFollowers.data(),
      await sismoZkBadgesHolders.data(),
      dataOperators.Selection(await sismoContributors.data(), 1),
    ]), 1);

    const level2 = dataOperators.Map(dataOperators.Union([
      await sismoBuilders.data(),
      dataOperators.Selection(await sismoContributors.data(), 2),
      dataOperators.Selection(await sismoContributors.data(), 3),
    ]), 2);

    const level3 = dataOperators.Map(dataOperators.Union([
      await sismoCitadelMembers.data(),
      await sismoCoreTeam.data(),
    ]), 3);

    const sismoCommunity = dataOperators.Union([level1, level2, level3]);

    return [
      {
        name: "sismo-community",
        timestamp: context.timestamp,
        description: "Sismo Community",
        specs: "This Group consists of all Sismo Community containing: • Sismo Community: sismo-lens-followers, sismo-zk-badges-holders, sismo-contributors-level-1 • Sismo Builders: sismo-builders, sismo-contributors-level-2, sismo-contributors-level-3 • Sismo Friends: sismo-citadel-members, sismo-core-team",
        data: sismoCommunity,
        valueType: ValueType.Score,
        tags: [Tags.Community, Tags.Web3Social, Tags.Lens, Tags.Builders, Tags.CoreTeam, Tags.BadgeHolders, Tags.User],
      },
    ];
  },
};

export default generator;
