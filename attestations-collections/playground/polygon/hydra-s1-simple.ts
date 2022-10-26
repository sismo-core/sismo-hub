import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { factoryBadges } from "@attestations-collections/playground/polygon/factory/hydra-s1-simple-factory-badges";
import { factoryAttestationsCollections } from "@attestations-collections/playground/polygon/factory/hydra-s1-simple-factory-collections";
import { Network } from "topics/attester";
import { AttestationsCollection } from "topics/attester/attester.types";
import { BadgesCollection } from "topics/badge";

function makeGameJutsuAttestationCollection(
  firstInternalCollectionId: number
): AttestationsCollection[] {
  const result: AttestationsCollection[] = [];
  let internalCollectionId = firstInternalCollectionId;
  for (const achievement of ["winner", "loser", "draw", "cheater"]) {
    for (const grade of ["bronze", "silver", "gold"]) {
      result.push({
        internalCollectionId,
        groupFetcher: async (groupStore) => [
          await groupStore.latest(`gamejutsu-${grade}-${achievement}`),
        ],
      });
      internalCollectionId++;
    }
  }
  return result;
}

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    attesterAddress: "0x0AB188c7260666146B300aD3ad5b2AB99eb91D45",
    rootsRegistryAddress: "0xb8797eBa1048f6A6AfCbE4F08a582b4Dde69C05d",
  },

  {
    name: "hydra-s1-simple",
    network: Network.Polygon,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.simpleEncoder,
    attestationsCollections: [
      ...factoryAttestationsCollections,
      // Masquerade
      {
        internalCollectionId: 3,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-masquerade-lens-followers"),
        ],
      },
      // Ethereum-power-users
      {
        internalCollectionId: 4,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("ethereum-power-users"),
        ],
      },
      {
        internalCollectionId: 5,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-hat-bronze"),
        ],
      },
      {
        internalCollectionId: 6,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-hat-silver"),
        ],
      },
      {
        internalCollectionId: 7,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-hat-gold"),
        ],
      },
      // proof-of-humanity
      {
        internalCollectionId: 8,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-humanity"),
        ],
      },
      {
        internalCollectionId: 9,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-lepak-member"),
        ],
      },
      // Circularmerch lens followers
      {
        internalCollectionId: 10,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("circularmerch-lens-followers"),
        ],
      },
      // You are 50 most followed
      {
        internalCollectionId: 11,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("lens-50-best-followed"),
        ],
      },
      // top 100 ens users
      {
        internalCollectionId: 12,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("top-100-ens"),
        ],
      },
      // GameJutsu 12 badges
      ...makeGameJutsuAttestationCollection(13),
      // Gitcoin Grant 15 donors
      {
        internalCollectionId: 25,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("gitcoin-grants-round-15-donors"),
        ],
      },
      // martingbz.lens Sismo thread #1 lens mirrorers
      {
        internalCollectionId: 26,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("martingbz-sismo-thread-1-lens-mirrorers"),
        ],
      },
      {
        internalCollectionId: 27,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("lilnouns-proplot-contributors"),
        ],
      },
      {
        internalCollectionId: 28,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("lilnouns-proplot-voters"),
        ],
      },
      // Proof of Attendance (POAP)
      {
        internalCollectionId: 29,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-attendance-main-events"),
        ],
      },
      {
        internalCollectionId: 30,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("nft-collector"),
        ],
      },
      // ENS Supporters
      {
        internalCollectionId: 33,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("ens-supporters"),
        ],
      },
      // sismo Contributors
      {
        internalCollectionId: 5151110,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-contributors"),
        ],
      },
      {
        internalCollectionId: 34,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("madfi-lens-followers-s01"),
        ],
      },
      // Tutorial ENS Contributors
      {
        internalCollectionId: 35,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("tuto-ens-contributors"),
        ],
      },
      // Rhino.Fi Power Users
      {
        internalCollectionId: 88,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("rhinofi-power-users"),
        ],
      },
    ],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 10000001,
  },
  badges: [
    ...factoryBadges,
    {
      internalCollectionId: 3,
      name: "[playground] Sismo Masquerade Bloomer ZK Badge",
      description:
        "[playground] ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      groupGeneratorName: "sismo-masquerade-lens-followers",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription:
          "Follow @sismo.lens and @masquerade.lens before July 6 2022",
        specification:
          "Follow @sismo.lens and @masquerade.lens before July 6 2022 on apps powered by Lens Protocol (Lenster, Orb, ..).",
      },
      links: [],
    },
    {
      internalCollectionId: 4,
      name: "[playground] Ethereum Power User ZK Badge",
      description:
        "[playground] ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      groupGeneratorName: "ethereum-power-users",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription:
          "Be part of the top 0.1% most active users on Ethereum",
        specification:
          "Be part of the top 50k accounts that sent the most transactions (token transfers excluded) on Ethereum between 2015 and December 31st 2016, or be part of the top 50k accounts between 2015 and December 31st 2017, or be part of the top 50k accounts between 2015 and December 31st 2018, or be part of the top 50k accounts between 2015 and December 31st 2019, or be part of the top 50k accounts between 2015 and December 31st 2020, or be part of the top 50k accounts between 2015 and December 31st 2021",
      },
      links: [],
    },
    {
      internalCollectionId: 5,
      name: "[playground] Bronze proof of hat",
      description: "[playground] Bronze bounty completed",
      image: "proof-of-hat-bronze.svg",
      groupGeneratorName: "proof-of-hat-bronze",
      publicContacts: [
        {
          type: "lens",
          contact: "pastofre.lens",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 6,
      name: "[playground] Silver proof of hat",
      description: "[playground] Silver bounty completed",
      image: "proof-of-hat-silver.svg",
      groupGeneratorName: "proof-of-hat-silver",
      publicContacts: [
        {
          type: "lens",
          contact: "pastofre.lens",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 7,
      name: "[playground] Gold proof of hat",
      description: "[playground] Gold bounty completed",
      image: "proof-of-hat-gold.svg",
      groupGeneratorName: "proof-of-hat-gold",
      publicContacts: [
        {
          type: "lens",
          contact: "pastofre.lens",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 8,
      name: "[playground] Proof of Humanity ZK Badge",
      description: "[playground] ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      groupGeneratorName: "proof-of-humanity",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "Prove you are a human with PoH",
        specification:
          "Appear as a verified Proof of Humanity submission on the Proof of Humanity subgraph",
      },
      links: [
        {
          logoUrl: "",
          label: "PoH",
          url: "https://www.proofofhumanity.id/",
        },
        {
          logoUrl: "",
          label: "Subgraph",
          url: "https://thegraph.com/explorer/subgraph?id=CvzNejNZR2UTQ66wL7miGgfWh9dmiwgTtTfgQCBvMQRE&view=Overview",
        },
      ],
    },
    {
      internalCollectionId: 9,
      name: "[playground] Proof of Lepak Member",
      description: "[playground] Lepak Member who is eligible for voting",
      groupGeneratorName: "proof-of-lepak-member",
      image: "lepak-badge.svg",
      publicContacts: [
        {
          type: "github",
          contact: "zengzengzenghuy",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 10,
      name: "[playground] CircularMerch lens followers ZK Badge",
      description:
        "[playground] ZK Badge owned by @circlemerch.lens Lens followers",
      image: "circularmerch_lens_followers.svg",
      groupGeneratorName: "circularmerch-lens-followers",
      publicContacts: [
        {
          type: "github",
          contact: "lilyanB",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 11,
      name: "[playground] lens 50 best followed ZK Badge",
      description: "[playground] ZK Badge for the 50 most followed",
      image: "lens_50_best_followed.svg",
      groupGeneratorName: "lens-50-best-followed",
      publicContacts: [
        {
          type: "github",
          contact: "lilyanB",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 12,
      name: "Top 100 ENS ZK Badge",
      description: "ZK Badge owned by the most followed ens names on Twitter",
      image: "badge-ens-leaderboard.svg",
      groupGeneratorName: "top-100-ens",
      publicContacts: [
        {
          type: "github",
          contact: "enricobottazzi",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 13,
      name: "Gamejutsu White Belt Winner ZK Badge",
      description: "The player won one game at gamejutsu.app",
      image: "gamejutsu_winner_white.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 14,
      name: "Gamejutsu Green Belt Winner ZK Badge",
      description: "The player won five games in row at gamejutsu.app",
      image: "gamejutsu_winner_green.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 15,
      name: "Gamejutsu Black Belt Winner ZK Badge",
      description: "The player won ten games in row at gamejutsu.app",
      image: "gamejutsu_winner_black.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 16,
      name: "Gamejutsu White Belt Loser ZK Badge",
      description: "The player lost one game at gamejutsu.app",
      image: "gamejutsu_loser_white.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 17,
      name: "Gamejutsu Green Belt Loser ZK Badge",
      description: "The player lost five games in row at gamejutsu.app",
      image: "gamejutsu_loser_green.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 18,
      name: "Gamejutsu Black Belt Loser ZK Badge",
      description: "The player lost ten games in row at gamejutsu.app",
      image: "gamejutsu_loser_black.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 19,
      name: "Gamejutsu White Belt Peacemonger ZK Badge",
      description: "The player draw one game at gamejutsu.app",
      image: "gamejutsu_draw_white.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 20,
      name: "Gamejutsu Brown Belt Peacemonger ZK Badge",
      description: "The player draw five games in row at gamejutsu.app",
      image: "gamejutsu_draw_green.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 21,
      name: "Gamejutsu Black Belt Peacemonger ZK Badge",
      description: "The player draw ten games in row at gamejutsu.app",
      image: "gamejutsu_draw_black.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 22,
      name: "Gamejutsu White Belt Cheater ZK Badge",
      description: "The player cheated one game at gamejutsu.app",
      image: "gamejutsu_cheater_white.svg",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 23,
      name: "Gamejutsu Green Belt Cheater ZK Badge",
      description: "The player cheated five games in row at gamejutsu.app",
      image: "gamejutsu_cheater_green.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 24,
      name: "Gamejutsu Black Belt Cheater ZK Badge",
      description: "The player cheated ten games in row at gamejutsu.app",
      image: "gamejutsu_cheater_black.svg",
      groupGeneratorName: "gamejutsu-achievements",
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "",
          url: "https://gamejutsu.app/",
        },
      ],
    },
    {
      internalCollectionId: 25,
      name: "[playground] GR15 Gitcoin Contributor ZK Badge",
      description:
        "[playground] ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
      image: "gitcoin_grants_round_15_donors.svg",
      groupGeneratorName: "gitcoin-grants-rounds-donors",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription:
          "You must have donated in the 15th round of Gitcoin Grants",
        specification:
          "Donated to the Gitcoin Grant Round 15 through bulkCheckout Contracts on Ethereum (0x7d655c57f71464B6f83811C55D84009Cd9f5221C), or on Polygon (0xb99080b9407436eBb2b8Fe56D45fFA47E9bb8877), or on ZKSync (0xde21f729137c5af1b01d73af1dc21effa2b8a0d6), or appear on the Gitcoin Grants Round 15 API",
      },
      links: [
        {
          logoUrl: "",
          label: "GR15",
          url: "https://gitcoin.co/grants/explorer",
        },
        {
          logoUrl: "",
          label: "Round 15 API",
          url: "https://gitcoin.co/grants/v1/api/export_addresses/round15.json",
        },
      ],
    },
    {
      internalCollectionId: 26,
      name: "Sismo thread #1 lens mirrorers",
      description:
        "ZK Badge owned by the mirrorers of Sismo thread #1 from martingbz.lens",
      image: "martingbz-sismo-thread-1-lens-mirrorers.svg",
      groupGeneratorName: "martingbz-sismo-thread-1-lens-mirrorers",
      publicContacts: [
        {
          type: "github",
          contact: "MartinGbz",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 27,
      name: "LilNouns PropLot Contributors ZK Badge",
      description: "ZK Badge received by LilNouns PropLot contributors",
      image: "proplot-contributors-badge.svg",
      groupGeneratorName: "lilnouns-proplot-contributors",
      publicContacts: [
        {
          type: "github",
          contact: "SouravInsights",
        },
        {
          type: "twitter",
          contact: "souravinsights",
        },
      ],
      eligibility: {
        shortDescription:
          "Ideas having more than or equal to 50 votes on PropLot",
        specification:
          "You should have recieved more than or equal to 50 votes on your published ideas",
      },
      links: [
        {
          logoUrl: "",
          label: "LilNouns PropLot",
          url: "https://lilnouns.wtf/ideas",
        },
      ],
    },
    {
      internalCollectionId: 28,
      name: "LilNouns PropLot Voters ZK Badge",
      description: "ZK Badge received by LilNouns PropLot voters",
      image: "proplot-voters-badge.svg",
      groupGeneratorName: "lilnouns-proplot-voters",
      publicContacts: [
        {
          type: "github",
          contact: "SouravInsights",
        },
        {
          type: "twitter",
          contact: "souravinsights",
        },
      ],
      eligibility: {
        shortDescription: "Members voted on atleast 15 ideas",
        specification:
          "You should have voted more than or equal to 15 ideas on PropLot",
      },
      links: [
        {
          logoUrl: "",
          label: "LilNouns PropLot",
          url: "https://lilnouns.wtf/ideas",
        },
      ],
    },
    {
      internalCollectionId: 29,
      name: "[playground] Proof of Attendance ZK Badge",
      description:
        "[playground] ZK Badge owned by Ethereum events attendees. This Badge proves their IRL attendance to at least one Ethereum event.",
      image: "proof-of-attendance-main-events.svg",
      groupGeneratorName: "proof-of-attendance-main-events",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "Hold one of the POAPs from a curated list of events",
        specification:
          "Attend EthCC4 (3695), or EthCC5 (53834), or Devcon VI (60695), or DevCon V (69), or DevConnect Co-work space (36029), or ETH New York Stacked Hacker (53425), or ETHBerlin 3 (65440), or Poap Sponsor boot @DappCon22 (63682) or met Patricio during events on December 2021 (15916) or on February 2022 (25149), or on March 2022 (30875), or on April 2022 (36528), or on May 2022 (42068), or on June 2022 (47144), or on July 2022 (53153), or on August 2022 (57318), or on September 2022 (63400)",
      },
      links: [
        {
          logoUrl: "",
          label: "POAP",
          url: "https://poap.gallery/",
        },
      ],
    },
    {
      internalCollectionId: 30,
      name: "NFT Collector ZK Badge",
      description: "ZK Badge received by holders of major NFTs",
      image: "nft-collector.svg",
      groupGeneratorName: "nft-collector",
      publicContacts: [
        {
          type: "twitter",
          contact: "Web3PON",
        },
      ],
      eligibility: {
        shortDescription: "Have NFT from the post popular collections", // Add collections
        specification:
          "You should have token in your wallet that belongs to one of the colelctions",
      },
      links: [],
    },
    {
      internalCollectionId: 33,
      name: "[playground] ENS Supporter ZK Badge",
      description:
        "[playground] ZK Badge owned by ENS name owners that are reputable on Twitter (curated by hive.one) and added their .eth in their username.",
      image: "ens_supporters.svg",
      groupGeneratorName: "ens-supporters",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription:
          "Be part of the most reputable ENS domain accounts on Twitter",
        specification:
          "Be part of the first 10k Ethereum Twitter Influencer listed on Hive.one that added their .eth name in their username",
      },
      links: [
        {
          logoUrl: "",
          label: "ENS",
          url: "https://ens.domains/",
        },
        {
          logoUrl: "",
          label: "Hive",
          url: "https://hive.one/",
        },
      ],
    },
    {
      internalCollectionId: 5151110,
      name: "[playground] Sismo Contributor ZK Badge",
      description:
        "[playground] ZK Badge owned by Sismo contributors. This Badge is used in Sismo Governance for contributors to voice their opinions.",
      image: "sismo_contributors.svg",
      groupGeneratorName: "sismo-contributors",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription:
          "Prove that you are involved in Sismo by holding .sismo.eth ENS, a contribution POAP, or early ZK Badges.",
        specification:
          "Hold a .sismo.eth Sismo ENS subdomain (Sismo Genesis 0, or X, or A token), or hold a Sismo Contributor Poap (37527: User Testing, or 39515: Artists, or 39651: Community Managers, or 39654: Data Analysts, or 39655: Copywriters, or 39657: Cryptographers, or 39660: Data creators, or 54045: Ziki Run, or 66267: Contributor), or hold a 53325: Meet Sismo @ETHCC POAP, or a 48976: Sismo PreMasquerade POAP, or a 48975: Sismo Masquerade POAP, or hold a early ZK Badge (Masquerade ZK Badge, or Early User ZK Badge, or PoH ZK Badge, or a Ethereum Power User ZK Badge, or a Proof of Attendance ZK Badge, or a ENS Supporter ZK Badge, or a Gitcoin GR15 ZK Badge) or donated to the Sismo Gitcoin Grant 41, or be part of the Sismo Core team",
      },
      links: [],
    },
    {
      internalCollectionId: 34,
      name: "ClubSpace by Mad Finance ZK Badge",
      description:
        "ZK Badge owned by early followers of Mad Finance + frens; featuring lil buddy from ClubSpace",
      image: "madfi_lens_followers_s01.svg",
      groupGeneratorName: "madfi-lens-followers-s01",
      publicContacts: [
        {
          type: "twitter",
          contact: "@madfiprotocol",
        },
      ],
      eligibility: {
        shortDescription:
          "Early followers of @madfinance.lens + whitelisted MadFi frens",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "Mad Finance",
          url: "https://madfinance.xyz",
        },
        {
          logoUrl: "",
          label: "Lens Frens",
          url: "https://lensfrens.xyz/madfinance.lens",
        },
        {
          logoUrl: "",
          label: "ClubSpace",
          url: "https://joinclubspace.xyz",
        },
      ],
    },
    {
      internalCollectionId: 35,
      name: "[tutorial] ENS Contributor ZK Badge",
      description: "[tutorial] ZK Badge received by early contributors of ENS",
      image: "tuto_ens_contributors.svg",
      groupGeneratorName: "tuto-ens-contributors",
      publicContacts: [
        {
          type: "github",
          contact: "yum0e",
        },
      ],
      eligibility: {
        shortDescription: "Be an early contributor of ENS",
        specification:
          "You should have previously voted on ENS Snapshot space or have contributed on ensdomains/ens or ensdomains/ens-contracts repositories.",
      },
      links: [
        {
          logoUrl: "",
          label: "ENS",
          url: "https://ens.domains/",
        },
        {
          logoUrl: "",
          label: "See Pull Request",
          url: "https://github.com/sismo-core/sismo-hub/pull/236/files",
        },
      ],
    },
    {
      internalCollectionId: 88,
      name: "Rhino.Fi Power User ZK Badge",
      description: "ZK Badge received by Rhino.Fi Power Users",
      image: "rhinofi-badge.svg",
      groupGeneratorName: "rhinofi-power-users",
      publicContacts: [
        {
          type: "twitter",
          contact: "rhinofi",
        },
      ],
      eligibility: {
        shortDescription: "Active users of Rhino.Fi app since May 2021",
        specification:
          "You should have used Rhino.Fi app for at least 3 weeks since May 2021 with a minimum trading volume of $100 USD during those weeks",
      },
      links: [
        {
          logoUrl:
            "https://rhino.fi/wp-content/uploads/2021/10/rhino.fi_Primary_Logo_Grad-1.svg",
          label: "Rhino.Fi",
          url: "https://rhino.fi/",
        },
      ],
    },
  ],
};

export const frontBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 0,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "[playground] Sismo Early User ZK Badge",
      description: "[playground] ZK Badge owned by Sismo Early users",
      image: "sismo_early_users.svg",
      groupGeneratorName: "sismo-early-users",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
  ],
};
