import { Network } from "topics/attester/networks";
import { BadgeMetadata } from "topics/badge";

export const factoryBadges: BadgeMetadata[] = [
  // Inject randomly between 2000000 and 3000000
  {
    internalCollectionId: 2017027,
    networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "Helper ZK Badge",
    description:
      "This Badge is gifted to Helpers that helped someone in need at Web3 Help Desk. \nUsed for Governance and Eligibility Criteria for Monthly Coordinape.",
    image: "helper.svg",
    groupGeneratorName: "helper",
    publicContacts: [
      {
        type: "twitter",
        contact: "@web3_helpdesk",
      },
    ],
    eligibility: {
      shortDescription: "Help someone in need at Web3 Help Desk.",
      specification: "",
    },
    links: [
      {
        label: "Charmverse",
        url: "https://app.charmverse.io/web3-help-desk/page-19377272787222233",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2018840,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "zen",
    description: "A ZKBadge owned by true friends of the zen.This badge proves that you and me are best buddies!",
    image: "zen.svg",
    groupGeneratorName: "zen",
    publicContacts: [
      {
        type: "twitter",
        contact: "@zenezenez_"
      },
      {
        type: "github",
        contact: "zen417"
      }
    ],
    eligibility: {
      shortDescription: "Follow anishi on Lens.",
      specification: "Follow @anishi.lens on Lens protocol."
    },
    links: []
  },
  {
    internalCollectionId: 2027048,
    networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "Gen[0] dAgorians ZK Badge",
    description:
      "A ZK Badge of appreciation for the genesis Ecclesia of dAgora. This badge is used to identify the first members of DecentrAgora.",
    image: "gen-0-dagorians.svg",
    groupGeneratorName: "gen-0-dagorians",
    publicContacts: [
      {
        type: "twitter",
        contact: "@decentragora",
      },
      {
        type: "github",
        contact: "decentragora",
      },
    ],
    eligibility: {
      shortDescription: "Join dAgora guild, hold a dAgora NFT or mirror entry; before Jan. 4th",
      specification: "",
    },
    links: [
      {
        label: "dAgora App",
        url: "https://decentragora.xyz",
        logoUrl: "",
      },
      {
        label: "dAgora Guild",
        url: "https://guild.xyz/decentragora",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2020053,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Sismo meme ZK Badge",
    description:
      "ZK Badge owned by the collectors,mirrors of sismo meme post from rahulkr.lens on lens",
    image: "sismo-meme.svg",
    groupGeneratorName: "sismo-meme",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rkumar021219",
      },
    ],
    eligibility: {
      shortDescription: "collector,mirrors of sismo meme post from rahulkr.lens on lens",
      specification:
        "collector,mirrors of sismo meme post from rahulkr.lens on lens\nlink-https://lenster.xyz/posts/0x8f02-0xdd",
    },
    links: [],
  },
  {
    internalCollectionId: 2030012,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "kukushkinace",
    description: "A ZK Badge owned by true friends of the Sismo protocol. This Badge\nproves that you and Sismo are best buddies!",
    image: "kukushkinace.svg",
    groupGeneratorName: "kukushkinace",
    publicContacts: [
      {
        type: "twitter",
        contact: "@sismo_eth"
      },
      {
        type: "github",
        contact: "sismo-core"
      }
    ],
    eligibility: {
      shortDescription: "Be a Sismo core team member, Sismo contributor, or follow Sismo on Lens.",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "http://sismo.io"
      }
    ]
  },
  {
    internalCollectionId: 2041821,
    networks: [Network.Goerli, Network.Mumbai],
    name: "RoxxyPoxxy",
    description: "roxxy crypto badge",
    image: "roxxypoxxy.svg",
    groupGeneratorName: "roxxypoxxy",
    publicContacts: [
      {
        type: "twitter",
        contact: "@roxxypoxxy",
      },
      {
        type: "github",
        contact: "roxypoxy29",
      },
    ],
    eligibility: {
      shortDescription: "be part of RoxxyPoxxy crypto followers",
      specification: "",
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://twitter.com/roxypoxy29",
      },
    ],
  },
  {
    internalCollectionId: 2042020,
    networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "zkLend POAP contributor ZK Badge",
    description: "ZK Badge owned by zkLend POAP contributor",
    image: "zklend-poap-contributor.svg",
    groupGeneratorName: "zklend-poap-contributor",
    publicContacts: [
      {
        type: "twitter",
        contact: "@poolcleaner6",
      },
      {
        type: "github",
        contact: "poolcleaner6",
      },
    ],
    eligibility: {
      shortDescription: "You have to own zkLend Poap's to mint this ZK Badge",
      specification:
        "You need to own any of this POAP's #64130 #63629 #48879 #51912 #44747 #47227 #61296 #52411 #52445 #49692 #46534 #62034 #60770 #58179 #57129 #54484 #54666 #54885 #53810 #54021 #53655 ",
    },
    links: [],
  },
  {
    internalCollectionId: 2052047,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "baby2father.eth",
    description: "ZK Badge owned by baby2father.eth",
    image: "baby2father-eth.svg",
    groupGeneratorName: "baby2father-eth",
    publicContacts: [
      {
        type: "twitter",
        contact: "@hc05969379"
      }
    ],
    eligibility: {
      shortDescription: "FRIENDS who follow baby2father.lens",
      specification: "TO follow website  --  https://lenster.xyz/u/baby2father"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://legofuncar.pixnet.net/blog"
      }
    ]
  },
  {
    internalCollectionId: 2055365,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "RAHULKR LENS FOLLOWERS ZK Badge",
    description: " ZK Badge owned by @rahulkr.lens Lens followers",
    image: "rahulkr-lens-followers.svg",
    groupGeneratorName: "rahulkr-lens-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rkumar021219",
      },
    ],
    eligibility: {
      shortDescription: "FOLLOWERS OF RAHULKR PROFILE ON LENS",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2061601,
    networks: [Network.Goerli, Network.Mumbai],
    name: "AKAPS FRENS",
    description:
      "ZK Badge owned by AKAPS Followers. This Badge proves that the holders are followers of AKAPS.",
    image: "akaps-frens.svg",
    groupGeneratorName: "akaps-frens",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Ther_apeutic",
      },
    ],
    eligibility: {
      shortDescription: "Be a Follower of AKAPS",
      specification: "To mint this ZK Badge, users must follow AKAPS.LENS",
    },
    links: [],
  },
  {
    internalCollectionId: 2062663,
    networks: [Network.Goerli, Network.Mumbai],
    name: "The Sandbox Contributor",
    description: "ZK Badge owned by contributors to The Sandbox",
    image: "the-sandbox-contributor.svg",
    groupGeneratorName: "the-sandbox-contributor",
    publicContacts: [
      {
        type: "twitter",
        contact: "@haatkinson",
      },
      {
        type: "github",
        contact: "atkinsonholly",
      },
    ],
    eligibility: {
      shortDescription: "Prove that you are a contributor to The Sandbox smart contracts",
      specification: "Contributed to the sandbox-smart-contracts repository",
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://sandbox.game",
      },
    ],
  },
  {
    internalCollectionId: 2064170,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "LENS meme collector,mirror ZK Badge",
    description: "ZK Badge owned by the collectors,mirrors of lens meme post from rahulkr.lens",
    image: "lens-meme-collector-mirror.svg",
    groupGeneratorName: "lens-meme-collector-mirror",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rkumar021219",
      },
    ],
    eligibility: {
      shortDescription: "collector,mirrors lens meme post from rahulkr.lens",
      specification:
        "collectors,mirrors of lens meme post from rahulkr.lens\nlink-https://lenster.xyz/posts/0x8f02-0x0131",
    },
    links: [],
  },
  {
    internalCollectionId: 2070706,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Weed Lover Become Follower",
    description: "Weed Lover Become Follower ZK Badge",
    image: "weed-lover-become-follower.svg",
    groupGeneratorName: "weed-lover-become-follower",
    publicContacts: [
      {
        type: "twitter",
        contact: "@0susbb0",
      },
    ],
    eligibility: {
      shortDescription: "Just be a part of lens and CommitDAO",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2087460,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Wojak Lens ",
    description: "Every lens users who followed my lens handle are eligible",
    image: "wojak-lens.svg",
    groupGeneratorName: "wojak-lens",
    publicContacts: [
      {
        type: "twitter",
        contact: "@PoorWojak"
      }
    ],
    eligibility: {
      shortDescription: "follow lens",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://lenster.xyz/u/poorwojak"
      }
    ]
  },
  {
    internalCollectionId: 2092300,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Tokenomics DAO Consultant ZK Badge",
    description:
      "ZK Badge owned by Tokenomics DAO consultant. This Badge is used as a show of knowledge, of which a minimum is required by the DAO to take on consulting gigs. Consultants get access to clients who reach out to the DAO looking for consulting.",
    image: "tokenomics-dao-consultant.svg",
    groupGeneratorName: "tokenomics-dao-consultant",
    publicContacts: [
      {
        type: "twitter",
        contact: "@tokenomicsdao",
      },
    ],
    eligibility: {
      shortDescription: "Nominated by other consultants",
      specification: "Users who have passed the Tokenomics DAO nomination process",
    },
    links: [
      {
        label: "Tokenomics DAO",
        url: "https://tokenomicsdao.xyz/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2100600,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis, Network.Polygon],
    name: "MannyRadu",
    description: "My username Zk Badge and for crypto",
    image: "mannyradu.svg",
    groupGeneratorName: "mannyradu",
    publicContacts: [
      {
        type: "twitter",
        contact: "@MannyRadu",
      },
    ],
    eligibility: {
      shortDescription: "follow",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2106109,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "My 1",
    description: "Zk Bage owned by evgeniche",
    image: "my-1.svg",
    groupGeneratorName: "my-1",
    publicContacts: [
      {
        type: "twitter",
        contact: "@EvgenijSamojle2"
      }
    ],
    eligibility: {
      shortDescription: "Be part of comunite? hold eth",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2106633,
    networks: [Network.Polygon, Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Coin Center Donator ZK Badge",
    description:
      "ZK Badge owned by donators to Coin Center. This Badge proves that the holder has sent a donation to Coin Center before 10/21/2022 via CoinCenter.eth (0x15322b546e31f5bfe144c4ae133a9db6f0059fe3 on Ethereum, Optimism, Arbitrum, or Polygon PoS) or via Gitcoin (0x097b7feb64d0b272efc3092f833b0e18bd4d1521 on Ethereum).",
    image: "coin-center-donators.svg",
    groupGeneratorName: "coin-center-donators",
    publicContacts: [
      {
        type: "twitter",
        contact: "0x_Osprey",
      },
      {
        type: "github",
        contact: "0xosprey",
      },
    ],
    eligibility: {
      shortDescription: "Donated to CoinCenter.eth",
      specification: "Donate to CoinCenter.eth ",
    },
    links: [
      {
        label: "Coin Center",
        url: "https://www.coincenter.org/donate/",
        logoUrl: "https://pbs.twimg.com/profile_images/512271786172379136/8bT5hlfr_400x400.png",
      },
    ],
  },
  {
    internalCollectionId: 2129060,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "umanuma.lens followers",
    description: "umanuma.lens followers",
    image: "umanuma-lens-followers.svg",
    groupGeneratorName: "umanuma-lens-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@frog_man415"
      },
      {
        type: "github",
        contact: "miura415"
      }
    ],
    eligibility: {
      shortDescription: "umanuma.lens follow",
      specification: "https://lenster.xyz/u/umanuma\n[Updated daily]"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://lenster.xyz/u/umanuma"
      }
    ]
  },
  {
    internalCollectionId: 2137451,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Viktor ZK Badge",
    description:
      "ZK Badge owned by Viktor Rozumnyi, this Badge is used in all variety of web3 protocols",
    image: "viktor.svg",
    groupGeneratorName: "viktor",
    publicContacts: [
      {
        type: "twitter",
        contact: "@viktorrozumnyi",
      },
    ],
    eligibility: {
      shortDescription: "Be part of the community",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2138501,
    networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "MICE dERP Early ZK Badge",
    description:
      "Those who have access to early testing platform for decentralized game development",
    image: "mice-derp-early.svg",
    groupGeneratorName: "mice-derp-early",
    publicContacts: [
      {
        type: "twitter",
        contact: "@2012_mice",
      },
      {
        type: "github",
        contact: "RoadsTO",
      },
    ],
    eligibility: {
      shortDescription: "mice.eth",
      specification:
        "Those who have access to early testing platform for decentralized game development",
    },
    links: [
      {
        label: "MICE",
        url: "https://mice.eth.limo",
        logoUrl: "",
      },
      {
        label: "Claim MICE Pass",
        url: "https://mice.eth.limo",
        logoUrl: "",
      },
      {
        label: "Obitel Roads (R&D Lab)",
        url: "https://roads.obitel.eth.limo",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2139448,
    networks: [Network.Goerli, Network.Mumbai],
    name: "ZKPAY.finance-AZF7",
    description: "This is my power badge for ZkPay.Finance support community",
    image: "zkpay-finance-azf7.svg",
    groupGeneratorName: "zkpay-finance-azf7",
    publicContacts: [
      {
        type: "twitter",
        contact: "@StefanNistor13",
      },
      {
        type: "github",
        contact: "nisnice77",
      },
    ],
    eligibility: {
      shortDescription: "be part of support community on zkpay.finance and support AZF7",
      specification:
        "you need yo follow me on my twitter to be eligible, hold a badge like this and you will have priority on support assistence",
    },
    links: [],
  },
  {
    internalCollectionId: 2140799,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "First Rug on Lens Protocol ZK Badge",
    description:
      "ZK Badge owned by users which have been rugged by @lensbeats.lens (0xB430049F8dF3d3883Df96F784dEE5C0f5596c45B) and didn’t get airdrop of 250 $BEATS tokens or music NFT as promised after the they deleted their social accounts and burned their Lens Protocol profile NFT.",
    image: "first-rug-on-lens.svg",
    groupGeneratorName: "first-rug-on-lens",
    publicContacts: [
      {
        type: "twitter",
        contact: "@WagameEth",
      },
      {
        type: "github",
        contact: "WagameDAO",
      },
    ],
    eligibility: {
      shortDescription: "ZK Badge owned by users rugged by @lensbeats.lens ",
      specification:
        "List of eligible addresses (526) submitted by WagameDAO to @lensbeats.lens for the promise to airdrop 250 $BEATS Token (0xc434A867aA0F88AEF9422526996Ee71bcA263Dd6 on Polygon) whereby the promise was not kept by @lensbeats.lens",
    },
    links: [],
  },
  {
    internalCollectionId: 2143017,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "vegan",
    description: "vegan",
    image: "vegan.svg",
    groupGeneratorName: "vegan",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Lulu520Wallet"
      }
    ],
    eligibility: {
      shortDescription: "vegan",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2144122,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Mahadev ZK Badge",
    description: "This badge is for following me on Lens",
    image: "mahadev.svg",
    groupGeneratorName: "mahadev",
    publicContacts: [
      {
        type: "twitter",
        contact: "@bishnuksapkota2",
      },
    ],
    eligibility: {
      shortDescription: "Lens friends",
      specification: "Everyone following me on lens are eligible",
    },
    links: [],
  },
  {
    internalCollectionId: 2145326,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "ZL019",
    description: "Badges for supporters and contributors participating in the 019 campaign.",
    image: "zl019.svg",
    groupGeneratorName: "zl019",
    publicContacts: [
      {
        type: "twitter",
        contact: "@wieYYDS"
      }
    ],
    eligibility: {
      shortDescription: "Become a part of ZL019, hold DAI, who @wieYYDS, get verified at sismo.io",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2153491,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Web3 Developer",
    description: "ZK Badge owned by Web3 Devs that have a Web3 project on GitHub \n",
    image: "web3-developer.svg",
    groupGeneratorName: "web3-developer",
    publicContacts: [
      {
        type: "github",
        contact: "alexsheks"
      }
    ],
    eligibility: {
      shortDescription: "have a Web3 project on GitHub",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2153882,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Monsterwear ZK Badge",
    description: "For all Monsters at heart!",
    image: "monsters.svg",
    groupGeneratorName: "monsters",
    publicContacts: [
      {
        type: "twitter",
        contact: "@zknadar",
      },
    ],
    eligibility: {
      shortDescription: "For holders of MonsterWear NFT on halloween night!",
      specification: "For monsters",
    },
    links: [],
  },
  {
    internalCollectionId: 2155948,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Digi",
    description: "ZK Badge owned by DigiDaigaku ecosystem members.\n\nThis badge will hopefully allow DigiDaigaku members to enjoy their benefits whilst maintaining their privacy.\n\nSnapshot updated weekly and will additionally be updated to include any further Limit Break projects within the Digi Daigaku ecosystem.",
    image: "digi.svg",
    groupGeneratorName: "digi",
    publicContacts: [
      {
        type: "twitter",
        contact: "@JEWELOOPHOLE_0t"
      }
    ],
    eligibility: {
      shortDescription: "Hold a Limit Break NFT that is part of the Digi Daigaku ecosystem.",
      specification: "Hold a Limit Break NFT that is part of the Digi Daigaku ecosystem."
    },
    links: []
  },
  {
    internalCollectionId: 2163624,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "CommitDAO ZK Badge",
    description:
      "This badge prove that you are following COMMIT path to Web3 democratization's and you are a true Certified Degen!",
    image: "commitdao.svg",
    groupGeneratorName: "commitdao",
    publicContacts: [
      {
        type: "twitter",
        contact: "@clementfrmd",
      },
      {
        type: "github",
        contact: "clementfrmd",
      },
    ],
    eligibility: {
      shortDescription:
        "Hold $CMT OR hold a CERTIFIED Degen Poap OR hold Ethereum Power User ZK Badge's",
      specification:
        "Hold at least 100 $CMT on your wallet |\nHold the CERTIFIED DEGEN Poap #56550 |\nHold an Ethereum Power User ZK Badge's",
    },
    links: [
      {
        label: "COMMIT",
        url: "https://commit.press/en",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2165888,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Vorontein folowers",
    description: "ZK Badge owned by followers Vorontein.lens",
    image: "vorontein-folowers.svg",
    groupGeneratorName: "vorontein-folowers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@IgorKirsh"
      },
      {
        type: "github",
        contact: "Vorontein"
      }
    ],
    eligibility: {
      shortDescription: "Be a Vorontein.lens follower",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2174030,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Lama Pama ZK Badge",
    description: "ZK Badge owned by Lama Pama",
    image: "lama-pama.svg",
    groupGeneratorName: "lama-pama",
    publicContacts: [
      {
        type: "twitter",
        contact: "@kugata",
      },
      {
        type: "github",
        contact: "zim9791",
      },
    ],
    eligibility: {
      shortDescription: "lamapama",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2184873,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "CryptoMonkeys  ZK Badge",
    description:
      "This badge is issued to the very first supporters of DAO Cryptomonkeys, and gives the right to the future possibility of joining to investment pools (DAO) , valid for 1 year from the date of minting...",
    image: "cryptomonkeys.svg",
    groupGeneratorName: "cryptomonkeys",
    publicContacts: [
      {
        type: "twitter",
        contact: "@spikelov",
      },
    ],
    eligibility: {
      shortDescription:
        "Be a member of group and chat https://t.me/nefomoeb, be a member of group ABUZ Put an asterisk here https://github.com/spikelov/Cryptomonkeys",
      specification:
        "Be a member of group and chat https://t.me/nefomoeb, be a member of group ABUZ Put an asterisk here https://github.com/spikelov/Cryptomonkeys",
    },
    links: [
      {
        label: "cryptomonkeys",
        url: "https://t.me/nefomoeb",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2184978,
    networks: [Network.Goerli, Network.Mumbai],
    name: "madmax ZK Badge",
    description: "madmax badge owned by googlens.lens",
    image: "madmax-badge.svg",
    groupGeneratorName: "madmax-badge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@offroadmann",
      },
      {
        type: "github",
        contact: "@offroadmann",
      },
    ],
    eligibility: {
      shortDescription: "early zk badges",
      specification: "sismo ens,sismo poap",
    },
    links: [],
  },
  {
    internalCollectionId: 2187420,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Sismo Banana ",
    description: "This badge proves that you love banana",
    image: "sismo-banana.svg",
    groupGeneratorName: "sismo-banana",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Emerald09918692"
      }
    ],
    eligibility: {
      shortDescription: "Star \"https://github.com/penpetr4/banana\" Github repo",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2192782,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "kingdom",
    description: "awesome",
    image: "kingdom.svg",
    groupGeneratorName: "kingdom",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Jason060101"
      },
      {
        type: "github",
        contact: "jason060101"
      }
    ],
    eligibility: {
      shortDescription: "follow me",
      specification: "it"
    },
    links: []
  },
  {
    internalCollectionId: 2194450,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Cultivatordao voters",
    description: "ZK Badge owned by the voters which participated in the proposal of ranked choice vote for the initial cohort of Cultivators",
    image: "cultivatordao-voters.svg",
    groupGeneratorName: "cultivatordao-voters",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rkumar021219"
      }
    ],
    eligibility: {
      shortDescription: "voters of cultivator dao proposal 0xd512345eb6c9b7bbf57b28a8b4f7dc46d31ab6c19ac8ad5de4605fa52fcb9e98",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://lenster.xyz/u/rahulkr"
      }
    ]
  },
  {
    internalCollectionId: 2213141,
    networks: [Network.Goerli, Network.Mumbai],
    name: "martianwave ZK Badge",
    description: "This ZK Bade is owned by Martian Wave LLC.",
    image: "martian-wave.svg",
    groupGeneratorName: "martian-wave",
    publicContacts: [
      {
        type: "twitter",
        contact: "alonweinstein",
      },
      {
        type: "github",
        contact: "alonweinstein",
      },
    ],
    eligibility: {
      shortDescription: "Do all kinds of stuff, also do other stuff.",
      specification: "Not sure at all what this is for, TBH.",
    },
    links: [],
  },
  {
    internalCollectionId: 2216993,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Relay Team ZK Badge",
    description: "This badge is given to Relay team members. ",
    image: "relay-badge.svg",
    groupGeneratorName: "relay-badge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@relay_eth",
      },
      {
        type: "github",
        contact: "@relaycc",
      },
    ],
    eligibility: {
      shortDescription: "Be on the Relay team",
      specification: "A member of the Relay team. ",
    },
    links: [
      {
        label: "relay.cc",
        url: "relay.cc",
        logoUrl: "",
      },
      {
        label: "github.com/relaycc",
        url: "github.com/relaycc",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2221466,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "onemillion1.lens followers",
    description: "Follow onemillion1.lens",
    image: "onemillion1-lens-followers.svg",
    groupGeneratorName: "onemillion1-lens-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@15cmgpvd6t4amfp"
      }
    ],
    eligibility: {
      shortDescription: "Snapshot everyday. if you've just followed onemillion1.lens, please wait 48 hours.",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2233540,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "DropSt3r",
    description: "DropSt3r Community",
    image: "dropst3r.svg",
    groupGeneratorName: "dropst3r",
    publicContacts: [
      {
        type: "twitter",
        contact: "@nshackk"
      },
      {
        type: "github",
        contact: "fan3k"
      }
    ],
    eligibility: {
      shortDescription: "DropSt3r Community Badge",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2233728,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "@lrcrypto",
    description: "ZK Badge owned by lrcrypto",
    image: "-lrcrypto.svg",
    groupGeneratorName: "-lrcrypto",
    publicContacts: [
      {
        type: "twitter",
        contact: "@luisraul001178"
      }
    ],
    eligibility: {
      shortDescription: "early zkbadges",
      specification: "user tester"
    },
    links: []
  },
  {
    internalCollectionId: 2234775,
    networks: [Network.Goerli, Network.Mumbai],
    name: "With love from bykur ZK Badge",
    description:
      "ZK badge owned by friends of the creator, or subscribed to Debank bykur.eth before 01/06/2023, or have an Ethereum Power User ZK badge",
    image: "with-love-from-bykur.svg",
    groupGeneratorName: "with-love-from-bykur",
    publicContacts: [
      {
        type: "twitter",
        contact: "@eazavarov",
      },
      {
        type: "github",
        contact: "bykbykur",
      },
    ],
    eligibility: {
      shortDescription:
        "be a friend, or subscribed to Debank bykur.eth before 01/06/2023, or have an Ethereum Power User ZK badge",
      specification:
        "ZK badge owned by friends of the creator, or subscribed to Debank bykur.eth before 01/06/2023, or have an Ethereum Power User ZK badge",
    },
    links: [],
  },
  {
    internalCollectionId: 2235119,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Dorian Gray",
    description: "This badge proves you attended at least one AMA with me.",
    image: "dorian-gray.svg",
    groupGeneratorName: "dorian-gray",
    publicContacts: [
      {
        type: "twitter",
        contact: "@dorian_crypt0",
      },
      {
        type: "github",
        contact: "dorian-gray1",
      },
    ],
    eligibility: {
      shortDescription: "white listed addresses",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2240012,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "lyca",
    description: "ZK  Badge owned by true friends of the lyca.",
    image: "lyca.svg",
    groupGeneratorName: "lyca",
    publicContacts: [
      {
        type: "twitter",
        contact: "@keroro0014"
      }
    ],
    eligibility: {
      shortDescription: "Ethereum Adopter required",
      specification: "You must have an Ethereum Adopter."
    },
    links: []
  },
  {
    internalCollectionId: 2240101,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Oldschool ZK Badge",
    description: "ZK Badge owned by oldschool users",
    image: "oldschool.svg",
    groupGeneratorName: "oldschool",
    publicContacts: [
      {
        type: "twitter",
        contact: "@OlgaAnd81156130",
      },
    ],
    eligibility: {
      shortDescription: "Oldschool rap parties",
      specification: "Be a real oldschool bro",
    },
    links: [],
  },
  {
    internalCollectionId: 2245634,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Ra",
    description: "Badge de test.",
    image: "ra.svg",
    groupGeneratorName: "ra",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Ratra1205",
      },
    ],
    eligibility: {
      shortDescription: "Just for testing purpose.",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2248171,
    networks: [Network.Goerli, Network.Mumbai],
    name: "NeoNeo ZK Badge",
    description:
      "ZK Badge owned by SISMO contributors. This badge is used for mint new nft and play game on NeoNeo metaverse!",
    image: "neoneo-badge.svg",
    groupGeneratorName: "neoneo-badge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@DeFiLovely",
      },
      {
        type: "github",
        contact: "uzlider-core",
      },
    ],
    eligibility: {
      shortDescription: "Hold a #MetaPunk with Gold Chain #NFT ",
      specification: "Hold a #MetaPunk NFT ",
    },
    links: [],
  },
  {
    internalCollectionId: 2250782,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "por",
    description: "POR",
    image: "por.svg",
    groupGeneratorName: "por",
    publicContacts: [
      {
        type: "twitter",
        contact: "@llporza"
      },
      {
        type: "github",
        contact: "llporzall"
      }
    ],
    eligibility: {
      shortDescription: "follower",
      specification: "POAP"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://twitter.com/llPorZall"
      }
    ]
  },
  {
    internalCollectionId: 2251407,
    networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "Lenster Gas Supporter ZK Badge",
    description: "ZK Badge owned by the collectors of lens post from yoginth.lens",
    image: "lenster-gas-supporter.svg",
    groupGeneratorName: "lenster-gas-supporter",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rkumar021219",
      },
    ],
    eligibility: {
      shortDescription:
        "collectors of lens post from yoginth.lens on lens,Support Lenster for gas to provide the best UX in Web3 social",
      specification: "",
    },
    links: [
      {
        label: "lens post",
        url: "https://lenster.xyz/posts/0x0d-0xa9",
        logoUrl: "",
      },
      {
        label: "my profile",
        url: "https://lenster.xyz/u/rahulkr",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2261557,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "CHRON0n",
    description: "ZK Badge owned by Chronon. This Badge is used in CHRON0n.finance",
    image: "chron0n.svg",
    groupGeneratorName: "chron0n",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rollingstonedy"
      }
    ],
    eligibility: {
      shortDescription: "be verified on CHRON0n.finance, donated to CHRON0n.finance",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://chronon.finance/"
      }
    ]
  },
  {
    internalCollectionId: 2267301,
    networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "ZK Hack ZK Badge",
    description:
      "This is a badge for those who submitted a puzzle during our 3rd edition in Fall 2022.",
    image: "zk-hack.svg",
    groupGeneratorName: "zk-hack",
    publicContacts: [
      {
        type: "twitter",
        contact: "@__zkhack__",
      },
    ],
    eligibility: {
      shortDescription: "At least 1 Puzzle submission",
      specification: "",
    },
    links: [
      {
        label: "zkhack",
        url: "https://zkhack.dev/zkhackIII/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2268502,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Wegoham4trey friends ZK Badge",
    description: "All my friends ",
    image: "mybadge.svg",
    groupGeneratorName: "mybadge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Wegoham4trey",
      },
      {
        type: "github",
        contact: "Onika84",
      },
    ],
    eligibility: {
      shortDescription: "minted one zkbadge",
      specification: "just minted and happy",
    },
    links: [],
  },
  {
    internalCollectionId: 2274842,
    networks: [Network.Goerli, Network.Mumbai],
    name: "shiba ZK Badge",
    description: "ZK Badge owned by everyone",
    image: "aurora.svg",
    groupGeneratorName: "aurora",
    publicContacts: [
      {
        type: "twitter",
        contact: "@aurora_ug",
      },
      {
        type: "github",
        contact: "auroraug",
      },
    ],
    eligibility: {
      shortDescription: "early participater",
      specification: "test",
    },
    links: [
      {
        label: "T",
        url: "https://twitter.com/Aurora_ug",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2280940,
    networks: [Network.Polygon, Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "dOrg ZK Badge",
    description:
      "ZK Badge owned by dOrg members. This badges proves that the owner is or has been a member of dOrg.",
    image: "dorg-members.svg",
    groupGeneratorName: "dorg-members",
    publicContacts: [
      {
        type: "twitter",
        contact: "pol_lanski",
      },
    ],
    eligibility: {
      shortDescription: "Be a member of dOrg",
      specification: "Be a member of dOrg by having been approved as such by the dOrg DAO.",
    },
    links: [],
  },
  {
    internalCollectionId: 2283558,
    networks: [Network.Goerli, Network.Mumbai],
    name: "ukswap",
    description: "“ZK Badge owned by…” ",
    image: "ukswap.svg",
    groupGeneratorName: "ukswap",
    publicContacts: [
      {
        type: "twitter",
        contact: "@OKKKK99",
      },
    ],
    eligibility: {
      shortDescription: " Participate in the first event",
      specification: "\nParticipate in the first event",
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://factory.sismo.io/",
      },
    ],
  },
  {
    internalCollectionId: 2286246,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "milan",
    description: "ZK Badge owned by true friends",
    image: "milan.svg",
    groupGeneratorName: "milan",
    publicContacts: [
      {
        type: "twitter",
        contact: "@mi1899lan"
      }
    ],
    eligibility: {
      shortDescription: "follow @milan1899.lens on Lens Protocol",
      specification: "follow @milan1899.lens on Lens Protocol"
    },
    links: []
  },
  {
    internalCollectionId: 2293296,
    networks: [Network.Goerli, Network.Mumbai, Network.Polygon],
    name: "sanyi's gift",
    description:
      "This badge only commemorates our resistance on April 22, 2022. 此徽章仅以纪念4月22日深夜，那次属于我们的反抗。",
    image: "sanyi-s-gift.svg",
    groupGeneratorName: "sanyi-s-gift",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ylm5573",
      },
    ],
    eligibility: {
      shortDescription:
        "Users who filled out the sanyi form on April 22nd. 在4月24日深夜，填写了【sanyi.eth的抽奖小表单】的用户",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2298601,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis,
      Network.Polygon
    ],
    name: "ohJR10",
    description: "ZK Badge owned by who follow  my twitter  https://twitter.com/ohJR10\n",
    image: "ohjr10.svg",
    groupGeneratorName: "ohjr10",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ohJR10"
      }
    ],
    eligibility: {
      shortDescription: "follow  https://twitter.com/ohJR10",
      specification: "@ohJR10\n"
    },
    links: []
  },
  {
    internalCollectionId: 2299239,
    networks: [Network.Goerli, Network.Mumbai],
    name: "TheRealAfroRick ZK Badge",
    description:
      "ZK Badge owned by AfroRick. This Badge is proves that whatever this is associated with has been authenticated by TheRealAfroRick",
    image: "therealafrorickgroup.svg",
    groupGeneratorName: "therealafrorickgroup",
    publicContacts: [
      {
        type: "twitter",
        contact: "@TheRealAfroRick",
      },
    ],
    eligibility: {
      shortDescription:
        "Be a part of the AfroRick fan club, follow AfroRick on Twitter, purchase AfroRick NFTs",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2315671,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Proof of Loneliness ZK Badge",
    description:
      "This badge proofs that I did not qualify for any other badge so I made one for myself.",
    image: "proof-of-loneliness.svg",
    groupGeneratorName: "proof-of-loneliness",
    publicContacts: [
      {
        type: "twitter",
        contact: "@lettersfrm",
      },
    ],
    eligibility: {
      shortDescription: "Be the only person who can mint this badge.",
      specification: "The only thing to do is be the only one who can claim this badge. ",
    },
    links: [],
  },
  {
    internalCollectionId: 2327517,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Gem",
    description: "This badge was created for those who search for crypto gems",
    image: "gem.svg",
    groupGeneratorName: "gem",
    publicContacts: [
      {
        type: "twitter",
        contact: "@gnalna439"
      }
    ],
    eligibility: {
      shortDescription: "Be voted on SIP#25 - Stargate ",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2329542,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Dual Pepes ZK Badge",
    description: "Holder of the esteemed Dual Pepe Nus",
    image: "dual-pepes.svg",
    groupGeneratorName: "dual-pepes",
    publicContacts: [
      {
        type: "twitter",
        contact: "@munchwrap",
      },
    ],
    eligibility: {
      shortDescription: "Holders of Dual Pepes",
      specification: "Hold a Duel Pepe NFT",
    },
    links: [],
  },
  {
    internalCollectionId: 2330264,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "RoadToLife2",
    description: "ZK Badge owned by McLaren Company",
    image: "roadtolife2.svg",
    groupGeneratorName: "roadtolife2",
    publicContacts: [
      {
        type: "twitter",
        contact: "@BadNewsForYou1"
      },
      {
        type: "github",
        contact: "BadNewsXXX"
      }
    ],
    eligibility: {
      shortDescription: "Be part of Github, follow twitter, be verified on Discord",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://github.com/BadNewsXXX"
      }
    ]
  },
  {
    internalCollectionId: 2336517,
    networks: [Network.Polygon, Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "OFAC chads ZK Badge",
    description: "ZK Badge owned by Tornado Chads sanctioned by U.S. Treasury on 08/08/2022.\n",
    image: "ofac-chads-zk-badge-08-08-2022.svg",
    groupGeneratorName: "ofac-chads-zk-badge-08-08-2022",
    publicContacts: [
      {
        type: "github",
        contact: "tornadocash",
      },
    ],
    eligibility: {
      shortDescription: "Own an address added to OFAC's SDN List on 08/08/2022",
      specification:
        "Own one of the addresses added to OFAC's SDN List on 08/08/2022. See https://home.treasury.gov/policy-issues/financial-sanctions/recent-actions/20220808.",
    },
    links: [],
  },
  {
    internalCollectionId: 2338189,
    networks: [Network.Goerli, Network.Mumbai],
    name: "CyberConnect",
    description: "Those who own the Ambassador role in CyberConnect Discord are eligible",
    image: "cyberconnect.svg",
    groupGeneratorName: "cyberconnect",
    publicContacts: [
      {
        type: "github",
        contact: "Emil77780",
      },
    ],
    eligibility: {
      shortDescription: "CyberConnect Ambassador",
      specification: "Those who own the Ambassador role in CyberConnect Discord are eligible",
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://discord.gg/cyberconnect",
      },
    ],
  },
  {
    internalCollectionId: 2340668,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Nftyard lens follower ZK Badge",
    description: "ZK Badge owned by @nftyard.lens Lens followers",
    image: "nftyard-lens-follower.svg",
    groupGeneratorName: "nftyard-lens-follower",
    publicContacts: [
      {
        type: "twitter",
        contact: "@cryptodek",
      },
    ],
    eligibility: {
      shortDescription: "Following @nftyard on Lens",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2345464,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Lens Followers ZK Badge",
    description: "Users who followed arshiags on Lens 🌿",
    image: "lens-followers.svg",
    groupGeneratorName: "lens-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ArshiaGS",
      },
      {
        type: "github",
        contact: "ArshiaGS",
      },
    ],
    eligibility: {
      shortDescription: "ArshiaGS's Lens Followers",
      specification: "🌸 Lenster: https://lenster.xyz/u/arshiags",
    },
    links: [
      {
        label: "👤 About me",
        url: "https://link3.to/arshiags",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2348016,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "THUB Contributor ZK Badge",
    description:
      "ZK Badge owned by Tokenomics Hub (THUB) contributors. This Badge is used as a show of knowledge, of which a minimum is required to pass the THUB standard, and proof of work for contributions made to the THUB platform",
    image: "thub-contributor.svg",
    groupGeneratorName: "thub-contributor",
    publicContacts: [
      {
        type: "twitter",
        contact: "@tokenomicsdao",
      },
    ],
    eligibility: {
      shortDescription: "Submitted a protocol to THUB ",
      specification: "Users who have submitted a protocol that meets THUB quality standards",
    },
    links: [
      {
        label: "Tokenomics DAO",
        url: "https://tokenomicsdao.xyz/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2355164,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Space Inspirers",
    description: "ZK badge owned by the most prominent space communicators on Twitter. It proves that someone contributed a significant part to educating and providing relevant information for the space community.",
    image: "space-inspirers.svg",
    groupGeneratorName: "space-inspirers",
    publicContacts: [
      {
        type: "github",
        contact: "oumuamua9000"
      }
    ],
    eligibility: {
      shortDescription: "Verified as significant space community persona by Hive.one.",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2362677,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "soenander33.lens follows",
    description: "Follow soenander33.lens",
    image: "soenander33-lens-follows.svg",
    groupGeneratorName: "soenander33-lens-follows",
    publicContacts: [
      {
        type: "twitter",
        contact: "@p4itfnib4fgxyr1"
      }
    ],
    eligibility: {
      shortDescription: "Snapshot everyday. if you've just followed soenander33.lens, please wait 48 hours.",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2364194,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Haodi's Friend",
    description: "the friends of Haodi",
    image: "haodi-s-friend.svg",
    groupGeneratorName: "haodi-s-friend",
    publicContacts: [
      {
        type: "twitter",
        contact: "@haodi2best"
      }
    ],
    eligibility: {
      shortDescription: "only for the special list",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2370898,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Krishna",
    description: "ZK Badge owned by Krishna",
    image: "krishna.svg",
    groupGeneratorName: "krishna",
    publicContacts: [
      {
        type: "twitter",
        contact: "@imukeshmali"
      }
    ],
    eligibility: {
      shortDescription: "follow @imukeshmali twitter account",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2373805,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis,
      Network.Polygon
    ],
    name: "Flovatar",
    description: "Zk badge owned by Sismo! ",
    image: "flovatar.svg",
    groupGeneratorName: "flovatar",
    publicContacts: [
      {
        type: "twitter",
        contact: "@garryse1989"
      },
      {
        type: "github",
        contact: "GarrySE89"
      }
    ],
    eligibility: {
      shortDescription: "Early ZK Badge",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2375279,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "CryptoTelugu Twitter Followers",
    description: "Official CryptoTelugu ZK Badge for Twitter Followers of @CryptoTeluguO submitted the ZK Badge form before 14th January 2023",
    image: "cryptotelugu-twitter-followers.svg",
    groupGeneratorName: "cryptotelugu-twitter-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@CryptoTeluguO"
      }
    ],
    eligibility: {
      shortDescription: "Twitter Followers of @CryptoTeluguO submitted the ZK Badge form by 14th Jan 2023",
      specification: "Official CryptoTelugu ZK Badge for Twitter Followers of @CryptoTeluguO submitted the ZK Badge form before 14th January 2023"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://linktr.ee/CryptoTelugu"
      }
    ]
  },
  {
    internalCollectionId: 2384827,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Stargate Finance",
    description: "Snapshot Voters on Stargate Finance",
    image: "stargate-finance.svg",
    groupGeneratorName: "stargate-finance",
    publicContacts: [
      {
        type: "twitter",
        contact: "@PrshntPrmr",
      },
      {
        type: "github",
        contact: "PrshntPrmr",
      },
    ],
    eligibility: {
      shortDescription: "3 times voted on Snapshot",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2387087,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "dale1075",
    description: "ZK Badge is owned by dale1075. The badge is in Sismo Governance for contributors to voice their opinions and become owners of the project",
    image: "dale1075.svg",
    groupGeneratorName: "dale1075",
    publicContacts: [
      {
        type: "twitter",
        contact: "@dale1075"
      }
    ],
    eligibility: {
      shortDescription: "early ZK badges",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2387119,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Supporter of 100% Verified Airdrops ",
    description: "ZK Badge owned by 100% Verified Airdrops Channel Subscribers.",
    image: "supporter-of-100--verified-airdrops.svg",
    groupGeneratorName: "supporter-of-100--verified-airdrops",
    publicContacts: [
      {
        type: "twitter",
        contact: "@MALAYLAYEK6"
      }
    ],
    eligibility: {
      shortDescription: "Follow Us on Lens",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://t.me/VerifiedAirdrop10"
      }
    ]
  },
  {
    internalCollectionId: 2388060,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Mathcastles",
    description: "ZK Badge owned by Terraforms NFT. This badge will hopefully allow holders to enjoy their benefits whilst maintaining their privacy and securing their Mathcastle.\n\nSnapshot updated weekly.",
    image: "mathcastles.svg",
    groupGeneratorName: "mathcastles",
    publicContacts: [
      {
        type: "twitter",
        contact: "@JEWELOOPHOLE_0t"
      }
    ],
    eligibility: {
      shortDescription: "Hold a Terraforms",
      specification: "Hold a Terraforms NFT."
    },
    links: []
  },
  {
    internalCollectionId: 2395350,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "byrd3885.lens follows",
    description: "frens who follow byrd3885.lens",
    image: "byrd3885-lens-follows.svg",
    groupGeneratorName: "byrd3885-lens-follows",
    publicContacts: [
      {
        type: "twitter",
        contact: "@byrd67617500"
      }
    ],
    eligibility: {
      shortDescription: "byrdd3885.lens ",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2398819,
    networks: [Network.Goerli, Network.Mumbai],
    name: "padultra ZK Badge",
    description: "ZK Badge owned by padultra",
    image: "padultra.svg",
    groupGeneratorName: "padultra",
    publicContacts: [
      {
        type: "twitter",
        contact: "@padultra",
      },
    ],
    eligibility: {
      shortDescription: "ZK Badges",
      specification: "only for nft holders",
    },
    links: [],
  },
  {
    internalCollectionId: 2399049,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Lands ZK Badge",
    description: "Owner by the land owners of the pixels game",
    image: "lands.svg",
    groupGeneratorName: "lands",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Filston9527",
      },
    ],
    eligibility: {
      shortDescription: "hold by the land owners",
      specification: "hold by the land owners",
    },
    links: [],
  },
  {
    internalCollectionId: 2405612,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Katty Rain followers",
    description: "This ZK Badge owned by some Lenster.xyz members who followed Katty Rain aka @asian_paint",
    image: "katty-rain-followers.svg",
    groupGeneratorName: "katty-rain-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Irishkin16"
      }
    ],
    eligibility: {
      shortDescription: "Katty Rain follower at Lenster.xyz",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2405819,
    networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "Offscript attendee ZK Badge",
    description: "ZK badge that proves ownership of the Offscript 2022 POAP",
    image: "offscript-attendee.svg",
    groupGeneratorName: "offscript-attendee",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Offscript9",
      },
      {
        type: "github",
        contact: "hesterbruikman",
      },
    ],
    eligibility: {
      shortDescription: "Holds a POAP that could be minted by attendees, following Offscript 2022",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2406685,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "RoadToLife ",
    description: "This badge is used in proved that he's voted on the GR15 GitCoin Round",
    image: "roadtolife.svg",
    groupGeneratorName: "roadtolife",
    publicContacts: [
      {
        type: "twitter",
        contact: "@BadNewsForYou1"
      },
      {
        type: "github",
        contact: "BadNewsXXX"
      }
    ],
    eligibility: {
      shortDescription: "Be verified on GitCoin, donated to Symphony Finance",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://github.com/BadNewsXXX"
      }
    ]
  },
  {
    internalCollectionId: 2409288,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Nastyaleila",
    description: "A ZK Badge owned by true friends of the Sismo protocol. This Badge proves that you and Sismo are best buddies!",
    image: "nastyaleila.svg",
    groupGeneratorName: "nastyaleila",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ivanova_ace"
      },
      {
        type: "github",
        contact: "norma-yar"
      }
    ],
    eligibility: {
      shortDescription: "Be a Sismo core team member, Sismo contributor, or follow Sismo on Lens.",
      specification: "To mint this ZK Badge, users must own an Ethereum, GitHub, or Twitter account connected to the Sismo core team, prove they contribute to Sismo by holding a Sismo Contributor ZK\nBadge, or follow @sismo.lens on Lens protocol."
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "http://sismo.io/"
      }
    ]
  },
  {
    internalCollectionId: 2422521,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Kung Fu ZK Badge",
    description: "Kung Fu",
    image: "kung-fu.svg",
    groupGeneratorName: "kung-fu",
    publicContacts: [
      {
        type: "twitter",
        contact: "@dragonlv8",
      },
      {
        type: "github",
        contact: "Clairelv88",
      },
    ],
    eligibility: {
      shortDescription: "BTC/ETH/NFT/WEB3",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2427315,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Sysmotestbadge1",
    description: "Zk badge that is used for test",
    image: "sysmotestbadge1.svg",
    groupGeneratorName: "sysmotestbadge1",
    publicContacts: [
      {
        type: "twitter",
        contact: "@av77890531",
      },
    ],
    eligibility: {
      shortDescription: "be part of the test",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2436623,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Rogue Gang",
    description: "ZK Badge for Rogue DAO proposers & voters",
    image: "rogue-gang.svg",
    groupGeneratorName: "rogue-gang",
    publicContacts: [
      {
        type: "twitter",
        contact: "@EthKishibe"
      }
    ],
    eligibility: {
      shortDescription: "ZK Badge owned by Rogue DAO contributors. ",
      specification: "This Badge is used as a show of membership, for who has proposed or voted at least once in our governance."
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://snapshot.org/#/koshibe.eth"
      }
    ]
  },
  {
    internalCollectionId: 2438254,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Foxfam Adorator",
    description: "ZK Badge owned by Foxfam Lovers. This (very 1st) badge has an emotional value towards the brand/project and Yum Yum Team. Build by the ppl, for the ppl. Nothing official, only ZK and NFT vibes.",
    image: "foxfam-adorator.svg",
    groupGeneratorName: "foxfam-adorator",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Meytab7"
      }
    ],
    eligibility: {
      shortDescription: "Be part of the Fox...fam(ily)! 🦊",
      specification: "Hold a Foxfam 2D Genesis NFT before 14th of January at midnight CET.\nhttps://marketplace.foxfam.io/collections/0x7cba74d0b16c8e18a9e48d3b7404d7739bb24f23"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://foxfam.io"
      }
    ]
  },
  {
    internalCollectionId: 2440572,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Cyber",
    description: "Cyber",
    image: "cyber.svg",
    groupGeneratorName: "cyber",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Salavat12999032"
      },
      {
        type: "github",
        contact: "Master00000000001"
      }
    ],
    eligibility: {
      shortDescription: "Sisimo contributor",
      specification: "Twitter account  connected to the Sismo"
    },
    links: []
  },
  {
    internalCollectionId: 2461590,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "DKorshunov",
    description: "ZK Badge owned by DKorshunov. This Badge is used for verify identity.",
    image: "dkorshunov.svg",
    groupGeneratorName: "dkorshunov",
    publicContacts: [
      {
        type: "twitter",
        contact: "@dkorshunov_87"
      },
      {
        type: "github",
        contact: "2021kdb"
      }
    ],
    eligibility: {
      shortDescription: "be verified on GitCoin, donated to DropsTab",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://sismo.io/"
      }
    ]
  },
  {
    internalCollectionId: 2471201,
    networks: [Network.Goerli, Network.Mumbai],
    name: "EmpireDAO 2023 1 Day Desk Pass ZK Badge",
    description:
      "1 Day Desk Pass 2023 Individual Member As an “individual member”, you’ll get access to a single desk for co-working alongside other web3 builders, developers, and creators, on a members-only floor of EmpireDAO.",
    image: "empiredao-2023-1-day-desk-pass.svg",
    groupGeneratorName: "empiredao-2023-1-day-desk-pass",
    publicContacts: [
      {
        type: "twitter",
        contact: "@empiredao",
      },
    ],
    eligibility: {
      shortDescription: "Purchase a 2023 individual 1 day desk pass for EmpireDAO",
      specification: "Purchase a 2023 individual 1 day desk pass for EmpireDAO for 0.05ETH",
    },
    links: [
      {
        label: "Empire DAO",
        url: "https://empiredao.xyz/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2471393,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "momoshoten",
    description: "The owner of the ZK badge is owned by momoshoten",
    image: "momoshoten.svg",
    groupGeneratorName: "momoshoten",
    publicContacts: [
      {
        type: "twitter",
        contact: "@momoshoten55"
      }
    ],
    eligibility: {
      shortDescription: "Retains early ZK badge",
      specification: "https://github.com/sismo-core/sismo-hub/blob/main/group-generators/generators/helper/index.ts"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://twitter.com/momoshoten55"
      }
    ]
  },
  {
    internalCollectionId: 2471692,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Alpha Drops",
    description: "This ZK Badge is owned by Alpha Drops' followers on Lens.",
    image: "alpha-drops.svg",
    groupGeneratorName: "alpha-drops",
    publicContacts: [
      {
        type: "twitter",
        contact: "@myalphadrops"
      },
      {
        type: "github",
        contact: "aramzcrypto"
      }
    ],
    eligibility: {
      shortDescription: "Follow Alpha Drops on Lens",
      specification: "Follow Alpha Drops on Lens or Lenster: https://lenster.xyz/u/alphadrops"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://alphadrops.net"
      }
    ]
  },
  {
    internalCollectionId: 2481714,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Swapper Armyfox ZK Badge",
    description: "Users who participated in Armyfox gaming",
    image: "swapper-armyfox.svg",
    groupGeneratorName: "swapper-armyfox",
    publicContacts: [
      {
        type: "twitter",
        contact: "@sonzhik",
      },
    ],
    eligibility: {
      shortDescription: "1 transaction during armyfox period",
      specification: "1 play in Armyfox gaming",
    },
    links: [],
  },
  {
    internalCollectionId: 2484320,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "byrd2.lens follow",
    description: "Follow yourairdrop.lens",
    image: "byrd2-lens-follow.svg",
    groupGeneratorName: "byrd2-lens-follow",
    publicContacts: [
      {
        type: "twitter",
        contact: "@CoTokenfolio"
      }
    ],
    eligibility: {
      shortDescription: "Snapshot  everyday. if you've just followed byrd2.lens, please wait 48 hours.",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2484699,
    networks: [Network.Goerli, Network.Mumbai],
    name: "REKT Familly degen ZK Badge",
    description: " ZK Badge owned by Roman scammed people. Roman is a scammer! ",
    image: "rekt-familly-degen.svg",
    groupGeneratorName: "rekt-familly-degen",
    publicContacts: [
      {
        type: "twitter",
        contact: "@andynita102",
      },
    ],
    eligibility: {
      shortDescription: "Be a part of Rekt Family Humster Ventures",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2488109,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis,
      Network.Polygon
    ],
    name: "Xnova lens follower",
    description: "ZK Badge owned by @xnova.lens Lens followers",
    image: "xnova-lens-follower.svg",
    groupGeneratorName: "xnova-lens-follower",
    publicContacts: [
      {
        type: "twitter",
        contact: "@clerk7007"
      }
    ],
    eligibility: {
      shortDescription: "Snapshot everyday. if you've just followed xnova.lens, please wait 48 hours",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2489013,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "ZK HACK III - Sismo Workshop ZK Badge",
    description: "ZK Badges owned by people who attended the ZK Hack III Sismo Workshop",
    image: "zk-hack-iii-sismo-workshop.svg",
    groupGeneratorName: "zk-hack-iii-sismo-workshop",
    publicContacts: [
      {
        type: "github",
        contact: "leosayous21",
      },
    ],
    eligibility: {
      shortDescription: "Having partcipated to the ZK HACK III Sismo Workshop ",
      specification: "",
    },
    links: [
      {
        label: "zkhack III",
        url: "https://zkhack.dev/zkhackIII/",
        logoUrl: "",
      },
      {
        label: "sismo",
        url: "https://www.sismo.io/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2491076,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "sanye",
    description: "Created for Web3.0 contributors",
    image: "sanye.svg",
    groupGeneratorName: "sanye",
    publicContacts: [
      {
        type: "twitter",
        contact: "@mutialotim"
      },
      {
        type: "github",
        contact: "meng971"
      }
    ],
    eligibility: {
      shortDescription: "Created for Web3.0 contributors",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://link3.to/31415926"
      }
    ]
  },
  {
    internalCollectionId: 2491546,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Test Badge",
    description: "This is a test badge",
    image: "test-badge.svg",
    groupGeneratorName: "test-badge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@scorlibo"
      }
    ],
    eligibility: {
      shortDescription: "This is a test badge only available to the badge creator",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2493562,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Wonder ZK Badge",
    description:
      "ZK Badge owned by Irene. \nThis Badge proves that cryptocurrencies have a future. ",
    image: "wonder.svg",
    groupGeneratorName: "wonder",
    publicContacts: [
      {
        type: "twitter",
        contact: "@BULKA37463236",
      },
    ],
    eligibility: {
      shortDescription: "be part of my twitter and follow my Instagram profile",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2504053,
    networks: [Network.Goerli, Network.Mumbai],
    name: "ape ZK Badge",
    description: "samurai",
    image: "my-09.svg",
    groupGeneratorName: "my-09",
    publicContacts: [
      {
        type: "twitter",
        contact: "@katsumoto_eth",
      },
    ],
    eligibility: {
      shortDescription: "hold",
      specification: "0xD8696bBD8ce60804F0fC9FdbB73B517E72855F2c",
    },
    links: [],
  },
  {
    internalCollectionId: 2511439,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "My Lens Followers",
    description: "To present my sincerely thankfulness to my early lens followers",
    image: "my-lens-followers.svg",
    groupGeneratorName: "my-lens-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Enxin78938375"
      }
    ],
    eligibility: {
      shortDescription: "To the Long Live Friendship",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2512871,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Bodhi",
    description:
      "ZK badge owned by Sismo contributors.  This badge is used in Sismo Governance for contributors to voice their opinions and become owners of the project.",
    image: "bodhi.svg",
    groupGeneratorName: "bodhi",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Bodhi_Vman",
      },
    ],
    eligibility: {
      shortDescription: "Must follow me on Twitter.",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2513097,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis,
      Network.Polygon
    ],
    name: "Happy new year 2023",
    description: "happy new year 2023",
    image: "happy-new-year-2023.svg",
    groupGeneratorName: "happy-new-year-2023",
    publicContacts: [
      {
        type: "twitter",
        contact: "@CryptoJoio"
      },
      {
        type: "github",
        contact: "XieLeiaaa"
      }
    ],
    eligibility: {
      shortDescription: "followers of cryptojoio.lens",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2513336,
    networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "Tally Ho Github stargazers ZK Badge",
    description: "ZK Badge owned by Tally Ho Wallet Github stargazers",
    image: "tally-ho-github-stargazers.svg",
    groupGeneratorName: "tally-ho-github-stargazers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ihrbrl",
      },
      {
        type: "github",
        contact: "ihrbrl",
      },
    ],
    eligibility: {
      shortDescription: 'Star "https://github.com/tallyhowallet/extension" Github repo',
      specification: "",
    },
    links: [
      {
        label: "Tally Ho Github",
        url: "https://github.com/tallyhowallet/extension",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2518504,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Friends",
    description: "For follwers of 0xkevin.lens",
    image: "friends.svg",
    groupGeneratorName: "friends",
    publicContacts: [
      {
        type: "twitter",
        contact: "@KevinExpress"
      }
    ],
    eligibility: {
      shortDescription: "Followers of 0xkevin.lens",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2521946,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "NingNingFams",
    description: "the followers of NingNing.lens",
    image: "ningningfams.svg",
    groupGeneratorName: "ningningfams",
    publicContacts: [
      {
        type: "twitter",
        contact: "@0xNing0x"
      },
      {
        type: "github",
        contact: "sinxyz886"
      }
    ],
    eligibility: {
      shortDescription: "be part of ningning frens community member",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2529316,
    networks: [Network.Goerli, Network.Mumbai],
    name: "etherium👍eth.bit#5890",
    description: "Next sismo badge",
    image: "etherium-eth-bit-5890.svg",
    groupGeneratorName: "etherium-eth-bit-5890",
    publicContacts: [
      {
        type: "twitter",
        contact: "@CheburekinPetya",
      },
    ],
    eligibility: {
      shortDescription: "Ethereum Power User ZK Badge",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2532780,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "jaky",
    description: "loveyu",
    image: "jaky.svg",
    groupGeneratorName: "jaky",
    publicContacts: [
      {
        type: "twitter",
        contact: "@sybx11"
      },
      {
        type: "github",
        contact: "sybx11"
      }
    ],
    eligibility: {
      shortDescription: "ens",
      specification: "jouy"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "http://jot.com"
      }
    ]
  },
  {
    internalCollectionId: 2535427,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "kripter",
    description: "super nft",
    image: "kripter.svg",
    groupGeneratorName: "kripter",
    publicContacts: [
      {
        type: "twitter",
        contact: "@kripter88"
      },
      {
        type: "github",
        contact: "kripter-88"
      }
    ],
    eligibility: {
      shortDescription: "my first nfr sismo",
      specification: "olololol"
    },
    links: []
  },
  {
    internalCollectionId: 2536138,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Lenster supporter",
    description: "ZK Badge owned by the collectors of lens posts from yoginth.lens on lens",
    image: "lenster-supporter.svg",
    groupGeneratorName: "lenster-supporter",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rkumar021219",
      },
    ],
    eligibility: {
      shortDescription: "collectors of the lens post 0x0d-0x02b6 or 0x0d-0x0252 ",
      specification:
        "collectors of the lens post 0x0d-0x02b6 or 0x0d-0x0252 on lens\n1st post  -  https://lenster.xyz/posts/0x0d-0x02b6\n2nd post - https://lenster.xyz/posts/0x0d-0x0252",
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://lenster.xyz/u/rahulkr",
      },
    ],
  },
  {
    internalCollectionId: 2537705,
    networks: [Network.Goerli, Network.Mumbai],
    name: "rocketlab ZK Badge",
    description: "rocketlab rocketpool group",
    image: "rocketlab.svg",
    groupGeneratorName: "rocketlab",
    publicContacts: [
      {
        type: "twitter",
        contact: "",
      },
      {
        type: "github",
        contact: "maxartz15",
      },
    ],
    eligibility: {
      shortDescription: "part of 🚀rocketlab.eth",
      specification: "contributor to 🚀rocketlab.eth minipools",
    },
    links: [],
  },
  {
    internalCollectionId: 2545069,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "tarozzy",
    description: "ZK  Badge owned by true friends of the tarozzy.",
    image: "tarozzy.svg",
    groupGeneratorName: "tarozzy",
    publicContacts: [
      {
        type: "twitter",
        contact: "@barbon0no"
      }
    ],
    eligibility: {
      shortDescription: "follow 22344 on lens.",
      specification: "follow @22344.lens on lens protocol."
    },
    links: []
  },
  {
    internalCollectionId: 2545308,
    networks: [Network.Goerli, Network.Mumbai],
    name: "fiona ZK Badge",
    description: "Badge proves true love",
    image: "fiona.svg",
    groupGeneratorName: "fiona",
    publicContacts: [
      {
        type: "twitter",
        contact: "@zadorady",
      },
      {
        type: "github",
        contact: "fedo111",
      },
    ],
    eligibility: {
      shortDescription: "true love",
      specification: "",
    },
    links: [
      {
        label: "Sismo",
        url: "http://sismo.io",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2548940,
    networks: [Network.Goerli, Network.Mumbai],
    name: "mmmemelord",
    description: "ZK Badge owned by mmmemelord",
    image: "mmmemelord.svg",
    groupGeneratorName: "mmmemelord",
    publicContacts: [
      {
        type: "twitter",
        contact: "@I3anker",
      },
      {
        type: "github",
        contact: "Salikhov87",
      },
    ],
    eligibility: {
      shortDescription: "Sismo Contributor ZK Badge holder",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2558435,
    networks: [Network.Goerli, Network.Mumbai],
    name: "money dog🐶(OG) ZK Badge",
    description: "the money dog og badge",
    image: "wallet-group.svg",
    groupGeneratorName: "wallet-group",
    publicContacts: [
      {
        type: "twitter",
        contact: "@xiabing88",
      },
    ],
    eligibility: {
      shortDescription: "everyone in wechat group can get this badge",
      specification: "everyone in wechat and submit address can get this",
    },
    links: [],
  },
  {
    internalCollectionId: 2560345,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "gutr0",
    description: "this badge belongs to user gutr0, and will be used for donation purposes on gitcoin",
    image: "gutr0.svg",
    groupGeneratorName: "gutr0",
    publicContacts: [
      {
        type: "twitter",
        contact: "@g_gutr0"
      }
    ],
    eligibility: {
      shortDescription: "for donations to various sites, gitcoin and dex",
      specification: "use for large transfers, large exactly for funds that I would like to hide, so that they were not available to the public , also, for snapshot voting"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://github.com/gutrrr0"
      }
    ]
  },
  {
    internalCollectionId: 2561850,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "kongming",
    description: "sismo my first ",
    image: "kongming.svg",
    groupGeneratorName: "kongming",
    publicContacts: [
      {
        type: "twitter",
        contact: "@kongming1234"
      },
      {
        type: "github",
        contact: "Laolong1994"
      }
    ],
    eligibility: {
      shortDescription: "222",
      specification: "2222"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://twitter.com/kongming1234"
      }
    ]
  },
  {
    internalCollectionId: 2569336,
    networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "Sk ZK Badge",
    description: "ZK Badge owned by @qismat.lens Followers",
    image: "sk.svg",
    groupGeneratorName: "sk",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Shoebkhask375",
      },
    ],
    eligibility: {
      shortDescription: "@qismat.lens Lens followers",
      specification:
        "Follow @qismat.lens before Jan 9 2023 on apps powered by Lens Protocol (Lenster, Orb, ..).",
    },
    links: [],
  },
  {
    internalCollectionId: 2569398,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Lenster Early Bloomer",
    description: "ZK Badge for Lenster Early Bloomer POAP Collectors",
    image: "lenster-early-bloomer.svg",
    groupGeneratorName: "lenster-early-bloomer",
    publicContacts: [
      {
        type: "twitter",
        contact: "@kisbackpro"
      }
    ],
    eligibility: {
      shortDescription: "Hold at least one Lenster.xyz Early Bloomer POAP as Proof of early users of Lenser.xyz",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://lenster.xyz"
      }
    ]
  },
  {
    internalCollectionId: 2569984,
    networks: [Network.Goerli, Network.Mumbai],
    name: "BlockImperiumGames ZK Badge",
    description:
      "ZK Badge owned by BlockImperiumGames. This Badge is used in the BIG toolchain to prove that the holder of the badge should have some administrative rights within the BIG game ecosystem",
    image: "blockimperiumgames.svg",
    groupGeneratorName: "blockimperiumgames",
    publicContacts: [
      {
        type: "twitter",
        contact: "@blockimperium",
      },
    ],
    eligibility: {
      shortDescription: "Be an administrative user of the BlockImperiumGames administrative group",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2571351,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "MARIANMARIUS",
    description: "0xb79252042F6639D02025Ec881D52434cbe8cFb70",
    image: "marianmarius.svg",
    groupGeneratorName: "marianmarius",
    publicContacts: [
      {
        type: "twitter",
        contact: "@spitamarius"
      },
      {
        type: "github",
        contact: "mariusgl1"
      }
    ],
    eligibility: {
      shortDescription: "marianmarius zk badge",
      specification: "MARIANMARIUS ZK Badge"
    },
    links: []
  },
  {
    internalCollectionId: 2573021,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Tokenomics DAO Contributor ZK Badge",
    description:
      "ZK Badge owned by Tokenomics DAO contributors. This Badge is used as a show of knowledge, of which a minimum is required by the DAO, and proof of work for contributions made to the DAO. Contributors have governance rights where they can voice their opinions.",
    image: "tokenomics-dao-contributor.svg",
    groupGeneratorName: "tokenomics-dao-contributor",
    publicContacts: [
      {
        type: "twitter",
        contact: "@tokenomicsdao",
      },
    ],
    eligibility: {
      shortDescription: "Passed TokenomicsDAO PoW process",
      specification: "Users who have passed the Tokenomics DAO proof of work (PoW) process \n",
    },
    links: [
      {
        label: "Tokenomics DAO",
        url: "https://tokenomicsdao.xyz/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2575364,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Fortune badge",
    description: "Community Money badge",
    image: "fortune-badge.svg",
    groupGeneratorName: "fortune-badge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@sam01208310"
      }
    ],
    eligibility: {
      shortDescription: "Community Money badge",
      specification: "Community Money badge"
    },
    links: []
  },
  {
    internalCollectionId: 2575988,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis,
      Network.Polygon
    ],
    name: "Zero Knowledge Veteran",
    description: "This zkBadge proves that you have completed Cyber Porter's Zero Knowledge Youtube Course, and you are now a ZKP Veteran!",
    image: "zero-knowledge-veteran.svg",
    groupGeneratorName: "zero-knowledge-veteran",
    publicContacts: [
      {
        type: "twitter",
        contact: "@geniusyinka"
      },
      {
        type: "github",
        contact: "geniusyinka"
      }
    ],
    eligibility: {
      shortDescription: "Hold Zero Knowledge Proofs: Class Graduation Certificate NFT",
      specification: "You need to be a holder of the \"Zero Knowledge Proofs: Class Graduation Certificate\" POAP by Cyber Porter from Zora as proof of completing his 7-Part YouTube Course on Zero Knowledge Proofs. \n"
    },
    links: []
  },
  {
    internalCollectionId: 2577616,
    networks: [Network.Goerli, Network.Mumbai],
    name: "akamo ZK Badge",
    description: "You love sushi",
    image: "akamo.svg",
    groupGeneratorName: "akamo",
    publicContacts: [
      {
        type: "twitter",
        contact: "@akamo778",
      },
      {
        type: "github",
        contact: "akamo778",
      },
    ],
    eligibility: {
      shortDescription: "Hold akamo",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2579312,
    networks: [Network.Goerli, Network.Mumbai],
    name: "IgorsGemsDao ZK Badge",
    description:
      "The community of crypto-enthusiasts and rekt's lovers. Private telegram chat, but open twitter.",
    image: "igorsgemsdao.svg",
    groupGeneratorName: "igorsgemsdao",
    publicContacts: [
      {
        type: "twitter",
        contact: "@IgorsGemsDao",
      },
    ],
    eligibility: {
      shortDescription: "Members of a closed telegram group.",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2585029,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "mikedoge ",
    description: "ZK Badge owned by mike ",
    image: "mikedoge.svg",
    groupGeneratorName: "mikedoge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@1323712482cjj"
      }
    ],
    eligibility: {
      shortDescription: "follow mask ",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2586837,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Proof of Airdrop",
    description: "Airdrop proof of participation, not an official release, everyone should have it.",
    image: "proof-of-airdrop.svg",
    groupGeneratorName: "proof-of-airdrop",
    publicContacts: [
      {
        type: "twitter",
        contact: "@BlockWu16888"
      }
    ],
    eligibility: {
      shortDescription: "Possess an ENS or early ZK badge",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2586977,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Univ3rs",
    description: "ZK Badge owned by Univ3rs contribuitors. This Badge is used in Univ3rs Governance for contribuitors to voice their opinion and become owners of the project",
    image: "univ3rs.svg",
    groupGeneratorName: "univ3rs",
    publicContacts: [
      {
        type: "twitter",
        contact: "@MironAdrian4"
      }
    ],
    eligibility: {
      shortDescription: "Hold a Univ3rs Badge to be part of the project",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2590016,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "suke",
    description: "A ZK Badge owned by friends of the suke. ",
    image: "suke.svg",
    groupGeneratorName: "suke",
    publicContacts: [
      {
        type: "twitter",
        contact: "@sukeblog314"
      }
    ],
    eligibility: {
      shortDescription: "follow @semantic on Lens protocol.",
      specification: "follow @semantic on Lens protocol."
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://link3.to/sukeniki"
      }
    ]
  },
  {
    internalCollectionId: 2592539,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Petrolistul",
    description: "Friends of Petrolistul",
    image: "petrolistul.svg",
    groupGeneratorName: "petrolistul",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Tibs52742210",
      },
    ],
    eligibility: {
      shortDescription: "Friend of Petrolistul",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2593216,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis,
      Network.Polygon
    ],
    name: "garagepunk",
    description: "My first A ZK badge, owned by a friend of Garagepunk on Lens.",
    image: "garagepunk.svg",
    groupGeneratorName: "garagepunk",
    publicContacts: [
      {
        type: "twitter",
        contact: "@like_a_bitcoin"
      }
    ],
    eligibility: {
      shortDescription: "follow garagepunk on Lens.",
      specification: "follow @garagepunk.len on Len protocol."
    },
    links: []
  },
  {
    internalCollectionId: 2594809,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Tima ZK Badge",
    description: "ZK Badge owned by Timofey trades and stakers",
    image: "tima.svg",
    groupGeneratorName: "tima",
    publicContacts: [
      {
        type: "twitter",
        contact: "@VidovArtem",
      },
    ],
    eligibility: {
      shortDescription: "Timofey users",
      specification: "Timofey top accounts traders",
    },
    links: [],
  },
  {
    internalCollectionId: 2595859,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Gotchi French Army x Sismo live ZK Badge",
    description:
      "ZK Badge owned by the collectors of TheGotchiFArmy's Lens post about the Twitch live with Sismo",
    image: "gotchi-french-army-x-sismo-live.svg",
    groupGeneratorName: "gotchi-french-army-x-sismo-live",
    publicContacts: [
      {
        type: "twitter",
        contact: "@0xMartinGbz",
      },
      {
        type: "github",
        contact: "MartinGbz",
      },
    ],
    eligibility: {
      shortDescription: "Collect the TheGotchiFArmy's Lens post about the Twitch live with Sismo",
      specification:
        "Collect the following lens post from thegotchifarmy.lens https://lenster.xyz/posts/0x5d7a-0x1d (limited to 50)",
    },
    links: [],
  },
  {
    internalCollectionId: 2597607,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Wagame Lens fam ZK Badge",
    description: "ZK Badge commemorating alpha followers of Wagame.lens",
    image: "wagame-lens-post-interaction.svg",
    groupGeneratorName: "wagame-lens-post-interaction",
    publicContacts: [
      {
        type: "twitter",
        contact: "@WagameEth",
      },
      {
        type: "github",
        contact: "WagameDAO",
      },
    ],
    eligibility: {
      shortDescription: "Wagame Lens follower collecting Lens post NFT waga-Cl-70",
      specification:
        "Collected the Lens post NFT waga-Cl-70 (0x849dF41fF6116E8bDeAD168035a3ee646D0aC4D3) before block 34129746 on Polygon POS",
    },
    links: [
      {
        label: "Wagame",
        logoUrl: "https://pbs.twimg.com/profile_images/1578308250591805440/DlyyiViF_400x400.jpg",
        url: "https://guild.xyz/wagameeth",
      },
    ],
  },
  {
    internalCollectionId: 2607278,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "CryptoTelugu Lens ZK Badge",
    description:
      "CryptoTelugu ZK Badge owned by @holdbtc.lens Lens followers.\n\nFollow here - https://lenster.xyz/u/holdbtc",
    image: "cryptotelugu-lens.svg",
    groupGeneratorName: "cryptotelugu-lens",
    publicContacts: [
      {
        type: "twitter",
        contact: "@CryptoTeluguO",
      },
    ],
    eligibility: {
      shortDescription: "Follow CryptoTelugu Lens Profile @holdbtc.lens ",
      specification:
        "Follow @holdbtc.lens on apps powered by Lens Protocol (Lenster, Phaver, Orb, ..).",
    },
    links: [],
  },
  {
    internalCollectionId: 2611247,
    networks: [Network.Goerli, Network.Mumbai],
    name: "NOXU",
    description: "My first Sismo badge",
    image: "noxu.svg",
    groupGeneratorName: "noxu",
    publicContacts: [
      {
        type: "twitter",
        contact: "@noxuspace",
      },
      {
        type: "github",
        contact: "noxuspace",
      },
    ],
    eligibility: {
      shortDescription: "NOXU HODL",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2623862,
    networks: [Network.Goerli, Network.Mumbai],
    name: "ionutcnmv",
    description: "this badge proves that you are a worthy follower",
    image: "ionutcnmv.svg",
    groupGeneratorName: "ionutcnmv",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ionutpo43025564",
      },
    ],
    eligibility: {
      shortDescription: "donate to charity",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2628526,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Bullers",
    description: "This Badge is gifted to Helpers that helped someone in need at Web3.\nBulls coming!",
    image: "bullers.svg",
    groupGeneratorName: "bullers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@deerloo1"
      },
      {
        type: "github",
        contact: "pushmover"
      }
    ],
    eligibility: {
      shortDescription: "Hold it",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://link3.to/hollyshit"
      }
    ]
  },
  {
    internalCollectionId: 2629178,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "siope",
    description: "All you need is ens, and everyone can have it",
    image: "siope.svg",
    groupGeneratorName: "siope",
    publicContacts: [
      {
        type: "twitter",
        contact: "@sybx12"
      },
      {
        type: "github",
        contact: "sybx12"
      }
    ],
    eligibility: {
      shortDescription: "ENS",
      specification: "All you need is ens"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "http://jopr.com"
      }
    ]
  },
  {
    internalCollectionId: 2637617,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "ALL For Web3",
    description: "ZK Badge is owned by Allforweb3 aka. “外部山”. This is used in membership verification.",
    image: "all-for-web3.svg",
    groupGeneratorName: "all-for-web3",
    publicContacts: [
      {
        type: "twitter",
        contact: "@anymose96"
      }
    ],
    eligibility: {
      shortDescription: "you need hold lens handle AND follow hearts.lens to be eligible.",
      specification: "you can claim OR buy lens hanle then follow hearts.lens on https://lenster.xyz.\n\nsimple huh?"
    },
    links: []
  },
  {
    internalCollectionId: 2642072,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Mintank ZK Badge",
    description: "ZK Badge owned by Mintank.This Badge is used in Mintank.",
    image: "mintanklee.svg",
    groupGeneratorName: "mintanklee",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Mintank_Lee",
      },
      {
        type: "github",
        contact: "Mintank",
      },
    ],
    eligibility: {
      shortDescription: "be part of mintank",
      specification: "Contributor",
    },
    links: [
      {
        label: "https://twitter.com/Mintank_Lee",
        url: "https://twitter.com/Mintank_Lee",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2644694,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Moon Dao ZK Badge",
    description: "ZK Badge owned by Dao",
    image: "moon-dao.svg",
    groupGeneratorName: "moon-dao",
    publicContacts: [
      {
        type: "twitter",
        contact: "@xiabing88",
      },
    ],
    eligibility: {
      shortDescription: "be part of moon dao owner or mermber",
      specification: "be part of moon dao owner or mermber",
    },
    links: [],
  },
  {
    internalCollectionId: 2648563,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: " 0xlegion.lens follower",
    description: "Follow 0xlegion.lens",
    image: "0xlegion-lens-follower.svg",
    groupGeneratorName: "0xlegion-lens-follower",
    publicContacts: [
      {
        type: "twitter",
        contact: "@amp_skull"
      }
    ],
    eligibility: {
      shortDescription: "Snapshot everyday. if you've just followed 0xlegion.lens, please wait 48 hours.",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2658573,
    networks: [Network.Polygon, Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "DegenScore Beacon ZK Badge",
    description:
      "ZK Badge owned by DegenScore Beacon holders. This Badge proves that the holders are members of the Beacon Community and have a highlight on-chain reputation.",
    image: "degenscore-beacon.svg",
    groupGeneratorName: "degenscore-beacon",
    publicContacts: [
      {
        type: "twitter",
        contact: "@kanareika355",
      },
    ],
    eligibility: {
      shortDescription: "Hold a DegenScore Beacon",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2659684,
    networks: [Network.Goerli, Network.Mumbai],
    name: "steven",
    description: "2023 new year",
    image: "steven.svg",
    groupGeneratorName: "steven",
    publicContacts: [
      {
        type: "twitter",
        contact: "@LeahGar90137718",
      },
    ],
    eligibility: {
      shortDescription: "steven ZK Badge",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2663668,
    networks: [Network.Goerli, Network.Mumbai],
    name: "xioshdezz",
    description:
      "Zk Badge owned by xioshdexx.This Badge is used in Sismo Governance for contributors to voice their opinions and become owners of the project",
    image: "xioshdezz.svg",
    groupGeneratorName: "xioshdezz",
    publicContacts: [
      {
        type: "twitter",
        contact: "@xioshdezz",
      },
      {
        type: "github",
        contact: "zengwei497",
      },
    ],
    eligibility: {
      shortDescription: "Hold a ZK Badge",
      specification: "",
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "http://sismo.io/",
      },
    ],
  },
  {
    internalCollectionId: 2665855,
    networks: [Network.Goerli, Network.Mumbai],
    name: "ETHBrno Sismo Workshop ZK Badge",
    description: "Zk badge owned by attendees of Sismo Workshop @ ETHBrno ",
    image: "sismo-workshop-ethbrno.svg",
    groupGeneratorName: "sismo-workshop-ethbrno",
    publicContacts: [
      {
        type: "twitter",
        contact: "@big_q__",
      },
    ],
    eligibility: {
      shortDescription: "Attend Sismo Workshop @ ETHBrno",
      specification: "",
    },
    links: [
      {
        label: "ETHBrno",
        url: "https://ethbrno.cz/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2673220,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Early WOJAK",
    description: "Every Sismo Contributor ZK Badge owners are eligible for this zk badge.\n",
    image: "early-wojak.svg",
    groupGeneratorName: "early-wojak",
    publicContacts: [
      {
        type: "twitter",
        contact: "@PoorWojak"
      }
    ],
    eligibility: {
      shortDescription: "HOLD SISMO COUNTRIBUTOR ZK BADGE",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://lenster.xyz/u/poorwojak"
      }
    ]
  },
  {
    internalCollectionId: 2675416,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Oxman ZK Badge",
    description: "ZK Badge owned by Oxman Nick",
    image: "oxbage.svg",
    groupGeneratorName: "oxbage",
    publicContacts: [
      {
        type: "twitter",
        contact: "@oxmannnn",
      },
      {
        type: "github",
        contact: "oxmannick",
      },
    ],
    eligibility: {
      shortDescription: "oxmannick.eth",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2676733,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Top $OP Airdrop recipient (eligible for 5+ multipliers) ZK Badge",
    description:
      "ZK Badge owned by top Optimism $OP Airdrop Recipients  (eligible for 5+ multipliers) - total eligible addresses 672, min $OP airdrop amount > 15k -  data retrieved from Dune Analytics: https://dune.com/wagame/opairdrop ",
    image: "op-airdrop.svg",
    groupGeneratorName: "op-airdrop",
    publicContacts: [
      {
        type: "twitter",
        contact: "@WagameEth",
      },
      {
        type: "github",
        contact: "WagameDAO",
      },
    ],
    eligibility: {
      shortDescription:
        "Top Optimism $OP Airdrop Addresses (eligible for 5+ criteria) - total eligible addresses 672",
      specification:
        "Top Optimism $OP Airdrop Addresses (eligible for 5+ criteria) - total eligible addresses 672, min $OP airdrop amount > 16k -  data retrieved from Dune Analytics: https://dune.com/wagame/opairdrop - query is a modified fork from this query: https://dune.com/queries/861782 (credit to https://dune.com/gm365 & https://dune.com/cryptodude1010101)",
    },
    links: [],
  },
  {
    internalCollectionId: 2691833,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Bonie Heads Yacht Club",
    description: "The first limited edition NFT collection with the best utility for the coming years with a massive vision!",
    image: "bonie-heads-yacht-club.svg",
    groupGeneratorName: "bonie-heads-yacht-club",
    publicContacts: [
      {
        type: "twitter",
        contact: "@BonieClub"
      }
    ],
    eligibility: {
      shortDescription: "Follow the lens handle",
      specification: "https://www.lensfrens.xyz/mm666.lens"
    },
    links: []
  },
  {
    internalCollectionId: 2701706,
    networks: [Network.Goerli, Network.Mumbai],
    name: "DMT ZK Badge",
    description: "ZK Badge owned by DMT",
    image: "dmt.svg",
    groupGeneratorName: "dmt",
    publicContacts: [
      {
        type: "github",
        contact: "Dimmmmmmm",
      },
    ],
    eligibility: {
      shortDescription: "be part of SISMO",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2704885,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Rotterdamn Lens follower",
    description: "ZK badge owned by Rotterdamn lens follower",
    image: "rotterdamn-lens-follower.svg",
    groupGeneratorName: "rotterdamn-lens-follower",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ricoe991"
      },
      {
        type: "github",
        contact: "Snowman5657"
      }
    ],
    eligibility: {
      shortDescription: "must be follow rotterdamn.lens",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2706327,
    networks: [Network.Goerli, Network.Mumbai],
    name: "XSanT ZK Badge",
    description:
      "ZK Badge owned by XSanT crypto friends community. This Badge proves that owner is part of XSanT crypto friends.",
    image: "xsant.svg",
    groupGeneratorName: "xsant",
    publicContacts: [
      {
        type: "twitter",
        contact: "@XSanT6",
      },
    ],
    eligibility: {
      shortDescription: "Be part of XSanT crypto friends",
      specification: "Be part of XSanT crypto friends",
    },
    links: [],
  },
  {
    internalCollectionId: 2707024,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "twitter",
    description: "Twitter community",
    image: "twitter.svg",
    groupGeneratorName: "twitter",
    publicContacts: [
      {
        type: "twitter",
        contact: "@BagmutYura"
      }
    ],
    eligibility: {
      shortDescription: "ens",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://app.sismo.io/"
      }
    ]
  },
  {
    internalCollectionId: 2715945,
    networks: [Network.Goerli, Network.Mumbai],
    name: "CodeDoge",
    description: "Zk Badge owned by CodeDoge.",
    image: "codedoge.svg",
    groupGeneratorName: "codedoge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@lukema95",
      },
    ],
    eligibility: {
      shortDescription: "Hold ENS",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2715978,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Anav's Demo ZK Badge",
    description:
      "  ZK Badge owned by people who attended Demos and gave their wallet addresses. This Badge proves their attention and attendance",
    image: "anav-s-demo.svg",
    groupGeneratorName: "anav-s-demo",
    publicContacts: [
      {
        type: "twitter",
        contact: "@AnavAgrawal",
      },
    ],
    eligibility: {
      shortDescription: "Should give their wallet addresses",
      specification: "For demo purposes only.",
    },
    links: [
      {
        label: "Polygon Member",
        url: "https://polygon.technology",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2725949,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Skynetwork",
    description: "Subscribers https://link3.to/skynetwork",
    image: "skynetwork.svg",
    groupGeneratorName: "skynetwork",
    publicContacts: [
      {
        type: "twitter",
        contact: "@SkyNetw21514358",
      },
    ],
    eligibility: {
      shortDescription: "Subscribers https://link3.to/skynetwork",
      specification: "Subscribers https://link3.to/skynetwork",
    },
    links: [],
  },
  {
    internalCollectionId: 2729126,
    networks: [Network.Goerli, Network.Mumbai],
    name: "etherium👍eth.bit ZK Badge",
    description: "My badg",
    image: "etherium-eth-bit.svg",
    groupGeneratorName: "etherium-eth-bit",
    publicContacts: [
      {
        type: "twitter",
        contact: "@CheburekinPetya",
      },
    ],
    eligibility: {
      shortDescription: "hold Ethereum Power User ZK Badge",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2734445,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "matsuta",
    description: "matsuta",
    image: "matsuta.svg",
    groupGeneratorName: "matsuta",
    publicContacts: [
      {
        type: "twitter",
        contact: "@m_matsumatsuta"
      },
      {
        type: "github",
        contact: "matsuta66"
      }
    ],
    eligibility: {
      shortDescription: "follow matsuta on Lens",
      specification: "follow @matsuta.lens on Lens protocol."
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://github.com/matsuta66"
      }
    ]
  },
  {
    internalCollectionId: 2737080,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Bgans",
    description: "ZK Badge owned by Bastard GAN Punk V2 holders.\n\nThis badge will hopefully allow Bgan holders to enjoy their benefits whilst maintaining their privacy and securing their previous Bgans.\n\nSnapshot updated weekly.",
    image: "bgans.svg",
    groupGeneratorName: "bgans",
    publicContacts: [
      {
        type: "twitter",
        contact: "@bganlawyer"
      }
    ],
    eligibility: {
      shortDescription: "Hold a Bastard GAN Punk V2 NFT",
      specification: "Hold a Bastard GAN Punk V2."
    },
    links: []
  },
  {
    internalCollectionId: 2741788,
    networks: [Network.Goerli, Network.Mumbai],
    name: "offroadman ZK Badge",
    description: "zk badge owned by ofm",
    image: "offroadmann.svg",
    groupGeneratorName: "offroadmann-group",
    publicContacts: [
      {
        type: "twitter",
        contact: "@offroadmann",
      },
      {
        type: "github",
        contact: "@offroadmann",
      },
    ],
    eligibility: {
      shortDescription: "offroadman.eth",
      specification: "sismo poap",
    },
    links: [],
  },
  {
    internalCollectionId: 2742382,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "Mach Frens",
    description: "A ZK Badge owned by true friends of the 0xMach. This Badge proves that you and me are best buddies!",
    image: "mach-frens.svg",
    groupGeneratorName: "mach-frens",
    publicContacts: [
      {
        type: "twitter",
        contact: "@0xMach"
      }
    ],
    eligibility: {
      shortDescription: "follow 0xMach on Lens. ",
      specification: "follow @0xmach.lens on Lens protocol."
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://0xmachblog.com/"
      }
    ]
  },
  {
    internalCollectionId: 2746764,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Optimism Governance Committee ZK Badge",
    description: "This badge represent season two committee member of Optimism Governance.",
    image: "optimism-governance-committee-member.svg",
    groupGeneratorName: "optimism-governance-committee-member",
    publicContacts: [
      {
        type: "twitter",
        contact: "@PraiseVitalik",
      },
    ],
    eligibility: {
      shortDescription: "Committee member completed KYC with Optimism Foundation",
      specification: "",
    },
    links: [
      {
        label: "Twitter",
        url: "https://twitter.com/PraiseVitalik",
        logoUrl: "",
      },
      {
        label: "Optimism Governance",
        url: "https://gov.optimism.io/u/OPUser/summary",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2747461,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "saveasART",
    description: "people who bought generated NFT from @saveasART",
    image: "saveasart.svg",
    groupGeneratorName: "saveasart",
    publicContacts: [
      {
        type: "twitter",
        contact: "@saveasART"
      }
    ],
    eligibility: {
      shortDescription: "people who love and bought generated NFT from @saveasART",
      specification: ""
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://cryptoart.download/"
      }
    ]
  },
  {
    internalCollectionId: 2750211,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "jiangxiansen",
    description: "zk badge owned by jiangxiansen",
    image: "jiangxiansen.svg",
    groupGeneratorName: "jiangxiansen",
    publicContacts: [
      {
        type: "twitter",
        contact: "@jiangxiansen11"
      },
      {
        type: "github",
        contact: "jt00001"
      }
    ],
    eligibility: {
      shortDescription: "early zk badge",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2751564,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Sismo chocolate",
    description: "This badge proves that you love chocolate",
    image: "sismo-chocolate.svg",
    groupGeneratorName: "sismo-chocolate",
    publicContacts: [
      {
        type: "twitter",
        contact: "@B0mb0nchik"
      }
    ],
    eligibility: {
      shortDescription: "Star \"https://github.com/Bombonchik/chocolate\" Github repo",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2766635,
    networks: [Network.Goerli, Network.Mumbai],
    name: "phantabear ZK Badge",
    description:
      "Phanta Bear is jointly launched by MandoPop King Jay Chou's Fashion Brand PHANTACi and EzekClub (https://ezek.io) Phanta Bear is a limited collection of 10,000 digital collectibles that live on the Ethereum blockchain. Each Phanta Bear is unique and randomly generated. By owning a Phanta Bear avatar, you are granted the access to an exclusive club where you could meet with celebrities, playing in metaverse, virtual concert and game... where the membership benefits increase over time. https://linktr.ee/EzekClub",
    image: "phantabear.svg",
    groupGeneratorName: "phantabear",
    publicContacts: [
      {
        type: "twitter",
        contact: "@EzekClub",
      },
    ],
    eligibility: {
      shortDescription: "Hold Phanta",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2773575,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Dhadrien github friends ZK Badge",
    description: "Badge of dhadrien friends",
    image: "dhadrien-friends.svg",
    groupGeneratorName: "dhadrien-friends",
    publicContacts: [
      {
        type: "github",
        contact: "dhadrien",
      },
    ],
    eligibility: {
      shortDescription: "my friends",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2774366,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Akuraposo ZK Badge",
    description: "ZK Badge owned by Akuraposo",
    image: "karepmulah.svg",
    groupGeneratorName: "karepmulah",
    publicContacts: [
      {
        type: "twitter",
        contact: "@balapanmlayu",
      },
      {
        type: "github",
        contact: "akuraposo",
      },
    ],
    eligibility: {
      shortDescription: "penting ora poso",
      specification: "yo ",
    },
    links: [],
  },
  {
    internalCollectionId: 2778255,
    networks: [
      Network.Goerli, Network.Mumbai
    ],
    name: "B1Y3 OG Voters ZK Badge",
    description: "Created to encourage early supporters of the community. OAT will allow you to take part in the management of the DAO on Snapshot, and will also open up access to all sorts of interesting things in the future!)",
    image: "b1y3-og-voters.svg",
    groupGeneratorName: "b1y3-og-voters",
    publicContacts: [
      {
        type: "twitter",
        contact: "@8bit0x01"
      },
      {
        type: "github",
        contact: "8bit0x01"
      }
    ],
    eligibility: {
      shortDescription: "Be part of early B1Y3 community ",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2782016,
    networks: [Network.Mumbai, Network.Goerli, Network.Gnosis],
    name: "Delovoy DAO Christmas ZK Badge",
    description: "Merry Christmas Delovoy DAO OG Members!",
    image: "delovoy-dao-christmas.svg",
    groupGeneratorName: "delovoy-dao-christmas",
    publicContacts: [
      {
        type: "twitter",
        contact: "@RoRuneChad",
      },
    ],
    eligibility: {
      shortDescription: "Be part of Delovoy DAO",
      specification: "",
    },
    links: [
      {
        label: "DelovoyDAO",
        url: "https://link3.to/delovoydao",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2782044,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Crypto Lemon",
    description: "Badge pentru membrii Crypto Lemon",
    image: "crypto-lemon.svg",
    groupGeneratorName: "crypto-lemon",
    publicContacts: [
      {
        type: "twitter",
        contact: "@CryptoRomania21",
      },
    ],
    eligibility: {
      shortDescription: "Membru Crypto Lemon",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2808245,
    networks: [Network.Polygon, Network.Gnosis, Network.Mumbai, Network.Goerli],
    name: "zkSync Github stargazers ZK Badge",
    description: "ZK Badge owned by zkSync's Github stargazers",
    image: "zksync-github-stargazers.svg",
    groupGeneratorName: "zksync-github-stargazers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@dmtrbrl",
      },
    ],
    eligibility: {
      shortDescription: 'Star "https://github.com/matter-labs/zksync" Github repo',
      specification: "",
    },
    links: [
      {
        label: "zkSync repo",
        url: "https://github.com/matter-labs/zksync",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2814454,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Skyweaver Conquest player Season 12 ZK Badge",
    description:
      "[unofficial] This badge can be claimed by skyweaver players of web3 games who participated in the Conquest mode between 2022/09/26 and 2022/10/25. Data refer to Horizon Dunes.",
    image: "skyweaver-conquest-player-season-12.svg",
    groupGeneratorName: "skyweaver-conquest-player-season-12",
    publicContacts: [
      {
        type: "twitter",
        contact: "cryptodmeme",
      },
      {
        type: "github",
        contact: "dsgrge544",
      },
    ],
    eligibility: {
      shortDescription: "Skyweaver Conquest player Season 12",
      specification:
        "[unofficial] This badge can be claimed by skyweaver players of web3 games who participated in the Conquest mode between 2022/09/26 and 2022/10/25. Data refer to Horizon Dunes.",
    },
    links: [
      {
        label: "dune",
        url: "https://dune.com/horizon_dune/skyweaver-conquest-leaderboard",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2823307,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "JiRaYa-OG ZK Badge",
    description:
      'Exclusive ZK badge awarded to the most active followers of the "JiRaYa-OG" Twitter account. This badge is a pass to enter a closed circle of VIP members. It will allow access to many benefits in the future. A private channel will soon be opened to allow holders of the "JiRaYa OG" badge to meet and benefit from the advantages of holding this ZK Badge (Gifts, Tokens, Whitelists, FREE NFT/collaborations, etc...',
    image: "jiraya-og-badge.svg",
    groupGeneratorName: "jiraya-og-badge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@JiRaYa_OG",
      },
    ],
    eligibility: {
      shortDescription:
        'Be part of the best contributors on the "JiRaYa-OG" Twitter account (Likes, Retweets, Comments, Giveaways participation, account promotion, etc...)',
      specification:
        'Follow "JiRaYa-OG" on Twitter Like, Retweet, comment on posts and threads, Recommend the "JiRaYa-OG" account on social networks, Participate in Giveaways, be one of the most active members of the community',
    },
    links: [],
  },
  {
    internalCollectionId: 2834144,
    networks: [Network.Goerli, Network.Mumbai],
    name: "BlockNodes",
    description:
      "ZK Badge owned by BlockNodesTeam. This Badge is the proves of the hardworks of the Alphas contributor to the ecosystem",
    image: "blocknodes.svg",
    groupGeneratorName: "blocknodes",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Lamkaways",
      },
      {
        type: "github",
        contact: "lamkasyah",
      },
    ],
    eligibility: {
      shortDescription: "Be part of https://t.me/blocknodeslabs",
      specification: "Be part of https://t.me/blocknodeslabs and show your contributions",
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://t.me/blocknodeslabs",
      },
    ],
  },
  {
    internalCollectionId: 2839426,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Qcrypto ZK Badge",
    description:
      "ZK Badge owned by Quang96-TpAir,  This Badge is used in community TpAir in the future ",
    image: "tpair.svg",
    groupGeneratorName: "tpair",
    publicContacts: [
      {
        type: "twitter",
        contact: "Trimai_CSGroup",
      },
    ],
    eligibility: {
      shortDescription: "be part of TpAir Community ",
      specification: "be a member of the core team TpAir ",
    },
    links: [],
  },
  {
    internalCollectionId: 2842907,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Anav's Trial ZK Badge",
    description: "ZK Badge owned by anyone who attended Anav's demo of Sismo.",
    image: "anav-s-trial.svg",
    groupGeneratorName: "anav-s-trial",
    publicContacts: [
      {
        type: "twitter",
        contact: "@AnavAgrawal",
      },
    ],
    eligibility: {
      shortDescription: "Attend Anav's demo",
      specification: "Just for demo purposes.",
    },
    links: [
      {
        label: "Polygon Members",
        url: "https://polygon.technology",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2853237,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Sismo OArctic",
    description: "ZK BAdge owned by friends. This icon is used in Sismo governance",
    image: "sismo-oarctic.svg",
    groupGeneratorName: "sismo-oarctic",
    publicContacts: [
      {
        type: "twitter",
        contact: "@avolniy1",
      },
      {
        type: "github",
        contact: "Arcti4eskiy",
      },
    ],
    eligibility: {
      shortDescription: "followers lens",
      specification: "NFT gets those who are follower lens",
    },
    links: [],
  },
  {
    internalCollectionId: 2849437,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Ratra",
    description: "ZK Badge owned by Ratra.",
    image: "ratra.svg",
    groupGeneratorName: "ratra",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Ratra1205",
      },
    ],
    eligibility: {
      shortDescription: "be part of ratra group.",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2855348,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Twitter follower",
    description: "Twitter follower @Dash_6789",
    image: "twitter-follower.svg",
    groupGeneratorName: "twitter-follower",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Dash_6789",
      },
    ],
    eligibility: {
      shortDescription: "Be a subscriber @Dash_6789",
      specification: "Be a subscriber @Dash_6789",
    },
    links: [],
  },
  {
    internalCollectionId: 2855723,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Grail Member ZK Badge",
    description: "Grail Member badge",
    image: "grail-member.svg",
    groupGeneratorName: "grail-member",
    publicContacts: [
      {
        type: "twitter",
        contact: "mtaram",
      },
      {
        type: "github",
        contact: "mtaram",
      },
    ],
    eligibility: {
      shortDescription: "Whitelist exported from Grail",
      specification: "Be a member on Grail",
    },
    links: [
      {
        label: "grail-member",
        url: "https://app.ongrail.xyz/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2869370,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Raul",
    description: "ZK Badge owned by Raul",
    image: "raul.svg",
    groupGeneratorName: "raul",
    publicContacts: [
      {
        type: "twitter",
        contact: "@startico2017",
      },
      {
        type: "github",
        contact: "Raul0287",
      },
    ],
    eligibility: {
      shortDescription: "be early ZK Badge holder",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2870395,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Bits5",
    description: "Bits5 ZK Badge owned by @bits5.lens Lens followers.\n\nFollow us on-  https://lenster.xyz/u/bits5",
    image: "bits5.svg",
    groupGeneratorName: "bits5",
    publicContacts: [
      {
        type: "twitter",
        contact: "@bits5_"
      }
    ],
    eligibility: {
      shortDescription: "Bits5.lens followers",
      specification: "Holders of Bits5 badge will be eligible for exclusive perks and futures premium events...."
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://bits5.com/"
      }
    ]
  },
  {
    internalCollectionId: 2871592,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Tundra Players Club ZK Badge",
    description: "This Badge used in Tundra Players Club",
    image: "tundra-players-club.svg",
    groupGeneratorName: "tundra-players-club",
    publicContacts: [
      {
        type: "twitter",
        contact: "@reewwrr",
      },
      {
        type: "github",
        contact: "reewwrr",
      },
    ],
    eligibility: {
      shortDescription: "Member of TPC",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2872818,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "birdmore3.lens follows",
    description: "Follow birdmore3.lens",
    image: "birdmore3-lens-follows.svg",
    groupGeneratorName: "birdmore3-lens-follows",
    publicContacts: [
      {
        type: "twitter",
        contact: "@1gxkyxz1kf8ra8z"
      }
    ],
    eligibility: {
      shortDescription: "Snapshot everyday. if you've just followed birdmore3.lens, please wait 48 hours.",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2874455,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "PolyX Exchange ZK Badge",
    description:
      "ZK Badge owned by PolyX Exchange contributors. This badge proves that the holder has contributed to building the protocol.",
    image: "polyx-exchange.svg",
    groupGeneratorName: "polyx-exchange",
    publicContacts: [
      {
        type: "twitter",
        contact: "@polyXexchange",
      },
      {
        type: "github",
        contact: "polyx-exchange",
      },
    ],
    eligibility: {
      shortDescription: "Be part of the PolyX Exchange core team.",
      specification: "Be a member of the PolyX Exchange core team.",
    },
    links: [
      {
        label: "PolyX Exchange",
        url: "polyx.exchange",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2882494,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Haz GitHub Followers ZK Badge",
    description: "ZK Badge owned by people who follow @hazae41 on GitHub",
    image: "hazae41-github-followers.svg",
    groupGeneratorName: "hazae41-github-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@hazae41",
      },
      {
        type: "github",
        contact: "@hazae41",
      },
    ],
    eligibility: {
      shortDescription: "Follow @hazae41 on GitHub",
      specification: "Follow @hazae41 on GitHub",
    },
    links: [],
  },
  {
    internalCollectionId: 2883815,
    networks: [Network.Goerli, Network.Mumbai],
    name: "anywhere golden customer ZK Badge",
    description: "You are the best customer!",
    image: "anywhere-golden-customer.svg",
    groupGeneratorName: "anywhere-golden-customer",
    publicContacts: [
      {
        type: "twitter",
        contact: "@anywhere",
      },
    ],
    eligibility: {
      shortDescription: "Be part of anywhere's golden customer",
      specification: "Access to anywhere's yearly party",
    },
    links: [],
  },
  {
    internalCollectionId: 2890195,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Mr Crypto",
    description: "ZK Badge owned by top 50 Mr Crypto holders",
    image: "mr-crypto.svg",
    groupGeneratorName: "mr-crypto",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Holapepe20"
      }
    ],
    eligibility: {
      shortDescription: "Be part of top 50 Mr Crypto holders",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2893168,
    networks: [Network.Goerli, Network.Mumbai],
    name: "David ZK Badge",
    description: "I do not know",
    image: "david-zk-badge.svg",
    groupGeneratorName: "david-zk-badge",
    publicContacts: [
      {
        type: "twitter",
        contact: "davidolaoluwaa3",
      },
    ],
    eligibility: {
      shortDescription: "HOLD A .SISMO.ETH ENS",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2893437,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Sawuk ZK Badge",
    description: "Sawuk",
    image: "sawuk.svg",
    groupGeneratorName: "sawuk",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Sashuk18",
      },
    ],
    eligibility: {
      shortDescription: "followed ТWIТER @Sashuk18",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2900453,
    networks: [Network.Goerli, Network.Mumbai],
    name: "EmpireDAO 2023 5 Day Desk Pass ZK Badge",
    description:
      "5 Day Desk Pass 2023 Individual Member As an “individual member”, you’ll get access to a single desk for co-working alongside other web3 builders, developers, and creators, on a members-only floor of EmpireDAO.",
    image: "empiredao-2023-5-day-desk-pass.svg",
    groupGeneratorName: "empiredao-2023-5-day-desk-pass",
    publicContacts: [
      {
        type: "twitter",
        contact: "@empiredao",
      },
    ],
    eligibility: {
      shortDescription: "Purchase a 2023 individual 5 day desk pass for EmpireDAO",
      specification: "Purchase a 2023 individual 5 day desk pass for EmpireDAO for 0.2 ETH",
    },
    links: [
      {
        label: "Empire DAO",
        url: "https://empiredao.xyz",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2909098,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Trainspotting ZK Badge",
    description: "Trainspotting NFTs Badge",
    image: "eren-s-badge.svg",
    groupGeneratorName: "eren-s-badge",
    publicContacts: [
      {
        type: "twitter",
        contact: "@sosyallmakarnaa",
      },
      {
        type: "github",
        contact: "sosyalmakarna",
      },
    ],
    eligibility: {
      shortDescription: "For Akin",
      specification: "Try more try ",
    },
    links: [],
  },
  {
    internalCollectionId: 2909110,
    networks: [Network.Goerli, Network.Mumbai],
    name: "The Doge Pound Collector ZK Badge",
    description:
      "ZK Badge owned by The Doge Pound holders. This badge proves that they own at least one dog from The Doge Pound collection.",
    image: "the-doge-pound-owners.svg",
    groupGeneratorName: "the-doge-pound-owners",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ludorlr",
      },
    ],
    eligibility: {
      shortDescription: "Own at least one dog from The Doge Pound collection",
      specification: "",
    },
    links: [
      {
        label: "The Doge Pound",
        url: "https://thedogepoundnft.com",
        logoUrl: "https://thedogepoundnft.com/favicon.png",
      },
      {
        label: "OpenSea",
        url: "https://opensea.io",
        logoUrl: "https://opensea.io/favicon.ico",
      },
    ],
  },
  {
    internalCollectionId: 2922851,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "albist lens follower",
    description: "ZK Badge owned by @0xalbist.lens Lens followers. This badge proves that you follow albist on Lens.",
    image: "albist-lens-follower.svg",
    groupGeneratorName: "albist-lens-follower",
    publicContacts: [
      {
        type: "twitter",
        contact: "@albist_"
      }
    ],
    eligibility: {
      shortDescription: "Follow @0xalbist on Lens.",
      specification: "Must be a follower before 15/01/2023."
    },
    links: []
  },
  {
    internalCollectionId: 2926703,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "my zk sismo",
    description: "qwerty",
    image: "my-zk-sismo.svg",
    groupGeneratorName: "my-zk-sismo",
    publicContacts: [
      {
        type: "twitter",
        contact: "@AnTonikks"
      }
    ],
    eligibility: {
      shortDescription: "hold ens",
      specification: "no"
    },
    links: []
  },
  {
    internalCollectionId: 2927627,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Friend of 0xbA3...299d ZK Badge",
    description: "ZK badge owned by 0xbA3...299d friends on and Sismo Contributor ZK Badge owners.",
    image: "friend-of-0xba3-299d.svg",
    groupGeneratorName: "friend-of-0xba3-299d",
    publicContacts: [
      {
        type: "twitter",
        contact: "@prigscock",
      },
    ],
    eligibility: {
      shortDescription: "Following 0xbA3...299d DeBank.",
      specification: "Follow 0xbA3bD68Ce6B33bB2E097aCE5e82E63C53021299d on Debank.",
    },
    links: [],
  },
  {
    internalCollectionId: 2927890,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "coinking contributor ZK Badge",
    description: "ZK Badge owned by early Coinking Followers on lens",
    image: "coinking-contributor.svg",
    groupGeneratorName: "coinking-contributor",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ishowcrypto",
      },
    ],
    eligibility: {
      shortDescription: "early coinking.lens followers",
      specification: "You must have followed Coinking on lens prior to snapshot.",
    },
    links: [
      {
        label: "coinking.lens",
        url: "https://lenster.xyz/u/coinking.lens",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2930059,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "McGregor",
    description: "For fans of Sismo and McGregor",
    image: "mcgregor.svg",
    groupGeneratorName: "mcgregor",
    publicContacts: [
      {
        type: "github",
        contact: "IVaIVaIV"
      }
    ],
    eligibility: {
      shortDescription: "Top $OP",
      specification: "Top $OP Airdrop"
    },
    links: []
  },
  {
    internalCollectionId: 2931545,
    networks: [Network.Goerli, Network.Mumbai],
    name: "UnumDAO ZK Badge",
    description:
      "ZK Badge owned by ConstitutionDAO 2 contributors who have opted to continue the mission of ConstitutionDAO 2 via UnumDAO. This badge is used in the UnumDAO Governance for contributors to voice their opinions and become owners in the governance of the project.",
    image: "unumdao.svg",
    groupGeneratorName: "unumdao",
    publicContacts: [
      {
        type: "twitter",
        contact: "@wagbtc",
      },
    ],
    eligibility: {
      shortDescription: "Contributed at least 0.1 ETH privately to the ConstitutionDAO 2 campaign",
      specification:
        "Contributed at least 0.1 ETH privately using Nucleo to the ConstitutionDAO 2 campaign and opted for continuing on the UnumDAO mission of using democratizing Web3 technologies to govern and manage historically significant civic artifacts tracking the progress of democracy.",
    },
    links: [
      {
        label: "UnumDAO",
        url: "https://unumdao.org/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2945455,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "megumi",
    description: "megumi",
    image: "megumi.svg",
    groupGeneratorName: "megumi",
    publicContacts: [
      {
        type: "twitter",
        contact: "@P3HqDkrtvTk14Yz"
      }
    ],
    eligibility: {
      shortDescription: "follow @P3HqDkrtvTk14Yz",
      specification: "follow @P3HqDkrtvTk14Yz"
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://twitter.com/P3HqDkrtvTk14Yz"
      }
    ]
  },
  {
    internalCollectionId: 2954371,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Gnosis
    ],
    name: "Ethereum Adopter",
    description: "Ethereum Adopter ZK Badge holders is the main users of Ethereum, and there will be a list of DEFI protocol adoption in the future.",
    image: "ethereum-adopter.svg",
    groupGeneratorName: "ethereum-adopter",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ethereum"
      }
    ],
    eligibility: {
      shortDescription: "ETH power users",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2957812,
    networks: [
      Network.Goerli,
      Network.Mumbai,
      Network.Polygon
    ],
    name: "Y林s' frens",
    description: "frens who follow yourairdrop.lens",
    image: "y-s--frens.svg",
    groupGeneratorName: "y-s--frens",
    publicContacts: [
      {
        type: "twitter",
        contact: "@yourairdropeth"
      }
    ],
    eligibility: {
      shortDescription: "follow yourairdrop.lens",
      specification: "snapshot happens everyday. if you've just followed yourairdrop.lens, please wait for 24 hours."
    },
    links: []
  },
  {
    internalCollectionId: 2955432,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "all4you4",
    description: "ZK Badge owned by all4you4",
    image: "all4you4.svg",
    groupGeneratorName: "all4you4",
    publicContacts: [
      {
        type: "twitter",
        contact: "@all4you4"
      },
      {
        type: "github",
        contact: "all4you4"
      }
    ],
    eligibility: {
      shortDescription: "Early ZK Badges",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2960941,
    networks: [Network.Gnosis, Network.Goerli, Network.Mumbai],
    name: "CryptoMarketBlog ZK Badge",
    description:
      "CryptoMarketBlog ZK Badge owned by @spiritxp.lens followers and cryptomarket.blog users. follow here https://www.lensfrens.xyz/spiritxp.lens ",
    image: "cryptomarketblog.svg",
    groupGeneratorName: "cryptomarketblog",
    publicContacts: [
      {
        type: "twitter",
        contact: "@cryptoshar1",
      },
    ],
    eligibility: {
      shortDescription: "Follow CryptoMarket.blog lens profile @spiritxp.lens",
      specification: "Follow  @spiritxp.lens on apps powered by Lens Protocol ",
    },
    links: [
      {
        label: "CryptoMarket",
        url: "https://www.lensfrens.xyz/spiritxp.lens",
        logoUrl: "",
      },
      {
        label: "CM",
        url: "https://cryptomarket.blog/",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2967948,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Liver ZK Badge",
    description: "My first ZK BADGE",
    image: "liver.svg",
    groupGeneratorName: "liver",
    publicContacts: [
      {
        type: "twitter",
        contact: "@liver_bone",
      },
      {
        type: "github",
        contact: "@rayangoslya",
      },
    ],
    eligibility: {
      shortDescription: "HoldmyNFT",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2968736,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Ambire Early In ZK Badge",
    description: "This is for the OGs that have held an Ambire Wallet and $Wallet Token",
    image: "ambire-frens.svg",
    groupGeneratorName: "ambire-frens",
    publicContacts: [
      {
        type: "twitter",
        contact: "AmbireWallet",
      },
      {
        type: "github",
        contact: "AmbireTech",
      },
    ],
    eligibility: {
      shortDescription: "Hold an Ambire Wallet and $Wallet Token",
      specification: "",
    },
    links: [
      {
        label: "Website",
        url: "https://ambire.com",
        logoUrl: "",
      },
      {
        label: "Twitter",
        url: "https://twitter.com/AmbireWallet",
        logoUrl: "",
      },
      {
        label: "Lens",
        url: "https://www.lensfrens.xyz/ambirewallet.lens",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2969091,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis, Network.Polygon],
    name: "Gugulan",
    description: "ZK Badge owned by Gugulan",
    image: "gugulan.svg",
    groupGeneratorName: "gugulan",
    publicContacts: [
      {
        type: "twitter",
        contact: "@TodorescuE",
      },
    ],
    eligibility: {
      shortDescription: "Our ZK Badge community",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2976484,
    networks: [
      Network.Goerli,
      Network.Mumbai
    ],
    name: "Ray's",
    description: "taet",
    image: "ray-s.svg",
    groupGeneratorName: "ray-s",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rayjfab1"
      },
      {
        type: "github",
        contact: "rayjfab"
      }
    ],
    eligibility: {
      shortDescription: "test",
      specification: "test"
    },
    links: []
  },
  {
    internalCollectionId: 2990121,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Enque Devs ZK Badge",
    description: "This badge owned by Enque Dev team",
    image: "firstenquebadge.svg",
    groupGeneratorName: "firstenquebadge",
    publicContacts: [
      {
        type: "twitter",
        contact: "k_0214",
      },
    ],
    eligibility: {
      shortDescription: "Hold matic",
      specification: "matic",
    },
    links: [],
  },
  {
    internalCollectionId: 2992206,
    networks: [Network.Goerli, Network.Mumbai, Network.Gnosis],
    name: "Chaotic Good DAO",
    description:
      "For followers of @bluff on Lens and @lovetobluff on Twitter. A friendly RU/UA/BL community of crypto enthusiasts, researchers and investors",
    image: "chaotic-good-dao.svg",
    groupGeneratorName: "chaotic-good-dao",
    publicContacts: [
      {
        type: "twitter",
        contact: "@lovetobluff",
      },
    ],
    eligibility: {
      shortDescription: "Be a follower of bluff.lens or @lovetobluff on Twotter",
      specification: "",
    },
    links: [
      {
        label: "website",
        logoUrl: "",
        url: "https://t.me/cryptoskreps",
      },
    ],
  },
  {
    internalCollectionId: 2994861,
    networks: [Network.Goerli, Network.Mumbai],
    name: "Ravi zk Badge on Sismo ZK Badge",
    description: "Ravi zk Badge on Sismo",
    image: "ravi-zk-badge-on-sismo.svg",
    groupGeneratorName: "ravi-zk-badge-on-sismo",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ravi",
      },
    ],
    eligibility: {
      shortDescription: "Ravi zk Badge on Sismo",
      specification: "Connect with the wallet",
    },
    links: [],
  },
  {
    internalCollectionId: 2997493,
    networks: [Network.Goerli, Network.Mumbai],
    name: "maltchain ZK Badge",
    description: "Really good, this is the long-awaited truth",
    image: "maltsismo.svg",
    groupGeneratorName: "maltsismo",
    publicContacts: [
      {
        type: "twitter",
        contact: "@tomspcc2018",
      },
      {
        type: "github",
        contact: "marstome",
      },
    ],
    eligibility: {
      shortDescription: "hold ens or follow @tomspcc2018",
      specification: "hold ens or follow @tomspcc2018",
    },
    links: [],
  },
];
