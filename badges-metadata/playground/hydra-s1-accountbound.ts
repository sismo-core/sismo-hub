import { generateHydraS1Attester } from "@badges-metadata/base/hydra-s1";
import { factoryBadges } from "@badges-metadata/playground/factory/hydra-s1-accountbound-factory-badges";
import { Network } from "topics/attester";
import { BadgesCollection, BadgeMetadata } from "topics/badge";
import { GroupStore } from "topics/group";

export const hydraS1AccountboundBadges: BadgesCollection = {
  collectionIdFirst: 10000001,
  badges: [
    ...factoryBadges,
    {
      internalCollectionId: 3,
      networks: [Network.Polygon],
      name: "[playground] Sismo Masquerade Bloomer ZK Badge",
      description:
        "[playground] ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
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
      links: [],
    },
    {
      internalCollectionId: 4,
      networks: [Network.Polygon],
      name: "[playground] Ethereum Power User ZK Badge",
      description:
        "[playground] ZK Badge owned by the most active users of Ethereum",
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
      links: [],
    },
    {
      internalCollectionId: 5,
      networks: [Network.Polygon],
      name: "[playground] Bronze proof of hat",
      description: "[playground] Bronze bounty completed",
      image: "proof-of-hat-bronze.svg",
      groupSnapshot: {
        groupName: "proof-of-hat-bronze",
      },
      publicContacts: [
        {
          type: "lens",
          contact: "pastofre.lens",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 6,
      networks: [Network.Polygon],
      name: "[playground] Silver proof of hat",
      description: "[playground] Silver bounty completed",
      image: "proof-of-hat-silver.svg",
      groupSnapshot: {
        groupName: "proof-of-hat-silver",
      },
      publicContacts: [
        {
          type: "lens",
          contact: "pastofre.lens",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 7,
      networks: [Network.Polygon],
      name: "[playground] Gold proof of hat",
      description: "[playground] Gold bounty completed",
      image: "proof-of-hat-gold.svg",
      groupSnapshot: {
        groupName: "proof-of-hat-gold",
      },
      publicContacts: [
        {
          type: "lens",
          contact: "pastofre.lens",
        },
      ],
      links: [],
    },
    {
      internalCollectionId: 8,
      networks: [Network.Polygon],
      name: "[playground] Proof of Humanity ZK Badge",
      description: "[playground] ZK Badge owned by verified humans on POH",
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
      networks: [Network.Polygon],
      name: "[playground] Proof of Lepak Member",
      description: "[playground] Lepak Member who is eligible for voting",
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
      networks: [Network.Polygon],
      name: "[playground] CircularMerch lens followers ZK Badge",
      description:
        "[playground] ZK Badge owned by @circlemerch.lens Lens followers",
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
      networks: [Network.Polygon],
      name: "[playground] lens 50 best followed ZK Badge",
      description: "[playground] ZK Badge for the 50 most followed",
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
      name: "Gamejutsu White Belt Winner ZK Badge",
      description: "The player won one game at gamejutsu.app",
      image: "gamejutsu_winner_white.svg",
      groupSnapshot: {
        groupName: "gamejutsu-bronze-winner",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-bronze-winner`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu Green Belt Winner ZK Badge",
      description: "The player won five games in row at gamejutsu.app",
      image: "gamejutsu_winner_green.svg",
      groupSnapshot: {
        groupName: "gamejutsu-silver-winner",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-silver-winner`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu Black Belt Winner ZK Badge",
      description: "The player won ten games in row at gamejutsu.app",
      image: "gamejutsu_winner_black.svg",
      groupSnapshot: {
        groupName: "gamejutsu-gold-winner",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-gold-winner`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu White Belt Loser ZK Badge",
      description: "The player lost one game at gamejutsu.app",
      image: "gamejutsu_loser_white.svg",
      groupSnapshot: {
        groupName: "gamejutsu-bronze-loser",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-bronze-loser`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu Green Belt Loser ZK Badge",
      description: "The player lost five games in row at gamejutsu.app",
      image: "gamejutsu_loser_green.svg",
      groupSnapshot: {
        groupName: "gamejutsu-silver-loser",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-silver-loser`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu Black Belt Loser ZK Badge",
      description: "The player lost ten games in row at gamejutsu.app",
      image: "gamejutsu_loser_black.svg",
      groupSnapshot: {
        groupName: "gamejutsu-gold-loser",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-gold-loser`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu White Belt Peacemonger ZK Badge",
      description: "The player draw one game at gamejutsu.app",
      image: "gamejutsu_draw_white.svg",
      groupSnapshot: {
        groupName: "gamejutsu-bronze-draw",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-bronze-draw`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu Brown Belt Peacemonger ZK Badge",
      description: "The player draw five games in row at gamejutsu.app",
      image: "gamejutsu_draw_green.svg",
      groupSnapshot: {
        groupName: "gamejutsu-silver-draw",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-silver-draw`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu Black Belt Peacemonger ZK Badge",
      description: "The player draw ten games in row at gamejutsu.app",
      image: "gamejutsu_draw_black.svg",
      groupSnapshot: {
        groupName: "gamejutsu-gold-draw",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-gold-draw`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu White Belt Cheater ZK Badge",
      description: "The player cheated one game at gamejutsu.app",
      image: "gamejutsu_cheater_white.svg",
      groupSnapshot: {
        groupName: "gamejutsu-bronze-cheater",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-bronze-cheater`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu Green Belt Cheater ZK Badge",
      description: "The player cheated five games in row at gamejutsu.app",
      image: "gamejutsu_cheater_green.svg",
      groupSnapshot: {
        groupName: "gamejutsu-silver-cheater",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-silver-cheater`),
      ],
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
      networks: [Network.Polygon],
      name: "Gamejutsu Black Belt Cheater ZK Badge",
      description: "The player cheated ten games in row at gamejutsu.app",
      image: "gamejutsu_cheater_black.svg",
      groupSnapshot: {
        groupName: "gamejutsu-gold-cheater",
      },
      groupFetcher: async (groupStore) => [
        await groupStore.latest(`gamejutsu-gold-cheater`),
      ],
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
      networks: [Network.Polygon],
      name: "[playground] GR15 Gitcoin Contributor ZK Badge",
      description:
        "[playground] ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
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
      networks: [Network.Polygon],
      name: "Sismo thread #1 lens mirrorers",
      description:
        "ZK Badge owned by the mirrorers of Sismo thread #1 from martingbz.lens",
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
      name: "[playground] Proof of Attendance ZK Badge",
      description:
        "[playground] ZK Badge owned by Ethereum events attendees. This Badge proves their IRL attendance to at least one Ethereum event.",
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
      networks: [Network.Polygon],
      name: "NFT Collector ZK Badge",
      description: "ZK Badge received by holders of major NFTs",
      image: "nft-collector.svg",
      groupSnapshot: {
        groupName: "nft-collector",
      },
      groupFetcher: async () => [],
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
      networks: [Network.Polygon],
      name: "[playground] ENS Supporter ZK Badge",
      description:
        "[playground] ZK Badge owned by ENS name owners that are reputable on Twitter (curated by hive.one) and added their .eth in their username.",
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
      networks: [Network.Polygon],
      name: "[playground] Sismo Contributor ZK Badge",
      description:
        "[playground] ZK Badge owned by Sismo contributors. This Badge is used in Sismo Governance for contributors to voice their opinions.",
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
      links: [],
    },
    {
      internalCollectionId: 34,
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
      name: "[tutorial] ENS Contributor ZK Badge",
      description: "[tutorial] ZK Badge received by early contributors of ENS",
      image: "tuto_ens_contributors.svg",
      groupSnapshot: {
        groupName: "tuto-ens-contributors",
      },
      groupFetcher: async () => {return [];},
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
          url: "https://github.com/sismo-core/sismo-hub/pull/236/files",
        },
      ],
    },
    {
      internalCollectionId: 36,
      networks: [Network.Polygon],
      name: "[playground] Sismo GitHub Stargazer ZK Badge",
      description:
        "[playground] ZK Badge owned by users that starred the Sismo Protocol on GitHub. This badge is the first GitHub-bound ZK Badge!",
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
      name: "[playground] Eth Influencer ZK Badge",
      description:
        "[playground] ZK Badge owned by Ethereum Influencers on Twitter (curated by hive.one)",
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
      links: [
        {
          logoUrl: "",
          label: "Hive",
          url: "https://hive.one/",
        },
      ],
    },
    {
      internalCollectionId: 88,
      networks: [Network.Polygon],
      name: "[playground] Rhino.Fi Power User ZK Badge",
      description: "[playground] ZK Badge received by Rhino.Fi Power Users",
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
      links: [
        {
          logoUrl:
            "https://rhino.fi/wp-content/uploads/2021/10/rhino.fi_Primary_Logo_Grad-1.svg",
          label: "Rhino.Fi",
          url: "https://rhino.fi/",
        },
      ],
    },
    {
      internalCollectionId: 69,
      networks: [Network.Polygon],
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
      internalCollectionId: 201,
      networks: [Network.Polygon],
      name: "NFT Legendary Trader ZK Badge",
      description:
        "Badge is for NFT Legendary Traders to represent their elite trading skills.",
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
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
      internalCollectionId: 777,
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
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
      networks: [Network.Polygon],
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
      internalCollectionId: 87,
      networks: [Network.Polygon],
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
          url: "https://twitter.com/nounsdao"
        },
      ],
    },
  ],
};

export const hydraS1AccountboundAttester = generateHydraS1Attester(
  {
    [Network.Polygon]: {
      attesterAddress: "0x0AB188c7260666146B300aD3ad5b2AB99eb91D45",
      rootsRegistryAddress: "0xb8797eBa1048f6A6AfCbE4F08a582b4Dde69C05d",
    },
  },
  {
    name: "hydra-s1-accountbound",
    attestationsCollections: hydraS1AccountboundBadges.badges.map(
      (badge: BadgeMetadata) => {
        if (!badge.groupFetcher && !badge.groupSnapshot.groupName) {
          throw new Error(
            "Either groupFetcher or groupName should be specified !"
          );
        }
        const groupFetcher = badge.groupFetcher
          ? badge.groupFetcher
          : async (groupStore: GroupStore) => [
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              (await groupStore.all())[badge.groupSnapshot.groupName],
            ];
        return {
          internalCollectionId: badge.internalCollectionId,
          networks: badge.networks,
          groupFetcher,
        };
      }
    ),
  }
);
