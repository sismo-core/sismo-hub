import { dataOperators } from "@group-generators/helpers/data-operators";
import { UnionOption } from "@group-generators/helpers/data-operators/union";
import { AccountSource, GroupStore, GroupWithData, Tags, ValueType } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

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
    const sismoFactoryUsers = await groupStore.latest("sismo-factory-users");
    const sismoMirrorCollectors = await groupStore.latest("sismo-mirror-collectors");
    const sismoMirrorSubscribers = await groupStore.latest("sismo-mirror-subscribers");

    const sismoBuilders = await groupStore.latest("sismo-builders");

    const sismoCitadelMembers = await groupStore.latest("sismo-citadel-members");
    const sismoCoreTeam = await groupStore.latest("sismo-core-team");

    // Level attributions
    const level1 = dataOperators.Map(
      dataOperators.Union([
        await sismoLensFollowers.data(),
        await sismoZkBadgesHolders.data(),
        await sismoFactoryUsers.data(),
        await sismoMirrorCollectors.data(),
        await sismoMirrorSubscribers.data(),
        dataOperators.Filter(await sismoContributors.data(), 1),
      ]),
      1
    );

    const level2 = dataOperators.Map(
      dataOperators.Union([
        await sismoBuilders.data(),
        dataOperators.Filter(await sismoContributors.data(), 2),
        dataOperators.Filter(await sismoContributors.data(), 3),
      ]),
      2
    );

    const level3 = dataOperators.Map(
      dataOperators.Union([await sismoCitadelMembers.data(), await sismoCoreTeam.data()]),
      3
    );

    const sismoCommunity = dataOperators.Union([level1, level2, level3], UnionOption.Max);

    return [
      {
        name: "sismo-community",
        displayName: "Sismo Community Members",
        timestamp: context.timestamp,
        description: "Data Group of all Sismo Community members",
        specs:
          "Contains all Sismo community: • Value 1: sismo-lens-followers, sismo-zk-badges-holders, sismo-factory-users, sismo-contributors-tier1-users • Value 2: sismo-builders, sismo-contributors-tier2-impactful-contributors, sismo-contributors-tier3-builders • Value 3: sismo-citadel-members, sismo-core-team. The value of each group member corresponds to their level of involvement in the community. More information on: community.sismo.io",
        data: sismoCommunity,
        valueType: ValueType.Score,
        accountSources: [
          AccountSource.ETHEREUM,
          AccountSource.GITHUB,
          AccountSource.TWITTER,
          AccountSource.TELEGRAM,
        ],
        tags: [
          Tags.Community,
          Tags.Web3Social,
          Tags.Lens,
          Tags.Builders,
          Tags.CoreTeam,
          Tags.BadgeHolders,
          Tags.User,
          Tags.Maintained,
        ],
      },
    ];
  },
};

export default generator;
