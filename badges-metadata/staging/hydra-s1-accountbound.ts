import { generateHydraS1Attester } from "@badges-metadata/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@badges-metadata/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgeMetadata, BadgesCollection } from "topics/badge";
import {
  BadgeAttribute,
  BadgeAttributeValue,
} from "topics/badge/badge-attributes";
import { GroupStore } from "topics/group";

export const hydraS1AccountboundBadges: BadgesCollection = {
  collectionIdFirst: 10000001,
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
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.MEDIUM,
      },
      eligibility: {
        shortDescription:
          "Follow @sismo.lens and @masquerade.lens before July 6 2022",
        specification:
          "Follow @sismo.lens and @masquerade.lens before July 6 2022 on apps powered by Lens Protocol (Lenster, Orb, ..).",
      },
      links: [],
      networks: [Network.Goerli, Network.Mumbai],
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
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.HIGH,
      },
      eligibility: {
        shortDescription:
          "Be part of the top 0.1% most active users on Ethereum",
        specification:
          "Be part of the top 50k accounts that sent the most transactions (token transfers excluded) on Ethereum between 2015 and December 31st 2016, or be part of the top 50k accounts between 2015 and December 31st 2017, or be part of the top 50k accounts between 2015 and December 31st 2018, or be part of the top 50k accounts between 2015 and December 31st 2019, or be part of the top 50k accounts between 2015 and December 31st 2020, or be part of the top 50k accounts between 2015 and December 31st 2021",
      },
      links: [],
      networks: [Network.Goerli, Network.Mumbai],
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
      networks: [Network.Goerli, Network.Mumbai],
    },
    {
      internalCollectionId: 25,
      name: "GR15 Gitcoin Contributor ZK Badge",
      description:
        "ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
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
      networks: [Network.Goerli, Network.Mumbai],
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
      networks: [Network.Goerli, Network.Mumbai],
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
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.MEDIUM,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.VERY_HIGH,
      },
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
      networks: [Network.Goerli, Network.Mumbai],
    },
    {
      internalCollectionId: 38,
      name: "Eth Influencer ZK Badge",
      description:
        "ZK Badge owned by Ethereum Influencers on Twitter (curated by hive.one)",
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
        shortDescription:
          "Be part of the Ethereum Influencers on Twitter listed by Hive.one",
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
      networks: [Network.Goerli, Network.Mumbai],
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
          "You must be a repeat user of Rhino.Fi after 21st May 2021 to be eligible for this badge.",
      },
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.MEDIUM,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.LOW,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.HIGH,
      },
      links: [
        {
          logoUrl:
            "https://rhino.fi/wp-content/uploads/2021/10/rhino.fi_Primary_Logo_Grad-1.svg",
          label: "Rhino.Fi",
          url: "https://rhino.fi/",
        },
      ],
      networks: [Network.Goerli, Network.Mumbai],
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
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.MEDIUM,
      },
      eligibility: {
        shortDescription:
          "Prove that you are involved in Sismo by holding .sismo.eth ENS, a contribution POAP, or early ZK Badges.",
        specification:
          "Hold a .sismo.eth Sismo ENS subdomain (Sismo Genesis 0, or X, or A token), or hold a Sismo Contributor Poap (37527: User Testing, or 80235: User Testing#2, or 39515: Artists, or 39651: Community Managers, or 39654: Data Analysts, or 39655: Copywriters, or 39657: Cryptographers, or 39660: Data creators, or 54045: Ziki Run, or 66267: Contributor, or 81377: Contributor#2), or hold a 53325: Meet Sismo @ETHCC POAP, or a 48976: Sismo PreMasquerade POAP, or a 48975: Sismo Masquerade POAP, or hold a early ZK Badge (Masquerade ZK Badge, or Early User ZK Badge, or PoH ZK Badge, or a Ethereum Power User ZK Badge, or a Proof of Attendance ZK Badge, or a ENS Supporter ZK Badge, or a Gitcoin GR15 ZK Badge) or donated to the Sismo Gitcoin Grant 4165, or be part of the Sismo Core team",
      },
      links: [],
      networks: [Network.Goerli, Network.Mumbai],
    },
  ],
};

export const hydraS1AccountboundAttester = generateHydraS1Attester(
  {
    [Network.Goerli]: {
      attesterAddress: "0x89d80C9E65fd1aC8970B78A4F17E2e772030C1cB",
      rootsRegistryAddress: "0xdDa4c8d2933dAA21Aac75B88fF59725725ba813F",
    },
    [Network.Mumbai]: {
      attesterAddress: "0x069e6B99f4DA543156f66274FC6673442803C587",
      rootsRegistryAddress: "0x2c17e335d131dfd21238475Dd545B9B29Fb5A27D",
    },
  },
  {
    name: "hydra-s1-accountbound",
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.simpleEncoder,
    attestationsCollections: hydraS1AccountboundBadges.badges.map(
      (badge: BadgeMetadata) => {
        if (!badge.groupFetcher && !badge.groupGeneratorName) {
          throw new Error(
            "Either groupFetcher or groupGeneratorName should be specified !"
          );
        }
        const groupFetcher = badge.groupFetcher
          ? badge.groupFetcher
          : async (groupStore: GroupStore) => [
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              await groupStore.latest(badge.groupGeneratorName!),
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
