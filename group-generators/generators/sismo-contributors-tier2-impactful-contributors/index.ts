import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource, GroupStore } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["sismo-gen-a", "sismo-gen-x", "sismo-events", "sismo-gitcoin-donors"],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const sismoSubgraphProvider = new dataProviders.SismoSubgraphBaseProvider();
    const poapProvider = new dataProviders.PoapSubgraphProvider();

    // Any user who has minted at least one curated ZK Badge on Polygon with a Sybil Resistance Attribute Score superior or equal to 3
    // will be in tier2 in the Sismo Contributors group
    const listOfZkBadgesInTier2 = [
      10000005 /* Ethereum Power User ZK Badge */, 10000009 /* Proof of Humanity ZK Badge */,
      10000030 /* Proof of Attendance ZK Badge */, 10000034 /* ENS Supporter ZK Badge */,
      10000039 /* Eth Influencer ZK Badge */, 10000202 /* NFT Legendary Trader ZK Badge */,
    ];
    const tier2BadgesData = await sismoSubgraphProvider.queryBadgesHolders({
      tokenIds: listOfZkBadgesInTier2,
    });

    // we add users who have specific Sismo Poap in the Sismo Contributors Tier2 group
    const tier2SismoPoapData = await poapProvider.queryEventsTokenOwners({
      eventIds: [80235 /* User Testing #2 */, 81377 /* Contributor #2 */],
    });

    // we add Sismo Gen[A] and Sismo Gen[X] holders in the Sismo Contributors Tier2 group
    const latestSismoGenAGroup = await groupStore.latest("sismo-gen-a");
    const latestSismoGenXGroup = await groupStore.latest("sismo-gen-x");

    // we add users who have a Sismo Poap of ETHCC, or Pre-Masquerade, or Masquerade events in the Sismo Contributors Tier2 group
    const latestSismoEvents = await groupStore.latest("sismo-events");

    // we add Gitcoin Donors of the Sismo Gitcoin Grant in the Sismo Contributors Tier2 group
    const latestSismoGitcoinDonorsGroup = await groupStore.latest("sismo-gitcoin-donors");

    let sismoContributorsTier2Data = dataOperators.Union([
      tier2BadgesData,
      tier2SismoPoapData,
      await latestSismoGenAGroup.data(),
      await latestSismoGenXGroup.data(),
      await latestSismoEvents.data(),
      await latestSismoGitcoinDonorsGroup.data(),
    ]);

    sismoContributorsTier2Data = dataOperators.Map(sismoContributorsTier2Data, 1);

    return [
      {
        name: "sismo-contributors-tier2-impactful-contributors",
        timestamp: context.timestamp,
        description: "Sismo Contributors Tier2 Impactful Contributors",
        specs: "",
        data: sismoContributorsTier2Data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.BadgeHolders],
      },
    ];
  },
};

export default generator;
