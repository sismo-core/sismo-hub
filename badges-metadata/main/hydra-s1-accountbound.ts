import { generateHydraS1Attester } from "@badges-metadata/base/hydra-s1";
import { factoryBadges } from "@badges-metadata/main/factory/hydra-s1-accountbound-factory-badges";
import { Network } from "topics/attester";
import { BadgeMetadata, BadgesCollection } from "topics/badge";
import { BadgeAttribute, BadgeAttributeValue } from "topics/badge/badge-attributes";
import { GroupStore } from "topics/group";

export const hydraS1AccountboundBadges: BadgesCollection = {
  collectionIdFirst: 10000001,
  badges: [
    ...factoryBadges,
    {
      internalCollectionId: 3,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Sismo Masquerade Bloomer ZK Badge",
      description: "ZK Badge owned by @sismo.lens and @masquerade.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      groupGeneratorName: "sismo-masquerade-lens-followers",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.MEDIUM,
      },
      eligibility: {
        shortDescription: "Follow @sismo.lens and @masquerade.lens before July 6 2022",
        specification:
          "Follow @sismo.lens and @masquerade.lens before July 6 2022 on apps powered by Lens Protocol (Lenster, Orb, ..).",
      },
      links: [],
    },
    {
      internalCollectionId: 4,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Ethereum Power User ZK Badge",
      description: "ZK Badge owned by the most active users on Ethereum",
      image: "ethereum_power_users.svg",
      groupGeneratorName: "ethereum-power-users",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.HIGH,
      },
      eligibility: {
        shortDescription: "Be part of the top 0.1% most active users on Ethereum",
        specification:
          "Be part of the top 50k accounts that sent the most transactions (token transfers excluded) on Ethereum between 2015 and December 31st 2016, or be part of the top 50k accounts between 2015 and December 31st 2017, or be part of the top 50k accounts between 2015 and December 31st 2018, or be part of the top 50k accounts between 2015 and December 31st 2019, or be part of the top 50k accounts between 2015 and December 31st 2020, or be part of the top 50k accounts between 2015 and December 31st 2021",
      },
      links: [],
    },
    {
      internalCollectionId: 8,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Proof of Humanity ZK Badge",
      description: "ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      groupGeneratorName: "proof-of-humanity",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.VERY_HIGH,
      },
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Proof of Lepak Member",
      description: "Lepak Member who is eligible for voting",
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "CircularMerch lens followers ZK Badge",
      description: "ZK Badge owned by @circlemerch.lens Lens followers",
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "lens 50 best followed ZK Badge",
      description: "ZK Badge for the 50 most followed",
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
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu White Belt Winner ZK Badge",
      description: "The player won one game at gamejutsu.app",
      image: "gamejutsu_winner_white.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-bronze-winner`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu Green Belt Winner ZK Badge",
      description: "The player won five games in row at gamejutsu.app",
      image: "gamejutsu_winner_green.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-silver-winner`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu Black Belt Winner ZK Badge",
      description: "The player won ten games in row at gamejutsu.app",
      image: "gamejutsu_winner_black.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-gold-winner`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu White Belt Loser ZK Badge",
      description: "The player lost one game at gamejutsu.app",
      image: "gamejutsu_loser_white.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-bronze-loser`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu Green Belt Loser ZK Badge",
      description: "The player lost five games in row at gamejutsu.app",
      image: "gamejutsu_loser_green.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-silver-loser`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu Black Belt Loser ZK Badge",
      description: "The player lost ten games in row at gamejutsu.app",
      image: "gamejutsu_loser_black.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-gold-loser`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu White Belt Peacemonger ZK Badge",
      description: "The player draw one game at gamejutsu.app",
      image: "gamejutsu_draw_white.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-bronze-draw`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu Brown Belt Peacemonger ZK Badge",
      description: "The player draw five games in row at gamejutsu.app",
      image: "gamejutsu_draw_green.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-silver-draw`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu Black Belt Peacemonger ZK Badge",
      description: "The player draw ten games in row at gamejutsu.app",
      image: "gamejutsu_draw_black.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-gold-draw`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu White Belt Cheater ZK Badge",
      description: "The player cheated one game at gamejutsu.app",
      image: "gamejutsu_cheater_white.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-bronze-cheater`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu Green Belt Cheater ZK Badge",
      description: "The player cheated five games in row at gamejutsu.app",
      image: "gamejutsu_cheater_green.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-silver-cheater`)],
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
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu Black Belt Cheater ZK Badge",
      description: "The player cheated ten games in row at gamejutsu.app",
      image: "gamejutsu_cheater_black.svg",
      groupGeneratorName: "gamejutsu-achievements",
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-gold-cheater`)],
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
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "GR15 Gitcoin Contributor ZK Badge",
      description: "ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
      image: "gitcoin_grants_round_15_donors.svg",
      groupGeneratorName: "gitcoin-grants-rounds-donors",
      groupFetcher: async (groupStore) => [
        await groupStore.latest("gitcoin-grants-round-15-donors"),
      ],
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.LOW,
      },
      eligibility: {
        shortDescription: "You must have donated in the 15th round of Gitcoin Grants",
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
      networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Sismo thread #1 lens mirrorers",
      description: "ZK Badge owned by the mirrorers of Sismo thread #1 from martingbz.lens",
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
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
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
        shortDescription: "Ideas having more than or equal to 50 votes on PropLot",
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
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
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
        specification: "You should have voted more than or equal to 15 ideas on PropLot",
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
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Proof of Attendance ZK Badge",
      description:
        "ZK Badge owned by Ethereum events attendees. This Badge proves their IRL attendance to at least one Ethereum event.",
      image: "proof-of-attendance-main-events.svg",
      groupGeneratorName: "proof-of-attendance-main-events",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.VERY_HIGH,
      },
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
      networks: [Network.Goerli, Network.Mumbai],
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
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "ENS Supporter ZK Badge",
      description:
        "ZK Badge owned by ENS name owners that are reputable on Twitter (curated by hive.one) and added their .eth in their username.",
      image: "ens_supporters.svg",
      groupGeneratorName: "ens-supporters",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "Be part of the most reputable ENS domain accounts on Twitter",
        specification:
          "Be part of the first 10k Ethereum Twitter Influencer listed on Hive.one that added their .eth name in their username",
      },
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.MEDIUM,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.VERY_HIGH,
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
      internalCollectionId: 34,
      networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
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
        shortDescription: "Early followers of @madfinance.lens + whitelisted MadFi frens",
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
      networks: [Network.Goerli, Network.Mumbai],
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
          "You should have previously voted on the first proposal of ENS Snapshot space or have contributed on ensdomains/ens or ensdomains/ens-contracts repositories.",
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
      internalCollectionId: 36,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Sismo GitHub Stargazer ZK Badge",
      description:
        "ZK Badge owned by users that starred the Sismo Protocol on GitHub. This badge is the first GitHub-bound ZK Badge!",
      image: "sismo_stargazers.svg",
      groupGeneratorName: "sismo-stargazers",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "Starred the Sismo Protocol on GitHub",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "Sismo GitHub",
          url: "https://github.com/sismo-core/sismo-protocol",
        },
      ],
    },
    {
      internalCollectionId: 37,
      networks: [Network.Goerli, Network.Mumbai],
      name: "Ben Friends Badge",
      description:
        "ZK Badge received by registering as a friend through the Goerli tesnet smart contract called BenFriend at 0x008C13e7D240447f38DD96f80e9E08fA53bbE318", // describe it !
      image: "ben-friends.svg",
      groupGeneratorName: "ben-friends",
      publicContacts: [
        {
          type: "twitter",
          contact: "@Baoufa",
        },
      ],
      eligibility: {
        shortDescription: "Be Benjamin's Friend",
        specification:
          "You should have previously registered as a friend by calling the becomeFriend function on the Goerli tesnet smart contract called BenFriend at 0x008C13e7D240447f38DD96f80e9E08fA53bbE318.",
      },
      links: [
        {
          logoUrl: "",
          label: "anoufa.dev",
          url: "https://www.anoufa.dev/",
        },
        {
          logoUrl: "",
          label: "BenFriend smart contract",
          url: "https://goerli.etherscan.io/address/0x008c13e7d240447f38dd96f80e9e08fa53bbe318#code",
        },
      ],
    },
    {
      internalCollectionId: 38,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Eth Influencer ZK Badge",
      description: "ZK Badge owned by Ethereum Influencers on Twitter (curated by hive.one)",
      image: "twitter_ethereum_influencers.svg",
      groupGeneratorName: "twitter-ethereum-influencers",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.MEDIUM,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.MEDIUM,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.VERY_HIGH,
      },
      eligibility: {
        shortDescription: "Be part of the Ethereum Influencers on Twitter listed by Hive.one",
        specification:
          "Badge Level 1: Be part of the Ethereum Influencers on Twitter listed by Hive.one. Badge Level 2: Be part of the first 5K Ethereum Influencers on Twitter listed by Hive.one. Badge Level 3: Be part of the first 1K Ethereum Influencers on Twitter listed by Hive.one.",
      },
      links: [
        {
          logoUrl: "",
          label: "Hive",
          url: "https://hive.one/",
        },
      ],
    },
    {
      internalCollectionId: 39,
      networks: [Network.Mainnet],
      name: "The Merge Contributor ZK Badge",
      description: "ZK Badge owned by contributors to The Merge",
      image: "the_merge_contributor.svg",
      groupGeneratorName: "the-merge-contributor",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "Be a contributor to The Merge",
        specification:
          "Core developer that has contributed to the migration of Ethereum from Proof of Work to Proof of Stake. Curated by Tim Beiko.",
      },
      links: [
        {
          logoUrl: "",
          label: "ZK Drop",
          url: "https://claim.zkdrop.io/mergooor-pass",
        },
      ],
    },
    {
      internalCollectionId: 69,
      networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Aztec User ZK Badge",
      description: "ZK Badge for Aztec V1 and V2 depositors",
      image: "aztec-connect-depositors.svg",
      groupGeneratorName: "aztec-connect-depositors",
      publicContacts: [
        {
          type: "github",
          contact: "zk-pay",
        },
      ],
      eligibility: {
        shortDescription:
          "Aztec V1 (Early eligibility): Deposit(s) totalling 0.1 ETH or greater. Aztec V2 (Ongoing): 3 Ethereum L1 Deposits (NOT DEFI DEPOSITS) totalling 0.1 ETH or greater. Dai deposits are not eligible.",
        specification:
          "The badge was botted and more strict requirements are enforced now. Early V1 Aztec users must have deposited at least 0.1 ETH (e.g 1 transaction of 0.1 ETH, or 4 transactions of 0.025 ETH. V2 Aztec users must have 3 deposits and those 3 deposits must total 0.1 ETH (e.g 3 transactions of 0.0333 ETH). Dai deposits are not supported.",
      },
      links: [
        {
          logoUrl:
            "https://bafkreihbzskwtmtklxb54n2obb2jbva375s663ddjbufmnptn667qsblky.ipfs.nftstorage.link",
          label: "Aztec",
          url: "https://aztec.network/",
        },
        {
          logoUrl:
            "https://bafkreigoyothw6cla24s4wzgkzvl2glndo62vzk6kagsvpuvtuhv54ah6q.ipfs.nftstorage.link",
          label: "ZKPay",
          url: "https://zkpay.finance",
        },
      ],
    },
    {
      internalCollectionId: 699,
      networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "ZKPay Questoor ZK Badge",
      description: "ZK Badge rewarded for ZKPay Quest completion",
      image: "zkpay-quest.svg",
      groupGeneratorName: "zkpay-quest",
      publicContacts: [
        {
          type: "twitter",
          contact: "@ZK_PAY",
        },
      ],
      eligibility: {
        shortDescription:
          "Complete all quests listed on https://zkpay.finace/quest",
        specification:
          "Upon completion, click Complete Quest to submit your address for inclusion. Wait 24hours, then mint the Sismo badge.",
      },
      links: [
        {
          logoUrl:
            "",
          label: "ZKPay.finance",
          url: "https://zkpay.finance/",
        },
        {
          logoUrl:
            "",
          label: "ZKPay Discord",
          url: "https://discord.gg/zkpay",
        },
      ],
    },
    {
      internalCollectionId: 87,
      networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Nouns DAO I Visionary ZK Badge",
      description: "ZK Badge owned by Nouns DAO Contributors",
      image: "nounsdao-voters-tier1-visionaries.svg",
      groupGeneratorName: "nounsdao-voters-tier1-visionaries",
      publicContacts: [
        {
          type: "github",
          contact: "curelycue",
        },
      ],
      eligibility: {
        shortDescription: "You must have voted 3 times in Nouns DAO",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "Nouns",
          url: "https://nouns.wtf/vote",
        },
        {
          logoUrl: "",
          label: "Twitter",
          url: "https://twitter.com/nounsdao",
        },
      ],
    },
    {
      internalCollectionId: 88,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
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
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.LOW,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.MEDIUM,
      },
      eligibility: {
        shortDescription: "Active users of Rhino.Fi app since May 2021",
        specification:
          "You must be a repeat user of Rhino.Fi after 21st May 2021 to be eligible for this badge.",
      },
      links: [
        {
          logoUrl: "https://rhino.fi/wp-content/uploads/2021/10/rhino.fi_Primary_Logo_Grad-1.svg",
          label: "Rhino.Fi",
          url: "https://rhino.fi/",
        },
      ],
    },
    {
      internalCollectionId: 201,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "NFT Legendary Trader ZK Badge",
      description: "Badge is for NFT Legendary Traders to represent their elite trading skills.",
      image: "wiw-nft-legendary-traders.svg",
      groupGeneratorName: "wiw-nft-legendary-traders",
      publicContacts: [
        {
          type: "twitter",
          contact: "@wiw_io",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.MEDIUM,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.HIGH,
      },
      eligibility: {
        shortDescription: "Realize ≥100 ETH profit from NFT tradings by 2022/11/30.",
        specification:
          "WIW Protocol calculates the realized profit from NFT tradings（ETH only）based on user’s ETH addresses. Those who own Legendary NFT traders tag（With realized profit ≥ 100 ETH) will be eligible for this badge.",
      },
      links: [
        {
          logoUrl: "https://static.wiw.io/image/logo.png",
          label: "WIW",
          url: "https://wiw.io/",
        },
      ],
    },
    {
      internalCollectionId: 420,
      networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Timeswap Lens Follower ZK Badge",
      description: "ZK Badge owned by early Timeswap Followers on lens",
      image: "timeswap-early-follower.svg",
      groupGeneratorName: "timeswap-lens-followers",
      publicContacts: [
        {
          type: "twitter",
          contact: "@TimeswapLabs",
        },
        {
          type: "lens",
          contact: "timeswap_labs.lens",
        },
      ],
      eligibility: {
        shortDescription: "Be an early follower of TimeswapLabs on Lens",
        specification: "You must have followed Timeswap on lens prior to snapshot",
      },
      links: [
        {
          logoUrl: "",
          label: "TimeswapLabs",
          url: "https://timeswap.io",
        },
      ],
    },
    {
      internalCollectionId: 421,
      networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "0xDigger Lens Follower ZK Badge",
      description: "ZK Badge owned by early 0xDigger Lens followers",
      image: "digger_lens_followers.svg",
      groupGeneratorName: "digger-lens-followers",
      publicContacts: [
        {
          type: "twitter",
          contact: "@0xDigger_lens",
        },
        {
          type: "lens",
          contact: "0xdigger.lens",
        },
      ],
      eligibility: {
        shortDescription: "Be an early follower of 0xDigger on Lens",
        specification: "You must have followed 0xDigger on lens prior to snapshot.",
      },
      links: [],
    },
    {
      internalCollectionId: 514,
      networks: [Network.Goerli],
      name: "Ziki Pass ZK Badge",
      description: "ZK Badge owned by Sismo Team for testing Ziki Pass on Goerli",
      image: "sismo_digger.svg",
      groupGeneratorName: "ziki-pass-testnets",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "Test Ziki Pass on Goerli",
        specification: "Be in Sismo Core Team",
      },
      links: [],
    },
    {
      internalCollectionId: 777,
      networks: [Network.Goerli, Network.Mumbai],
      name: "Sardine Enthusiasts",
      description: "ZK Badge owned by the most dedicated sardine eaters",
      image: "deenz.svg",
      groupGeneratorName: "sardine-enthusiasts",
      publicContacts: [
        {
          type: "twitter",
          contact: "@0xdeenz",
        },
        {
          type: "github",
          contact: "0xdeenz",
        },
      ],
      eligibility: {
        shortDescription: "Eat a can of sardines every day",
        specification: "",
      },
    },
    {
      internalCollectionId: 996,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "996.ICU Fighter ZK Badge",
      description: "ZK Badge received by fighters of 996",
      image: "996_icu.svg",
      groupGeneratorName: "996-icu",
      publicContacts: [
        {
          type: "github",
          contact: "996icu",
        },
      ],
      eligibility: {
        shortDescription: "Be an fighter against 996(capitalism).",
        specification:
          "You should have previously heroically pointed out the evil behavior of these capitalists in the 996icu/996.ICU repository(a PR merged).",
      },
      links: [
        {
          logoUrl: "",
          label: "996.ICU",
          url: "https://996.icu/",
        },
      ],
    },
    {
      internalCollectionId: 1234,
      networks: [Network.Goerli, Network.Mumbai],
      name: "Top 100 CoW Trader",
      description: "Top 100 CoW Trader",
      image: "cow_top_100.svg",
      groupGeneratorName: "cowswap-top-hundred",
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
      eligibility: {
        shortDescription: "According to aggregate 2022 volumes, you're a top 100 CoW trader",
        specification: "According to aggregate 2022 volumes, you've traded more than $21,328,944",
      },
      links: [
        {
          logoUrl: "https://cow.fi/images/og-meta-cowprotocol.png",
          label: "COW",
          url: "https://cow.fi/",
        },
      ],
    },
    {
      internalCollectionId: 1235,
      networks: [Network.Goerli, Network.Mumbai],
      name: "Top 1000 CoW Trader",
      description: "Top 1000 CoW Trader",
      image: "cow_top_1000.svg",
      groupGeneratorName: "cowswap-top-1000",
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
      eligibility: {
        shortDescription: "According to aggregate 2022 volumes, you're a top 1000 CoW trader",
        specification: "According to aggregate 2022 volumes, you've traded more than $1,732,642",
      },
      links: [
        {
          logoUrl: "https://cow.fi/images/og-meta-cowprotocol.png",
          label: "COW",
          url: "https://cow.fi/",
        },
      ],
    },
    {
      internalCollectionId: 1236,
      networks: [Network.Goerli, Network.Mumbai],
      name: "Top 5000 CoW Trader",
      description: "Top 5000 CoW Trader",
      image: "cow_top_5000.svg",
      groupGeneratorName: "cowswap-top-5000",
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
      eligibility: {
        shortDescription: "According to aggregate 2022 volumes, you're a top 5000 CoW trader",
        specification: "According to aggregate 2022 volumes, you've traded more than $160,321",
      },
      links: [
        {
          logoUrl: "https://cow.fi/images/og-meta-cowprotocol.png",
          label: "COW",
          url: "https://cow.fi/",
        },
      ],
    },
    {
      internalCollectionId: 1237,
      networks: [Network.Goerli, Network.Mumbai],
      name: "Top 15000 CoW Trader",
      description: "Top 15000 CoW Trader",
      image: "cow_top_15000.svg",
      groupGeneratorName: "cowswap-top-15000",
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
      eligibility: {
        shortDescription: "According to aggregate 2022 volumes, you're a top 15000 CoW trader",
        specification: "According to aggregate 2022 volumes, you've traded more than $13,167",
      },
      links: [
        {
          logoUrl: "https://cow.fi/images/og-meta-cowprotocol.png",
          label: "COW",
          url: "https://cow.fi/",
        },
      ],
    },
    {
      internalCollectionId: 1238,
      networks: [Network.Goerli, Network.Mumbai],
      name: "CoW Trader",
      description: "CoW Trader",
      image: "cow_rest.svg",
      groupGeneratorName: "cowswap-rest",
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
      eligibility: {
        shortDescription: "Anyone that have traded on CoW Swap in 2022",
        specification: "Anyone that have traded on CoW Swap in 2022",
      },
      links: [
        {
          logoUrl: "https://cow.fi/images/og-meta-cowprotocol.png",
          label: "COW",
          url: "https://cow.fi/",
        },
      ],
    },
    {
      internalCollectionId: 5151110,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Sismo Contributor ZK Badge",
      description:
        "ZK Badge owned by Sismo contributors. This Badge is used in Sismo Governance for contributors to voice their opinions.",
      image: "sismo_contributors.svg",
      groupGeneratorName: "sismo-contributors",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.MEDIUM,
      },
      eligibility: {
        shortDescription:
          "Prove that you are involved in Sismo and earn governance voting power",
        specification:
          "LEVEL 1: Any Curated ZK Badge with SR score >1 minted on Polygon / Gen[0] Member________ LEVEL 2: Any Curated ZK Badge with SR score >=3 minted on Polygon / Contribution POAPs lvl2 holder / Gen[X] or Gen[0] member / Sismo Event Attendee / Sismo Gitcoin Grant Donor________ LEVEL 3: Contribution POAPs lvl3 holder / Sismo Core Team / Advisor / Investor________ Full eligibility details: https://sismo.notion.site/Contributor-ZK-Badge-Voting-Power-fde6b6e4182a409d87bfcee42f14a63a",
      },
      links: [],
    },
    {
      internalCollectionId: 5555555, 
      networks: [Network.Goerli, Network.Mumbai], 
      name: "Uniswap Contributor ZK Badge",
      description: "ZK Badge received by early contributors of Uniswap",
      image: "uniswap_contributors.svg",
      groupGeneratorName: "uniswap-contributors",
      publicContacts: [
        {
          type: "twitter",
          contact: "@ImmanuelXIV",
        },
      ],
      eligibility: {
        shortDescription: "Be an early contributor of Uniswap",
        specification:
          "You should have previously contributed on Uniswap/v3-core, Uniswap/v3-periphery, Uniswap/interface, Uniswap/v3-periphery, Uniswap/v2-core, or Uniswap/v2-periphery repositories.",
      },
      links: [
        {
          logoUrl: "",
          label: "Uniswap",
          url: "https://uniswap.org/",
        },
      ],
    },
  ],
};

export const hydraS1AccountboundAttester = generateHydraS1Attester(
  {
    [Network.Mainnet]: {
      attesterAddress: "0x0Fb92857855A34F6bFf6f8c42F9673f6e8329406",
      rootsRegistryAddress: "0x5E5e0CEfB86c39dbf3AFf31a61375e2D8eF4D001",
    },
    [Network.Polygon]: {
      attesterAddress: "0x10b27d9efa4A1B65412188b6f4F29e64Cf5e0146",
      rootsRegistryAddress: "0xEce747769BD44A7854c8C0913A91Aa801e42D0d0",
    },
    [Network.Gnosis]: {
      attesterAddress: "0x0a764805Ad76A740D46C81C9A8978790C227084C",
      rootsRegistryAddress: "0x453bF14103CC941A96721de9A32d5E3d3095e049",
    },
    [Network.Goerli]: {
      attesterAddress: "0x319d2a1f99DCE97bC1539643Df7cD7A0a978Eb7B",
      rootsRegistryAddress: "0x3be8DF71fc13312411F0d20d26C08E822fE9cF1f",
    },
    [Network.Mumbai]: {
      attesterAddress: "0xEe6c299A09d352caf53C81621f6D757c7C0B4d7c",
      rootsRegistryAddress: "0xe51e46177505c31CE33791066E17E11d9D180305",
    },
  },
  {
    name: "hydra-s1-accountbound",
    attestationsCollections: hydraS1AccountboundBadges.badges.map(
      (badge: BadgeMetadata) => {
        if (!badge.groupFetcher && !badge.groupGeneratorName) {
          throw new Error(
            "Either groupFetcher or groupGeneratorName should be specified !"
          );
        }
        const groupFetcher = badge.groupFetcher
          ? badge.groupFetcher
          : async (groupStore: GroupStore) => {
              try {
                const latestGroup = await groupStore.latest(
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  badge.groupGeneratorName!
                );
                return [latestGroup];
              } catch (error) {
                console.log(error);
                return [];
              }
            };
        return {
          internalCollectionId: badge.internalCollectionId,
          networks: badge.networks,
          groupFetcher,
        };
      }
    ),
  }
);
