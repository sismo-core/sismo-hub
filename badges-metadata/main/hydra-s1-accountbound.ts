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
      groupSnapshot: {
        groupName: "sismo-masquerade-lens-followers",
      },
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
      links: [],
    },
    {
      internalCollectionId: 4,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Ethereum Power User ZK Badge",
      description: "ZK Badge owned by the most active users on Ethereum",
      image: "ethereum_power_users.svg",
      groupSnapshot: {
        groupName: "ethereum-power-users",
      },
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
      links: [],
    },
    {
      internalCollectionId: 8,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Proof of Humanity ZK Badge",
      description: "ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      groupSnapshot: {
        groupName: "proof-of-humanity",
      },
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
      groupSnapshot: {
        groupName: "proof-of-lepak-member",
      },
      image: "lepak-badge.svg",
      publicContacts: [
        {
          type: "github",
          contact: "zengzengzenghuy",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 10,
      networks: [Network.Goerli, Network.Mumbai],
      name: "CircularMerch lens followers ZK Badge",
      description: "ZK Badge owned by @circlemerch.lens Lens followers",
      image: "circularmerch_lens_followers.svg",
      groupSnapshot: {
        groupName: "circularmerch-lens-followers",
      },
      publicContacts: [
        {
          type: "github",
          contact: "lilyanB",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 11,
      networks: [Network.Goerli, Network.Mumbai],
      name: "lens 50 best followed ZK Badge",
      description: "ZK Badge for the 50 most followed",
      image: "lens_50_best_followed.svg",
      groupSnapshot: {
        groupName: "lens-50-best-followed",
      },
      publicContacts: [
        {
          type: "github",
          contact: "lilyanB",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 12,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "Top 100 ENS ZK Badge",
      description: "ZK Badge owned by the most followed ens names on Twitter",
      image: "badge-ens-leaderboard.svg",
      groupSnapshot: {
        groupName: "top-100-ens",
      },
      publicContacts: [
        {
          type: "github",
          contact: "enricobottazzi",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 13,
      networks: [Network.Goerli, Network.Mumbai],
      name: "Gamejutsu White Belt Winner ZK Badge",
      description: "The player won one game at gamejutsu.app",
      image: "gamejutsu_winner_white.svg",
      groupSnapshot: {
        groupName: "gamejutsu-bronze-winner",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-bronze-winner`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-silver-winner",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-silver-winner`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-gold-winner",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-gold-winner`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-bronze-loser",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-bronze-loser`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-silver-loser",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-silver-loser`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-gold-loser",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-gold-loser`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-bronze-draw",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-bronze-draw`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-silver-draw",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-silver-draw`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-gold-draw",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-gold-draw`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-bronze-cheater",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-bronze-cheater`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-silver-cheater",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-silver-cheater`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gamejutsu-gold-cheater",
      },
      groupFetcher: async (groupStore) => [await groupStore.latest(`gamejutsu-gold-cheater`)],
      publicContacts: [
        {
          type: "github",
          contact: "vicglarson",
        },
      ],
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
      groupSnapshot: {
        groupName: "gitcoin-grants-round-15-donors",
      },
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
      groupSnapshot: {
        groupName: "martingbz-sismo-thread-1-lens-mirrorers",
      },
      publicContacts: [
        {
          type: "github",
          contact: "MartinGbz",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 27,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "LilNouns PropLot Contributors ZK Badge",
      description: "ZK Badge received by LilNouns PropLot contributors",
      image: "proplot-contributors-badge.svg",
      groupSnapshot: {
        groupName: "lilnouns-proplot-contributors",
      },
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
      groupSnapshot: {
        groupName: "lilnouns-proplot-voters",
      },
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
      groupSnapshot: {
        groupName: "proof-of-attendance-main-events",
      },
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
      groupSnapshot: {
        groupName: "nft-collector",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "Web3PON",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 33,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "ENS Supporter ZK Badge",
      description:
        "ZK Badge owned by ENS name owners that are reputable on Twitter (curated by hive.one) and added their .eth in their username.",
      image: "ens_supporters.svg",
      groupSnapshot: {
        groupName: "ens-supporters",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
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
      groupSnapshot: {
        groupName: "madfi-lens-followers-s01",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "@madfiprotocol",
        },
      ],
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
      groupSnapshot: {
        groupName: "tuto-ens-contributors",
      },
      publicContacts: [
        {
          type: "github",
          contact: "yum0e",
        },
      ],
      links: [
        {
          logoUrl: "",
          label: "ENS",
          url: "https://ens.domains/",
        },
        {
          logoUrl: "",
          label: "See Pull Request",
          url: "https://github.com/sismo-core/sismo-hub/pull/1345/files",
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
      groupSnapshot: {
        groupName: "sismo-stargazers",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
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
      groupSnapshot: {
        groupName: "ben-friends",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "@Baoufa",
        },
      ],
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
      groupSnapshot: {
        groupName: "twitter-ethereum-influencers",
      },
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
      groupSnapshot: {
        groupName: "the-merge-contributor",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
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
      groupSnapshot: {
        groupName: "aztec-connect-depositors",
      },
      publicContacts: [
        {
          type: "github",
          contact: "zk-pay",
        },
      ],
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
      groupSnapshot: {
        groupName: "zkpay-quest",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "@ZK_PAY",
        },
      ],
      links: [
        {
          logoUrl: "",
          label: "ZKPay.finance",
          url: "https://zkpay.finance/",
        },
        {
          logoUrl: "",
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
      groupSnapshot: {
        groupName: "nounsdao-voters-tier1-visionaries",
      },
      publicContacts: [
        {
          type: "github",
          contact: "curelycue",
        },
      ],
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
      groupSnapshot: {
        groupName: "rhinofi-power-users",
      },
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
      groupSnapshot: {
        groupName: "wiw-nft-legendary-traders",
      },
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
      groupSnapshot: {
        groupName: "timeswap-lens-followers",
      },
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
      groupSnapshot: {
        groupName: "digger-lens-followers",
      },
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
      links: [],
    },
    {
      internalCollectionId: 514,
      networks: [Network.Goerli],
      name: "Ziki Pass ZK Badge",
      description: "ZK Badge owned by Sismo Team for testing Ziki Pass on Goerli",
      image: "sismo_digger.svg",
      groupSnapshot: {
        groupName: "ziki-pass-testnets",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 777,
      networks: [Network.Goerli, Network.Mumbai],
      name: "Sardine Enthusiasts",
      description: "ZK Badge owned by the most dedicated sardine eaters",
      image: "deenz.svg",
      groupSnapshot: {
        groupName: "sardine-enthusiasts",
      },
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
    },
    {
      internalCollectionId: 996,
      networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
      name: "996.ICU Fighter ZK Badge",
      description: "ZK Badge received by fighters of 996",
      image: "996_icu.svg",
      groupSnapshot: {
        groupName: "996-icu",
      },
      publicContacts: [
        {
          type: "github",
          contact: "996icu",
        },
      ],
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
      groupSnapshot: {
        groupName: "cowswap-top-hundred",
      },
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
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
      groupSnapshot: {
        groupName: "cowswap-top-1000",
      },
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
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
      groupSnapshot: {
        groupName: "cowswap-top-5000",
      },
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
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
      groupSnapshot: {
        groupName: "cowswap-top-15000",
      },
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
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
      groupSnapshot: {
        groupName: "cowswap-rest",
      },
      publicContacts: [
        {
          type: "github",
          contact: "ca8888",
        },
      ],
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
      groupSnapshot: {
        groupName: "sismo-contributors",
      },
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
      links: [],
    },
    {
      internalCollectionId: 5555555,
      networks: [Network.Goerli, Network.Mumbai],
      name: "Uniswap Contributor ZK Badge",
      description: "ZK Badge received by early contributors of Uniswap",
      image: "uniswap_contributors.svg",
      groupSnapshot: {
        groupName: "uniswap-contributors",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "@ImmanuelXIV",
        },
      ],
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
    attestationsCollections: hydraS1AccountboundBadges.badges.map((badge: BadgeMetadata) => {
      if (!badge.groupFetcher && !badge.groupSnapshot.groupName) {
        throw new Error("Either groupFetcher or groupName should be specified !");
      }
      const groupFetcher = badge.groupFetcher
        ? badge.groupFetcher
        : async (groupStore: GroupStore) => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              return [
                (
                  await groupStore.search({
                    groupName: badge.groupSnapshot.groupName,
                    ...(badge.groupSnapshot.timestamp
                      ? { timestamp: badge.groupSnapshot.timestamp }
                      : { latest: true }),
                  })
                )[0],
              ];
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
    }),
  }
);
