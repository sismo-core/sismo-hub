import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  AccountSource,
  GroupStore,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["sismo-gen-zero"],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const sismoSubgraphProvider = new dataProviders.SismoSubgraphProvider();
    // all new minters of curated badges will be automatically at least in tier1 in the Sismo Contributors group
    // you can see ZK badge holders that will be in tier2 in the sismo-contributors-tier2-impactful-contributors folder
    const curatedBadgesData = await sismoSubgraphProvider.queryBadgesHolders({
      removedIds: [15151111],
    });

    // we add Sismo Gen[0] holders in the Sismo Contributors Tier1 group
    const latestSismoGenZeroGroup = await groupStore.latest("sismo-gen-zero");
    const sismoGenZeroData = dataOperators.Map(
      await latestSismoGenZeroGroup.data(),
      1
    );

    const sismoContributorsTier1Data = dataOperators.Union([
      curatedBadgesData,
      sismoGenZeroData,
    ]);

    return [
      {
        name: "sismo-contributors-tier1-users",
        timestamp: context.timestamp,
        data: sismoContributorsTier1Data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.BadgeHolders],
      },
    ];
  },
};

export default generator;
