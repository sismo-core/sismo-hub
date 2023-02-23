import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource, GroupStore } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["sismo-gen-zero"],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const sismoSubgraphProvider = new dataProviders.SismoSubgraphBaseProvider();

    // Any user who has minted at least one curated ZK Badge on Polygon with a Sybil Resistance Attribute Score strictly superior to 1.
    // you can see ZK badge holders that will be in tier2 in the sismo-contributors-tier2-impactful-contributors folder
    const curatedBadgesData = await sismoSubgraphProvider.queryBadgesHolders({
      tokenIds: [
        0 /* Sismo Early Users ZK Badge */, 10000004 /* Sismo Masquerade Bloomer ZK Badge */,
        10000005 /* Ethereum Power User ZK Badge */, 10000009 /* Proof Of Humanity ZK Badge */,
        10000030 /* Proof Of Attendance ZK Badge */, 10000034 /* ENS Supporter ZK Badge */,
        10000039 /* Eth Influencer ZK Badge */, 10000089 /* Rhino.FI Power User ZK Badge */,
        10000202 /* NFT Legendary Trader ZK Badge */,
      ],
    });

    // we add Sismo Gen[0] holders in the Sismo Contributors Tier1 group
    const latestSismoGenZeroGroup = await groupStore.latest("sismo-gen-zero");
    const sismoGenZeroData = dataOperators.Map(await latestSismoGenZeroGroup.data(), 1);

    const sismoContributorsTier1Data = dataOperators.Union([curatedBadgesData, sismoGenZeroData]);

    return [
      {
        name: "sismo-contributors-tier1-users",
        timestamp: context.timestamp,
        description: "Sismo Contributors Tier1 Users",
        specs: "",
        data: sismoContributorsTier1Data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.BadgeHolders],
      },
    ];
  },
};

export default generator;
