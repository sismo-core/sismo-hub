import { dataOperators } from "@group-generators/helpers/data-operators";
import {
  AccountSource,
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
    "sismo-contributors-tier1-users",
    "sismo-contributors-tier2-impactful-contributors",
    "sismo-contributors-tier3-builders"
  ],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    
    const latestSismoContributorsTier1Group = await groupStore.latest("sismo-contributors-tier1-users");
    const latestSismoContributorsTier2Group = await groupStore.latest("sismo-contributors-tier2-impactful-contributors");
    const latestSismoContributorsTier3Group = await groupStore.latest("sismo-contributors-tier3-builders");
    
    // tier attribution

    const users = dataOperators.Map(await latestSismoContributorsTier1Group.data(), 1); // tier 1
    const impactfulContributors = dataOperators.Map(await latestSismoContributorsTier2Group.data(), 2); // tier 2
    const builders = dataOperators.Map(await latestSismoContributorsTier3Group.data(), 3); // tier 3

    const sismoContributorsData = dataOperators.Union([
      users,
      impactfulContributors,
      builders,
    ]);

    return [
      {
        name: "sismo-contributors",
        timestamp: context.timestamp,
        data: sismoContributorsData,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
