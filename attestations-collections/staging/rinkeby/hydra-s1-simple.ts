import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    [Network.Rinkeby]: {
      attesterAddress: "0xfE36e0b6865868721cB39ad0ab5e9808d6cDCA5c",
      rootsRegistryAddress: "0xA4b12eC7B8a2478EaF3d97CF339Bf0F5a7dBBCF2",
    },
  },

  {
    name: "hydra-s1-simple",
    networks: [Network.Rinkeby],
    attestationsCollections: [
      // Sismo friends
      {
        internalCollectionId: 0,
        groupFetcher: async () => [], // await groupStore.latest("sismo-diggers"),
      },
      {
        internalCollectionId: 1,
        groupFetcher: async () => [], // await groupStore.latest("sismo-citizens"),
      },
      {
        internalCollectionId: 2,
        groupFetcher: async () => [], // [await this.groupStore.latest("sismo-guests")]
      },
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
    [Network.Rinkeby]: 10000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "ZK Badge: Sismo Digger",
      description: "ZK Badge received by early contributors of Sismo",
      image: "sismo_digger.svg",
      groupGeneratorName: "sismo-diggers",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 1,
      name: "ZK Badge: Sismo Citizen",
      description: "ZK Badge received by early supporters of Sismo",
      image: "sismo_citizen.svg",
      groupGeneratorName: "sismo-citizens",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 2,
      name: "ZK Badge: Sismo Guest",
      description: "ZK Badge received by community members of frens of Sismo",
      image: "sismo_guest.svg",
      groupGeneratorName: "sismo-guests",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 3,
      name: "Sismo Masquerade Bloomer ZK Badge",
      description:
        "ZK Badge owned by @sismo.lens and @masquerade.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      groupGeneratorName: "sismo-masquerade-lens-followers",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "Follow @sismo.lens and @masquerade.lens before July 6 2022",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 4,
      name: "Ethereum Power User ZK Badge",
      description: "ZK Badge owned by the most active users on Ethereum",
      image: "ethereum_power_users.svg",
      groupGeneratorName: "ethereum-power-users",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "Be part of the top 0.1% most active users on Ethereum",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 8,
      name: "Proof of Humanity ZK Badge",
      description: "ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      groupGeneratorName: "proof-of-humanity",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "Prove you are a human with PoH",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "PoH",
          url: "https://www.proofofhumanity.id/"
        }
      ]
    },
    {
      internalCollectionId: 25,
      name: "GR15 Gitcoin Contributor ZK Badge",
      description: "ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
      image: "gitcoin_grants_round_15_donors.svg",
      groupGeneratorName: "gitcoin-grants-rounds-donors",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "You must have donated in the 15th round of Gitcoin Grants",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "GR15",
          url: "https://gitcoin.co/grants/explorer"
        }
      ]
    },
    {
      internalCollectionId: 5151110,
      name: "Sismo Contributor ZK Badge",
      description: "ZK Badge owned by Sismo contributors. This Badge is used in Sismo Governance for contributors to voice their opinions.",
      image: "sismo_contributors.svg",
      groupGeneratorName: "sismo-contributors",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "Prove that you are involved in Sismo by holding .sismo.eth ENS, a contribution POAP, or early ZK Badges.",
        specification: "",
      },
      links: []
    },
  ],
};

export const frontBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Rinkeby]: 0,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Early User ZK Badge",
      description: "ZK Badge owned by Sismo Early users",
      image: "sismo_early_users.svg",
      groupGeneratorName: "sismo-early-users",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: []
    },
  ],
};
