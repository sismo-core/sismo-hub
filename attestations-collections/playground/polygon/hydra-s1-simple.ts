import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    [Network.Polygon]: {
      attesterAddress: "0x0AB188c7260666146B300aD3ad5b2AB99eb91D45",
      rootsRegistryAddress: "0xb8797eBa1048f6A6AfCbE4F08a582b4Dde69C05d",
    },
  },

  {
    name: "hydra-s1-simple",
    networks: [Network.Polygon],
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
    ],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 10000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "[playground] ZK Badge: Sismo Digger",
      description:
        "[playground] ZK Badge received by early contributors of Sismo",
      image: "sismo_digger.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 1,
      name: "[playground] ZK Badge: Sismo Citizen",
      description:
        "[playground] ZK Badge received by early supporters of Sismo",
      image: "sismo_citizen.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 2,
      name: "[playground] ZK Badge: Sismo Guest",
      description:
        "[playground] ZK Badge received by community members of frens of Sismo",
      image: "sismo_guest.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 3,
      name: "[playground] Sismo Masquerade Bloomer ZK Badge",
      description:
        "[playground] ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 4,
      name: "[playground] Ethereum Power Users ZK Badge",
      description:
        "[playground] ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 5,
      name: "[playground] Bronze proof of hat",
      description: "[playground] Bronze bounty completed",
      image: "proof-of-hat-bronze.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 6,
      name: "[playground] Silver proof of hat",
      description: "[playground] Silver bounty completed",
      image: "proof-of-hat-silver.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 7,
      name: "[playground] Gold proof of hat",
      description: "[playground] Gold bounty completed",
      image: "proof-of-hat-gold.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 8,
      name: "[playground] Proof of Humanity ZK Badge",
      description: "[playground] ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      attributes: {},
      requirements: ["Prove you are a human with POH"],
    },
    {
      internalCollectionId: 9,
      name: "[playground] Proof of Lepak Member",
      description: "[playground] Lepak Member who is eligible for voting",
      image: "Lepak-Logo.svg",
      attributes: {},
      requirements: [],
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
      attributes: {},
      requirements: [],
    },
  ],
};