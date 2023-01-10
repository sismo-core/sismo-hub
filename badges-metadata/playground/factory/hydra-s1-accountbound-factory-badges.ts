import { Network } from "topics/attester/networks";

export const factoryBadges = [
  // Inject randomly between 2000000 and 3000000
  {
    internalCollectionId: 2017027,
    networks: [
      Network.Polygon
    ],
    name: "Helper ZK Badge",
    description: "This Badge is gifted to Helpers that helped someone in need at Web3 Help Desk. \nUsed for Governance and Eligibility Criteria for Monthly Coordinape.",
    image: "helper.svg",
    groupGeneratorName: "helper",
    publicContacts: [
      {
        type: "twitter",
        contact: "@web3_helpdesk"
      }
    ],
    eligibility: {
      shortDescription: "Help someone in need at Web3 Help Desk.",
      specification: ""
    },
    links: [
      {
        label: "Charmverse",
        url: "https://app.charmverse.io/web3-help-desk/page-19377272787222233",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2027048,
    networks: [
      Network.Polygon
    ],
    name: "Gen[0] dAgorians ZK Badge",
    description: "A ZK Badge of appreciation for the genesis Ecclesia of dAgora. This badge is used to identify the first members of DecentrAgora.",
    image: "gen-0-dagorians.svg",
    groupGeneratorName: "gen-0-dagorians",
    publicContacts: [
      {
        type: "twitter",
        contact: "@decentragora"
      },
      {
        type: "github",
        contact: "decentragora"
      }
    ],
    eligibility: {
      shortDescription: "Join dAgora guild, hold a dAgora NFT or mirror entry; before Jan. 4th",
      specification: ""
    },
    links: [
      {
        label: "dAgora App",
        url: "https://decentragora.xyz",
        logoUrl: ""
      },
      {
        label: "dAgora Guild",
        url: "https://guild.xyz/decentragora",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2020053,
    networks: [
      Network.Polygon
    ],
    name: "Sismo meme ZK Badge",
    description: "ZK Badge owned by the collectors,mirrors of sismo meme post from rahulkr.lens on lens",
    image: "sismo-meme.svg",
    groupGeneratorName: "sismo-meme",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rkumar021219"
      }
    ],
    eligibility: {
      shortDescription: "collector,mirrors of sismo meme post from rahulkr.lens on lens",
      specification: "collector,mirrors of sismo meme post from rahulkr.lens on lens\nlink-https://lenster.xyz/posts/0x8f02-0xdd"
    },
    links: []
  },
  {
    internalCollectionId: 2042020,
    networks: [
      Network.Polygon
    ],
    name: "zkLend POAP contributor ZK Badge",
    description: "ZK Badge owned by zkLend POAP contributor",
    image: "zklend-poap-contributor.svg",
    groupGeneratorName: "zklend-poap-contributor",
    publicContacts: [
      {
        type: "twitter",
        contact: "@poolcleaner6"
      },
      {
        type: "github",
        contact: "poolcleaner6"
      }
    ],
    eligibility: {
      shortDescription: "You have to own zkLend Poap's to mint this ZK Badge",
      specification: "You need to own any of this POAP's #64130 #63629 #48879 #51912 #44747 #47227 #61296 #52411 #52445 #49692 #46534 #62034 #60770 #58179 #57129 #54484 #54666 #54885 #53810 #54021 #53655 "
    },
    links: []
  },
  {
    internalCollectionId: 2055365,
    networks: [
      Network.Polygon
    ],
    name: "RAHULKR LENS FOLLOWERS ZK Badge",
    description: " ZK Badge owned by @rahulkr.lens Lens followers",
    image: "rahulkr-lens-followers.svg",
    groupGeneratorName: "rahulkr-lens-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rkumar021219"
      }
    ],
    eligibility: {
      shortDescription: "FOLLOWERS OF RAHULKR PROFILE ON LENS",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2064170,
    networks: [
      Network.Polygon
    ],
    name: "LENS meme collector,mirror ZK Badge",
    description: "ZK Badge owned by the collectors,mirrors of lens meme post from rahulkr.lens",
    image: "lens-meme-collector-mirror.svg",
    groupGeneratorName: "lens-meme-collector-mirror",
    publicContacts: [
      {
        type: "twitter",
        contact: "@rkumar021219"
      }
    ],
    eligibility: {
      shortDescription: "collector,mirrors lens meme post from rahulkr.lens",
      specification: "collectors,mirrors of lens meme post from rahulkr.lens\nlink-https://lenster.xyz/posts/0x8f02-0x0131"
    },
    links: []
  },
  {
    internalCollectionId: 2092300,
    networks: [Network.Polygon],
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
      specification:
        "Users who have passed the Tokenomics DAO nomination process",
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
    internalCollectionId: 2106633,
    networks: [Network.Polygon],
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
        logoUrl:
          "https://pbs.twimg.com/profile_images/512271786172379136/8bT5hlfr_400x400.png",
      },
    ],
  },
  {
    internalCollectionId: 2137451,
    networks: [
      Network.Polygon
    ],
    name: "Viktor ZK Badge",
    description: "ZK Badge owned by Viktor Rozumnyi, this Badge is used in all variety of web3 protocols",
    image: "viktor.svg",
    groupGeneratorName: "viktor",
    publicContacts: [
      {
        type: "twitter",
        contact: "@viktorrozumnyi"
      }
    ],
    eligibility: {
      shortDescription: "Be part of the community",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2140799,
    networks: [Network.Polygon],
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
    internalCollectionId: 2153882,
    networks: [Network.Polygon],
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
    internalCollectionId: 2163624,
    networks: [Network.Polygon],
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
    internalCollectionId: 2174030,
    networks: [Network.Polygon],
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
    networks: [
      Network.Polygon
    ],
    name: "CryptoMonkeys  ZK Badge",
    description: "This badge is issued to the very first supporters of DAO Cryptomonkeys, and gives the right to the future possibility of joining to investment pools (DAO) , valid for 1 year from the date of minting...",
    image: "cryptomonkeys.svg",
    groupGeneratorName: "cryptomonkeys",
    publicContacts: [
      {
        type: "twitter",
        contact: "@spikelov"
      }
    ],
    eligibility: {
      shortDescription: "Be a member of group and chat https://t.me/nefomoeb, be a member of group ABUZ Put an asterisk here https://github.com/spikelov/Cryptomonkeys",
      specification: "Be a member of group and chat https://t.me/nefomoeb, be a member of group ABUZ Put an asterisk here https://github.com/spikelov/Cryptomonkeys"
    },
    links: [
      {
        label: "cryptomonkeys",
        url: "https://t.me/nefomoeb",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2184978,
    networks: [Network.Polygon],
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
    internalCollectionId: 2213141,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    internalCollectionId: 2234775,
    networks: [
      Network.Polygon
    ],
    name: "With love from bykur ZK Badge",
    description: "ZK badge owned by friends of the creator, or subscribed to Debank bykur.eth before 01/06/2023, or have an Ethereum Power User ZK badge",
    image: "with-love-from-bykur.svg",
    groupGeneratorName: "with-love-from-bykur",
    publicContacts: [
      {
        type: "twitter",
        contact: "@eazavarov"
      },
      {
        type: "github",
        contact: "bykbykur"
      }
    ],
    eligibility: {
      shortDescription: "be a friend, or subscribed to Debank bykur.eth before 01/06/2023, or have an Ethereum Power User ZK badge",
      specification: "ZK badge owned by friends of the creator, or subscribed to Debank bykur.eth before 01/06/2023, or have an Ethereum Power User ZK badge"
    },
    links: []
  },
  {
    internalCollectionId: 2240101,
    networks: [
      Network.Polygon
    ],
    name: "Oldschool ZK Badge",
    description: "ZK Badge owned by oldschool users",
    image: "oldschool.svg",
    groupGeneratorName: "oldschool",
    publicContacts: [
      {
        type: "twitter",
        contact: "@OlgaAnd81156130"
      }
    ],
    eligibility: {
      shortDescription: "Oldschool rap parties",
      specification: "Be a real oldschool bro"
    },
    links: []
  },
  {
    internalCollectionId: 2248171,
    networks: [Network.Polygon],
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
    internalCollectionId: 2267301,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
      specification:
        "Be a member of dOrg by having been approved as such by the dOrg DAO.",
    },
    links: [],
  },
  {
    internalCollectionId: 2299239,
    networks: [Network.Polygon],
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
    networks: [
      Network.Polygon
    ],
    name: "Proof of Loneliness ZK Badge",
    description: "This badge proofs that I did not qualify for any other badge so I made one for myself.",
    image: "proof-of-loneliness.svg",
    groupGeneratorName: "proof-of-loneliness",
    publicContacts: [
      {
        type: "twitter",
        contact: "@lettersfrm"
      }
    ],
    eligibility: {
      shortDescription: "Be the only person who can mint this badge.",
      specification: "The only thing to do is be the only one who can claim this badge. "
    },
    links: []
  },
  {
    internalCollectionId: 2329542,
    networks: [Network.Polygon],
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
    internalCollectionId: 2336517,
    networks: [Network.Polygon],
    name: "OFAC chads ZK Badge",
    description:
      "ZK Badge owned by Tornado Chads sanctioned by U.S. Treasury on 08/08/2022.\n",
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
    internalCollectionId: 2340668,
    networks: [
      Network.Polygon
    ],
    name: "Nftyard lens follower ZK Badge",
    description: "ZK Badge owned by @nftyard.lens Lens followers",
    image: "nftyard-lens-follower.svg",
    groupGeneratorName: "nftyard-lens-follower",
    publicContacts: [
      {
        type: "twitter",
        contact: "@cryptodek"
      }
    ],
    eligibility: {
      shortDescription: "Following @nftyard on Lens",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2345464,
    networks: [
      Network.Polygon
    ],
    name: "Lens Followers ZK Badge",
    description: "Users who followed arshiags on Lens 🌿",
    image: "lens-followers.svg",
    groupGeneratorName: "lens-followers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ArshiaGS"
      },
      {
        type: "github",
        contact: "ArshiaGS"
      }
    ],
    eligibility: {
      shortDescription: "ArshiaGS's Lens Followers",
      specification: "🌸 Lenster: https://lenster.xyz/u/arshiags"
    },
    links: [
      {
        label: "👤 About me",
        url: "https://link3.to/arshiags",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2348016,
    networks: [Network.Polygon],
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
      specification:
        "Users who have submitted a protocol that meets THUB quality standards",
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
    internalCollectionId: 2364118,
    networks: [Network.Polygon],
    name: "[playground]  Ens Contracts Stargazers  ZK Badge",
    description:
      "[playground]  ZK badge owned by stargazers of the ensdomains/ens-contracts repository.",
    image: "ens-contracts-stargazers.svg",
    groupGeneratorName: "ens-contracts-stargazers",
    publicContacts: [
      {
        type: "twitter",
        contact: "big_q__",
      },
    ],
    eligibility: {
      shortDescription:
        "Star the ensdomains/ens-contracts repository on Github",
      specification: "",
    },
    links: [
      {
        label: "ENS",
        url: "https://ens.domains/",
        logoUrl: "",
      },
      {
        label: "Repository",
        url: "https://github.com/ensdomains/ens-contracts",
        logoUrl: "",
      },
    ],
  },
  {
    internalCollectionId: 2398819,
    networks: [Network.Polygon],
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
    networks: [
      Network.Polygon
    ],
    name: "Lands ZK Badge",
    description: "Owner by the land owners of the pixels game",
    image: "lands.svg",
    groupGeneratorName: "lands",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Filston9527"
      }
    ],
    eligibility: {
      shortDescription: "hold by the land owners",
      specification: "hold by the land owners"
    },
    links: []
  },
  {
    internalCollectionId: 2405819,
    networks: [
      Network.Polygon
    ],
    name: "Offscript attendee ZK Badge",
    description: "ZK badge that proves ownership of the Offscript 2022 POAP",
    image: "offscript-attendee.svg",
    groupGeneratorName: "offscript-attendee",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Offscript9"
      },
      {
        type: "github",
        contact: "hesterbruikman"
      }
    ],
    eligibility: {
      shortDescription: "Holds a POAP that could be minted by attendees, following Offscript 2022",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2422521,
    networks: [Network.Polygon],
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
    internalCollectionId: 2471201,
    networks: [
      Network.Polygon
    ],
    name: "EmpireDAO 2023 1 Day Desk Pass ZK Badge",
    description: "1 Day Desk Pass 2023 Individual Member As an “individual member”, you’ll get access to a single desk for co-working alongside other web3 builders, developers, and creators, on a members-only floor of EmpireDAO.",
    image: "empiredao-2023-1-day-desk-pass.svg",
    groupGeneratorName: "empiredao-2023-1-day-desk-pass",
    publicContacts: [
      {
        type: "twitter",
        contact: "@empiredao"
      }
    ],
    eligibility: {
      shortDescription: "Purchase a 2023 individual 1 day desk pass for EmpireDAO",
      specification: "Purchase a 2023 individual 1 day desk pass for EmpireDAO for 0.05ETH"
    },
    links: [
      {
        label: "Empire DAO",
        url: "https://empiredao.xyz/",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2481714,
    networks: [
      Network.Polygon
    ],
    name: "Swapper Armyfox ZK Badge",
    description: "Users who participated in Armyfox gaming",
    image: "swapper-armyfox.svg",
    groupGeneratorName: "swapper-armyfox",
    publicContacts: [
      {
        type: "twitter",
        contact: "@sonzhik"
      }
    ],
    eligibility: {
      shortDescription: "1 transaction during armyfox period",
      specification: "1 play in Armyfox gaming"
    },
    links: []
  },
  {
    internalCollectionId: 2484699,
    networks: [
      Network.Polygon
    ],
    name: "REKT Familly degen ZK Badge",
    description: " ZK Badge owned by Roman scammed people. Roman is a scammer! ",
    image: "rekt-familly-degen.svg",
    groupGeneratorName: "rekt-familly-degen",
    publicContacts: [
      {
        type: "twitter",
        contact: "@andynita102"
      }
    ],
    eligibility: {
      shortDescription: "Be a part of Rekt Family Humster Ventures",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2489013,
    networks: [Network.Polygon],
    name: "ZK HACK III - Sismo Workshop ZK Badge",
    description:
      "ZK Badges owned by people who attended the ZK Hack III Sismo Workshop",
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
    internalCollectionId: 2493562,
    networks: [
      Network.Polygon
    ],
    name: "Wonder ZK Badge",
    description: "ZK Badge owned by Irene. \nThis Badge proves that cryptocurrencies have a future. ",
    image: "wonder.svg",
    groupGeneratorName: "wonder",
    publicContacts: [
      {
        type: "twitter",
        contact: "@BULKA37463236"
      }
    ],
    eligibility: {
      shortDescription: "be part of my twitter and follow my Instagram profile",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2504053,
    networks: [Network.Polygon],
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
    internalCollectionId: 2513336,
    networks: [
      Network.Polygon
    ],
    name: "Tally Ho Github stargazers ZK Badge",
    description: "ZK Badge owned by Tally Ho Wallet Github stargazers",
    image: "tally-ho-github-stargazers.svg",
    groupGeneratorName: "tally-ho-github-stargazers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@ihrbrl"
      },
      {
        type: "github",
        contact: "ihrbrl"
      }
    ],
    eligibility: {
      shortDescription: "Star \"https://github.com/tallyhowallet/extension\" Github repo",
      specification: ""
    },
    links: [
      {
        label: "Tally Ho Github",
        url: "https://github.com/tallyhowallet/extension",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2537705,
    networks: [Network.Polygon],
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
    internalCollectionId: 2545308,
    networks: [Network.Polygon],
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
    internalCollectionId: 2558435,
    networks: [Network.Polygon],
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
    internalCollectionId: 2569336,
    networks: [
      Network.Polygon
    ],
    name: "Sk ZK Badge",
    description: "ZK Badge owned by @qismat.lens Followers",
    image: "sk.svg",
    groupGeneratorName: "sk",
    publicContacts: [
      {
        type: "twitter",
        contact: "@Shoebkhask375"
      }
    ],
    eligibility: {
      shortDescription: "@qismat.lens Lens followers",
      specification: "Follow @qismat.lens before Jan 9 2023 on apps powered by Lens Protocol (Lenster, Orb, ..)."
    },
    links: []
  },
  {
    internalCollectionId: 2569984,
    networks: [Network.Polygon],
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
      shortDescription:
        "Be an administrative user of the BlockImperiumGames administrative group",
      specification: "",
    },
    links: [],
  },
  {
    internalCollectionId: 2573021,
    networks: [Network.Polygon],
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
      specification:
        "Users who have passed the Tokenomics DAO proof of work (PoW) process \n",
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
    internalCollectionId: 2577616,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    internalCollectionId: 2594809,
    networks: [
      Network.Polygon
    ],
    name: "Tima ZK Badge",
    description: "ZK Badge owned by Timofey trades and stakers",
    image: "tima.svg",
    groupGeneratorName: "tima",
    publicContacts: [
      {
        type: "twitter",
        contact: "@VidovArtem"
      }
    ],
    eligibility: {
      shortDescription: "Timofey users",
      specification: "Timofey top accounts traders"
    },
    links: []
  },
  {
    internalCollectionId: 2595859,
    networks: [
      Network.Polygon
    ],
    name: "Gotchi French Army x Sismo live ZK Badge",
    description: "ZK Badge owned by the collectors of TheGotchiFArmy's Lens post about the Twitch live with Sismo",
    image: "gotchi-french-army-x-sismo-live.svg",
    groupGeneratorName: "gotchi-french-army-x-sismo-live",
    publicContacts: [
      {
        type: "twitter",
        contact: "@0xMartinGbz"
      },
      {
        type: "github",
        contact: "MartinGbz"
      }
    ],
    eligibility: {
      shortDescription: "Collect the TheGotchiFArmy's Lens post about the Twitch live with Sismo",
      specification: "Collect the following lens post from thegotchifarmy.lens https://lenster.xyz/posts/0x5d7a-0x1d (limited to 50)"
    },
    links: []
  },
  {
    internalCollectionId: 2597607,
    networks: [Network.Polygon],
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
      shortDescription:
        "Wagame Lens follower collecting Lens post NFT waga-Cl-70",
      specification:
        "Collected the Lens post NFT waga-Cl-70 (0x849dF41fF6116E8bDeAD168035a3ee646D0aC4D3) before block 34129746 on Polygon POS",
    },
    links: [
      {
        label: "Wagame",
        logoUrl:
          "https://pbs.twimg.com/profile_images/1578308250591805440/DlyyiViF_400x400.jpg",
        url: "https://guild.xyz/wagameeth",
      },
    ],
  },
  {
    internalCollectionId: 2607278,
    networks: [
      Network.Polygon
    ],
    name: "CryptoTelugu Lens ZK Badge",
    description: "CryptoTelugu ZK Badge owned by @holdbtc.lens Lens followers.\n\nFollow here - https://lenster.xyz/u/holdbtc",
    image: "cryptotelugu-lens.svg",
    groupGeneratorName: "cryptotelugu-lens",
    publicContacts: [
      {
        type: "twitter",
        contact: "@CryptoTeluguO"
      }
    ],
    eligibility: {
      shortDescription: "Follow CryptoTelugu Lens Profile @holdbtc.lens ",
      specification: "Follow @holdbtc.lens on apps powered by Lens Protocol (Lenster, Phaver, Orb, ..)."
    },
    links: []
  },
  {
    internalCollectionId: 2642072,
    networks: [Network.Polygon],
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
    networks: [
      Network.Polygon
    ],
    name: "Moon Dao ZK Badge",
    description: "ZK Badge owned by Dao",
    image: "moon-dao.svg",
    groupGeneratorName: "moon-dao",
    publicContacts: [
      {
        type: "twitter",
        contact: "@xiabing88"
      }
    ],
    eligibility: {
      shortDescription: "be part of moon dao owner or mermber",
      specification: "be part of moon dao owner or mermber"
    },
    links: []
  },
  {
    internalCollectionId: 2658573,
    networks: [
      Network.Polygon
    ],
    name: "DegenScore Beacon ZK Badge",
    description: "ZK Badge owned by DegenScore Beacon holders. This Badge proves that the holders are members of the Beacon Community and have a highlight on-chain reputation.",
    image: "degenscore-beacon.svg",
    groupGeneratorName: "degenscore-beacon",
    publicContacts: [
      {
        type: "twitter",
        contact: "@kanareika355"
      }
    ],
    eligibility: {
      shortDescription: "Hold a DegenScore Beacon",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2665855,
    networks: [Network.Polygon],
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
    internalCollectionId: 2675416,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    internalCollectionId: 2701706,
    networks: [Network.Polygon],
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
    internalCollectionId: 2706327,
    networks: [
      Network.Polygon
    ],
    name: "XSanT ZK Badge",
    description: "ZK Badge owned by XSanT crypto friends community. This Badge proves that owner is part of XSanT crypto friends.",
    image: "xsant.svg",
    groupGeneratorName: "xsant",
    publicContacts: [
      {
        type: "twitter",
        contact: "@XSanT6"
      }
    ],
    eligibility: {
      shortDescription: "Be part of XSanT crypto friends",
      specification: "Be part of XSanT crypto friends"
    },
    links: []
  },
  {
    internalCollectionId: 2713530,
    networks: [
      Network.Polygon
    ],
    name: "SISMOtoker ZK Badge",
    description: "funny pict",
    image: "sismotoker.svg",
    groupGeneratorName: "sismotoker",
    publicContacts: [
      {
        type: "twitter",
        contact: "@tbaobao"
      }
    ],
    eligibility: {
      shortDescription: "POAP",
      specification: "hehehe"
    },
    links: []
  },
  {
    internalCollectionId: 2715978,
    networks: [Network.Polygon],
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
    internalCollectionId: 2729126,
    networks: [Network.Polygon],
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
    internalCollectionId: 2741788,
    networks: [Network.Polygon],
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
    internalCollectionId: 2746764,
    networks: [Network.Polygon],
    name: "Optimism Governance Committee ZK Badge",
    description:
      "This badge represent season two committee member of Optimism Governance.",
    image: "optimism-governance-committee-member.svg",
    groupGeneratorName: "optimism-governance-committee-member",
    publicContacts: [
      {
        type: "twitter",
        contact: "@PraiseVitalik",
      },
    ],
    eligibility: {
      shortDescription:
        "Committee member completed KYC with Optimism Foundation",
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
    internalCollectionId: 2766635,
    networks: [
      Network.Polygon
    ],
    name: "phantabear ZK Badge",
    description: "Phanta Bear is jointly launched by MandoPop King Jay Chou's Fashion Brand PHANTACi and EzekClub (https://ezek.io) Phanta Bear is a limited collection of 10,000 digital collectibles that live on the Ethereum blockchain. Each Phanta Bear is unique and randomly generated. By owning a Phanta Bear avatar, you are granted the access to an exclusive club where you could meet with celebrities, playing in metaverse, virtual concert and game... where the membership benefits increase over time. https://linktr.ee/EzekClub",
    image: "phantabear.svg",
    groupGeneratorName: "phantabear",
    publicContacts: [
      {
        type: "twitter",
        contact: "@EzekClub"
      }
    ],
    eligibility: {
      shortDescription: "Hold Phanta",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2773575,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    internalCollectionId: 2782016,
    networks: [
      Network.Polygon
    ],
    name: "Delovoy DAO Christmas ZK Badge",
    description: "Merry Christmas Delovoy DAO OG Members!",
    image: "delovoy-dao-christmas.svg",
    groupGeneratorName: "delovoy-dao-christmas",
    publicContacts: [
      {
        type: "twitter",
        contact: "@RoRuneChad"
      }
    ],
    eligibility: {
      shortDescription: "Be part of Delovoy DAO",
      specification: ""
    },
    links: [
      {
        label: "DelovoyDAO",
        url: "https://link3.to/delovoydao",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2808245,
    networks: [
      Network.Polygon
    ],
    name: "zkSync Github stargazers ZK Badge",
    description: "ZK Badge owned by zkSync's Github stargazers",
    image: "zksync-github-stargazers.svg",
    groupGeneratorName: "zksync-github-stargazers",
    publicContacts: [
      {
        type: "twitter",
        contact: "@dmtrbrl"
      }
    ],
    eligibility: {
      shortDescription: "Star \"https://github.com/matter-labs/zksync\" Github repo",
      specification: ""
    },
    links: [
      {
        label: "zkSync repo",
        url: "https://github.com/matter-labs/zksync",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2814454,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    internalCollectionId: 2839426,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    internalCollectionId: 2855723,
    networks: [Network.Polygon],
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
    internalCollectionId: 2871592,
    networks: [
      Network.Polygon
    ],
    name: "Tundra Players Club ZK Badge",
    description: "This Badge used in Tundra Players Club",
    image: "tundra-players-club.svg",
    groupGeneratorName: "tundra-players-club",
    publicContacts: [
      {
        type: "twitter",
        contact: "@reewwrr"
      },
      {
        type: "github",
        contact: "reewwrr"
      }
    ],
    eligibility: {
      shortDescription: "Member of TPC",
      specification: ""
    },
    links: []
  },
  {
    internalCollectionId: 2874455,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    internalCollectionId: 2893168,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    networks: [
      Network.Polygon
    ],
    name: "EmpireDAO 2023 5 Day Desk Pass ZK Badge",
    description: "5 Day Desk Pass 2023 Individual Member As an “individual member”, you’ll get access to a single desk for co-working alongside other web3 builders, developers, and creators, on a members-only floor of EmpireDAO.",
    image: "empiredao-2023-5-day-desk-pass.svg",
    groupGeneratorName: "empiredao-2023-5-day-desk-pass",
    publicContacts: [
      {
        type: "twitter",
        contact: "@empiredao"
      }
    ],
    eligibility: {
      shortDescription: "Purchase a 2023 individual 5 day desk pass for EmpireDAO",
      specification: "Purchase a 2023 individual 5 day desk pass for EmpireDAO for 0.2 ETH"
    },
    links: [
      {
        label: "Empire DAO",
        url: "https://empiredao.xyz",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2909098,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
    internalCollectionId: 2927627,
    networks: [Network.Polygon],
    name: "Friend of 0xbA3...299d ZK Badge",
    description:
      "ZK badge owned by 0xbA3...299d friends on and Sismo Contributor ZK Badge owners.",
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
      specification:
        "Follow 0xbA3bD68Ce6B33bB2E097aCE5e82E63C53021299d on Debank.",
    },
    links: [],
  },
  {
    internalCollectionId: 2931545,
    networks: [
      Network.Polygon
    ],
    name: "UnumDAO ZK Badge",
    description: "ZK Badge owned by ConstitutionDAO 2 contributors who have opted to continue the mission of ConstitutionDAO 2 via UnumDAO. This badge is used in the UnumDAO Governance for contributors to voice their opinions and become owners in the governance of the project.",
    image: "unumdao.svg",
    groupGeneratorName: "unumdao",
    publicContacts: [
      {
        type: "twitter",
        contact: "@wagbtc"
      }
    ],
    eligibility: {
      shortDescription: "Contributed at least 0.1 ETH privately to the ConstitutionDAO 2 campaign",
      specification: "Contributed at least 0.1 ETH privately using Nucleo to the ConstitutionDAO 2 campaign and opted for continuing on the UnumDAO mission of using democratizing Web3 technologies to govern and manage historically significant civic artifacts tracking the progress of democracy."
    },
    links: [
      {
        label: "UnumDAO",
        url: "https://unumdao.org/",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2960941,
    networks: [
      Network.Polygon
    ],
    name: "CryptoMarketBlog ZK Badge",
    description: "CryptoMarketBlog ZK Badge owned by @spiritxp.lens followers and cryptomarket.blog users. follow here https://www.lensfrens.xyz/spiritxp.lens ",
    image: "cryptomarketblog.svg",
    groupGeneratorName: "cryptomarketblog",
    publicContacts: [
      {
        type: "twitter",
        contact: "@cryptoshar1"
      }
    ],
    eligibility: {
      shortDescription: "Follow CryptoMarket.blog lens profile @spiritxp.lens",
      specification: "Follow  @spiritxp.lens on apps powered by Lens Protocol "
    },
    links: [
      {
        label: "CryptoMarket",
        url: "https://www.lensfrens.xyz/spiritxp.lens",
        logoUrl: ""
      },
      {
        label: "CM",
        url: "https://cryptomarket.blog/",
        logoUrl: ""
      }
    ]
  },
  {
    internalCollectionId: 2967948,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
    name: "Ambire Early In ZK Badge",
    description:
      "This is for the OGs that have held an Ambire Wallet and $Wallet Token",
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
    internalCollectionId: 2990121,
    networks: [Network.Polygon],
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
    internalCollectionId: 2994861,
    networks: [Network.Polygon],
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
    networks: [Network.Polygon],
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
