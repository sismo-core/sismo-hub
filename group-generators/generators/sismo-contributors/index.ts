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
        description: "Prove that you are involved in Sismo and earn governance voting power",
        specs: "LEVEL 1: Any Curated ZK Badge with SR score >1 minted on Polygon / Gen[0] Member________ LEVEL 2: Any Curated ZK Badge with SR score >=3 minted on Polygon / Contribution POAPs lvl2 holder / Gen[X] or Gen[0] member / Sismo Event Attendee / Sismo Gitcoin Grant Donor________ LEVEL 3: Contribution POAPs lvl3 holder / Sismo Core Team / Advisor / Investor________ Full eligibility details: https://sismo.notion.site/Contributor-ZK-Badge-Voting-Power-fde6b6e4182a409d87bfcee42f14a63a",
        data: sismoContributorsData,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
