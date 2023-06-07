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
    "sismo-lens-followers",
    "sismo-zk-badges-holders",
    "sismo-contributors-tier1-users",
    "sismo-builders",
    "sismo-contributors-tier2-impactful-contributors",
    "sismo-contributors-tier3-builders",
    "sismo-citadel-members",
    "sismo-core-team",
  ],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    
    const sismoLensFollowers = await groupStore.latest("sismo-lens-followers");
    const sismoZkBadgesHolders = await groupStore.latest("sismo-zk-badges-holders");
    const sismoContributorsTier1 = await groupStore.latest("sismo-contributors-tier1-users");

    const sismoBuilders = await groupStore.latest("sismo-builders");
    const sismoContributorsTier2 = await groupStore.latest("sismo-contributors-tier2-impactful-contributors");
    const sismoContributorsTier3 = await groupStore.latest("sismo-contributors-tier3-builders");

    const sismoCitadelMembers = await groupStore.latest("sismo-citadel-members");
    const sismoCoreTeam = await groupStore.latest("sismo-core-team");
    
    // Level attributions
    const level1 = dataOperators.Map(dataOperators.Union([
      await sismoLensFollowers.data(),
      await sismoZkBadgesHolders.data(),
      await sismoContributorsTier1.data(),
    ]), 1);

    const level2 = dataOperators.Map(dataOperators.Union([
      await sismoBuilders.data(),
      await sismoContributorsTier2.data(),
      await sismoContributorsTier3.data(),
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
        tags: [Tags.Community, Tags.Web3Social, Tags.Twitter, Tags.Github, Tags.Telegram, Tags.Lens, Tags.Builders, Tags.CoreTeam, Tags.BadgeHolders, Tags.User],
      },
    ];
  },
};

export default generator;
