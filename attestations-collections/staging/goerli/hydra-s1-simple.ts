import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    attesterAddress: "0x89d80C9E65fd1aC8970B78A4F17E2e772030C1cB",
    rootsRegistryAddress: "0xdDa4c8d2933dAA21Aac75B88fF59725725ba813F",
  },

  {
    name: "hydra-s1-simple",
    network: Network.Goerli,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.simpleEncoder,
    attestationsCollections: [
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
      // proof-of-humanity
      {
        internalCollectionId: 8,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-humanity"),
        ],
      },
      // Gitcoin Grant 15 donors
      {
        internalCollectionId: 25,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("gitcoin-grants-round-15-donors"),
        ],
      },
      // Proof of Attendance (POAP)
      {
        internalCollectionId: 29,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-attendance-main-events"),
        ],
      },
      // Flex Loan (ETH Bogota)
      {
        internalCollectionId: 31,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("flex-loan"),
        ],
      },
      // ENS Supporters
      {
        internalCollectionId: 33,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("ens-supporters"),
        ],
      },
      // sismo-stargazers
      {
        internalCollectionId: 36,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-stargazers"),
        ],
      },
      // sismo Contributors
      {
        internalCollectionId: 5151110,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-contributors"),
        ],
      },
    ],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Goerli]: 10000001,
  },
  badges: [
    {
      internalCollectionId: 3,
      name: "Sismo Masquerade Bloomer ZK Badge",
      description:
        "ZK Badge owned by @sismo.lens and @masquerade.lens Lens followers",
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
      eligibility: {
        shortDescription:
          "Be part of the top 0.1% most active users on Ethereum",
        specification:
          "Be part of the top 50k accounts that sent the most transactions (token transfers excluded) on Ethereum between 2015 and December 31st 2016, or be part of the top 50k accounts between 2015 and December 31st 2017, or be part of the top 50k accounts between 2015 and December 31st 2018, or be part of the top 50k accounts between 2015 and December 31st 2019, or be part of the top 50k accounts between 2015 and December 31st 2020, or be part of the top 50k accounts between 2015 and December 31st 2021",
      },
      links: [],
    },
    {
      internalCollectionId: 8,
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
      internalCollectionId: 25,
      name: "GR15 Gitcoin Contributor ZK Badge",
      description:
        "ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
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
      internalCollectionId: 29,
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
      eligibility: {
        shortDescription: "Hold one of the POAPs from a curated list of events",
        specification:
          "Attend EthCC4, or EthCC5, or DevCon 5, or DappCon 2019, or DevConnect Co-work space, or ETHNew York, or ETHBerlin 3, or Poap Sponsor boot @DappCon22 or met Patricio during events on December 2021 or on February 2022, or on March 2022, or on April 2022, or on May 2022, or on June 2022, or on July 2022, or on August 2022, or on September 2022",
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
      internalCollectionId: 31,
      name: "Flex Loan Pay Attest ZK Badge",
      description:
        "ZK Badge owned by users who had paid loans they requested on Flex Loan",
      image: "flex-loan-badge.svg",
      groupGeneratorName: "local-group",
      publicContacts: [
        {
          type: "telegram",
          contact: "@arthurmr96",
        },
        {
          type: "telegram",
          contact: "@bhbrunof",
        },
      ],
      eligibility: {
        shortDescription:
          "You should have paid a loan you requested on Flex Loan",
        specification:
          "You need to request a loan and pay it back on time before it gets liquidated",
      },
      links: [],
    },
    {
      internalCollectionId: 33,
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
      internalCollectionId: 36,
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
      internalCollectionId: 5151110,
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
      eligibility: {
        shortDescription:
          "Prove that you are involved in Sismo by holding .sismo.eth ENS, a contribution POAP, or early ZK Badges.",
        specification:
          "Hold a .sismo.eth Sismo ENS subdomain (Sismo Genesis 0, or X, or A token), or hold a Sismo Contributor Poap (37527: User Testing, or 80235: User Testing#2, or 39515: Artists, or 39651: Community Managers, or 39654: Data Analysts, or 39655: Copywriters, or 39657: Cryptographers, or 39660: Data creators, or 54045: Ziki Run, or 66267: Contributor, or 81377: Contributor#2), or hold a 53325: Meet Sismo @ETHCC POAP, or a 48976: Sismo PreMasquerade POAP, or a 48975: Sismo Masquerade POAP, or hold a early ZK Badge (Masquerade ZK Badge, or Early User ZK Badge, or PoH ZK Badge, or a Ethereum Power User ZK Badge, or a Proof of Attendance ZK Badge, or a ENS Supporter ZK Badge, or a Gitcoin GR15 ZK Badge) or donated to the Sismo Gitcoin Grant 41, or be part of the Sismo Core team",
      },
      links: [],
    },
  ],
};

export const frontBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Goerli]: 0,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Early User ZK Badge",
      description: "ZK Badge owned by Sismo Early users",
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
